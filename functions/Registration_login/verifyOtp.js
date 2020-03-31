"use strict"

const db = require('.././../models/student/studentDetails');
const Nexmo = require('nexmo')

module.exports = {
    verifyOtp : verifyOtp,
}

const nexmo = new Nexmo({
    apiKey: 'f5a736e0',
    apiSecret: 'z1L0XOizyo1Du74X'
})


function verifyOtp(req, res){
    return new Promise(async(resolve, reject) => {
        var request = req.request;
        var code = req.otp;

        nexmo.verify.check({
            request_id: request,
            code: code
          }, (err, result) => {
                if(result.status == "0"){
                    return resolve({
                        "message" : "success"
                    })
                }
                else if(result.status == "6"){
                    return resolve({
                        "message" : "Your request is not found OR your number is already verified."
                    })
                }
                else if(err){
                    return resolve(err)
                }
          });
    })
}