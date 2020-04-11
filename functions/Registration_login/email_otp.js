"use strict"

var db = require('.././../models/student/studentDetails');
var nodemailer = require('nodemailer');
const config = require('../../config/config')
const {template}  = require('../../email_template/htmlTemplate')

const request = require('request');
const exec = require('child_process').exec;
const path = require('path');
const os = require('os');

module.exports = {
    email_otp: email_otp
}

function email_otp(req, res) {
    return new Promise(async (resolve, reject) => {

        var transporter = nodemailer.createTransport({
            host: config.mail_service,
            port:config.port,
            auth: {
                user: config.mail_id,
                pass: config.mail_password
            }
        });

        var email_otp = req.email_otp;

        await db.findOneAndUpdate({ "email_otp": email_otp }, {
            $set: {
                "email_otp": null,
                "registration_status": true,
            }
        }, { new: true })
            .then((result) => {
                const head = `Hello ${result.first_name}, `;
                const boyd = ``
                transporter.sendMail({
                    from : config.mail_id,
                    to : result.email_id,
                    subject : "Document Authentication Registration",
                    text : "Hello " + result.first_name + ",\n\nYou are successfully registered with us." +
                            "\n\nThank you,\nMaharashtra H&TE Department"

                },
                function(error, info){
                    if(error){
                        console.log(error)
                    }
                    else{
                            console.log("Email sent: " + info.response);
                    }
                })
                return resolve({
                    "message" : "success"
                })
            })
            .catch((error) => {
                return resolve({
                    "message": "Invalid OTP"
                })
            })
    })
}