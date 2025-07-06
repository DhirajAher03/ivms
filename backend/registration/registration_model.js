const mongoose = require('mongoose')

const FormData = mongoose.Schema({
        collage_name:String,
        reg_state:String,
        reg_district:String,
        reg_city:String,
        reg_university_name:String,
        reg_principal_name:String,
        reg_contact_person:String,
        reg_contact_person_contact1:Number,
        reg_contact_person_contact2:Number,
        reg_college_email_id:String,
        reg_college_username:String,
        reg_password:String,
        reg_mou_sign:String,
        reg_status:String,
        
});
module.exports= mongoose.model('registration', FormData)