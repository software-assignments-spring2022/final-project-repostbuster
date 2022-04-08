#!/usr/bin/env node

// import the express app
const express = require("express");
const server = require("./app.js");
const bodyParser = require('body-parser');

// which port to listen for HTTP(S) requests
const port = 3001;

const listener = server.listen(port, () => {
    console.log("listening on "+port);
});

const close = () => {
    listener.close();
};

module.exports = {
    close: close,
}

