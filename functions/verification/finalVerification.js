"use strict"

const db = require('.././../models/student/studentDetails');
const nodemailer = require('nodemailer');
const config = require('../../config/config')
const request = require('request');
const exec = require('child_process').exec;
const path = require('path');
const os = require('os');

module.exports = {
    finalVerification : finalVerification,
}

function finalVerification(req, res){
    return new Promise(async(resolve, reject) => {

        var transporter = nodemailer.createTransport({
            host: config.mail_service,
            
            port:config.port,
            auth: {
                user: config.mail_id,
                pass: config.mail_password
            }
        });

        var application_no = req.application_no;
        var final_status = req.final_status;
        var final_reason = req.final_reason;

        var status;
        var dsStatus;
        if(final_status == "Correction"){
            status = "Correction";
            dsStatus = "Correction";
        }else if(final_status == "Approved"){
            status = "Closed";
            dsStatus = "Approved";
        }else if(final_status == "Rejected"){
            status = "Closed";
            dsStatus = "Rejected"
        }

        var firstStep = await db.findOneAndUpdate({"application_form.application_no" : application_no}, {
            "$set" : {
                "application_form.$.final_status" : dsStatus,
                "application_form.$.final_reason" : final_reason,
                "application_form.$.application_status" : status
            }
        }, {new : true});
        
        for(var i = 0; i < firstStep.application_form.length; i++){
            if( firstStep.application_form[i].application_no == application_no ){
                var firstStatus = firstStep.application_form[i].final_status;
                var firstReason = firstStep.application_form[i].final_reason;
            }
        }
        
        var date = new Date();
        var month = date.getMonth()+1;
        date = date.getDate()+"-"+month+"-"+date.getFullYear();
        console.log(firstStatus)
        if(firstStep.application_form[0].final_status == "Approved"){

            transporter.sendMail({
                from : config.mail_id,
                to : firstStep.email_id,
                subject : "Final level verification result",
                text : "Dear " + firstStep.first_name + ",\n\n" +
                            "Your final level verification is successfully completed on "+date+".\n\n" + 
                            "Thank you,\nMaharashtra Education Department"
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
                "message" : "Confirmation mail successfully sent to the applicant."
            })

        }
        else if(firstStep.application_form[0].final_status == "Rejected"){
            transporter.sendMail({
                from : config.mail_id,
                    to : firstStep.email_id,
                    subject : "Final level verification result",
                    text : "Dear " + firstStep.first_name + ",\n\nSorry, your request for verification of documents is not accepted due to following reason.\n\nReason : " +
                            firstReason+"\n\n" +
                            "Please make necessary changes and refill the application.\n\n" +
                            "Thank you,\nMaharashtra Education Department"
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
                "message" : "Rejection mail successfully sent to the applicant."
            })
        }
        else if(firstStep.application_form[0].final_status == "Correction"){
            transporter.sendMail({
                from : config.mail_id,
                    to : firstStep.email_id,
                    subject : "Final level verification result",
                    text : "Dear " + firstStep.first_name + ",\n\nSorry, your request for verification of documents is not accepted due to following reason.\n\nReason : " +
                            firstReason+"\n\n" + 
                            "Please make necessary changes and resubmit the documents.\n\n" +
                            "Please note that you can’t schedule your visit for physical verification yet.\n\n" +
                            "Thank you,\nMaharashtra Education Department"
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
                "message" : "Correction mail successfully sent to the applicant."
            })
        }

    })
}
