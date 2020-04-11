"use strict"

const db = require('.././../models/student/studentDetails');
const nodemailer = require('nodemailer');
const config = require('../../config/config')
const {template}  = require('../../email_template/htmlTemplate')

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
 
                    const subject = 'Document Authentication Email Verification';
                    const head = `Hello ${req.first_name}, `
                    const body = `You are successfully registered with us.`;
                    transporter.sendMail({
                        from: config.mail_id,
                        to: req.email_id,
                        subject: subject,
                        attachments: config.attachments,
                        html:template(head, body)
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
                    const subject = "Document Authentication Email Verification";
                    const head = `Dear ${req.first_name}, `;
                    const body = `Following is the OTP of your Document Authentication portal.`;
                    const assOtp = `OTP : ${req.email_otp }`;
                    transporter.sendMail({
                        from: config.mail_id,
                        to: req.email_id,
                        subject: subject,
                        attachments: config.attachments,
                        html:template(head, body, assOtp)

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