"use strict"

const submitApplication = require('.././../functions/application_form/submitApplication');

module.exports = {
    submitApplicationValidation : submitApplicationValidation,
}

function submitApplicationValidation(req, callback){

    var application_no = req.application_no;

    if(!application_no){
        callback({
            "message" : "Please provide application no."
        })
    }
    else{
        var obj = {
            application_no : application_no
        }

        submitApplication.submitApplication(obj)
        .then((result) => {
            console.log(result);
            callback(result);
        })
    }

}