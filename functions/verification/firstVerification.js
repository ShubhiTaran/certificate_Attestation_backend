"use strict"

const db = require('.././../models/student/studentDetails');
const nodemailer = require('nodemailer');
const config = require('../../config/config');
const exec = require('child_process').exec;
const {template}  = require('../../email_template/htmlTemplate')
var log4js = require('log4js');
var log = log4js.getLogger("app");

module.exports = {
    firstVerification: firstVerification,
}

function firstVerification(req, res) {
    return new Promise(async (resolve, reject) => {

        var transporter = nodemailer.createTransport({
            host: config.mail_service,
            port:config.port,
            auth: {
                user: config.mail_id,
                pass: config.mail_password
            }
        });

        var application_no = req.application_no;
        var primary_status = req.primary_status;
        var primary_reason = req.primary_reason;
        var status;
        var doStatus;
        if (primary_status == "Correction") {
            status = "Correction";
            doStatus = "Correction";
        } else if (primary_status == "Approved") {
            status = "Submitted";
            doStatus = "Approved";
        } else if (primary_status == "Rejected") {
            status = "Closed";
            doStatus = "Rejected"
        }

        var firstStep = await db.findOneAndUpdate({ "application_form.application_no": application_no }, {
            "$set": {
                "application_form.$.primary_status": doStatus,
                "application_form.$.primary_reason": primary_reason,
                "application_form.$.application_status": status,
                "application_form.$.appointment_date" : null
            }
        }, { new: true });

        for (var i = 0; i < firstStep.application_form.length; i++) {
            if (firstStep.application_form[i].application_no == application_no) {
                var firstStatus = firstStep.application_form[i].primary_status;
                var firstReason = firstStep.application_form[i].primary_reason;
            }
        }

        var date = new Date();
        var month = date.getMonth()+1;
        date = date.getDate()+"-"+month+"-"+date.getFullYear();
        console.log(firstStatus)
        if (firstStatus == "Approved") {
            const subject = "First level verification result";
            const name = firstStep.first_name;
            const body = `Your first level verification is successfully completed and your documents have been verified on ${date}. 
                        Please schedule an appointment to visit the department for physical verification.`;

            transporter.sendMail({
                from : config.mail_id,
                to : firstStep.email_id,
                subject :subject,
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
                "message" : "Confirmation mail successfully sent to the applicant."
            })
        }
        else if (firstStatus == "Rejected") {
            const subject = "First level verification result";
            const name = firstStep.first_name;
            const body = `Sorry, your request for verification of documents is not accepted due to following reason.
                            ${firstReason}.
                            Please make necessary changes and refill the application.`;

            transporter.sendMail({
                from : config.mail_id,
                    to : firstStep.email_id,
                    subject : "First level verification result",
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
                "message" : "Rejection mail successfully sent to the applicant."
            })
        }
        else if (firstStatus == "Correction") {
            const subject = "First level verification result";
            const name = firstStep.first_name;
            const body = `Sorry, your request for verification of documents is not accepted due to following reason.
                        ${firstReason}. Please make necessary changes and resubmit the documents. 
                        Please note that you can’t schedule your visit for physical verification yet.`;
            transporter.sendMail({
                from : config.mail_id,
                    to : firstStep.email_id,
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
                "message" : "Correction mail successfully sent to the applicant."
            })
        }

    })
}
