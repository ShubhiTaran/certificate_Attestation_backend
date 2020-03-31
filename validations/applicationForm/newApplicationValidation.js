"use strict"

var newApplication = require(".././../functions/application_form/newApplication");

module.exports = {
    newApplicationValidation : newApplicationValidation,
}

function newApplicationValidation(req, callback){

    var _id = req._id;

    if(!_id){
        callback({
            "message" : "Please, provide user id."
        })
    }
    else{
        var obj = {
            _id : _id
        }
        newApplication.newApplication(obj)
        .then((result) => {
            console.log(result);
            callback(result);
        })
    }
}