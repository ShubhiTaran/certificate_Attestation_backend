"use strict"

const finalVerification = require('.././../functions/verification/finalVerification');

module.exports = {
    finalVerificationValidation : finalVerificationValidation,
}

function finalVerificationValidation(req, callback){

    var application_no = req.application_no;
    var final_status = req.final_status;
    var final_reason = req.final_reason;

    if(final_status == "Approved"){
        if(
            !application_no ||
            !final_status
        ){
            callback("Fail from validation.")
        }
        else{
            var status = {
                application_no : application_no,
                final_status : final_status,
            }

            finalVerification.finalVerification(status)
            .then((result) => {
                console.log(result);
                callback(result);
            })
        }
    }
    else if(final_status == "Rejected"){
        if(
            !application_no ||
            !final_status ||
            !final_reason
        ){
            callback("Fail from validation.")
        }
        else{
            var status = {
                application_no : application_no,
                final_reason : final_reason,
                final_status : final_status,
            }
            finalVerification.finalVerification(status)
            .then((result) => {
                console.log(result);
                callback(result);
            })
        }
    }else if(final_status == "Correction"){
        if(
            !application_no ||
            !final_status ||
            !final_reason
        ){
            callback("Fail from validation.")
        }
        else{
            var status = {
                application_no : application_no,
                final_reason : final_reason,
                final_status : final_status,
            }
            finalVerification.finalVerification(status)
            .then((result) => {
                console.log(result);
                callback(result);
            })
        }
    }

}