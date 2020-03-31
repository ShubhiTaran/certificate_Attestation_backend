"use strict"

const db = require('.././../models/student/studentDetails');
const fs = require('fs');
const applicationDetails = require('../../models/application/applicationDetails')

module.exports = {
    newApplication: newApplication,
}


function newApplication(req, res) {
    return new Promise(async (resolve, reject) => {
        const application_details = await applicationDetails.findOne();
        console.log('application_details', application_details);
        let prefix = 1;
        let series = "";
        // let _id = "";
        if(application_details){
            prefix = application_details['Prefixnumber'];
            series = application_details['series'];
        }
        else{
            const admin_details = new applicationDetails({ app_no:'app_no', Prefixnumber:1, series:""});
            const result = await admin_details.save()
            console.log("myresutl", result)
        }
        console.log('application___', application_details)
        // let rawdata = fs.readFileSync('./application_no.json');
        // let prefix = JSON.parse(rawdata).Prefixnumber;
        let number = prefix;
        var _id = req._id;
        // let series = JSON.parse(rawdata).series;
        var preYear = series.substring(3, 7);
        console.log(preYear);
        var date = new Date();
        var getYear = date.getFullYear();
        if (getYear != preYear) {
            number = 1;
        }

        prefix = number.toString().length
        if (prefix == 1) {
            prefix = "000" + number
        }
        else if (prefix == 2) {
            prefix = "00" + number
        }
        else if (prefix == 3) {
            prefix = "0" + number
        }
        else if (prefix == 4) {
            prefix = number
        }
        // number = number + 1;
        // console.log(prefix)
        // return resolve({
        //     "message" : prefix
        // })
        series = "HTE" + getYear + "-" + prefix;
        await db.findOneAndUpdate({ "_id": _id }, {
            $push: {
                application_form: [{
                    application_no: "HTE" + getYear + "-" + prefix
                }]
            }
        }, { new: true })
            .then( async(result) => {
                number = number + 1;
                let application_no = {
                    "Prefixnumber": number,
                    "series": series
                };
                let data = JSON.stringify(application_no);
               await applicationDetails.findOneAndUpdate( { app_no:"app_no" }, application_no,{ new: true} )
                // fs.writeFileSync('./application_no.json', data);
                var application_form = result.application_form.length - 1;
                console.log(application_form);
                return resolve({
                    "message": result.application_form[application_form].application_no
                })
            })
            .catch((error) => {
                if (error.code == 11000) {
                    return resolve({
                        "message": "Something went wrong, please try again later."
                    })
                }
                else ({
                    "message": error
                })
            })
    })
}