"use strict"

const forgotPassword = require('.././../functions/Registration_login/forgotPassword');

module.exports = {
    forgotPasswordValidation : forgotPasswordValidation,
}

function forgotPasswordValidation(req, callback){

    const email_id = req.email_id;
    const passwordId = Math.random().toString(36).substring(2, 15);
    
    if(
        !email_id ||
        !passwordId
    ){
        callback("Fail from validation.")
    }
    else{
        var credentials = {
            email_id : email_id,
            set_password_id : passwordId
        }
        forgotPassword.forgotPassword(credentials)
        .then((result) => {
            console.log(result);
            callback(result)
        })
    }
}