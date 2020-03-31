"use strict" 

var blockDate = require(".././../functions/date/blockDate");

module.exports = {
    blockDateValidation : blockDateValidation
}

function blockDateValidation(req, callback){

    var date = req.date;
    var day = req.day;
    var date_remark = req.date_remark;
    var slot = req.slot;

    if(
        !date ||
        !day ||
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
            date_remark : date_remark,
            slot : slot
        }

        blockDate.blockDate(obj)
        .then((result) => {
            console.log(result);
            callback(result)
        })
    }

}