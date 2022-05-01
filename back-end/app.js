// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const path = require("path");

// import some useful middleware
const multer = require("multer"); // middleware to handle HTTP POST requests with file uploads
const axios = require("axios"); // middleware for making requests to APIs
const morgan = require("morgan"); // middleware for nice logging of incoming HTTP requests
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const { UserModel } = require("./User");
const { UrlModel } = require("./User");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const MongoDBSession = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const User = require("./User");
const { domain } = require("process");
const corsOrigin = "http://localhost:4000";
// const mongoURI = "mongodb://localhost:27017/sessions";

require("dotenv").config({ silent: true }); // load environmental variables from a hidden file named .env

/*
mongoose
    .connect(mongoURI).then((res) => {
        console.log("MongoDB Connected");
    });
*/

/*---------------------------*/
// --- IMAGE UPLOAD FUNCTIONALITY ---
// --- REVERSE IMAGE SEARCH API FUNCTIONALITY ---
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

//Stores uploaded image files locally in the back-end
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // default root folder of the app
        cb(null, "public/"); // OR /public/images
    },
    filename: (req, file, cb) => {
        // take apart the uploaded file's name... create a new one based on it
        // return extension of path.... from last '.' to end
        const extension = path.extname(file.originalname);

        // extracts filename from fully qualified path... 2nd arg --> extension to remove from result
        const basenameWithoutExtension = path.basename(
            file.originalname,
            extension
        );

        // create a new file name with a timestamp in the middle
        //const newName = `${basenameWithoutExtension}-${Date.now()}${extension}`;

        const newName = "uploaded_image" + `${extension}`;

        // multer uses new filename for the uploaded file
        cb(null, newName);
    },
});

var upload = multer({ storage: storage });

// Schema for images
var imgModel = require("./Image.js");

const authenticate = (req, res, next) => {
    const token = req.get("token");
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect("http://localhost:4000/login");
    }
};

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

    //console.log(webDetection);

    var post_schema = mongoose.Schema({ data: JSON });
    var post_model = mongoose.model("image_results", post_schema);

    var newData = new post_model({ data: webDetection });

    //saving json schema to mongodb

    newData.save(function (err) {
        if (err) {
            throw err;
        }
        console.log("INSERTED!");
        createJSON();
    });

    console.log("GOOGLE API LOADED");

    // [END vision_web_detection]
}

async function createJSON() {
    //Writes response locally
    const connection = mongoose.connection;
    const collection = connection.db.collection("image_results");

    collection.find({}).toArray(function (err, data) {
        console.log(data.length);

        var index = 0;
        if (data.length > 0) {
            index = data.length - 1;
        }
        console.log(index);
        const content = JSON.stringify(data[index], null, "\t");
        //console.log(content); // it will print your collection data
        fs.writeFile("./public/Output.json", content, (err) => {
            if (err) {
                console.error(err);
            }
        });
    });
}

// use the morgan middleware to log all incoming http requests
app.use(morgan("dev", { skip: (req, res) => process.env.NODE_ENV === "test" })); // log all incoming requests, except when in unit test mode.
// morgan has a few logging default styles - dev is a nice concise color-coded style

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data
app.use(bodyParser.urlencoded({ extended: true })); //parser information sent in request into JSON
app.use(bodyParser.json()); //body parser use JSON format

// make 'public' directory publicly readable with static content
//const publicPath = path.join(__dirname, "/public"); // instead of app.use("/static", express.static("public"));
//app.use(express.static(publicPath));

// reference to upload images
// app.use("/image-upload", express.static("/public/"));

app.use(
    cors({
        origin: [corsOrigin],
        methods: ["GET", "POST"],
        credentials: true,
    })
);

app.use("/public", express.static(path.join(__dirname, "/public")));

app.use("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        req.session.isAuth = false;
        res.send(200);
    });
});

// App changes page once image file is uploaded
app.get("/home", (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send("An error occurred", err);
        } else {
            //location.reload();
            res.redirect("http://localhost:4000/searchSetting");
        }
    });
});

