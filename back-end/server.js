#!/usr/bin/env node

// import the express app
const server = require("./app");
//const express = require("express");
//const app = express();

// which port to listen for HTTP(S) requests
const port = 3000;

const listener = server.listen(port, () => {
    console.log("listening on " + port);
});

const close = () => {
    listener.close();
};

module.exports = {
    close: close,
};
