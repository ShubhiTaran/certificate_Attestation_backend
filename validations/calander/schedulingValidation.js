"use strict"

const scheduling = require(".././../functions/date/scheduling");

module.exports = {
    schedulingValidation : schedulingValidation
}

function schedulingValidation(req, callback){

    var date = req.date;
    var day = req.day;
    var slot = req.slot;
    var application_no = req.application_no;
    var user_id = req.user_id;
    
    
    if(
        !date ||
        !day ||
        !slot ||
        !application_no
    )
    {
        callback({
            "message" : "Fail"
        })
    }

    else{

        var obj = {
            date : date,
            day : day,
            slot : slot,
            application_no : application_no,
            user_id : user_id
        }
        scheduling.scheduling(obj)
        .then((result) => {
            console.log(result);
            callback(result)
        })
    }

}