"use strict"

const db = require(".././../models/student/studentDetails");

module.exports = {
    personalInfo : personalInfo,
}

function personalInfo(req, res){
    return new Promise(async(resolve, reject) => {

        var full_name = req.full_name;
        var nationality = req.nationality;
        var date_of_birth = req.date_of_birth;
        var sex = req.sex;
        var father_name = req.father_name;
        var mother_name = req.mother_name;
        var relationship_with_applicant = req.relationship_with_applicant;

        console.log(req)

        await db.findOneAndUpdate({"application_form._id" : req._id}, {

            $set : {
                "application_form.$.full_name" : full_name,
                "application_form.$.sex" : sex,
                "application_form.$.nationality" : nationality,
                "application_form.$.date_of_birth" : date_of_birth,
                "application_form.$.father_name" : father_name,
                "application_form.$.mother_name" : mother_name,
                "application_form.$.relationship_with_applicant" : relationship_with_applicant
            }

        }, {new : true})
        .then((result) => {
            console.log(result);
            return resolve({
                "message" : "success",
                "result" : result
            })
        })
        .catch((error) => {
            console.log(error);
            return resolve({
                "message" : "Opps something went wrong.",
                "error" : error
            })
        })

    })
}