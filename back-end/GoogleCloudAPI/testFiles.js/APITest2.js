  export async function detectWeb(fileName) {
      // [START vision_web_detection]
    
      // Imports the Google Cloud client library
      const vision = require('@google-cloud/vision');
    
      // Creates a client
      const client = new vision.ImageAnnotatorClient();
    
      /**
       * TODO(developer): Uncomment the following line before running the sample.
       */
    
      // Detect similar images on the web to a local file
      
      const [result] = await client.webDetection(fileName);
      const webDetection = result.webDetection;

      if (webDetection.fullMatchingImages.length) {
        console.log(
          `Full matches found: ${webDetection.fullMatchingImages.length}`
        );
        webDetection.fullMatchingImages.forEach(image => {
          console.log(`  URL: ${image.url}`);
          console.log(`  Score: ${image.score}`);
        });
      }
    
      
      if (webDetection.partialMatchingImages.length) {
        console.log(
          `Partial matches found: ${webDetection.partialMatchingImages.length}`
        );
        webDetection.partialMatchingImages.forEach(image => {
          console.log(`  URL: ${image.url}`);
          console.log(`  Score: ${image.score}`);
        });
      }
    
      if (webDetection.webEntities.length) {
        console.log(`Web entities found: ${webDetection.webEntities.length}`);
        webDetection.webEntities.forEach(webEntity => {
          console.log(`  Description: ${webEntity.description}`);
          console.log(`  Score: ${webEntity.score}`);
        });
      }
    
      if (webDetection.bestGuessLabels.length) {
        console.log(
          `Best guess labels found: ${webDetection.bestGuessLabels.length}`
        );
        webDetection.bestGuessLabels.forEach(label => {
          console.log(`  Label: ${label.label}`);
        });
      }
      
    console.log("GOOGLE API LOADED");
      // [END vision_web_detection]
  }

  //detectWeb("F:/2022/NYU/Agile/final-project-repostbuster/back-end/GoogleCloudAPI/test_image/apple.png")

