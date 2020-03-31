"use strict"

const db = require(".././../models/student/studentDetails");

module.exports = {
    verifyGuarantor : verifyGuarantor
}

function verifyGuarantor(req, res){
    return new Promise(async(resolve, reject) => {

        var guarantor_pincode = req.guarantor_pincode;
        var guarantor_contact = req.guarantor_contact;
        var guarantor_name = req.guarantor_name;
        var application_no = req.application_no;
        var todayDate = new Date();
        var oneDay = 1000 * 60 * 60 * 24;
        var difference = 0;
        await db.find()
        .then((result) => {
            for(var i = 0; i < result.length; i++){
                for(var j = 0; j < result[i].application_form.length; j++){

                    if(result[i].application_form[j].guarantor_contact == guarantor_contact && result[i].application_form[j].application_no != application_no){
                        var appDate = result[i].application_form[j].application_date;
                        const start = Date.UTC(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), todayDate.getHours(), todayDate.getMinutes(), todayDate.getSeconds());
                        const end = Date.UTC(appDate.getFullYear(), appDate.getMonth(), appDate.getDate(), appDate.getHours(), appDate.getMinutes(), appDate.getSeconds());
                        difference = (start - end) / oneDay;
                        console.log(difference);
                    }
                }
            }
            if(difference == 0 || difference > 180){
                return resolve({
                    "message" : "success"
                })
            }
            else{
                return resolve({
                    "message" : "Guarantor is already registered."
                })
            }
        })

    })
}