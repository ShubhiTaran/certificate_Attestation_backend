"use strict"

const db = require('.././../models/student/studentDetails');

module.exports = {
    deletePassport : deletePassport,
}

function deletePassport(req, res){
    return new Promise(async(resolve, reject) => {

        var passportId = req._id;

        await db.findOneAndDelete({"passport_details._id" : passportId}, {new:true})
        .then((result) => {
            return resolve({
                "message" : result
            })
        })
        .catch((error) => {
            return resolve({
                "message" : "Oops something went wrong."
            })
        })

    })
}