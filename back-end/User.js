const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type:String,
        required:true,
        unique : true,
    },
    email: {
        type: String,
        required:true,
        unique:true,
    },
    password: {
        type:String,
        required:true,
    }

    
});

const urlSchema = new Schema({
    url: {
        type:String,
        required:true
    },
    user: [{ type: Schema.Types.ObjectId, ref: 'User', required: true}]
});

module.exports = {
    UserModel: mongoose.model('User', userSchema), 
    UrlModel: mongoose.model('Url', urlSchema),
}
