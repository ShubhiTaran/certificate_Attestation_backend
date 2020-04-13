"use strict"

const datedb = require("../../models/calander/date");
const db = require('.././../models/student/studentDetails');
const nodemailer = require('nodemailer');
const config = require('../../config/config')
const exec = require('child_process').exec;
const {template}  = require('../../email_template/htmlTemplate')
var log4js = require('log4js');
var log = log4js.getLogger("app");

module.exports = {
    blockDate: blockDate
}

function blockDate(req, res) {
    return new Promise(async (resolve, reject) => {

        var transporter = nodemailer.createTransport({
            host: config.mail_service,
            port:config.port,
            auth: {
                user: config.mail_id,
               pass: config.mail_password
           }
        });

        var date = req.date;
        var day = req.day;
        var date_remark = req.date_remark;
        var slot = req.slot;

        console.log(date);
        console.log(day);
        console.log(slot);
        console.log(date_remark);

        var obj = {
            date: date,
            day: day,
            date_remark: date_remark,
        }
        var dateObj = new datedb(obj);

        await datedb.find({ "date": date })
            .then((result) => {
                console.log(slot.length)
                console.log(result[0].slot.length)
                var counter = 0;
                for (var i = 0; i < slot.length; i++) {
                    for (var j = 0; j < result[0].slot.length; j++) {
                        if (slot[i] == result[0].slot[j].slot_no) {
                            counter = counter + 1;
                            var email_id = result[0].slot[j].email_id;
                            if (email_id != undefined || email_id != null) {
                                db.find({ "email_id": email_id })
                                    .then((res) => {
                                        console.log(res)
                                        let application_form = res[0].application_form;
                                        for (let k = 0; k < application_form.length; k++) {
                                            let application_status = application_form[k].application_status;
                                            let application_no = application_form[k].application_no
                                            if (application_status == "Submitted") {
                                                db.findOneAndUpdate({ "application_form.application_no": application_no }, {
                                                    $set: {
                                                        'application_form.$.appointment_date': null,
                                                    }
                                                }, { new: true })
                                                    .then((response) => {
                                                        console.log(response)
                                                        const subject= "Document Attestation Re-Scheduling";
                                                        const name = res[0].first_name;
                                                        const body = `You need to re-schedule your appointment date because on ${date}. 
                                                                    Deputy Secretary is ${date_remark}`;
                                                        transporter.sendMail({
                                                            from: config.mail_id,
                                                            to: email_id,
                                                            subject: subject, 
                                                            html:template(subject, name, body)
                                                        },
                                                            function (error, info) {
                                                                if (error) {
                                                                    console.log(error)
                                                                    log.info("Email failed", error);
                                                                }
                                                                else {
                                                                    console.log("Email sent: " + info.response);
                                                                    log.info('Email send: ' + info.response);
                                                                }
                                                            })
                                                    })
                                                    console.log("date", date,"slot.slot_no", slot[i])
                                                
                                                    datedb.findOneAndUpdate({"date": date,"slot.slot_no": slot[i]},{
                                                        $set: {
                                                            "slot.$.email_id": null
                                                        }
                                                    }, { new: true }).then()
                                            }
                                        }


                                    });
                            }
                        }
                    }

                    if (counter == 0) {
                        datedb.findOneAndUpdate({ "date": date }, {
                            $push: {
                                slot: {
                                    slot_no: slot[i]
                                }
                            },
                            $set: {
                                date_remark: date_remark
                            }
                        }, { new: true })
                            .then((result) => {
                                return resolve({
                                    "message": result
                                })
                            })
                            .catch((error) => {
                                return resolve({
                                    "message": error
                                })
                            })
                    }
                    else {
                        return resolve({
                            "message": "Sent mail to user's for re-scheduling"
                        })
                    }
                }
            })
            .catch((error) => {
                log.info(error)
                dateObj.save(function (error, result) {

                    if (error) {
                        console.log(error);
                        return resolve({
                            "message": "Oops something went wrong"
                        })
                    }
                    else {
                        for (var i = 0; i < slot.length; i++) {
                            datedb.findOneAndUpdate({ "date": date }, {
                                $push: {
                                    slot: {
                                        slot_no: slot[i],
                                    },
                                }
                            }, { new: true })
                                .then((result) => {


                                    return resolve({
                                        "message": result
                                    })

                                })
                                .catch((error) => {
                                    return resolve({
                                        "message": error
                                    })
                                })
                        }
                    }

                })
            })

    })
}
