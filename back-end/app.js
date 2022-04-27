// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const path = require("path");

// import some useful middleware
const multer = require("multer"); // middleware to handle HTTP POST requests with file uploads
const axios = require("axios"); // middleware for making requests to APIs
require("dotenv").config({ silent: true }); // load environmental variables from a hidden file named .env
const morgan = require("morgan"); // middleware for nice logging of incoming HTTP requests
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const UserModel = require('./User');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const MongoDBSession = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/sessions";

mongoose
    .connect(mongoURI).then((res) => {
        console.log("MongoDB Connected");
    });

const store = new MongoDBSession({
    uri:mongoURI,
    collection:"UserSessions"
});

const authenticate = (req, res, next) => {
    const header = req.header['authorization'];
    const token = header.split(' ')[1];
    if(token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const isAuth = (req, res, next) => {
    if(req.session.isAuth) {
        next();
    }
    else {

        res.redirect("http://localhost:4000/login");
    }
};

// use the morgan middleware to log all incoming http requests
app.use(morgan("dev", { skip: (req, res) => process.env.NODE_ENV === "test" })); // log all incoming requests, except when in unit test mode.
// morgan has a few logging default styles - dev is a nice concise color-coded style

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data
app.use(bodyParser.urlencoded({ extended: true })); //parser information sent in request into JSON
app.use(bodyParser.json()); //body parser use JSON format

// make 'public' directory publicly readable with static content
const publicPath = path.join(__dirname, "public"); // instead of app.use("/static", express.static("public"));
app.use(express.static(publicPath));

// reference to upload images
// app.use("/image-upload", express.static("/public/"));

const corsOrigin = "http://localhost:4000";

app.use(
    cors({
        origin: [corsOrigin],
        methods: ["GET", "POST"],
        credentials: true,
    })
);

app.use(
    session({
        secret: 'key',
        resave: false,
        saveUninitialized:false,
        store:store,
    })
);

app.get("/home", (req, res) => {
    res.send("Welcome to RepostBuster!");
});

//register
app.post("/register", async (req, res) => {
    const {username, email, password} = req.body;

    let user = await UserModel.findOne({email});
     
    if(user){
        return res.send(400);
    }

    const hashedPass = await bcrypt.hash(password, 12);

    user = new UserModel({
        username,
        email,
        password: hashedPass,
    });

    await user.save();

    res.send(200);
});



//login
app.post("/login", async (req, res) => { 
   const {email, password} = req.body;
   const user = await UserModel.findOne({email});
   if(!user){
       return res.send(400);
   }

   const isMatch = await bcrypt.compare(password, user.password);

   if(!isMatch){
       return res.send(400);
   }

   const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);
   res.json({accessToken: accessToken});

});


app.use('/logout', (req, res) => {
    req.session.destroy((err) =>{
        if(err) throw err;
        req.session.isAuth = false;
        res.send(200);
    });
});


// export the express app we created to make it available to other modules
module.exports = app; // CommonJS export style!

// Dont forget to create unit tests for your respective functions!

// Backend to do the Image I/O on the home page
// Hyujun Choi
/* app.get("/public/:imageName", (req, res) => {
    const imageName = req.params.imageName;
    const readStream = fs.createReadStream(`public/${imageName}`);
    readStream.pipe(res);
}); */

// enable file uploads saved to disk in a directory named "public"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // default root folder of the app
        cb(null, "public/"); // OR /public/images
    },
    filename: function (req, file, cb) {
        // take apart the uploaded file's name... create a new one based on it
        const extension = path.extname(file.originalname); // return extension of path.... from last '.' to end
        const basenameWithoutExtension = path.basename(
            file.originalname,
            extension
        ); // extracts filename from fully qualified path... 2nd arg --> extension to remove from result

        // create a new file name with a timestamp in the middle
        const newName = `${basenameWithoutExtension}-${Date.now()}${extension}`;

        // multer uses new filename for the uploaded file
        cb(null, newName);
    },
});

const upload = multer({ storage: storage });
// .single("image"); // Same "image" as data.append("image", event.target.files[0]);

app.post("/image-upload", upload.array("image"), (req, res) => {
    /* -------------------------------------------- Attempt 1
    upload(req, res, (err) => {
        // upload() handles req & res
        if (err) {
            res.status(500).send("Upload ERROR!!!!!!"); // Error handling
        }
        res.send(req.file);
    });
     */
    /*  ---------------------------------------------------- attempt 2
    const imagePath = req.file.path;
    const description = req.body.description;

    console.log(imagePath, description);
    res.send({ imagePath, description }); 
    */

    console.log("POST request received to /public");
    console.log("Axios POST body: ", req.body);
    res.send("POST request received on server");
});

// Reverse Image Search API is called once user clicks the submit button on the Search Settings Page.
// Camilo Villavicencio

async function detectWeb(fileName) {
    // [START vision_web_detection]

    // Imports the Google Cloud client library
    const vision = require("@google-cloud/vision");

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    // Detect similar images on the web to a local file
    const [result] = await client.webDetection(fileName);
    const webDetection = result.webDetection;

    //Full matching results
    if (webDetection.fullMatchingImages.length) {
        console.log(
            `Full matches found: ${webDetection.fullMatchingImages.length}`
        );
        webDetection.fullMatchingImages.forEach((image) => {
            console.log(`  URL: ${image.url}`);
            console.log(`  Score: ${image.score}`);
        });
    }

    //Partial matching results
    if (webDetection.partialMatchingImages.length) {
        console.log(
            `Partial matches found: ${webDetection.partialMatchingImages.length}`
        );
        webDetection.partialMatchingImages.forEach((image) => {
            console.log(`  URL: ${image.url}`);
            console.log(`  Score: ${image.score}`);
        });
    }

    //Web entity results
    if (webDetection.webEntities.length) {
        console.log(`Web entities found: ${webDetection.webEntities.length}`);
        webDetection.webEntities.forEach((webEntity) => {
            console.log(`  Description: ${webEntity.description}`);
            console.log(`  Score: ${webEntity.score}`);
        });
    }

    //Labels
    if (webDetection.bestGuessLabels.length) {
        console.log(
            `Best guess labels found: ${webDetection.bestGuessLabels.length}`
        );
        webDetection.bestGuessLabels.forEach((label) => {
            console.log(`  Label: ${label.label}`);
        });
    }

    console.log("GOOGLE API LOADED");
    // [END vision_web_detection]
}

// Use Express to store the Image Search results
// Riley Valls

//import testData from './GoogleCloudAPI/exampleOutput.json';
app.get("/results", (req, res) => {

    // get json from google api

    // parse to array -> "pagesWithMatchingImages"

    /*
    fetch(`$'./GoogleCloudAPI/exampleOutput.json'.json`)
    .then(response => response.json())
    .then(data => console.log(data))
    */

    var testData = require('./GoogleCloudAPI/exampleOutput.json');
    var body = testData.responses[0].webDetection.pagesWithMatchingImages

    // send the response as JSON text to the client

    res.json(body);
});

// Use Express to store user login credentials and preffered search settings for their profile
// Duardo Akerele

//create an account


// export the express app we created to make it available to other modules
module.exports = app; // CommonJS export style!
