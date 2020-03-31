"use strict"

const db = require(".././../models/student/studentDetails");

module.exports = {
    currentDesignation : currentDesignation
}

function currentDesignation(req, res){
    return new Promise(async(resolve, reject) => {

        var application_no = req.application_no;
        var designation = req.designation;
        
        

        if(designation != "student" && designation != "unemployed"){

            var name_of_organization = req.name_of_organization;
            var organization_address = req.organization_address;
            var pan_card_number = req.pan_card_number;
            var purpose_for_authentication = req.purpose_for_authentication;

            await db.findOneAndUpdate({"application_form.application_no" : application_no}, {

                $set : {
                    "application_form.$.designation" : designation,
                    "application_form.$.name_of_organization" : name_of_organization,
                    "application_form.$.organization_address" : organization_address,
                    "application_form.$.pan_card_number" : pan_card_number,
                    "application_form.$.purpose_for_authentication" : purpose_for_authentication,
                    "application_form.$.course" : null,
                    "application_form.$.name_of_college" : null,
                    "application_form.$.year_of_passing" : null,
                    "application_form.$.college_address" : null,
                    "application_form.$.designation_remark" : null,
                    "application_form.$.name_of_organization_remark" : null,
                    "application_form.$.organization_address_remark" : null,
                    "application_form.$.pan_card_number_remark" : null,
                    "application_form.$.purpose_for_authentication_remark" : null,
                    

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
                    "message" : app_no
                })

            })

        }
        else if(designation != "unemployed"){

            var course = req.course;
            var name_of_college = req.name_of_college;
            var college_address = req.college_address;
            var purpose_for_authentication = req.purpose_for_authentication;

            await db.findOneAndUpdate({"application_form.application_no" : application_no}, {

                $set : {
                    "application_form.$.designation" : designation,
                    "application_form.$.course" : course,
                    "application_form.$.name_of_college" : name_of_college,
                    "application_form.$.college_address" : college_address,
                    "application_form.$.purpose_for_authentication" : purpose_for_authentication,
                    "application_form.$.name_of_organization" : null,
                    "application_form.$.organization_address" : null,
                    "application_form.$.pan_card_number" : null,
                    "application_form.$.purpose_for_authentication_remark" : null,
                    "application_form.$.designation_remark" : null,
                    "application_form.$.course_remark" : null,
                    "application_form.$.name_of_college_remark" : null,
                    "application_form.$.college_address_remark" : null,
                    "application_form.$.year_of_passing" : null,
                    "application_form.$.year_of_passing_remark" : null,
                    


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
                    "message" : app_no
                })

            })

        }else{
            var course = req.course;
            var name_of_college = req.name_of_college;
            var year_of_passing = req.year_of_passing;
            var college_address = req.college_address;
            var purpose_for_authentication = req.purpose_for_authentication;

            await db.findOneAndUpdate({"application_form.application_no" : application_no}, {

                $set : {
                    "application_form.$.designation" : designation,
                    "application_form.$.course" : course,
                    "application_form.$.name_of_college" : name_of_college,
                    "application_form.$.year_of_passing" : year_of_passing,
                    "application_form.$.college_address" : college_address,
                    "application_form.$.purpose_for_authentication" : purpose_for_authentication,
                    "application_form.$.name_of_organization" : null,
                    "application_form.$.organization_address" : null,
                    "application_form.$.pan_card_number" : null,
                    "application_form.$.purpose_for_authentication_remark" : null,
                    "application_form.$.designation_remark" : null,
                    "application_form.$.course_remark" : null,
                    "application_form.$.name_of_college_remark" : null,
                    "application_form.$.college_address_remark" : null,
                    "application_form.$.year_of_passing_remark" : null
                    


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
                    "message" : app_no
                })

            })
        }


    })
}