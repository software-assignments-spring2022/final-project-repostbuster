const path = require("path");
const chai = require("chai");
const expect = chai.expect;
const os = require("os");
const net = require("net");

const modulePath = path.join(__dirname, "../src/connectmoji.js");
const c = require(modulePath);
console.log(modulePath);

require("mocha-sinon");
Object.assign(global, require(path.join(__dirname, "../src/hoffy.js")));

// use to test console output while still allowing console.log
// to _actually_ output to screen
// source: http://stackoverflow.com/a/30626035
function mockConsoleOutput() {
    const log = console.log;
    this.sinon.stub(console, "log").callsFake(function (...args) {
        return log(...args);
    });
}

function getExtension(fileName) {
    if (fileName.includes(".")) {
        const ext = fileName.split(".").pop().toLowerCase();

        return ext;
    } else {
        return "";
    }
}
