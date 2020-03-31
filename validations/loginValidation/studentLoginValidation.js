"use strict"

const studentLogin = require('.././../functions/Registration_login/studentLogin');

module.exports = {
    studentLoginValidation : studentLoginValidation
}

function studentLoginValidation(req, callback){

    const email_id = req.email_id;
    const password = req.password;

    if(
        !email_id ||
        !password
    ){
        callback("Fail from validation");
    }

    else{
        var loginObject = {
            email_id : email_id,
            password : password
        }

        studentLogin.studentLogin(loginObject)
        .then((result) => {
            console.log(result);
            callback(result);
        })
    }

}