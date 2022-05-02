
var expect = require("chai").expect;
var request = require("request");

// test for getting results
describe("Get results", function() {

    var url = "http://localhost:4000/results";

    it("exists", function(done) {
        request(url, function(error, response, body) {
            expect(response).to.exist()
            done();
        })
    })

    it("returns status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        })
    })
})
