"use strict"

const db = require('.././../models/student/studentDetails');


module.exports = {
    applicationForm : applicationForm
}

function applicationForm(req, res){
    return new Promise(async(resolve, reject) => {
        
        await db.findOneAndUpdate({"application_form.application_no" : req.application_no}, {
            $set : {
                "application_form.$.personal_photo_status" : req.personal_photo_status,
                "application_form.$.passport_photo_status" : req.passport_photo_status,
                "application_form.$.callletter_photo_status" : req.callletter_photo_status,
                "application_form.$.affidavit_photo_status" : req.affidavit_photo_status,
                "application_form.$.visa_photo_status" : req.visa_photo_status,
                "application_form.$.certificate_photo_status" : req.certificate_photo_status,
                "application_form.$.full_name" : req.full_name,
                "application_form.$.sex" : req.sex,
                "application_form.$.nationality" : req.nationality,
                "application_form.$.date_of_birth" : req.date_of_birth,
                "application_form.$.father_name" : req.father_name,
                "application_form.$.mother_name" : req.mother_name,
                "application_form.$.passport_number" : req.passport_number,
                "application_form.$.passport_issue_place" : req.passport_issue_place,
                "application_form.$.passport_expire_date" : req.passport_expire_date,
               
                "application_form.$.designation" : req.designation,
                "application_form.$.name_of_organization" : req.name_of_organization,
                "application_form.$.organization_address" : req.organization_address,
                "application_form.$.pan_card_number" : req.pan_card_number,
                "application_form.$.purpose_for_authentication" : req.purpose_for_authentication,
                "application_form.$.course" : req.course,
                "application_form.$.name_of_college" : req.name_of_college,
                "application_form.$.college_address" : req.college_address,
               
                "application_form.$.present_country" : req.present_country,
                "application_form.$.present_state" : req.present_state,
                "application_form.$.present_city" :req.present_city,
                "application_form.$.present_house_no" : req.present_house_no,
                "application_form.$.present_street_no" : req.present_street_no,
                "application_form.$.present_pincode" : req.present_pincode,
                "application_form.$.present_mobile" : req.present_mobile,
               
                "application_form.$.permanent_country" : req.permanent_country,
                "application_form.$.permanent_state" : req.permanent_state,
                "application_form.$.permanent_city" :req.permanent_city,
                "application_form.$.permanent_house_no" : req.permanent_house_no,
                "application_form.$.permanent_street_no" : req.permanent_street_no,
                "application_form.$.permanent_pincode" : req.permanent_pincode,
                "application_form.$.permanent_mobile" : req.permanent_mobile,
              
                "application_form.$.certificate_no" : req.certificate_no,
                "application_form.$.name_of_exam" : req.name_of_exam,
                "application_form.$.year" : req.year,
                "application_form.$.name_of_institute" : req.name_of_institute,
            }
        }, {new : true})
        .then((result) => {
            console.log(result);
            return resolve({
                "message" : "Your details submitted successfully."
            })
        })
        .catch((error) => {
            console.log(error);
            return resolve({
                "message" : "Oops something went wrong."
            })
        })
    })
}