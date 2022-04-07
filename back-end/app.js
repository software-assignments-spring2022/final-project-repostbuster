// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const path = require("path");

// import some useful middleware
const multer = require("multer"); // middleware to handle HTTP POST requests with file uploads
const axios = require("axios"); // middleware for making requests to APIs
require("dotenv").config({ silent: true }); // load environmental variables from a hidden file named .env
const morgan = require("morgan"); // middleware for nice logging of incoming HTTP requests

// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")); // morgan has a few logging default styles - dev is a nice concise color-coded style

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

// make 'public' directory publicly readable with static content
app.use("/static", express.static("public"));


app.get("/home", (req, res) => {
    res.send("Welcome to RepostBuster!");
});


// export the express app we created to make it available to other modules
module.exports = app; // CommonJS export style!

// Dont forget to create unit tests for your respective functions!

// Reverse Image Search API is called once user clicks the submit button on the Search Settings Page.
// Camilo Villavicencio

// route for HTTP POST requests for /upload-example
app.post("/", (req, res) => {
  const name = req.body.your_name
  const email = req.body.your_email
  const agree = req.body.agree
  // now do something amazing with this data...
  // ... then send a response of some kind
})


// Backend to do the Image I/O on the home page
// Hyujun Choi

// Use Express to store the Image Search results
// Riley Valls

// Use Express to store user login credentials and preffered search settings for their profile
// Duardo Akerele