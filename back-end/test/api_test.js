
var expect = require("chai").expect

describe("Google Image Search API", function() {
    
    // [START vision_web_detection]
  
    const filename = "./test_image/apple.png"

    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    // test full matching images
    it("test full matching images", async function(done) {
      this.timeout(15000);
      setTimeout(done, 15000);

      // Detect similar images on the web to a local file
      const [result] = await client.webDetection(fileName);
      const webDetection = result.webDetection;

      console.log(webDetection.fullMatchingImages.length)

      expect(webDetection.fullMatchingImages.length).to.exist()
      done();
    })

    // test partial matching images
    it("test partial matching images", async function(done) {
      this.timeout(15000);
      setTimeout(done, 15000);
      
      // Detect similar images on the web to a local file
      const [result] = await client.webDetection(fileName);
      const webDetection = result.webDetection;

      expect(webDetection.partialMatchingImages.length).to.exist()
      done();
    })
  
    // test matching web entities
    it("test partial matching images", async function(done) {
      this.timeout(15000);
      setTimeout(done, 15000);
      
      // Detect similar images on the web to a local file
      const [result] = await client.webDetection(fileName);
      const webDetection = result.webDetection;
      
      expect(webDetection.webEntities.length).to.exist()
      done();
    })
  
    // test best guess labels
    it("test partial matching images", async function(done) {
      this.timeout(15000);
      setTimeout(done, 15000);
      
      // Detect similar images on the web to a local file
      const [result] = await client.webDetection(fileName);
      const webDetection = result.webDetection;
      
      expect(webDetection.bestGuessLabels.length).to.exist()
      done();
    })    
})