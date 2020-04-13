"use strict"

const db = require('.././../models/student/studentDetails');
const nodemailer = require('nodemailer');
const config = require('../../config/config')
const {template}  = require('../../email_template/htmlTemplate')
var log4js = require('log4js');
var log = log4js.getLogger("app");

module.exports = {
    forgotPassword: forgotPassword,
}

function forgotPassword(req, res) {
    return new Promise(async (resolve, reject) => {

        var transporter = nodemailer.createTransport({
            host: config.mail_service,
            port:config.port,
            auth: {
                user: config.mail_id,
                pass: config.mail_password
            }
        });

        var email_id = req.email_id;
        var set_password_id = req.set_password_id;

        var forgotPassword = await db.findOne({
            "email_id": email_id,
        });

        if (forgotPassword != null) {

            var setPassword = await db.findOneAndUpdate({ "_id": forgotPassword._id }, {
                $set: {
                    set_password_id: set_password_id
                }
            }, { new: true })

            console.log(setPassword.set_password_id)
            const subject = 'Document Authentication Reset password';
            const name = setPassword.first_name;
            const body = `Please set your password from following link.`
            const url = `${ config.forget_password_url}/#/reset-pass?set_password_id=${setPassword.set_password_id}`
                        transporter.sendMail({
                from: config.mail_id,
                to: setPassword.email_id,
                subject: subject,
                html:template(subject, name, body, '', url)
            })
            return resolve({
                "message": "Reset password link has been sent to your registered email id."
            })
        }
        else {

            return resolve({
                "message": "Please Register Your email id."
            })

        }


    })
}