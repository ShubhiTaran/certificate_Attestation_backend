"use strict"

var email_otp_function = require('.././../functions/Registration_login/email_otp');

module.exports = {
    email_otp_validation : email_otp_validation
}

function email_otp_validation(req, callback){
    
    var email_otp = req.email_otp;

    if(!email_otp){
        callback({
            "message" : "Please, provide OTP."
        })
    }
    else{
        var obj = {
            email_otp : email_otp
        }
        email_otp_function.email_otp(obj)
        .then((result) => {
            console.log(result);
            callback(result)
        })
    }
}