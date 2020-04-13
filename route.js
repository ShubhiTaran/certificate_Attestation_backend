"use strict";
// ;asdjkf;aosdjf;aosdjv;aosdiv;asdov;sdovn
const moment = require("moment");

var _ = require("lodash");
const isEmpty = require("is-empty");
const dropdown = require("country-state-city").default;
var express = require('express');
var ExpressBrute = require('express-brute');
var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production



const studentRegistrationValidation = require('./validations/registrationValidation/studentRegistrationValidation');
const resetPasswordValidation = require('./validations/registrationValidation/resetPasswordValidation');
const studentLoginValidation = require('./validations/loginValidation/studentLoginValidation');
const applicationFormValidation = require('./validations/applicationForm/applicationFormValidation');
const forgotPasswordValidation = require('./validations/loginValidation/forgotPasswordValidation');
const applicationDetailValidation = require('./validations/applicationForm/applicationDetailValidation');
const firstVerificationValidation = require('./validations/verificationValidation/firstVerificationValidation');
const finalVerificationValidation = require('./validations/verificationValidation/finalVerificationValidation');
const sendOtpValidation = require('./validations/registrationValidation/sendOtpValidation');
const verifyOtpValidation = require('./validations/verifyOtpValidation');
const newApplicationValidation = require('./validations/applicationForm/newApplicationValidation');
const personalInfoValidation = require('./validations/applicationForm/personalInfoValidation');
const passportInfoVaidation = require('./validations/applicationForm/passportInfoValidation');
const contactInfoValidation = require('./validations/applicationForm/contactInfoValidation');
const email_otp_validation = require('./validations/registrationValidation/email_otp_validation');
const schedulingValidation = require('./validations/calander/schedulingValidation');
const blockDateValidation = require('./validations/calander/blockDatesValidation');
const guarantorValidation = require('./validations/applicationForm/guarantorValidation');
const currentDesignationValidation = require('./validations/applicationForm/currentDesignationValidation');
const verifyGuarantorValidation = require('./validations/applicationForm/verifyGuarantorValidation');
const submitApplicationValidation = require('./validations/applicationForm/submitApplicationValidation');
const unblockDateValidation = require('./validations/calander/unblockDateValidation');
const onBoardValidation = require('./validations/registrationValidation/onBoardValidation');
const deskOfficeDB = require('./models/deskOfficer/deskOfficerDetails');
const deputyDecretaryDB = require('./models/deputySecratery/deputySecretaryDetails');
const { hashConvertion, univercityCheck, encription } = require('./validations/hashConvertion')
const removeUserValidation = require('./validations/registrationValidation/removeUserValidation');
const datedb = require('./models/calander/date')
const universityList = require('./functions/Registration_login/universityList');
const db = require('./models/student/studentDetails');
const receipt = require('./functions/application_form/receipt');
var check = require('./validations/checkToken');
var verify_user = require('./functions/verifyUser');
var path = require("path");
const changePasswordValidation = require('./validations/loginValidation/changePasswordValidation');
const communicationValidation = require('./validations/communicationValidation/communicationValidation');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + Math.random().toString(36).substring(2, 15) + "-" + file.originalname)
    }
})

var upload = multer({ storage: storage });

var date1 = new Date();
var moment1 = moment(date1, "YYYY-M-DD HH:MM:SS");
var log4js = require('log4js');
var log = log4js.getLogger("app");

