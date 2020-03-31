"use strict"

const contactInfo = require('.././../functions/application_form/contactInfo');

module.exports = {
    contactInfoValidation : contactInfoValidation,
}

function contactInfoValidation(req, callback){

    var application_no = req.application_no;
    var present_country = req.present_country;
    var present_state = req.present_state;
    var present_city = req.present_city;
    var present_house_no = req.present_house_no;
    var present_street_no = req.present_street_no;
    var present_pincode = req.present_pincode;
    var present_mobile = req.present_mobile;
    var present_email_id = req.present_email_id

    var permanent_country = req.permanent_country;
    var permanent_state = req.permanent_state;
    var permanent_city = req.permanent_city;
    var permanent_house_no = req.permanent_house_no;
    var permanent_street_no = req.permanent_street_no;
    var permanent_pincode = req.permanent_pincode;
    var permanent_mobile = req.permanent_mobile;
    var permanent_email_id = req.permanent_email_id;

    if(
        !application_no ||
        !present_country ||
        !present_state ||
        !present_city ||
        !present_house_no ||
        !present_street_no ||
        !present_pincode ||
        !present_mobile ||
        !permanent_country ||
        !permanent_state ||
        !permanent_city ||
        !permanent_house_no ||
        !permanent_street_no ||
        !permanent_pincode ||
        !permanent_mobile 
    ){
        callback({
            "message" : "fail"
        });
    }
    else{
        var obj = {
            application_no : application_no,
            present_country : present_country,
            present_state : present_state,
            present_city : present_city,
            present_house_no : present_house_no,
            present_street_no : present_street_no,
            present_pincode : present_pincode,
            present_mobile : present_mobile,
            present_email_id : present_email_id,
            permanent_country : permanent_country,
            permanent_state : permanent_state,
            permanent_city : permanent_city,
            permanent_house_no : permanent_house_no,req,
            permanent_street_no : permanent_street_no,
            permanent_pincode : permanent_pincode,
            permanent_mobile : permanent_mobile,
            permanent_email_id : permanent_email_id
        }
        
        contactInfo.contactInfo(obj)
        .then((result) => {
            console.log(result);
            if(result.status==200){
                callback("",result);

            }
            else{
                callback(result,"");

            }
        })
    }
}
