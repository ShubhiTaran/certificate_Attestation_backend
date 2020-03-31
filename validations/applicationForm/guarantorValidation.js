"use strict"

var guarantor = require('.././../functions/application_form/guarantor');

module.exports = {
    guarantorValidation : guarantorValidation
}

function guarantorValidation(req, callback){

    var application_no = req.application_no;
    var guarantor_name = req.guarantor_name;
    var guarantor_country = req.guarantor_country;
    var guarantor_state = req.guarantor_state;
    var guarantor_city = req.guarantor_city;
    var guarantor_house_no = req.guarantor_house_no;
    var guarantor_street_no = req.guarantor_street_no;
    var guarantor_contact = req.guarantor_contact;
    var guarantor_pincode = req.guarantor_pincode;
    var guarantor_status = req.guarantor_status;


    if(
        !application_no ||
        !guarantor_name ||
        !guarantor_country ||
        !guarantor_state ||
        !guarantor_city||
        !guarantor_house_no ||
        !guarantor_street_no ||
        !guarantor_contact ||
        !guarantor_pincode
    ){
        callback({
            "message" : "Fail from validation"
        })
    }
    else if(guarantor_status === false || guarantor_status == null){
        callback({
            "message" : "Please, verify guarantor first."
        })
    }else{

        var obj = {
            application_no : application_no,
            guarantor_name : guarantor_name,
            guarantor_country : guarantor_country,
            guarantor_state : guarantor_state,
            guarantor_city : guarantor_city,
            guarantor_house_no : guarantor_house_no,
            guarantor_street_no : guarantor_street_no,
            guarantor_contact : guarantor_contact,
            guarantor_pincode : guarantor_pincode,
            guarantor_status : guarantor_status
        }

        guarantor.guarantor(obj)
        .then((result) => {
            console.log(result);
            callback(result);
        })
    }

}