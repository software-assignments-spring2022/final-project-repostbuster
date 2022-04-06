#!/usr/bin/env node

// import the express app
const server = require("./app")
//const express = require("express");
//const app = express();

// which port to listen for HTTP(S) requests
const port = 3000;

const listener = server.listen(port, function () {
    console.log(`Server running on port ${port}`);
});

const close = () => {
    listener.close();
}
/*
app.use(express.static("front-end\\public"));
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

    //if match return success page
});
*/
module.exports = {
    close: close,
}
// export the close function
//module.exports = app;
