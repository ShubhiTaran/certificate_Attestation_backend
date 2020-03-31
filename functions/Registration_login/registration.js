"use strict"

const db = require('.././../models/student/studentDetails');
const nodemailer = require('nodemailer');
const config = require('../../config/config')
const request = require('request');
const exec = require('child_process').exec;
const path = require('path');
const os = require('os');

module.exports = {
    studentRegistration: studentRegistration
}

function studentRegistration(req, res) {
    return new Promise(async (resolve, reject) => {

        var transporter = nodemailer.createTransport({
            host: config.mail_service,
            port:config.port,
            auth: {
                user: config.mail_id,
                pass: config.mail_password
            }
        });

        const studentObj = new db(req);
        const email_choice = req.email_choice;
        if (email_choice === false) {
            await studentObj.save(function (error) {
                if (error) {
                    if (error.code == 11000) {
                        return resolve({
                            "message": "Your contact or email id is already registered with us."
                        })
                    }
                }
                else {
                    transporter.sendMail({
                        from: config.mail_id,
                        to: req.email_id,
                        subject: "Document Authentication Email Verification",
                        text: "Hello " + req.first_name + ",\n\nYou are successfully registered with us." +
                            "\n\nThank you,\nMaharashtra H&TE Department"

                    },
                        function (error, info) {
                            if (error) {
                                console.log(error)
                            }
                            else {
                                console.log("Email sent: " + info.response);
                            }
                        })
                    return resolve({
                        "message": "success",
                    })

                }
            });
        }
        else {
            studentObj.save(function (error) {
                console.log(error);
                if (error) {
                    if (error.code == 11000) {
                        return resolve({
                            "message": "Your contact or email id is already registered with us."
                        })
                    }
                }
                else {
                    transporter.sendMail({
                        from: config.mail_id,
                        to: req.email_id,
                        subject: "Document Authentication Email Verification",
                        text: "Dear " + req.first_name + ",\n\n" +
                            "Following is the OTP of your Document Authentication portal. OTP : " + req.email_otp + "\n\n" +
                            "\n\nThank you,\nMaharashtra H&TE Department"

                    },
                        function (error, info) {
                            if (error) {
                                console.log(error)
                            }
                            else {
                                console.log("Email sent: " + info.response);
                            }
                        })
                    return resolve({
                        "message": "success",
                    })
                }
            });
        }

    })
}