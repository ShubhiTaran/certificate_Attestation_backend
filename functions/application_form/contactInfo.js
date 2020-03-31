"use strict"

var db = require('.././../models/student/studentDetails');

module.exports = {
    contactInfo : contactInfo,
}

function contactInfo(req, res){
    return new Promise(async(resolve, reject) => {

        var application_no = req.application_no;
        var present_country = req.present_country;
        var present_state = req.present_state;
        var present_city = req.present_city;
        var present_house_no = req.present_house_no;
        var present_street_no = req.present_street_no;
        var present_pincode = req.present_pincode;
        var present_mobile = req.present_mobile;
        var present_email_id = req.present_email_id;

        var permanent_country = req.permanent_country;
        var permanent_state = req.permanent_state;
        var permanent_city = req.permanent_city;
        var permanent_house_no = req.permanent_house_no;
        var permanent_street_no = req.permanent_street_no;
        var permanent_pincode = req.permanent_pincode;
        var permanent_mobile = req.permanent_mobile;
        var permanent_email_id = req.permanent_email_id;

        await db.findOneAndUpdate({"application_form.application_no" : application_no}, {
            $set : {
                "application_form.$.present_country" : present_country,
                "application_form.$.present_state" : present_state,
                "application_form.$.present_city" : present_city,
                "application_form.$.present_house_no" : present_house_no,
                "application_form.$.present_street_no" : present_street_no,
                "application_form.$.present_pincode" : present_pincode,
                "application_form.$.present_mobile" : present_mobile,
                "application_form.$.present_email_id" : present_email_id,
                "application_form.$.permanent_country" : permanent_country,
                "application_form.$.permanent_state" : permanent_state,
                "application_form.$.permanent_city" : permanent_city,
                "application_form.$.permanent_house_no" : permanent_house_no,
                "application_form.$.permanent_street_no" : permanent_street_no,
                "application_form.$.permanent_pincode" : permanent_pincode,
                "application_form.$.permanent_mobile" : permanent_mobile,
                "application_form.$.permanent_email_id" : permanent_email_id,
                "application_form.$.present_country_remark" : null,
                "application_form.$.present_state_remark" : null,
                "application_form.$.present_city_remark" : null,
                "application_form.$.present_house_no_remark" : null,
                "application_form.$.present_street_no_remark" : null,
                "application_form.$.present_pincode_remark" : null,
                "application_form.$.present_mobile_remark" : null,
                "application_form.$.present_email_id_remark" : null,
                "application_form.$.permanent_country_remark" : null,
                "application_form.$.permanent_state_remark" : null,
                "application_form.$.permanent_city_remark" : null,
                "application_form.$.permanent_house_no_remark" : null,
                "application_form.$.permanent_street_no_remark" : null,
                "application_form.$.permanent_pincode_remark" : null,
                "application_form.$.permanent_mobile_remark" : null,
                "application_form.$.permanent_email_id_remark" : null
            }
        }, {new:true})
        .then((result) => {
            var test = result.application_form.length;
                for(var i = 0 ; i < test; i++){
                    if( result.application_form[i].application_no == application_no ){
                        var app_no = result.application_form[i].application_no;
                    }
                }
                return resolve({
                    "status":200,
                    "message" : app_no
                })
        })
        .catch((error) => {
            return resolve({
                "status":400,
                "message" : "Oops something went wrong",
                "error" : error
            })
        })
    })
}