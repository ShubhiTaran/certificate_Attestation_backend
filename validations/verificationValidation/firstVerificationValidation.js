"use strict"

const firstVerification = require('.././../functions/verification/firstVerification');

module.exports = {
    firstVerificationValidation : firstVerificationValidation,
}

function firstVerificationValidation(req, callback){

    var application_no = req.application_no;
    var primary_status = req.primary_status;
    var primary_reason = req.primary_reason;

    if(primary_status == "Approved"){
        if(
            !application_no ||
            !primary_status
        ){
            callback("Fail from validation.")
        }
        else{
            var status = {
                application_no : application_no,
                primary_status : primary_status,
            }

            firstVerification.firstVerification(status)
            .then((result) => {
                console.log(result);
                callback(result);
            })
        }
    }
    else if(primary_status == "Rejected"){
        if(
            !application_no ||
            !primary_status ||
            !primary_reason
        ){
            callback("Fail from validation.")
        }
        else{
            var status = {
                application_no : application_no,
                primary_reason : primary_reason,
                primary_status : primary_status,
            }
            firstVerification.firstVerification(status)
            .then((result) => {
                console.log(result);
                callback(result);
            })
        }
    }else if(primary_status == "Correction"){
        if(
            !application_no ||
            !primary_status ||
            !primary_reason
        ){
            callback("Fail from validation.")
        }
        else{
            var status = {
                application_no : application_no,
                primary_reason : primary_reason,
                primary_status : primary_status,
            }
            firstVerification.firstVerification(status)
            .then((result) => {
                console.log(result);
                callback(result);
            })
        }
    }

}