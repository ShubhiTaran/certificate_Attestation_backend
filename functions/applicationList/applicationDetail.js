"use strict"

const db = require('.././../models/student/studentDetails');
const isEmpty = require('is-empty');

module.exports = {
    getApplicationDetail : getApplicationDetail,
}

function getApplicationDetail(req, res){
    return new Promise(async(resolve, reject) => {

            var application_no  = req.application_no;

            await db.find({"application_form.application_no" : application_no})
            .then((result) => {
                for(var i = 0; i < result[0].application_form.length; i++){
                    if(result[0].application_form[i].application_no == application_no){
                        var appNo  = result[0].application_form[i]
                    }
                }
                return resolve({
                    "message" : appNo
                })
            })
            .catch((error) => {
                return resolve({
                    "message" : error
                })
            })

    })
}

