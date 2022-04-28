const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

    // type.Object ID
    // __id
});

/* 
User --> username & pw 

- enbemdded doc
- reference doc 

connect User to their image collections

1. when user upload image --> sense image --> process --> returns JSON file of all the relevant responses able find 
    - uplaod image 
        - will store that image in "public" folder 
        - should create antother schema for image only ?????
            - but when user uplaod -> uploaded from a remote machine -> to sotre in DB-> need at least URL to that image -> in the remote machine
            - How ???????
            
            ---------------------
            - "alt + z"
            -------------------

    - search setting 
    - submit 
        - what to sedn to API?
            - just send image 
                -  in what format? 
                    - can keep in image format -> as png, jpg 
        - api called 
2. JSON returned --> parse & dsiaply iamges with deatil  
    - where is the api call? 
    - Riley implemented JSON parser 

    - diaply:
        - show the intially upload iamges 
            - easier to display from local directory 
            - server from the public folder using file name 
        -  as well as images retreived from API


API works 
    - work on saving while lsit of users ...
    - deploy on remote 

Drupal???? -> droplet 


*/

module.exports = mongoose.model("User", userSchema);
