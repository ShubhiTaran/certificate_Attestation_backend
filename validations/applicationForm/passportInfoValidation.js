"use strict"

var passportInfo = require('.././../functions/application_form/passportInfo');

module.exports = {
    passportInfoVaidation : passportInfoVaidation,
}

function passportInfoVaidation(req, callback){

    var _id = req._id;
    var passport_number = req.passport_number;
    var passport_issue_place = req.passport_issue_place;
    var passport_expire_date = req.passport_expire_date;
    var passport_photo_status = req.passport_photo_status;

    if(!_id ||
       !passport_number ||
       !passport_issue_place ||
       !passport_expire_date     
    ){
        callback({
            "message" : "fail"
        });
    }
    else if(passport_photo_status === false || passport_photo_status == null){
        callback({
            "message" : "Please, upload passport photograph"
        })
    }
    else{
        var obj = {
            _id : _id,
            passport_number : passport_number,
            passport_issue_place : passport_issue_place,
            passport_expire_date : passport_expire_date
        }
        passportInfo.passportInfo(obj)
        .then((result) => {
            console.log(result);
            callback(result);
        })
    }

}