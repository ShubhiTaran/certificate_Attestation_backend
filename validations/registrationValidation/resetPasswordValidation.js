"use strict"

const resetPassword = require(".././../functions/Registration_login/resetPassword");

module.exports = {
    resetPasswordValidation : resetPasswordValidation
}

function resetPasswordValidation(req, callback){

    const set_password_id = req.set_password_id;
    const password = req.password

    if(
        !set_password_id ||
        !password
    ){
        callback("Fail from validation");
    }
    else{
        var resetObject = {
            set_password_id : set_password_id,
            password : password
        }

        resetPassword.resetPassword(resetObject)
        .then((result) => {
            console.log(result);
            callback(result);
        })
    }

}