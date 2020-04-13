"use strict"

const db = require('.././../models/student/studentDetails');
const config = require('../../config/config')
const nodemailer = require('nodemailer');
const {template}  = require('../../email_template/htmlTemplate')
var log4js = require('log4js');
var log = log4js.getLogger("app");

module.exports = {
    submitApplication : submitApplication,
}

function submitApplication(req, res){
    return new Promise(async(resolve, reject) => {

        var transporter = nodemailer.createTransport({
            host:  config.mail_service,
            port:config.port,
            auth: {
                user: config.mail_id,
                pass: config.mail_password
            }
        });

            var application_no = req.application_no;
            var status;
            await db.findOne({"application_form.application_no" : application_no})
            .then((result) => {
                for(var i = 0; i < result.application_form.length; i++){
                    if(result.application_form[i].application_no == application_no){
                        var primary_status = result.application_form[i].primary_status;
                        var final_status = result.application_form[i].final_status;
                        var user_type = result.application_form[i].applicant_type;
                        var applicant_type = user_type.toLowerCase();
                        var calletter_status = result.application_form[i].callletter_photo_status;
                        var visaStatus = result.application_form[i].visa_photo_status;
                        var affidavitStatus = result.application_form[i].affidavit_photo_status;
                        var certificate_photo_status = result.application_form[i].certificate_photo_status;
                        var nationality = result.application_form[i].nationality;
                        nationality = nationality.toLowerCase();
                        if(primary_status == "Correction"){
                            primary_status = "Pending";
                        }else if(final_status == "Correction"){
                            final_status = "Pending";
                            primary_status = "Pending";
                        }
                        if(applicant_type == "nri" || applicant_type == "foreigner"){

                            if(
                                visaStatus === false || certificate_photo_status === false
                            ){
                                return resolve({
                                    "message" : "Please, upload mandatory documents."
                                })
                            }
                            else{
                                db.findOneAndUpdate({"application_form.application_no" : application_no}, {
                                    $set : {
                                        "application_form.$.application_status" : "Submitted",
                                        "application_form.$.primary_status" : primary_status,
                                        "application_form.$.final_status" : final_status,
                                        "application_form.$.appointment_date" : null,
                                    }
                                }, {new:true})
                                .then((res) => {
                                    for(var i = 0; i < res.application_form.length; i++){
                                        if(res.application_form[i].application_no == application_no){
                                            var app = res.application_form[i]
                                        }
                                    }
                                    const subject = 'Document Authentication Application'
                                    const name = res.first_name;
                                    const body = `Thank you for submitting your Application to MahaIT’s BlockChain Driven
                                                    Certificate cum Document Authentication Application. We will come back to
                                                    you in 3 – 5 days time after doing the verification of all the Documents on your
                                                    Registered E-Mail Id`;
                                    transporter.sendMail({
                                        from : config.mail_id,
                                        to : res.email_id,
                                        subject : subject,
                                        html:template(subject,name, body)
                                    },
                                    function(error, info){
                                        if(error){
                                            console.log(error)
                                            log.info("Email failed", error);
                                        }
                                        else{
                                                console.log("Email sent: " + info.response);
                                                log.info('Email send: ' + info.response);
                                        }
                                    })
                                    return resolve({
                                        "message" : app
                                    })
                                })
                                .catch((err) => {
                                    log.info(err)
                                    return resolve({
                                        "message" : "Oops something went wrong."
                                    })
                                })
                            }

                        }
                        else if(applicant_type == "indian"){
                            if(calletter_status === false || certificate_photo_status === false){
                                return resolve({
                                    "message" : "Please, upload mandatory documents."
                                })
                            }
                            else{
                                db.findOneAndUpdate({"application_form.application_no" : application_no}, {
                                    $set : {
                                        "application_form.$.application_status" : "Submitted",
                                        "application_form.$.primary_status" : primary_status,
                                        "application_form.$.final_status" : final_status,
                                        "application_form.$.appointment_date" : null,
                                    }
                                }, {new:true})
                                .then((res) => {
                                    for(var i = 0; i < res.application_form.length; i++){
                                        if(res.application_form[i].application_no == application_no){
                                            var app = res.application_form[i]
                                        }
                                    }
                                    const subject = 'Document Authentication Application';
                                    const name = res.first_name;
                                    const body =  `Thank you for submitting your Application to MahaIT’s BlockChain Driven
                                    Certificate cum Document Authentication Application. We will come back to
                                    you in 3 – 5 days time after doing the verification of all the Documents on your
                                    Registered E-Mail Id`
                                    transporter.sendMail({
                                        from : config.mail_id,
                                        to : res.email_id,
                                        subject : subject,
                                        html:template(subject,name, body)
                                    },
                                    function(error, info){
                                        if(error){
                                            console.log(error)
                                            log.info("Email failed", error);
                                        }
                                        else{
                                                console.log("Email sent: " + info.response);
                                                log.info('Email send: ' + info.response);
                                        }
                                    })
                                    return resolve({
                                        "message" : app
                                    })
                                })
                                .catch((err) => {
                                    log.info(err)
                                    return resolve({
                                        "message" : "Oops something went wrong."
                                    })
                                })
                            }
                        }
                        else if( applicant_type == "behalf" && nationality == "india" ){

                            if(
                                calletter_status === false || affidavitStatus === false || certificate_photo_status === false
                            ){
                                return resolve({
                                    "message" : "Please, upload mandatory documents."
                                })
                            }
                            else{

                                db.findOneAndUpdate({"application_form.application_no" : application_no}, {
                                    $set : {
                                        "application_form.$.application_status" : "Submitted",
                                        "application_form.$.primary_status" : primary_status,
                                        "application_form.$.final_status" : final_status,
                                        "application_form.$.appointment_date" : null,
                                    }
                                }, {new:true})
                                .then((res) => {
                                    for(var i = 0; i < res.application_form.length; i++){
                                        if(res.application_form[i].application_no == application_no){
                                            var app = res.application_form[i]
                                        }
                                    }
                                    const subject = "Document Authentication Application";
                                    const name = res.first_name;
                                    const body = `Thank you for submitting your Application to MahaIT’s BlockChain Driven
                                    Certificate cum Document Authentication Application. We will come back to
                                    you in 3 – 5 days time after doing the verification of all the Documents on your
                                    Registered E-Mail Id`
                                    transporter.sendMail({
                                        from : config.mail_id,
                                        to : res.email_id,
                                        subject : subject, 
                                        html:template(subject,name, body)
                                    },
                                    function(error, info){
                                        if(error){
                                            console.log(error)
                                            log.info("Email failed", error);
                                        }
                                        else{
                                                console.log("Email sent: " + info.response);
                                                log.info('Email send: ' + info.response);
                                        }
                                    })
                                    return resolve({
                                        "message" : app
                                    })
                                })
                                .catch((err) => {
                                    log.info(err)
                                    return resolve({
                                        "message" : "Oops something went wrong."
                                    })
                                })

                            }

                        }
                        else if(applicant_type == "behalf" && nationality != "india"){

                            if(
                                affidavitStatus === false ||
                                visaStatus === false ||
                                certificate_photo_status === false
                            ){
                                return resolve({
                                    "message" : "Please, upload mandatory documents."
                                })
                            }
                            else{

                                db.findOneAndUpdate({"application_form.application_no" : application_no}, {
                                    $set : {
                                        "application_form.$.application_status" : "Submitted",
                                        "application_form.$.primary_status" : primary_status,
                                        "application_form.$.final_status" : final_status,
                                        "application_form.$.appointment_date" : null,
                                    }
                                }, {new:true})
                                .then((res) => {
                                    for(var i = 0; i < res.application_form.length; i++){
                                        if(res.application_form[i].application_no == application_no){
                                            var app = res.application_form[i]
                                        }
                                    }
                                    const subject = "Document Authentication Application";
                                    const name = res.first_name;
                                    const body = `Thank you for submitting your Application to MahaIT’s BlockChain Driven
                                    Certificate cum Document Authentication Application. We will come back to
                                    you in 3 – 5 days time after doing the verification of all the Documents on your
                                    Registered E-Mail Id`
                                    transporter.sendMail({
                                        from : config.mail_id,
                                        to : res.email_id,
                                        subject : subject,
                                        html:template(subject,name, body)
                                    },
                                    function(error, info){
                                        if(error){
                                            console.log(error)
                                            log.info("Email failed", error);
                                        }
                                        else{
                                                console.log("Email sent: " + info.response);
                                                log.info('Email send: ' + info.response);
                                        }
                                    })
                                    return resolve({
                                        "message" : app
                                    })
                                })
                                .catch((err) => {
                                    log.info(err)
                                    return resolve({
                                        "message" : "Oops something went wrong."
                                    })
                                })

                            }

                        }
                    }
                }
            })
            .catch((error) => {
                console.log(error)
                log.info(error)
                return resolve({
                    "message" : "This application is not available."
                })
            })
    })
}
