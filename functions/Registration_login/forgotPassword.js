"use strict"

const db = require('.././../models/student/studentDetails');
const nodemailer = require('nodemailer');
const config = require('../../config/config')
const request = require('request');
const exec = require('child_process').exec;
const path = require('path');
const os = require('os');


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
        })

        var allAddress = os.networkInterfaces();
        var ipAddress = allAddress.eth0[0].address;

        if (forgotPassword != null) {

            var setPassword = await db.findOneAndUpdate({ "_id": forgotPassword._id }, {
                $set: {
                    set_password_id: set_password_id
                }
            }, { new: true })

            console.log(setPassword.set_password_id)
            transporter.sendMail({
                from: config.mail_id,
                to: setPassword.email_id,
                subject: "Document Authentication Reset password",
                text: "Hello " + setPassword.first_name + ",\n\nPlease set your password from following link.\n\n" +
                    "http://" + ipAddress + ":4200/#/reset-pass?set_password_id=" +
                    setPassword.set_password_id +
                    "\n\nThank you,\nMaharashtra Education Department"
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