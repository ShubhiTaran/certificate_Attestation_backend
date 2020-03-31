"use strict"

const db = require(".././../models/student/studentDetails");

module.exports = {
    passportInfo : passportInfo
}

function passportInfo(req, res){
    return new Promise(async(resolve, reject) => {

        var _id = req._id;
        var passport_number = req.passport_number;
        var passport_issue_place = req.passport_issue_place;
        var passport_expire_date = req.passport_expire_date;
        var passport_photo_status = req.passport_photo_status;
        var passport_upload_date = Date.now();

        await db.findOneAndUpdate({"application_form" : _id}, {
            $set : {
                "application_form.$.passport_number" : passport_number,
                "application_form.$.passport_issue_place" : passport_issue_place,
                "application_form.$.passport_expire_date" : passport_expire_date,
                "application_form.$.passport_photo_status" : passport_photo_status,
                "application_form.$.passport_upload_date" : passport_upload_date,
                "application_form.$.passport_photo_remark" : null
            }
        }, {new : true})
        .then((result) => {
            var test = result.application_form.length;
                for(var i = 0 ; i < test; i++){
                    if( result.application_form[i].application_no == application_no ){
                        var app_no = result.application_form[i].application_no;
                    }
                }
                return resolve({
                    "message" : app_no
                })
        })
        .catch((error) => {
            return resolve({
                "message" : "Oops something went wrong.",
                "error" : error
            })
        })
    })
}