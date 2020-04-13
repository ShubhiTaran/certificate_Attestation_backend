"use strict"

var db = require('.././../models/student/studentDetails');
var nodemailer = require('nodemailer');
const config = require('../../config/config')
const {template}  = require('../../email_template/htmlTemplate')
var log4js = require('log4js');
var log = log4js.getLogger("app");

const exec = require('child_process').exec;


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
                const subject = "Document Authentication Registration";
                const name = result.first_name;
                const body = 'You are successfully registered with us.';
                transporter.sendMail({
                    from : config.mail_id,
                    to : result.email_id,
                    subject : subject,
                    html:template(subject, name, body)
                },
                function(error, info){
                    if(error){
                        console.log(error);
                        log.info("Email failed", error);
                    }
                    else{
                            console.log("Email sent: " + info.response);
                            log.info('Email send: ' + info.response);
                    }
                })
                return resolve({
                    "message" : "success"
                })
            })
            .catch((error) => {
                log.info(error)
                return resolve({
                    "message": "Invalid OTP"
                })
            })
    })
}