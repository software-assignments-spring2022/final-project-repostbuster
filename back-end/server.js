#!/usr/bin/env node

// import the express app
const server = require("./app");
//const express = require("express");
//const app = express();

// which port to listen for HTTP(S) requests
const port = 3000;

const listener = server.listen(port, function () {
    console.log(`Server running on port ${port}`);
});

const close = () => {
    listener.close();
};


module.exports = {
    close: close,
};

