
var expect = require("chai").expect;
var request = require("request");
const multer = require("multer")

// test for uploading image
describe("Store uploaded image", function() {

    
    //Stores uploaded image files locally in the back-end
    var storage = multer.diskStorage({
        destination: (req, file, cb) => {
            // default root folder of the app
            cb(null, "public/"); // OR /public/images
        },
        filename: (req, file, cb) => {
            // take apart the uploaded file's name... create a new one based on it
            // return extension of path.... from last '.' to end
            const extension = path.extname(file.originalname);

            // extracts filename from fully qualified path... 2nd arg --> extension to remove from result
            const basenameWithoutExtension = path.basename(
                file.originalname,
                extension
            );

            // create a new file name with a timestamp in the middle
            //const newName = `${basenameWithoutExtension}-${Date.now()}${extension}`;

            const newName = "uploaded_image" + `${extension}`;

            // multer uses new filename for the uploaded file
            cb(null, newName);
        },
    });

    var upload = multer({ storage: storage });

    it("exists", function(done) {
        expect(upload).to.exist;
        done();
    })
})
