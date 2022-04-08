// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const path = require("path");
const bodyParser = require("body-parser");

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
app.use(bodyParser.urlencoded({ extended: true }));//parser information sent in request into JSON
app.use(bodyParser.json());//body parser use JSON format

// make 'public' directory publicly readable with static content
app.use("/static", express.static("public"));

const cors = require('cors')
app.use(cors())

app.get("/", (req, res) => {
    res.send("Welcome to RepostBuster!");
});




// Dont forget to create unit tests for your respective functions!

// Reverse Image Search API is called once user clicks the submit button on the Search Settings Page.
// Camilo Villavicencio

// Backend to do the Image I/O on the home page
// Hyujun Choi

// Use Express to store the Image Search results
// Riley Valls
app.get("/results", (req, res) => {
    const body = [
        {
        "source": "Holdlamis",
        "date": "05/15/2021",
        "link": "ucoz.com"
      }, {
        "source": "Namfix",
        "date": "03/22/2021",
        "link": "patch.com"
      }, {
        "source": "Alphazap",
        "date": "01/21/2022",
        "link": "soup.io"
      }, {
        "source": "Namfix",
        "date": "02/16/2022",
        "link": "feedburner.com"
      }
    ];
    // send the response as JSON text to the client
    
    res.json(body)
});


// Use Express to store user login credentials and preffered search settings for their profile
// Duardo Akerele

//create an account
app.post('/register', (req, res) => {
  try{
    const username = req.body.email;
    // need to salt and has password field
    const password = req.body.password;
    console.log(req.body);
    res.send("SUCCESS");
    //pass fields into database
  }
  catch(err){
    res.send("FAILED "+err);
  }   
});

//login
app.post('/login', (req, res) => {
    try{
      const username = req.body.email;
      const password = req.body.password;
      //check username & pass agaisnt database entry
      console.log(req.body);
      //if match return success page
      res.send("SUCCESS");
    }
    catch(err){
      res.send("FAILED "+err);
    }
    
});


// export the express app we created to make it available to other modules
module.exports = app; // CommonJS export style!