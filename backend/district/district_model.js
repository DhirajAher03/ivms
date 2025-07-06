const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
    district_state:String,
    district_name:String,
    district_status:String,
});
module.exports= mongoose.model('district',districtSchema);


