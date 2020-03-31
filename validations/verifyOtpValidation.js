"use strict"

var verifyOtp = require('../functions/Registration_login/verifyOtp');

module.exports = {
    verifyOtpValidation : verifyOtpValidation,
}

function verifyOtpValidation(req, callback){

    var request = req.request;
    var otp = req.otp;

    if(!request || !otp){
        callback("Fail from validation.")
    }
    else{
        var obj = {
            request : request,
            otp : otp
        }

        verifyOtp.verifyOtp(obj)
        .then((result) => {
            console.log(result);
            callback(result);
        })
    }

}