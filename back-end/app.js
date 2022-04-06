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

// use the morgan middleware to log all incoming http requests
app.use(morgan("dev", { skip: (req, res) => process.env.NODE_ENV === "test" })); // log all incoming requests, except when in unit test mode.
// morgan has a few logging default styles - dev is a nice concise color-coded style

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: false })); // decode url-encoded incoming POST data... should we leave it true????????????????

// make 'public' directory publicly readable with static content
const publicPath = path.join(__dirname, "public"); // instead of app.use("/static", express.static("public"));
// app.use(express.static(publicPath));

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

app.get("/", (req, res) => {
    res.send("Welcome to RepostBuster!");
});

// Dont forget to create unit tests for your respective functions!

// Reverse Image Search API is called once user clicks the submit button on the Search Settings Page.
// Camilo Villavicencio

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

// Use Express to store the Image Search results
// Riley Valls
app.get("/results", (req, res) => {
    const body = [
        {
            source: "Holdlamis",
            date: "05/15/2021",
            link: "ucoz.com",
        },
        {
            source: "Namfix",
            date: "03/22/2021",
            link: "patch.com",
        },
        {
            source: "Alphazap",
            date: "01/21/2022",
            link: "soup.io",
        },
        {
            source: "Namfix",
            date: "02/16/2022",
            link: "feedburner.com",
        },
    ];
    // send the response as JSON text to the client

    res.json(body);
});

// Use Express to store user login credentials and preffered search settings for their profile
// Duardo Akerele

// export the express app we created to make it available to other modules
module.exports = app; // CommonJS export style!
