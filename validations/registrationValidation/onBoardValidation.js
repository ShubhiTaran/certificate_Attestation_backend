"use strict"

const onBoardUser = require('.././../functions/Registration_login/onBoardUser');
const sha256 = require('sha256');

module.exports = {
    onBoardValidation : onBoardValidation
}

function onBoardValidation(req, callback){

    //console.log(req)
    var user_type = req.user_type;
    var first_name = req.first_name;
    var middle_name = req.middle_name;
    var last_name = req.last_name;
    var phone_number = req.phone_number;
    var email_id = req.email_id;
    var nationality = req.nationality;
    var password = Math.random().toString(36).slice(-8);
    var hashPassword = sha256(password);
    console.log(hashPassword)

    if(
        !user_type ||
        !first_name ||
        !last_name ||
        !phone_number ||
        !email_id ||
        !nationality
    ){
            callback({
                "message" : "Fail from validation."
            })
    }
    else{

        var obj = {
            user_type : user_type,
            first_name : first_name,
            middle_name : middle_name,
            last_name : last_name,
            phone_number : phone_number,
            email_id : email_id,
            nationality : nationality,
            password : hashPassword
        }

        onBoardUser.onBoardUser(obj,password)
        .then((result) => {
                console.log(result);
                callback(result);
        })

    }

}