"use strict"

const verifyGuarantor = require('.././../functions/application_form/verifyGuarantor');

module.exports = {
    verifyGuarantorValidation : verifyGuarantorValidation,
}

function verifyGuarantorValidation(req, callback){

    var guarantor_pincode = req.guarantor_pincode;
    var guarantor_contact = req.guarantor_contact;
    var guarantor_name = req.guarantor_name;
    var application_no = req.application_no;

    if(
        !guarantor_contact ||
        !guarantor_pincode ||
        !application_no ||
        !guarantor_name
    ){
        callback({
            "message" : "Fail from validation."
        });
    }
    else{
        var obj = {
            guarantor_pincode:guarantor_pincode,
            guarantor_contact:guarantor_contact,
            guarantor_name:guarantor_name,
            application_no : application_no
        }

        verifyGuarantor.verifyGuarantor(obj)
        .then((result) => {
            console.log(result);
            callback(result)
        })
    }

}