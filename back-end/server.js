#!/usr/bin/env node

// import the express app
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

// which port to listen for HTTP(S) requests
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 

app.listen(port, () => {
    console.log("listening on "+port);
});

//create an account
app.post('/register', (req, res) => {
    const username = req.body.email;
    // need to salt and has password field
    const password = req.body.password;
    //pass fields into database
});

app.post('/login', (req, res) => {

    const username = req.body.email;
    const password = req.body.password;
    //check username & pass agaisnt database entry
    console.log(req.body);
    res.send("SUCCESS");
    //if match return success page
});


async function detectWeb(fileName) {
    // [START vision_web_detection]
  
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
  
    // Detect similar images on the web to a local file
    const [result] = await client.webDetection(fileName);
    const webDetection = result.webDetection;

};

app.post('/home', 
bodyParser.raw({ type: ["image/jpeg", "image/png"], limit: "5mb" }),
    (req, res) => {
    console.log(req.body);
    //console.log(detectWeb(req.body.file));

    //console.log(detectWeb());
    res.send(req.body.file);
});

/*
module.exports = {
    close: close,
}*/
// export the close function
//module.exports = app;
