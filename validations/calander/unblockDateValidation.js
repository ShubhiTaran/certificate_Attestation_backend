"use strict"

const unblockDate = require('.././../functions/date/unblockDate');

module.exports = {
    unblockDateValidation : unblockDateValidation
}

function unblockDateValidation(req, callback){

    var date = req.date;
    var day = req.day;
    var slot = req.slot;
    var date_remark = req.date_remark


    if(
        !date ||
        !slot
    ){
        callback({
            "message" : "Fail from validation"
        })
    }

    else{

        var obj = {
            date : date,
            day : day,
            slot : slot,
            date_remark : date_remark
        }

        unblockDate.unblockDate(obj)
        .then((result) => {
            console.log(result);
            callback(result)
        })

    }

}