// Saves image into backend server
app.post("/home", upload.single("image"), (req, res, next) => {
    var obj = {
        img: {
            data: fs.readFileSync(
                path.join(__dirname + "/public/" + req.file.filename)
            ),
            contentType: "image/png",
        },
    };
    console.log(obj);

    res.redirect("/home");
});

/*--------------------------------------------*/

app.post("/searchSetting", async (req, res) => {
    await detectWeb("./public/uploaded_image.png");

    //await delay(2000);
    res.redirect("http://localhost:4000/results");
});

/*--------------------------------------------*/

//register
app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    let user = await UserModel.findOne({ email });

    if (user) {
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

app.get("/dashboard", authenticate, async (req, res) => {
    const email = req.user;
    let user = await UserModel.findOne({ email });
    return res.send(
        JSON.stringify({ username: user.username, email: user.email })
    );
});

//login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.send(400);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.send(400);
    }

    const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);
    res.json({ name: user.username, accessToken: accessToken });
});

app.post("/dashboard", authenticate, async (req, res) => {
    console.log(req.body);
    const oldEmail = req.user;
    console.log(req.user);
    const { username, email, oldPass, newPass, confPass } = req.body;
    const whitelist = req.body.whitelist
        ? req.body.whitelist.split("\n")
        : null;
    const hashedPass = await bcrypt.hash(newPass, 12);

    let updatedUser = await UserModel.findOneAndUpdate(
        { oldEmail },
        { username, email, hashedPass },
        { upsert: false }
    ).clone((err, data) => {
        if (err) return res.send(500, { error: err });
        if (whitelist) {
            whitelist.forEach((domain, index) => {
                console.log(index);
                let url = new UrlModel({
                    url: domain,
                    user: doc._id,
                });

                url.save();
            });
        }
    });

    console.log({
        username: updatedUser.username,
        email: updatedUser.email,
        whitelist: whitelist,
    });
    const accessToken = jwt.sign(
        updatedUser.email,
        process.env.ACCESS_TOKEN_SECRET
    );
    return res.send({
        username: updatedUser.username,
        email: updatedUser.email,
        whitelist: whitelist,
        token: accessToken,
    });
});

// Use Express to store the Image Search results
// Riley Valls

//import testData from './GoogleCloudAPI/exampleOutput.json';
app.get("/results", async (req, res) => {
    // get json from google api

    // parse to array -> "pagesWithMatchingImages"
    /*
    const whitelist = new Set();
    if(req.user){
        const user = req.user;
        let user_id = await UserModel.findOne({user}).then((data) => {return data._id})
        await UrlModel.find({user_id}).then((data) => {
            whitelist.push(data.url);
        });
    }*/

    ///filtered Results
    /*
   let fullMatch = responses[0].fullMatchingImages.filter((item) => {
        return !whitelist.has(item)
    });

    let partialMatch = responses[0].partialMatchingImages.filter((item) => {
        return !whitelist.has(item)
    });

    let visualMatch =  responses[0].visuallySimilarImages.filter((item) => {
        return !whitelist.has(item)
    });

    const filteredList = fullMatch + partialMatch + visualMatch;
    */

    /*
    fetch(`$'./GoogleCloudAPI/exampleOutput.json'.json`)
    .then(response => response.json())
    .then(data => console.log(data))
    */

    // ADD

    /*
    const connection = mongoose.connection;
    const collection = connection.db.collection("image_results");

    
    collection.find({}).toArray(function(err, data){
        const content = JSON.stringify(data[0], null, "\t")
        //console.log(content); // it will print your collection data
        fs.writeFile('./public/Output.json', content, err => {
            if (err){
                console.error(err);
            }
        })
    });*/

    /*
    var testData = require('./GoogleCloudAPI/exampleOutput.json');
    var body = testData.responses[0].webDetection.pagesWithMatchingImages
    */
    await delay(500);
    var testData = require("./public/Output.json");
    var body = testData.data.pagesWithMatchingImages;
    // send the response as JSON text to the client

    res.json(body);
});

// Use Express to store user login credentials and preffered search settings for their profile
// Duardo Akerele

//Connects to MongoDB Database
mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        console.log("connected");
    }
);

//create an account

// export the express app we created to make it available to other modules
module.exports = app; // CommonJS export style!
