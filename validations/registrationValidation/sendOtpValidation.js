"use strict"

var sendOtp = require('.././../functions/Registration_login/sendOtp');

module.exports = {
    senOtpValidation : sendOtpValidation,
}

function sendOtpValidation(req, callback){

    var contact = req.contact;

    if(!contact){
        callback("Fail from validation.")
    }
    else{
        var obj = {
            contact : contact
        }

        sendOtp.sendOtp(obj)
        .then((result) => {
            console.log(result);
            callback(result);
        })
    }

}