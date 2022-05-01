var mongoose = require('mongoose');
  
var visionSchema = new mongoose.Schema({
    results:
    {
        data: JSON
    }
});
  
//Image is a model which has a schema imageSchema
  
module.exports = new mongoose.model('Image_Results', visionSchema);