"use strict"

const personalInfo = require(".././../functions/application_form/personalInfo");

module.exports = {
    personalInfoValidation : personalInfoValidation,
}

function personalInfoValidation(req, callback){

    var _id = req._id;
    var applicant_type = req.applicant_type;
    var full_name = req.full_name;
    var sex = req.sex;
    var date_of_birth = req.date_of_birth;
    var father_name = req.father_name;
    var mother_name = req.mother_name;
    var nationality = req.nationality;
    var relationship_with_applicant = req.relationship_with_applicant;
    var personal_photo_status = req.personal_photo_status;

    if(!_id ||
       !full_name ||
       !sex ||
       !date_of_birth ||
       !father_name ||
       !mother_name ||
       !nationality ||
       !applicant_type 
    ){
        callback({
            "message" : "fail"
        })
    }
    else if(applicant_type == "4"){
        if(!relationship_with_applicant){
            callback({
                "message" : "Relationship with applicant is necessary if you selected appplicant type is on-behalf."
            })
        }
    }
    else if(personal_photo_status === false || personal_photo_status == null){
        callback({
            "message" : "Please, upload your passport size photograph"
        })
    }
    else{
        var obj = {
            _id : _id,
            full_name : full_name,
            sex : sex,
            date_of_birth : date_of_birth,
            father_name : father_name,
            mother_name : mother_name,
            nationality : nationality,
            applicant_type : applicant_type,
            personal_photo_status : personal_photo_status
        }
        personalInfo.personalInfo(obj)
        .then((result) => {
            console.log(result);
            callback(result);
        })
        .catch((error) => {
            callback({
                "message" : "Oops something went wrong.",
                "error" : error
            })
        })
    }

}