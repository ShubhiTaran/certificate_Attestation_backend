"use strict"

const db = require('.././../models/student/studentDetails');
const Nexmo = require('nexmo')

module.exports = {
    sendOtp : sendOtp,
}

const nexmo = new Nexmo({
    apiKey: 'f5a736e0',
    apiSecret: 'z1L0XOizyo1Du74X'
})


function sendOtp(req, res){
    return new Promise(async(resolve, reject) => {
        var number = req.contact;

        nexmo.verify.request({
            number: number,
            brand: 'MahaIT',
            code_length: '4'
          }, (err, result) => {
            if(result){
                return resolve({
                    "message" : "success",
                    "request_id" : result.request_id,
                    "status" : result.status,
                })
            }
            else if(err){
                return resolve({
                    "message" : err
                })
            }
          });
          
    })
}