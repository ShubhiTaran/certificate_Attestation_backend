"use strict"

const studentRegistration = require('.././../functions/Registration_login/registration');
const sha256 = require('sha256');
const owasp = require('owasp-password-strength-test');


module.exports = {
    studentRegistrationValidation : studentRegistrationValidation
}

function studentRegistrationValidation(req, callback){

    const firstName = req.first_name;
    const middleName = req.middle_name;
    const lastName = req.last_name;
    const gender = req.gender;
    const dob = req.dob;
    const contact_status = req.contact_status;
    const contact = req.contact;
    const emailId = req.email_id;
    const nationality = req.nationality;
    const email_otp = Math.floor(10000 + Math.random() * 900000);
    const email_choice = req.email_choice;
    const password = req.password;
    const university = req.university;
    var registration_status = false;

    console.log(req);

    if(
        !firstName ||
        !lastName ||
        !gender ||
        !dob ||
        !contact ||
        !emailId ||
        !nationality ||
        !password ||
        !university
    ){
        callback({
            "message" : "Please, fill all the details."
        });
    }
    else if(email_choice === false || email_choice == null){
        const hash_password = sha256(password)
        if(contact_status === false || contact_status==null){
            callback({
                "message" : "Please, verify your contact first"
            })   
        }
        else{
            registration_status = true
            var studentDetails = {
                first_name : firstName,
                middle_name : middleName,
                last_name : lastName,
                gender : gender,
                dob : dob,
                contact : contact,
                email_id : emailId,
                contact_status : contact_status,
                nationality : nationality,
                email_choice : email_choice,
                registration_status : registration_status,
                password : hash_password,
                university_name : university
            }
            studentRegistration.studentRegistration(studentDetails)
            .then((result) => {
                console.log(result);
                callback(result);
            })
        }
    }  
    else if(email_choice === true){
        var result = owasp.test(password);
        if(result.strong == false){
            callback({
                "message" : "Password is not a Strong Password"
            }) 
        }
        const hash_password = sha256(password)
        var studentDetails = {
            first_name : firstName,
            middle_name : middleName,
            last_name : lastName,
            gender : gender,
            dob : dob,
            contact : contact,
            email_id : emailId,
            nationality : nationality,
            email_otp : email_otp,
            email_choice : email_choice,
            registration_status : registration_status,
            password : hash_password,
            university_name : university
        }
        studentRegistration.studentRegistration(studentDetails)
        .then((result) => {
            console.log(result);
            callback(result);
        })
    }
}