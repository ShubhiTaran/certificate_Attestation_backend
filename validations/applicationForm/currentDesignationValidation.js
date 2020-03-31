"use strict"

const currentDesignation = require('.././../functions/application_form/currentDesignation');

module.exports = {
    currentDesignationValidation : currentDesignationValidation
}

function currentDesignationValidation(req, callback){

    var application_no = req.application_no;
    var designation = req.designation;
    
    if(
        designation != "student" &&
        designation != "unemployed"
    ){
        if(
            !req.name_of_organization ||
            !req.organization_address ||
            !req.purpose_for_authentication
        ){
            callback({
                "message" : "Fail from validation."
            })
        }
        else{

            var obj = {
                application_no : application_no,
                designation : designation,
                name_of_organization : req.name_of_organization,
                organization_address : req.organization_address,
                pan_card_number : req.pan_card_number,
                purpose_for_authentication : req.purpose_for_authentication
            }

            currentDesignation.currentDesignation(obj)
            .then((result) => {

                console.log(result);
                callback(result)

            })
            
        }
    }
    else if(designation != "unemployed"){

        if(
            !req.course ||
            !req.name_of_college ||
            !req.college_address ||
            !req.purpose_for_authentication
        ){
            callback({
                "message" : "Fail from validation."
            })
        }
        else{

            var obj = {
                application_no : application_no,
                designation : designation,
                course : req.course,
                name_of_college : req.name_of_college,
                college_address : req.college_address,
                purpose_for_authentication : req.purpose_for_authentication,
            }

            currentDesignation.currentDesignation(obj)
            .then((result) => {

                console.log(result);
                callback(result);

            })
        }

    }else{
        if(
            !req.course ||
            !req.name_of_college ||
            !req.year_of_passing ||
            !req.college_address ||
            !req.purpose_for_authentication
        ){
            callback({
                "message" : "Fail from validation."
            })
        }
        else{

            var obj = {
                application_no : application_no,
                designation : designation,
                course : req.course,
                name_of_college : req.name_of_college,
                college_address : req.college_address,
                purpose_for_authentication : req.purpose_for_authentication,
                year_of_passing : req.year_of_passing
            }

            currentDesignation.currentDesignation(obj)
            .then((result) => {

                console.log(result);
                callback(result);

            })
        }
    }

}