module.exports = router => {

    // router.get("/", (req, res) => {
    //     log.info("Document Attestation Automation");
    //     res.send("Document Attestation Automation");
    // });


    // This api will be use by Admin to remove (Desk officer / Deputy Secretary)

    router.post('/removeUser', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            log.info("Api name :- removeUser -- Authorization Failed");
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyAdmin(id.email_id);
            if(verify.message != "success"){
                log.info("Api name :- removeUser -- Authorization Failed");
                res.send({
                    "message": verify
                })
            }else{
            removeUserValidation.removeUserValidation(req.body, function (error, result) {
                if (error) {
                    log.info(`Api name :- removeUser -- ${error}`);
                    res.send(error)
                }
                else {
                    log.info("Api name :- removeUser -- success");
                    res.send(result)
                }
            })
        }
        }
    })

    // This api will be use by Admin to get list of Desk officer

    router.get('/getDeskOfficer', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            log.info("Api name :- getDeskOfficer -- Authorization Failed");
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyAdmin(id.email_id);
            if(verify.message != "success"){
                log.info("Api name :- getDeskOfficer -- Authorization Failed");
                res.send({
                    "message": verify
                }) 
            }else{
            deskOfficeDB.find()
                .then((result) => {
                    log.info("Api name :- getDeskOfficer -- success");
                    res.send(result)
                })
                .catch((error) => {
                    log.info(`Api name :- getDeskOfficer -- ${error}`);
                    res.send({
                        "message": "Oops something went wrong"
                    })
                })
            }
        }
    })

    // This api will be use by Admin to get list of Deputy secretary

    router.get('/getDeputySecretary', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            log.info("Api name :- getDeputySecretary -- Authorization Failed");
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyAdmin(id.email_id);
            if(verify.message != "success"){
                log.info("Api name :- getDeputySecretary -- Authorization Failed");
                res.send({
                    "message": verify
                })
            }else{
                deputyDecretaryDB.find()
                .then((result) => {
                    log.info("Api name :- getDeputySecretary -- success");
                    res.send(result)
                })
                .catch((error) => {
                    log.info(`Api name :- getDeputySecretary -- ${error}`);
                    res.send({
                        "message": "Oops something went wrong"
                    })
                })
            }
        }
    })



    router.get("/keycreation", async (req, res) => {
        const { key_gen } = require('./functions/key_generator');

        // const enrollAdmin = require('./fabcar/javascript/enrollAdmin')
        // enrollAdmin.main()

        // const registerUser = require('./fabcar/javascript/registerUser')
        // registerUser.main('user1')


        const query = require('./fabcar/javascript/query')
        let result = await query.main('pkregistry')
        // let result = await query.main('ananth1'  )
        // let conv = result.toString('utf8')
        if (result.includes('does not exist')) {
            log.info("Api name :- keycreation -- does not exist");
            res.send({ status: false })
            return
        }
        log.info("Api name :- keycreation -- success");
        res.send({
            result: JSON.parse(result)
            , status: true
        })



    })


    // This api will be used by Admin to create Desk officer and Deputy secretary

    router.post('/onBoard', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            log.info("Api name :- onBoard -- Authorization Failed");
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyAdmin(id.email_id);
            if(verify.message != "success"){
                log.info("Api name :- onBoard -- Authorization Failed");
                res.send({
                    "message": verify
                }) 
            }else{
            onBoardValidation.onBoardValidation(req.body, function (error, result) {
                if (error) {
                    log.info(`Api name :- onBoard -- ${error}`);
                    res.send(error)
                }
                else {
                    log.info("Api name :- onBoard -- success");
                    res.send(result)
                }
            })
        }
        }
    })

    // User getDetails for upload document page

    router.post('/getUploadDocs', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            log.info("Api name :- getUploadDocs -- Authorization Failed");
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyStudent(id.email_id);
            if(verify.message != "success"){
                log.info("Api name :- getUploadDocs -- Authorization Failed");
                res.send({
                    "message": verify
                }) 
            }else{
            var application_no = req.body.application_no;

            await db.findOne({ "application_form.application_no": application_no })
                .then((result) => {

                    for (var i = 0; i < result.application_form.length; i++) {
                        if (result.application_form[i].application_no == application_no) {

                            var attestation_docs = result.application_form[i].attestation_docs;
                            var visa_upload_date = result.application_form[i].visa_upload_date;
                            var visa_photo = result.application_form[i].visa_photo;
                            var affidavit_upload_date = result.application_form[i].affidavit_upload_date;
                            var affidavit_photo = result.application_form[i].affidavit_photo;
                            var callletter_photo = result.application_form[i].callletter_photo;
                            var callletter_upload_date = result.application_form[i].callletter_upload_date;

                        }
                    }
                    log.info("Api name :- getUploadDocs -- success");
                    res.send({

                        "attestation_docs": attestation_docs,
                        "visa_upload_date": visa_upload_date,
                        "visa_photo": visa_photo,
                        "affidavit_upload_date": affidavit_upload_date,
                        "affidavit_photo": affidavit_photo,
                        "callletter_photo": callletter_photo,
                        "callletter_upload_date": callletter_upload_date,
                    })

                })
                .catch((error) => {
                    log.info(`Api name :- getUploadDocs -- ${error}`);
                    res.send({
                        "message": "Oops something went wrong."
                    })
                })
            }
        }
    })

    router.use("/download", express.static(path.join(__dirname, "./public")));

    


    // User Receipt for the appointment with deputy secretary

    router.post('/getReceipt', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            log.info("Api name :- getReceipt -- Authorization Failed");
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyStudent(id.email_id);
            if(verify.message != "success"){
                log.info("Api name :- getReceipt -- Authorization Failed");
                res.send({
                    "message": verify
                }) 
            }else{
            var application_no = req.body.application_no;

            await db.findOne({ "application_form.application_no": application_no })
                .then((result) => {
                    for (var i = 0; i < result.application_form.length; i++) {
                        if (result.application_form[i].application_no == application_no) {
                            var name = result.application_form[i].full_name;
                            var father_name = result.application_form[i].father_name;
                            var mother_name = result.application_form[i].mother_name;
                            var application_number = result.application_form[i].application_no;
                            var appointment_date = result.application_form[i].appointment_date;
                            var personal_photo = result.application_form[i].personal_photo;
                            var applicant_type = result.application_form[i].applicant_type;
                            var nationality = result.application_form[i].nationality;
                            var valid_visa = result.application_form[i].valid_visa;
                            applicant_type = applicant_type.toLowerCase();
                            nationality = nationality.toLowerCase();
                        }
                    }
                    var userData = {
                        name: name,
                        father_name: father_name,
                        mother_name: mother_name,
                        application_number: application_number,
                        appointment_date: appointment_date,
                        personal_photo: personal_photo,
                        applicant_type: applicant_type,
                        nationality: nationality,
                        valid_visa,
                    }
                    receipt.createReceipt(userData, function (filePath) {
                        log.info("Api name :- getReceipt -- success");
                        console.log(filePath);
                        res.send({
                            "name": name,
                            "father_name": father_name,
                            "mother_name": mother_name,
                            "application_number": application_number,
                            "appointment_date": appointment_date,
                            "meeting_address": "Higher & Technical Education Department, 4th Floor, Annexe Building, Mantralaya, Mumbai",
                            "personal_photo": personal_photo,
                            "receiptPath": name + 'Receipt.pdf'
                        })
                    })

                })
                .catch((error) => {
                    log.info(`Api name :- getReceipt -- ${error}`);
                    res.send({
                        "message": "Oops something went wrong"
                    })
                })
            }
        }
    })

    // This api will give you information about the user current Designation

    router.post('/getCurrentDesignation', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            log.info("Api name :- getCurrentDesignation -- Authorization Failed");
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyStudent(id.email_id);
            if(verify.message != "success"){
                log.info("Api name :- getCurrentDesignation -- Authorization Failed");
                res.send({
                    "message": verify
                }) 
            }else{
            var application_no = req.body.application_no;

            await db.findOne({ "application_form.application_no": application_no })
                .then((result) => {

                    for (var i = 0; i < result.application_form.length; i++) {
                        if (result.application_form[i].application_no == application_no) {
                            
                            var designation = result.application_form[i].designation;
                            var name_of_organization = result.application_form[i].name_of_organization;
                            var organization_address = result.application_form[i].organization_address;
                            var pan_card_number = result.application_form[i].pan_card_number;
                            var purpose_for_authentication = result.application_form[i].purpose_for_authentication;
                            var course = result.application_form[i].course;
                            var name_of_college = result.application_form[i].name_of_college;
                            var college_address = result.application_form[i].college_address;
                            var year_of_passing = result.application_form[i].year_of_passing;

                        }
                    }
                    // console.log(result);
                    log.info("Api name :- getCurrentDesignation -- success");
                    res.send({

                        "designation" : designation,
                        "name_of_organization": name_of_organization,
                        "organization_address": organization_address,
                        "pan_card_number": pan_card_number,
                        "purpose_for_authentication": purpose_for_authentication,
                        "course": course,
                        "name_of_college": name_of_college,
                        "college_address": college_address,
                        "year_of_passing": year_of_passing

                    })

                })
                .catch((error) => {
                    log.info(`Api name :- getCurrentDesignation -- ${error}`);
                    res.send({
                        "message": "Oops something went wrong."
                    })
                })
            }
        }
    })

    // Image to hash convertion

    router.post('/hashConvertion', async (req, res) => {

        let application_no = req.body.application_no
        let private_key = req.body.private_key

        hashConvertion(application_no)
            .then((result) => {
                let arrayHash = result.hash
                encription(arrayHash, private_key)
                    .then((result) => {
                        log.info("Api name :- hashConvertion -- success");
                        res.send({ arrayHash, result })
                    })
                    .catch((error) => {
                        log.info(`Api name :- hashConvertion -- ${error}`);
                        res.send({ status: false, error })
                    })
            })
            .catch((error) => {
                log.info(`Api name :- hashConvertion -- ${error}`);
                res.send({ error })
            })

    })

    // Check the image is there in block chain or not

    router.post('/univercityCheck', async (req, res) => {
        let hash = req.body.hash;

        univercityCheck(hash)
            .then((result) => {
                log.info("Api name :- univercityCheck -- success");
                res.send(result)
            })
            .catch((error) => {
                log.info(`Api name :- univercityCheck -- ${error}`);
                res.send({ status: false, error })
            })
    })

    // This api will give information about the user gurantor

    router.post('/getGuarantorInfo', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            log.info("Api name :- getGuarantorInfo -- Authorization Failed");
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyStudent(id.email_id);
            if(verify.message != "success"){
                log.info("Api name :- getGuarantorInfo -- Authorization Failed");
                res.send({
                    "message": verify
                }) 
            }else{
            var application_no = req.body.application_no;

            await db.findOne({ "application_form.application_no": application_no })
                .then((result) => {

                    for (var i = 0; i < result.application_form.length; i++) {
                        if (result.application_form[i].application_no == application_no) {

                            var guarantor_name = result.application_form[i].guarantor_name;
                            var guarantor_country = result.application_form[i].guarantor_country;
                            var guarantor_state = result.application_form[i].guarantor_state;
                            var guarantor_city = result.application_form[i].guarantor_city;
                            var guarantor_house_no = result.application_form[i].guarantor_house_no;
                            var guarantor_street_no = result.application_form[i].guarantor_street_no;
                            var guarantor_contact = result.application_form[i].guarantor_contact;
                            var guarantor_pincode = result.application_form[i].guarantor_pincode;
                            var guarantor_status = result.application_form[i].guarantor_status;
                        }
                    }
                    log.info("Api name :- getGuarantorInfo -- success");
                    res.send({

                        "guarantor_name": guarantor_name,
                        "guarantor_country": guarantor_country,
                        "guarantor_state": guarantor_state,
                        "guarantor_city": guarantor_city,
                        "guarantor_house_no": guarantor_house_no,
                        "guarantor_street_no": guarantor_street_no,
                        "guarantor_contact": guarantor_contact,
                        "guarantor_pincode": guarantor_pincode,
                        "guarantor_status": guarantor_status,
                    })

                })
                .catch((error) => {
                    log.info(`Api name :- getGuarantorInfo -- ${error}`);
                    res.send({
                        "message": "Oops something went wrong."
                    })
                })
            }
        }
    })

    // This api will give informarion about the user contact information

    router.post('/getContactInfo', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyStudent(id.email_id);
            if(verify.message != "success"){
                log.info("Api name :- getContactInfo -- Authorization Failed");
                res.send({
                    "message": verify
                }) 
            }else{
            var application_no = req.body.application_no;

            await db.findOne({ "application_form.application_no": application_no })
                .then((result) => {

                    for (var i = 0; i < result.application_form.length; i++) {
                        if (result.application_form[i].application_no == application_no) {

                            var present_country = result.application_form[i].present_country;
                            var present_state = result.application_form[i].present_state;
                            var present_city = result.application_form[i].present_city;
                            var present_house_no = result.application_form[i].present_house_no;
                            var present_street_no = result.application_form[i].present_street_no;
                            var present_pincode = result.application_form[i].present_pincode;
                            var present_mobile = result.application_form[i].present_mobile;
                            var present_email_id = result.application_form[i].present_email_id;

                            var permanent_country = result.application_form[i].permanent_country;
                            var permanent_state = result.application_form[i].permanent_state;
                            var permanent_city = result.application_form[i].permanent_city;
                            var permanent_house_no = result.application_form[i].permanent_house_no;
                            var permanent_street_no = result.application_form[i].permanent_street_no;
                            var permanent_pincode = result.application_form[i].permanent_pincode;
                            var permanent_mobile = result.application_form[i].permanent_mobile;
                            var permanent_email_id = result.application_form[i].permanent_email_id;
                        }
                    }
                    log.info("Api name :- getContactInfo -- success");
                    res.send({

                        "present_country": present_country,
                        "present_state": present_state,
                        "present_city": present_city,
                        "present_house_no": present_house_no,
                        "present_street_no": present_street_no,
                        "present_pincode": present_pincode,
                        "present_mobile": present_mobile,
                        "present_email_id": present_email_id,

                        "permanent_country": permanent_country,
                        "permanent_state": permanent_state,
                        "permanent_city": permanent_city,
                        "permanent_house_no": permanent_house_no,
                        "permanent_street_no": permanent_street_no,
                        "permanent_pincode": permanent_pincode,
                        "permanent_mobile": permanent_mobile,
                        "permanent_email_id": permanent_email_id
                    })

                })
                .catch((error) => {
                    log.info(`Api name :- getContactInfo -- ${error}`);
                    res.send({
                        "message": "Oops something went wrong."
                    })
                })
            }
        }

    })

    // This api will give informarion about the User passportInfo information for the respected application

    router.post('/getPassportInfo', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyStudent(id.email_id);
            if(verify.message != "success"){
                log.info("Api name :- getPassportInfo -- Authorization Failed");
                res.send({
                    "message": verify
                }) 
            }else{
            var application_no = req.body.application_no;

            await db.findOne({ "application_form.application_no": application_no })
                .then((result) => {

                    for (var i = 0; i < result.application_form.length; i++) {
                        if (result.application_form[i].application_no == application_no) {
                            var passport_expire_date = result.application_form[i].passport_expire_date;
                            var passport_issue_place = result.application_form[i].passport_issue_place;
                            var passport_number = result.application_form[i].passport_number;
                            var passport_photo = result.application_form[i].passport_photo
                        }
                    }
                    log.info("Api name :- getPassportInfo -- success");
                    res.send({
                        "passport_expire_date": passport_expire_date,
                        "passport_issue_place": passport_issue_place,
                        "passport_number": passport_number,
                        "passport_photo": passport_photo
                    })

                })
                .catch((error) => {
                    log.info(`Api name :- getPassportInfo -- ${error}`);
                    res.send({
                        "message": "Oops something went wrong."
                    })
                })
            }
        }
    })

    // This api will give informarion about the User personal information for the respected application

    router.post('/getPersonalInfo', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyStudent(id.email_id);
            if(verify.message != "success"){
                log.info("Api name :- getPersonalInfo -- Authorization Failed");
                res.send({
                    "message": verify
                }) 
            }else{
            var application_no = req.body.application_no;

            await db.findOne({ "application_form.application_no": application_no })
                .then((result) => {

                    for (var i = 0; i < result.application_form.length; i++) {
                        if (result.application_form[i].application_no == application_no) {
                            var full_name = result.application_form[i].full_name;
                            var father_name = result.application_form[i].father_name;
                            var mother_name = result.application_form[i].mother_name;
                            var nationality = result.application_form[i].nationality;
                            var date_of_birth = result.application_form[i].date_of_birth;
                            var sex = result.application_form[i].sex;
                            var applicant_type = result.application_form[i].applicant_type;
                            var relationship_with_applicant = result.application_form[i].relationship_with_applicant;
                            var personal_photo = result.application_form[i].personal_photo;
                            var valid_visa = result.application_form[i].valid_visa
                            var signature_photo = result.application_form[i].signature_photo;
                        }
                    }
                    log.info("Api name :- getPersonalInfo -- success");
                    res.send({
                        "full_name": full_name,
                        "father_name": father_name,
                        "mother_name": mother_name,
                        "nationality": nationality,
                        "date_of_birth": date_of_birth,
                        "sex": sex,
                        "applicant_type": applicant_type,
                        "relationship_with_applicant": relationship_with_applicant,
                        "personal_photo": personal_photo,
                        "valid_visa":valid_visa,
                        "signature_photo": signature_photo
                    })

                })
                .catch((error) => {
                    log.info(`Api name :- getPersonalInfo -- ${error}`);
                    res.send({
                        "message": "Oops something went wrong."
                    })
                })
            }
        }

    })
    // This api will be used by Desk Officer for the unblocking dates

    router.post('/unblockDate', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            log.info("Api name :- unblockDate -- Authorization Failed");
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyDeskOfficer(id.email_id);
            if(verify.message != "success"){
                log.info("Api name :- unblockDate -- Authorization Failed");
                res.send({
                    "message": verify
                }) 
            }else{
            unblockDateValidation.unblockDateValidation(req.body, function (error, result) {
                if (error) {
                    log.info(`Api name :- unblockDate -- ${error}`);
                    res.send(error)
                }
                else {
                    log.info("Api name :- unblockDate -- success");
                    res.send(result)
                }
            })
        }
        }

    })

    // This api will be used by User for submitting application

    router.post('/submitApplication', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyStudent(id.email_id);
            log.info("Api name :- submitApplication -- Authorization Failed");
            if(verify.message != "success"){
                res.send({
                    "message": verify
                }) 
            }else{
            submitApplicationValidation.submitApplicationValidation(req.body, function (error, result) {
                if (error) {
                    log.info(`Api name :- submitApplication -- ${error}`);
                    res.send(error)
                }
                else {
                    log.info("Api name :- submitApplication -- success");
                    res.send(result)
                }
            })
        }
        }
    })

    // User verifies guarantor Info API  

    router.post('/verifyGuarantor', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyStudent(id.email_id);
            if(verify.message != "success"){
                log.info("Api name :- verifyGuarantor -- Authorization Failed");
                res.send({
                    "message": verify
                }) 
            }else{
            verifyGuarantorValidation.verifyGuarantorValidation(req.body, function (error, result) {
                if (error) {
                    log.info(`Api name :- verifyGuarantor -- ${error}`);
                    res.send(error)
                }
                else {
                    log.info("Api name :- verifyGuarantor -- success");
                    res.send(result)
                }
            })
        }
        }

    })

    // Remark API is used for Deputy and Desk officer

    router.post('/remark', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verifyDo = await verify_user.verifyDeskOfficer(id.email_id);
            var verifyDs = await verify_user.verifyDeputy(id.email_id);
            var verifyStudent = await verify_user.verifyStudent(id.email_id)
            if(verifyDo.message != "success" && verifyDs.message != "success" && verifyStudent.message != "success"){
                log.info("Api name :- remark -- Authorization Failed");
                res.send({
                    "message": verifyDo
                })
            }else{
            await db.findOneAndUpdate({ "application_form.application_no": req.body.application_no }, {

                $set: {

                    "application_form.$.full_name_remark": req.body.full_name_remark,
                    "application_form.$.sex_remark": req.body.sex_remark,
                    "application_form.$.nationality_remark": req.body.nationality_remark,
                    "application_form.$.date_of_birth_remark": req.body.date_of_birth_remark,
                    "application_form.$.father_name_remark": req.body.father_name_remark,
                    "application_form.$.mother_name_remark": req.body.mother_name_remark,
                    "application_form.$.relationship_with_applicant_remark": req.body.relationship_with_applicant_remark,
                    "application_form.$.designation_remark": req.body.designation_remark,
                    "application_form.$.name_of_organization_remark": req.body.name_of_organization_remark,
                    "application_form.$.organization_address_remark": req.body.organization_address_remark,
                    "application_form.$.pan_card_number_remark": req.body.pan_card_number_remark,
                    "application_form.$.purpose_for_authentication_remark": req.body.purpose_for_authentication_remark,
                    "application_form.$.course_remark": req.body.course_remark,
                    "application_form.$.name_of_college_remark": req.body.name_of_college_remark,
                    "application_form.$.year_of_passing_remark": req.body.year_of_passing_remark,
                    "application_form.$.college_address_remark": req.body.college_address_remark,
                    "application_form.$.present_country_remark": req.body.present_country_remark,
                    "application_form.$.present_state_remark": req.body.present_state_remark,
                    "application_form.$.present_city_remark": req.body.present_city_remark,
                    "application_form.$.present_house_no_remark": req.body.present_house_no_remark,
                    "application_form.$.present_street_no_remark": req.body.present_street_no_remark,
                    "application_form.$.present_pincode_remark": req.body.present_pincode_remark,
                    "application_form.$.present_mobile_remark": req.body.present_mobile_remark,
                    "application_form.$.present_email_id_remark": req.body.present_email_id_remark,
                    "application_form.$.permanent_country_remark": req.body.permanent_country_remark,
                    "application_form.$.permanent_state_remark": req.body.permanent_state_remark,
                    "application_form.$.permanent_city_remark": req.body.permanent_city_remark,
                    "application_form.$.permanent_house_no_remark": req.body.permanent_house_no_remark,
                    "application_form.$.permanent_street_no_remark": req.body.permanent_street_no_remark,
                    "application_form.$.permanent_pincode_remark": req.body.permanent_pincode_remark,
                    "application_form.$.permanent_mobile_remark": req.body.permanent_mobile_remark,
                    "application_form.$.permanent_email_id_remark": req.body.permanent_email_id_remark,
                    "application_form.$.guarantor_name_remark": req.body.guarantor_name_remark,
                    "application_form.$.guarantor_country_remark": req.body.guarantor_country_remark,
                    "application_form.$.guarantor_state_remark": req.body.guarantor_state_remark,
                    "application_form.$.guarantor_city_remark": req.body.guarantor_city_remark,
                    "application_form.$.guarantor_house_no_remark": req.body.guarantor_house_no_remark,
                    "application_form.$.guarantor_street_no_remark": req.body.guarantor_street_no_remark,
                    "application_form.$.guarantor_contact_remark": req.body.guarantor_contact_remark,
                    "application_form.$.guarantor_pincode_remark": req.body.guarantor_pincode_remark,
                    "application_form.$.personal_photo_remark": req.body.personal_photo_remark,
                    "application_form.$.passport_photo_remark": req.body.passport_photo_remark,
                    "application_form.$.callletter_photo_remark": req.body.callletter_photo_remark,
                    "application_form.$.affidavit_photo_remark": req.body.affidavit_photo_remark,
                    "application_form.$.visa_photo_remark": req.body.visa_photo_remark,
                    "application_form.$.certificate_photo_remark": req.body.certificate_photo_remark

                }

            }, { new: true })
                .then((result) => {
                    log.info("Api name :- remark -- success");
                    res.send({
                        "message": "Remarks are submitted successfully."
                    })
                })
                .catch((error) => {
                    log.info(`Api name :- remark -- ${error}`);
                    res.send({
                        "message": "Oops something went wrong.",
                        "error": error
                    })
                })
            }
        }

    })
    
    // User Current designation API 

    router.post('/currentDesignation', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyStudent(id.email_id);
            if(verify.message != "success"){
                log.info("Api name :- currentDesignation -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            currentDesignationValidation.currentDesignationValidation(req.body, function (error, result) {

                if (error) {
                    log.info(`Api name :- currentDesignation -- ${error}`);
                    res.send(error)
                }
                else {
                    log.info("Api name :- currentDesignation -- success");
                    res.send(result);
                }

            })
        }
        }
    })

    // User guarantor details api

    router.post('/guarantorInfo', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyStudent(id.email_id);
            if(verify.message != "success"){
                log.info("Api name :- guarantorInfo -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            guarantorValidation.guarantorValidation(req.body, function (error, result) {
                if (error) {
                    log.info(`Api name :- guarantorInfo -- ${error}`);
                    res.send(error)
                }
                else {
                    log.info("Api name :- guarantorInfo -- success");
                    res.send(result)
                }
            })
        }
        }
    })

    // Desk officer block date API

    router.post('/blockDate', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyDeskOfficer(id.email_id);
            if(verify.message != "success"){
                log.info("Api name :- blockDate -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            blockDateValidation.blockDateValidation(req.body, function (error, result) {
                if (error) {
                    log.info(`Api name :- blockDate -- ${error}`);
                    res.send(error)
                }
                else {
                    log.info("Api name :- blockDate -- success");
                    res.send(result)
                }
            })
        }
        }
    })

    // get dates used by User and Desk officer 

    router.get("/getDates", async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verifyStudent = await verify_user.verifyStudent(id.email_id);
            var verifyDo = await verify_user.verifyDeskOfficer(id.email_id);
            if(verifyStudent.message != "success" && verifyDo.message != "success"){
                log.info("Api name :- getDates -- Authorization Failed");
                res.send({
                    "message": verifyStudent
                })  
            }else{
            await datedb.find()
                .then((result) => {
                    log.info("Api name :- getDates -- success");
                    res.send({
                        "message": result
                    })
                })
                .catch((error) => {
                    log.info(`Api name :- getDates -- ${error}`);
                    res.send({
                        "message": error
                    })
                })
            }
        }
    })

    // User scheduling date and time API 

    router.post('/scheduling', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyStudent(id.email_id);
            if(verify.message != "success"){
                log.info("Api name :- getDates -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            schedulingValidation.schedulingValidation(req.body, function (error, result) {
                if (error) {
                    log.info(`Api name :- scheduling -- ${error}`);
                    res.send(error)
                }
                else {
                    log.info("Api name :- scheduling -- success");
                    res.send(result)
                }
            })
        }
        }
    })


    // user profile details

    router.post('/userProfile', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyStudent(id.email_id);
            if(verify.message != "success"){
                log.info("Api name :- userProfile -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            var _id = req.body._id;

            await db.find({ "_id": _id })
                .then((result) => {
                    log.info("Api name :- userProfile -- success");
                    res.send({
                        "message": result
                    })
                })
            }
        }
    })


    // dropdown cities

    router.post('/cities', async (req, res) => {
        var state_id = req.body.state_id;
        var cities = dropdown.getCitiesOfState(state_id);
        res.send(cities)
    })

    // dropdown country code

    router.get('/countryCode', async (req, res) => {
        var countries = dropdown.getAllCountries();
        var countryCodeList = [];
        for (var i = 0; i < countries.length; i++) {
            var countryCode = countries[i].name + "-" + countries[i].phonecode;
            countryCodeList.push(countryCode)
        }
        res.send(countryCodeList)
    })

    // dropdown states

    router.post('/states', async (req, res) => {

        var country_id = req.body.country_id;
        var states = dropdown.getStatesOfCountry(country_id);

        res.send(states)
    })

    // dropdown country

    router.get('/countries', async (req, res) => {
        var countries = dropdown.getAllCountries();
        res.send(countries)
    })
    
    // email otp API

    router.post('/emailOtp', async (req, res) => {
        email_otp_validation.email_otp_validation(req.body, function (error, result) {
            if (error) {
                log.info(`Api name :- scheduling -- ${error}`);
                res.send(error)
            }
            else {
                log.info("Api name :- scheduling -- success");
                res.send(result)
            }
        })
    })

    // User contact information API

    router.post('/contactInfo', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyStudent(id.email_id);
            if(verify.message != "success"){
                log.info("Api name :- contactInfo -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            contactInfoValidation.contactInfoValidation(req.body, function (error, result) {
                if (error) {
                    log.info(`Api name :- contactInfo -- ${error}`);
                    res.send(error)
                }
                else {
                    log.info("Api name :- contactInfo -- success");
                    res.send(result)
                }
            })
        }
        }
    })

    // passport information API

    router.post("/passportInfo", async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyStudent(id.email_id);
            if(verify.message != "success"){
                log.info("Api name :- passportInfo -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            passportInfoVaidation.passportInfoVaidation(req.body, function (error, result) {
                if (error) {
                    log.info(`Api name :- passportInfo -- ${error}`);
                    res.send(error)
                }
                else {
                    log.info("Api name :- passportInfo -- success");
                    res.send(result)
                }
            })
        }
        }
    })

    // newApplication

    router.post("/newApplication", async (req, res) => {

        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyStudent(id.email_id);
            if(verify.message != "success"){
                log.info("Api name :- newApplication -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            newApplicationValidation.newApplicationValidation(req.body, function (error, result) {
                if (error) {
                    log.info(`Api name :- newApplication -- ${error}`);
                    res.send(error)
                }
                else {
                    log.info("Api name :- newApplication -- success");
                    res.send(result)
                }
            })
        }
        }
    })

    // Final leval verification

    router.post('/finalVerification', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyDeputy(id.email_id);
            if(verify.message != "success"){
                log.info("Api name :- finalVerification -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            finalVerificationValidation.finalVerificationValidation(req.body, function (error, result) {
                if (error) {
                    log.info(`Api name :- finalVerification -- ${error}`);
                    res.send(error);
                }
                else {
                    log.info("Api name :- finalVerification -- success");
                    res.send(result)
                }
            })
        }
        }

    })

    // First level verification

    router.post("/firstVerification", async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyDeskOfficer(id.email_id);
            if(verify.message != "success"){
                log.info("Api name :- firstVerification -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            firstVerificationValidation.firstVerificationValidation(req.body, function (error, result) {
                if (error) {
                    log.info(`Api name :- firstVerification -- ${error}`);
                    res.send(error)
                }
                else {
                    log.info("Api name :- firstVerification -- success");
                    res.send(result)
                }
            })
        }
        }
    })

    // Student registration

    router.post("/registration", async (req, res) => {
        studentRegistrationValidation.studentRegistrationValidation(req.body, function (error, result) {
            if (error) {
                log.info(`Api name :- registration -- ${error}`);
                res.send(error)
            }
            else {
                log.info("Api name :- registration -- success");
                res.send(result)
            }
        })
    })

    // Forgot password

    router.post("/forgotPassword", async (req, res) => {
        forgotPasswordValidation.forgotPasswordValidation(req.body, function (error, result) {
            if (error) {
                log.info(`Api name :- forgotPassword -- ${error}`);
                res.send(error)
            }
            else {
                log.info("Api name :- forgotPassword -- success");
                res.send(result)
            }
        })
    })

    // Reset and setting a password

    router.post("/resetPassword", async (req, res) => {
        resetPasswordValidation.resetPasswordValidation(req.body, function (error, result) {
            if (error) {
                log.info(`Api name :- resetPassword -- ${error}`);
                res.send(error)
            }
            else {
                log.info("Api name :- resetPassword -- success");
                res.send(result)
            }
        })
    })


    // Student login

    var failCallback = function (req, res, next, nextValidRequestDate) {
        res.send({
            "message":"You've made too many failed attempts in a short period of time, please try again "+moment(nextValidRequestDate).fromNow()});
    };

    var handleStoreError = function (error) {
        log.error(error); // log this error so we can figure out what went wrong
        // cause node to exit, hopefully restarting the process fixes the problem
        throw {
            message: error.message,
            parent: error.parent
        };
    }

    var bruteforce = new ExpressBrute(store,{
        freeRetries: 10,
        minWait: 15*60*1000, // 5 minutes
        maxWait: 60*60*1000, // 1 hour,
        failCallback: failCallback,
        handleStoreError: handleStoreError
    });

    var globalBruteforce = new ExpressBrute(store, {
        freeRetries: 1000,
        attachResetToRequest: false,
        refreshTimeoutOnRequest: false,
        minWait: 25*60*60*1000, // 1 day 1 hour (should never reach this wait time)
        maxWait: 25*60*60*1000, // 1 day 1 hour (should never reach this wait time)
        lifetime: 24*60*60, // 1 day (seconds not milliseconds)
        failCallback: failCallback,
        handleStoreError: handleStoreError
    });

    router.post('/studentLogin',globalBruteforce.prevent,bruteforce.getMiddleware({
        key: function(req, res, next) {
            // prevent too many attempts for the same username
            next(req.body.email_id);
        }
    }), async (req, res) => {
        studentLoginValidation.studentLoginValidation(req.body, function (error, result) {
            if (error) {
                log.info(`Api name :- studentLogin -- ${error}`);
                res.send(error)
            }
            else {
                log.info("Api name :- studentLogin -- success");
                res.send(result)
            }
        })
    })

    // This will give list of pending application requests to desk officer

    router.get('/listOfRequests', async (req, res) => {
        console.log()
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyDeskOfficer(id.email_id);
            if(verify.message != "success"){
                log.info("Api name :- listOfRequests -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            var requestList = await db.find();
            var userLength = requestList.length;
            var listOfRequests = [];
            for (var i = 0; i < userLength; i++) {
                var applicationLength = requestList[i].application_form.length;
                for (var j = 0; j < applicationLength; j++) {
                    var application_status = requestList[i].application_form[j].application_status
                    var request = requestList[i].application_form[j].primary_status
                    var request2 = requestList[i].application_form[j].final_status
                    if (request == "Pending" && application_status == "Submitted" || request == "Pending" && application_status == "Correction") {
                        var test = requestList[i].application_form[j];
                        listOfRequests.push(test)
                    }
                }
            }
            if (isEmpty(listOfRequests)) {
                log.info("Api name :- listOfRequests -- success");
                res.send({
                    "message": "No pending requests available"
                });
            }
            else {
                log.info("Api name :- listOfRequests -- success");
                res.send({
                    "Total application requests": listOfRequests.length,
                    "All request details": listOfRequests
                })
            }
        }
        }
    })

    // List of pending request for Deputy secretary

    router.get('/listOfRequests/ds', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyDeputy(id.email_id);
            if(verify.message != "success"){
                log.info("Api name :- listOfRequests/ds -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            var requestList = await db.find();
            var userLength = requestList.length;
            var listOfRequests = [];
            for (var i = 0; i < userLength; i++) {
                var applicationLength = requestList[i].application_form.length;
                for (var j = 0; j < applicationLength; j++) {
                    var application_status = requestList[i].application_form[j].application_status;
                    var request = requestList[i].application_form[j].primary_status;
                    var request2 = requestList[i].application_form[j].final_status;
                    var appointment_date = requestList[i].application_form[j].appointment_date;
                    if (request2 == "Pending" && application_status == "Submitted" && request == "Approved" && appointment_date != null) {
                        var test = requestList[i].application_form[j];
                        listOfRequests.push(test)
                    }
                }
            }
            if (isEmpty(listOfRequests)) {
                log.info("Api name :- listOfRequests/ds -- success");
                res.send({
                    "message": "No pending requests available"
                });
            }
            else {
                log.info("Api name :- listOfRequests/ds -- success");
                res.send({
                    "Total application requests": listOfRequests.length,
                    "All request details": listOfRequests
                })
            }
        }
        }
    })

    // This gives list of approved applications to the desk officer

    router.get('/approvedRequests', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyDeskOfficer(id.email_id);
            if(verify.message != "success"){
                log.info("Api name :- approvedRequests -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            var requestList = await db.find();
            var userLength = requestList.length;
            var listOfRequests = [];
            for (var i = 0; i < userLength; i++) {
                var applicationLength = requestList[i].application_form.length;
                for (var j = 0; j < applicationLength; j++) {
                    var application_status = requestList[i].application_form[j].application_status
                    var request = requestList[i].application_form[j].primary_status
                    var request2 = requestList[i].application_form[j].final_status
                    if (request == "Approved") {
                        var test = requestList[i].application_form[j];
                        listOfRequests.push(test)
                    }
                }
            }
            if (isEmpty(listOfRequests)) {
                log.info("Api name :- approvedRequests -- success");
                res.send({
                    "message": "No requests are approved yet"
                });
            }
            else {
                log.info("Api name :- approvedRequests -- success");
                res.send({
                    "Total application requests": listOfRequests.length,
                    "All request details": listOfRequests
                })
            }
        }
        }
    })

    // This api gives all list of approved requests for Deputy secretary

    router.get('/approvedRequests/ds', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyDeputy(id.email_id);
            if(verify.message != "success"){
		        log.info("Api name :- approvedRequests/ds -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            var requestList = await db.find();
            var userLength = requestList.length;
            var listOfRequests = [];
            for (var i = 0; i < userLength; i++) {
                var applicationLength = requestList[i].application_form.length;
                for (var j = 0; j < applicationLength; j++) {
                    var application_status = requestList[i].application_form[j].application_status
                    var request = requestList[i].application_form[j].primary_status
                    var request2 = requestList[i].application_form[j].final_status
                    if (request2 == "Approved") {
                        var test = requestList[i].application_form[j];
                        listOfRequests.push(test)
                    }
                }
            }
            if (isEmpty(listOfRequests)) {
                log.info("Api name :- approvedRequests/ds -- success");
                res.send({
                    "message": "No requests are approved yet"
                });
            }
            else {
                log.info("Api name :- approvedRequests/ds -- success");
                res.send({
                    "Total application requests": listOfRequests.length,
                    "All request details": listOfRequests
                })
            }
        }
        }
    })

    // This list gives rejected list of application requests for DO

    router.get('/rejectedRequests', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyDeskOfficer(id.email_id);
            if(verify.message != "success"){
		        log.info("Api name :- rejectedRequests -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            var requestList = await db.find();
            var userLength = requestList.length;
            var listOfRequests = [];
            for (var i = 0; i < userLength; i++) {
                var applicationLength = requestList[i].application_form.length;
                for (var j = 0; j < applicationLength; j++) {
                    var application_status = requestList[i].application_form[j].application_status;
                    var request = requestList[i].application_form[j].primary_status
                    var request2 = requestList[i].application_form[j].final_status

                    if (request == "Rejected") {
                        var test = requestList[i].application_form[j];
                        listOfRequests.push(test)
                    }
                }
            }
            if (isEmpty(listOfRequests)) {
                log.info("Api name :- rejectedRequests -- success");
                res.send({
                    "message": "No requests are rejected yet"
                });
            }
            else {
                log.info("Api name :- rejectedRequests -- success");
                res.send({
                    "Total application requests": listOfRequests.length,
                    "All request details": listOfRequests
                })
            }
        }
        }
    })


    // All rejected requests list for Deputy secretary

    router.get('/rejectedRequests/ds', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyDeputy(id.email_id);
            if(verify.message != "success"){
			    log.info("Api name :- rejectedRequests/ds -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            var requestList = await db.find();
            var userLength = requestList.length;
            var listOfRequests = [];
            for (var i = 0; i < userLength; i++) {
                var applicationLength = requestList[i].application_form.length;
                for (var j = 0; j < applicationLength; j++) {
                    var application_status = requestList[i].application_form[j].application_status
                    var request = requestList[i].application_form[j].primary_status
                    var request2 = requestList[i].application_form[j].final_status

                    if (request2 == "Rejected") {
                        var test = requestList[i].application_form[j];
                        listOfRequests.push(test)
                    }
                }
            }
            if (isEmpty(listOfRequests)) {
                log.info("Api name :- rejectedRequests/ds -- success");
                res.send({
                    "message": "No requests are rejected yet"
                });
            }
            else {
                log.info("Api name :- rejectedRequests/ds -- success");
                res.send({
                    "Total application requests": listOfRequests.length,
                    "All request details": listOfRequests
                })
            }
        }
        }
    })

    // All correction requests list for Desk Officer

    router.get('/correctionRequests', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyDeskOfficer(id.email_id);
            if(verify.message != "success"){
				log.info("Api name :- correctionRequests -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            var requestList = await db.find();
            var userLength = requestList.length;
            var listOfRequests = [];
            for (var i = 0; i < userLength; i++) {
                var applicationLength = requestList[i].application_form.length;
                for (var j = 0; j < applicationLength; j++) {
                    var application_status = requestList[i].application_form[j].application_status
                    var request = requestList[i].application_form[j].primary_status
                    var request2 = requestList[i].application_form[j].final_status

                    if (request == "Correction") {
                        var test = requestList[i].application_form[j];
                        listOfRequests.push(test)
                    }
                }
            }
            if (isEmpty(listOfRequests)) {
                log.info("Api name :- correctionRequests -- success");
                res.send({
                    "message": "No requests are sent for correction yet"
                });
            }
            else {
                log.info("Api name :- correctionRequests -- success");
                res.send({
                    "Total application requests": listOfRequests.length,
                    "All request details": listOfRequests
                })
            }
        }
        }
    })


    // All correction requests list for Deputy secretary

    router.get('/correctionRequests/ds', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyDeputy(id.email_id);
            if(verify.message != "success"){
				log.info("Api name :- correctionRequests/ds -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            var requestList = await db.find();
            var userLength = requestList.length;
            var listOfRequests = [];
            for (var i = 0; i < userLength; i++) {
                var applicationLength = requestList[i].application_form.length;
                for (var j = 0; j < applicationLength; j++) {
                    var application_status = requestList[i].application_form[j].application_status
                    var request = requestList[i].application_form[j].primary_status
                    var request2 = requestList[i].application_form[j].final_status

                    if (request2 == "Correction") {
                        var test = requestList[i].application_form[j];
                        listOfRequests.push(test)
                    }
                }
            }
            if (isEmpty(listOfRequests)) {
                log.info("Api name :- correctionRequests/ds -- success");
                res.send({
                    "message": "No requests are sent for correction yet"
                });
            }
            else {
                log.info("Api name :- correctionRequests/ds -- success");
                res.send({
                    "Total application requests": listOfRequests.length,
                    "All request details": listOfRequests
                })
            }
        }
        }
    })



    // All Application requests for user

    router.post('/allRequests/user', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyStudent(id.email_id);
            if(verify.message != "success"){
				log.info("Api name :- allRequests/user -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            var _id = req.body._id;
            var requestList = await db.find({
                "_id": _id
            });
            var userLength = requestList.length;
            console.log(userLength)
            var listOfRequests = [];
            for (var i = 0; i < userLength; i++) {
                var applicationLength = requestList[i].application_form.length;
                console.log(applicationLength);
                for (var j = 0; j < applicationLength; j++) {
                    if (requestList[i].application_form[j].application_status == "Submitted" || requestList[i].application_form[j].application_status == "Pending" || requestList[i].application_form[j].application_status == "Correction" || requestList[i].application_form[j].application_status == "Closed") {
                        var test = requestList[i].application_form[j];
                        console.log(test);
                        listOfRequests.push(test)
                    }
                }
            }
            if (isEmpty(listOfRequests)) {
                log.info("Api name :- allRequests/user -- success");
                res.send({
                    "message": "No requests yet"
                });
            }
            else {
                log.info("Api name :- allRequests/user -- success");
                res.send({
                    "Total_application_requests": listOfRequests.length,
                    "All_request_details": listOfRequests
                })
            }
        }
        }
    })


    // All requests for DO / Deputy Secratery

    router.get('/allRequests', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verifyDo = await verify_user.verifyDeskOfficer(id.email_id);
            var verifyDs = await verify_user.verifyDeputy(id.email_id);
            if(verifyDo.message != "success" && verifyDs.message != "success"){
                log.info("Api name :- allRequests -- Authorization Failed");
                res.send({
                    "message": verifyDo
                }) 
            }else{
            var requestList = await db.find();
            var userLength = requestList.length;
            var listOfRequests = [];
            for (var i = 0; i < userLength; i++) {
                var applicationLength = requestList[i].application_form.length;
                for (var j = 0; j < applicationLength; j++) {
                    if (requestList[i].application_form[j].application_status == "Submitted" || requestList[i].application_form[j].application_status == "Correction" || requestList[i].application_form[j].application_status == "Closed") {
                        var test = requestList[i].application_form[j];
                        listOfRequests.push(test)
                    }


                }
            }
            if (isEmpty(listOfRequests)) {
                log.info("Api name :- allRequests -- success");
                res.send({
                    "message": "No requests yet"
                });
            }
            else {
                log.info("Api name :- allRequests -- success");
                res.send({
                    "Total application requests": listOfRequests.length,
                    "All request details": listOfRequests
                })
            }
        }
    }
    })

    // View Application Details to User, desk officer, Deputy Secretary  for Approval, Rejection, Correction

    router.post('/requestDetail', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verifyDo = await verify_user.verifyDeskOfficer(id.email_id);
            var verifyDs = await verify_user.verifyDeputy(id.email_id);
            var verifyStudent = await verify_user.verifyStudent(id.email_id);
            if(verifyDo.message != "success" && verifyDs.message != "success" && verifyStudent.message != "success"){
                log.info("Api name :- requestDetail -- Authorization Failed");
                res.send({
                    "message": verifyDo
                }) 
            }else{
            applicationDetailValidation.applicationDetailValidation(req.body, function (error, result) {
                if (error) {
                    log.info(`Api name :- requestDetail -- ${error}`);
                    res.send(error)
                }
                else {
                    log.info("Api name :- requestDetail -- success");
                    res.send(result)
                }
            })
        }
        }
    })

    // Application photo image

    router.post('/personalInfo', upload.single('personal_photo'), async (req, res, next) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyStudent(id.email_id);
            if(verify.message != "success"){
				log.info("Api name :- personalInfo -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            var application_no = req.body.application_no;
            var applicant_type = req.body.applicant_type;
            var full_name = req.body.full_name;
            var sex = req.body.sex;
            var date_of_birth = req.body.date_of_birth;
            var father_name = req.body.father_name;
            var mother_name = req.body.mother_name;
            var nationality = req.body.nationality;
            var relationship_with_applicant = req.body.relationship_with_applicant;
            var personal_photo_status = req.body.personal_photo_status;
            var personal_photo = req.file.path;
            var valid_visa = req.body.valid_visa;
            // var signature_photo = req.files['signature_photo'][0].path;

            console.log(application_no);
            console.log(applicant_type);
            console.log(full_name);
            console.log(sex);
            console.log(date_of_birth);
            console.log(father_name);
            console.log(mother_name);
            console.log(nationality);
            console.log(relationship_with_applicant);
            console.log(personal_photo_status);
            console.log(personal_photo)
            // console.log(signature_photo_status);
            // console.log(signature_photo)

            if (!application_no ||
                !full_name ||
                !sex ||
                !date_of_birth ||
                !father_name ||
                !mother_name ||
                !nationality ||
                !applicant_type ||
                !personal_photo 
                // !signature_photo

            ) {
                res.send({
                    "message": "fail"
                })
            }
            else {
                await db.findOneAndUpdate({ "application_form.application_no": application_no }, {
                    $set: {
                        "application_form.$.full_name": full_name,
                        "application_form.$.sex": sex,
                        "application_form.$.nationality": nationality,
                        "application_form.$.date_of_birth": date_of_birth,
                        "application_form.$.father_name": father_name,
                        "application_form.$.mother_name": mother_name,
                        "application_form.$.relationship_with_applicant": relationship_with_applicant,
                        "application_form.$.personal_photo": personal_photo,
                        "application_form.$.personal_photo_status": true,
                        // "application_form.$.signature_photo": signature_photo,
                        "application_form.$.signature_photo_status": true,
                        "application_form.$.applicant_type": applicant_type,
                        "application_form.$.valid_visa": valid_visa,
                        "application_form.$.full_name_remark": null,
                        "application_form.$.sex_remark": null,
                        "application_form.$.nationality_remark": null,
                        "application_form.$.date_of_birth_remark": null,
                        "application_form.$.father_name_remark": null,
                        "application_form.$.mother_name_remark": null,
                        "application_form.$.relationship_with_applicant_remark": null,
                        "application_form.$.personal_photo_remark": null,
                        "application_form.$.signature_photo_remark": null,

                    }
                }, { new: true })
                    .then((result) => {
                        var test = result.application_form.length;
                        for (var i = 0; i < test; i++) {
                            if (result.application_form[i].application_no == application_no) {
                                var app_no = result.application_form[i].application_no;
                            }
                        }
                        log.info("Api name :- personalInfo -- success");
                        res.send({
                            "message": app_no
                        })
                    })
                    .catch(error => {
                        log.info(`Api name :- personalInfo -- ${error}`);
                        res.send({
                            "message": "Oops something went wrong."
                        })
                    })
            }
        }
        }
    })

    // Passport photo upload

    router.post('/passportImage', upload.single('passport_photo'), async (req, res, next) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyStudent(id.email_id);
            if(verify.message != "success"){
				log.info("Api name :- passportImage -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            console.log(req.body._id);
            console.log(req.file.path)
            let application_no = req.body.application_no;
            var passport_number = req.body.passport_number;
            var passport_issue_place = req.body.passport_issue_place;
            var passport_expire_date = req.body.passport_expire_date;
            var passport_path = req.file.path;

            if (
                !passport_number ||
                !passport_issue_place ||
                !passport_expire_date ||
                !passport_path
            ) {
                res.send({
                    "message": "Please provide all values."
                })
            }
            else {
                await db.findOneAndUpdate({ "application_form.application_no": application_no }, {
                    $set: {
                        'application_form.$.passport_number': passport_number,
                        'application_form.$.passport_issue_place': passport_issue_place,
                        'application_form.$.passport_expire_date': passport_expire_date,
                        'application_form.$.passport_photo': passport_path,
                        'application_form.$.passport_photo_status': true,
                        'application_form.$.passport_photo_remark': null,
                    }
                }, { new: true })
                    .then((result) => {
                        var test = result.application_form.length;
                        for (var i = 0; i < test; i++) {
                            if (result.application_form[i].application_no == application_no) {
                                var app_no = result.application_form[i].application_no;
                            }
                        }
                        log.info("Api name :- passportImage -- success");
                        res.send({
                            "message": app_no
                        })
                    })
                    .catch(error => {
                        log.info(`Api name :- passportImage -- ${error}`);
                        res.send({
                            "message": "Oops something went wrong."
                        })
                    })
            }
        }
        }
    })

    // Call later from institute upload

    router.post('/callletterImage', upload.single('callletter_photo'), async (req, res, next) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyStudent(id.email_id);
            if(verify.message != "success"){
				log.info("Api name :- callletterImage -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            console.log(req.body._id);
            console.log(req.file.path);
            let application_no = req.body.application_no;
            await db.findOneAndUpdate({ "application_form.application_no": application_no }, {
                $set: {
                    'application_form.$.callletter_photo': req.file.path,
                    'application_form.$.callletter_photo_status': true,
                    'application_form.$.callletter_photo_remark': null
                }
            }, { new: true })
                .then((result) => {
                    log.info("Api name :- callletterImage -- success");
                    res.send({
                        "message": "success"
                    })
                })
                .catch(error => {
                    log.info(`Api name :- callletterImage -- ${error}`);
                    res.send({
                        "message": "Oops something went wrong."
                    })
                })
            }
        }
    })

    // Affidavit photo upload

    router.post('/affidavitImage', upload.single('affidavit_photo'), async (req, res, next) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyStudent(id.email_id);
            if(verify.message != "success"){
				log.info("Api name :- affidavitImage -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            console.log(req.body._id);
            console.log(req.file.path)
            let application_no = req.body.application_no;
            await db.findOneAndUpdate({ "application_form.application_no": application_no }, {
                $set: {
                    'application_form.$.affidavit_photo': req.file.path,
                    'application_form.$.affidavit_photo_status': true,
                    'application_form.$.affidavit_photo_remark': null
                }
            }, { new: true })
                .then((result) => {
                    log.info("Api name :- affidavitImage -- success");
                    res.send({
                        "message": "success"
                    })
                })
                .catch(error => {
                    log.info(`Api name :- affidavitImage -- ${error}`);
                    res.send({
                        "message": "Oops something went wrong."
                    })
                })
            }
        }
    })

    // Visa photo upload

    router.post('/visaImage', upload.single('visa_photo'), async (req, res, next) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyStudent(id.email_id);
            if(verify.message != "success"){
				log.info("Api name :- visaImage -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            console.log(req.body._id);
            console.log(req.file.path)
            let application_no = req.body.application_no;
            await db.findOneAndUpdate({ "application_form.application_no": application_no }, {
                $set: {
                    'application_form.$.visa_photo': req.file.path,
                    'application_form.$.visa_photo_status': true,
                    'application_form.$.visa_photo_remark': null
                }
            }, { new: true })
                .then((result) => {
                    log.info("Api name :- visaImage -- success");
                    res.send({
                        "message": "success"
                    })
                })
                .catch(error => {
                    log.info(`Api name :- visaImage -- ${error}`);
                    res.send({
                        "message": "Oops something went wrong."
                    })
                })
            }
        }
    })

    // Document for attestation to be uploaded

    router.post('/certificateImage', upload.single('certificate_photo'), async (req, res, next) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyStudent(id.email_id);
            if(verify.message != "success"){
				log.info("Api name :- certificateImage -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            console.log(req.body._id);
            console.log(req.file.path)
            let application_no = req.body.application_no;
            await db.findOneAndUpdate({ "application_form.application_no": application_no }, {
                $push: {
                    'application_form.$.attestation_docs': [{
                        certificate_photo: req.file.path,
                        certificate_no: req.body.certificate_no,
                        name_of_institute: req.body.name_of_institute,
                        name_of_exam: req.body.name_of_exam,
                        Type_of_Document: req.body.Type_of_Document,
                        year: req.body.year
                    }]
                },
                $set: {
                    'application_form.$.certificate_photo_status': true
                }
            }, { new: true })
                .then((result) => {
                    log.info("Api name :- certificateImage -- success");
                    res.send({
                        "message": "success"
                    })
                })
                .catch(error => {
                    log.info(`Api name :- certificateImage -- ${error}`);
                    res.send({
                        "message": "Oops something went wrong."
                    })
                })
            }
        }
    })

    // Document for attestation to be deleted

    router.post('/deleteDocument', async (req, res, next) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyStudent(id.email_id);
            if(verify.message != "success"){
				log.info("Api name :- deleteDocument -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            let application_no = req.body.application_no;

            await db.findOneAndUpdate({ "application_form.application_no": application_no }, {
                $pull: {
                    'application_form.$.attestation_docs': {
                        certificate_no: req.body.certificate_no,
                    }
                },
            }, { new: true })
                .then((result) => {
                    for(var i = 0; i < result.application_form.length; i++){
                        if(result.application_form[i].application_no == application_no && result.application_form[i].attestation_docs.length == 0){
                            db.findOneAndUpdate({ "application_form.application_no": application_no }, {
                                $set: {
                                    'application_form.$.certificate_photo_status': false
                                },
                            }, { new: true })
                            .then((res)=>{
                                console.log("response",res);
                            })
                        }
                    }
                    log.info("Api name :- deleteDocument -- success");
                    res.send({
                        "message": "success"
                    })
                })
                .catch(error => {
                    log.info(`Api name :- deleteDocument -- ${error}`);
                    res.send({
                        "message": "Oops something went wrong."
                    })
                })
            }
        }
    });

    // Delete call letter Image

    router.post('/deleteCallLetterImage', async (req, res, next) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyStudent(id.email_id);
            if(verify.message != "success"){
				log.info("Api name :- deleteCallLetterImage -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            let application_no = req.body.application_no;
            await db.findOneAndUpdate({ "application_form.application_no": application_no }, {
                $set: {
                    'application_form.$.callletter_photo': null,
                    'application_form.$.callletter_photo_status': false,
                    'application_form.$.callletter_photo_remark': null
                }
            }, { new: true })
                .then((result) => {
                    console.log("result",result);
                    log.info("Api name :- deleteCallLetterImage -- success");
                    res.send({
                        "message": "success"
                    })
                })
                .catch(error => {
                    log.info(`Api name :- deleteCallLetterImage -- ${error}`);
                    res.send({
                        "message": "Oops something went wrong."
                    })
                })
            }
        }
    })

    // Delete affidavit Image

    router.post('/deleteAffidavitImage', async (req, res, next) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyStudent(id.email_id);
            if(verify.message != "success"){
				log.info("Api name :- deleteAffidavitImage -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            let application_no = req.body.application_no;
            await db.findOneAndUpdate({ "application_form.application_no": application_no }, {
                $set: {
                    'application_form.$.affidavit_photo': null,
                    'application_form.$.affidavit_photo_status': false,
                    'application_form.$.affidavit_photo_remark': null
                }
            }, { new: true })
                .then((result) => {
                    log.info("Api name :- deleteAffidavitImage -- success");
                    res.send({
                        "message": "success"
                    })
                })
                .catch(error => {
                    log.info(`Api name :- deleteAffidavitImage -- ${error}`);
                    res.send({
                        "message": "Oops something went wrong."
                    })
                })
            }
        }
    })

    // Delete visa Image

    router.post('/deleteVisaImage', async (req, res, next) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyStudent(id.email_id);
            if(verify.message != "success"){
				log.info("Api name :- deleteVisaImage -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            let application_no = req.body.application_no;
            await db.findOneAndUpdate({ "application_form.application_no": application_no }, {
                $set: {
                    'application_form.$.visa_photo': null,
                    'application_form.$.visa_photo_status': false,
                    'application_form.$.visa_photo_remark': null
                }
            }, { new: true })
                .then((result) => {
                    log.info("Api name :- deleteVisaImage -- success");
                    res.send({
                        "message": "success"
                    })
                })
                .catch(error => {
                    log.info(`Api name :- deleteVisaImage -- ${error}`);
                    res.send({
                        "message": "Oops something went wrong."
                    })
                })
            }
        }
    })

    router.get('/university', function (req, res) {
        universityList.university_list(function (result) {
            res.send(result);
        })
    });

    // Api for change Password for Desk Officer

    router.post('/changePassword', async function (req, res) {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            changePasswordValidation.changePasswordValidation(req.body, function (error, result) {
                if (error) {
                    log.info("Api name :- changePassword -- success");
                    res.send(error)
                }
                else {
                    log.info(`Api name :- changePassword -- ${error}`);
                    res.send(result)
                }
            })
        }
    });

    // Api for download Attested Documents

    router.post('/getAttestedDocs', async function (req, res) {
        var id = await check.checkToken(req);
        if (id.status == 400 || id.status == 403) {
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyStudent(id.email_id);
            if(verify.message != "success"){
				log.info("Api name :- getAttestedDocs -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            var _id = req.body._id;
            await db.findOne({ "_id": _id })
                .then((studentData) => {
                    var application_form = studentData.application_form;
                    var listOfDocuments = [];
                    for (var i = 0; i < application_form.length; i++) {
                        if (application_form[i].final_status == "Approved") {
                            var attestation_docs = application_form[i].attestation_docs;
                            for (var j = 0; j < attestation_docs.length; j++) {
                                var docs = attestation_docs[j];
                                listOfDocuments.push(docs);
                            }
                        }
                    }
                    log.info("Api name :- getAttestedDocs -- success");
                    res.send({

                        "attested_docs": listOfDocuments

                    })
                        
                })
                .catch((error) => {
                    log.info(`Api name :- getAttestedDocs -- ${error}`);
                    res.send({
                        "message": "Oops something went wrong."
                    })
                })
            }
        }

    });

    router.post('/communication',upload.single('file'), async function(req,res){
        communicationValidation.communicationValidation(req, function(error,result){
            if (error) {
                log.info(`Api name :- communication -- ${error}`);
                res.send(error)
            }
            else {
                log.info("Api name :- communication -- success");
                res.send(result)
            }
        });
    });

    // This api will be use to see details of individual Desk officer details

    router.post('/deskOfficeDetail', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            log.info("Api name :- deskOfficeDetail -- Authorization Failed");
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyDeskOfficer(id.email_id);
            if(verify.message != "success"){
				log.info("Api name :- deskOfficeDetail -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            deskOfficeDB.findOne({
                "_id": req.body._id
            })
                .then((result) => {
                    if (isEmpty(result)) {
                        log.info("Api name :- deskOfficeDetail -- Sorry, data is not available for selected Desk Officer.");
                        res.send({
                            "message": "Sorry, data is not available for selected Desk Officer."
                        })
                    }
                    else {
                        log.info("Api name :- deskOfficeDetail -- success");
                        res.send({
                            "message": result
                        })
                    }
                })
                .catch((error) => {
                    log.info(`Api name :- deskOfficeDetail -- ${error}`);
                    res.send({
                        "message": "Oops something went wrong"
                    })
                })
            }
        }
    })

    // This api will be use to see details of individual deputy secretary

    router.post('/deputyDetail', async (req, res) => {
        var id = await check.checkToken(req);
        console.log(id);
        if (id.status == 400 || id.status == 403) {
            log.info("Api name :- deputyDetail -- Authorization Failed");
            res.send({
                "message": id
            })
        }
        else {
            var verify = await verify_user.verifyDeputy(id.email_id);
            if(verify.message != "success"){
				log.info("Api name :- deputyDetail -- Authorization Failed");
                res.send({
                    "message": verify
                })  
            }else{
            deputyDecretaryDB.findOne({
                "_id": req.body._id
            })
                .then((result) => {
                    if (isEmpty(result)) {
                        log.info("Api name :- deputyDetail -- Sorry, data is not available for selected Desk Officer.");
                        res.send({
                            "message": "Sorry, data is not available for selected Desk Officer."
                        })
                    }
                    else {
                        log.info("Api name :- deputyDetail -- success");
                        res.send({
                            "message": result
                        })
                    }
                })
                .catch((error) => {
                    log.info(`Api name :- deputyDetail -- ${error}`);
                    res.send({
                        "message": "Oops something went wrong"
                    })
                })
            }
        }
    })

const addAdmin = require('./functions/Registration_login/addAdmin')
router.post('/addadmin', async (req, res) => {
    addAdmin()
    res.send('ok')
});

};


