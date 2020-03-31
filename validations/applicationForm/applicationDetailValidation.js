"use strict"

const applicationDetail = require('.././../functions/applicationList/applicationDetail');

module.exports = {
    applicationDetailValidation : applicationDetailValidation,
}

function applicationDetailValidation(req, callback){

    var application_no = req.application_no;

    if(!application_no){
        callback("Fail from validation.")
    }
    else{
        var object = {
            application_no : application_no,
        }

        applicationDetail.getApplicationDetail(object)
        .then((result) => {
            console.log(result);
            callback(result);
        })
    }

}