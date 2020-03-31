"use strict"

const db = require(".././../models/student/studentDetails");

module.exports = {
    guarantor : guarantor
}

function guarantor(req, res){
    return new Promise(async(resolve, reject) => {

        var application_no = req.application_no;
        var guarantor_name = req.guarantor_name;
        var guarantor_country = req.guarantor_country;
        var guarantor_state = req.guarantor_state;
        var guarantor_city = req.guarantor_city;
        var guarantor_house_no = req.guarantor_house_no;
        var guarantor_street_no = req.guarantor_street_no;
        var guarantor_contact = req.guarantor_contact;
        var guarantor_pincode = req.guarantor_pincode;
        var guarantor_status = req.guarantor_status;

        await db.findOneAndUpdate({'application_form.application_no' : application_no}, {

            $set : {
                "application_form.$.guarantor_name" : guarantor_name,
                "application_form.$.guarantor_country" : guarantor_country,
                "application_form.$.guarantor_state" : guarantor_state,
                "application_form.$.guarantor_city" : guarantor_city,
                "application_form.$.guarantor_house_no" : guarantor_house_no,
                "application_form.$.guarantor_street_no" : guarantor_street_no,
                "application_form.$.guarantor_contact" : guarantor_contact,
                "application_form.$.guarantor_pincode" : guarantor_pincode,
                "application_form.$.guarantor_status" : guarantor_status,
                "application_form.$.guarantor_name_remark" : null,
                "application_form.$.guarantor_country_remark" : null,
                "application_form.$.guarantor_state_remark" : null,
                "application_form.$.guarantor_city_remark" : null,
                "application_form.$.guarantor_house_no_remark" : null,
                "application_form.$.guarantor_street_no_remark" : null,
                "application_form.$.guarantor_contact_remark" : null,
                "application_form.$.guarantor_pincode_remark" : null
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