"use strict"

const db = require('.././../models/student/studentDetails');
const admindb = require('.././../models/Admin/adminDetails');
const deskofficerdb = require('.././../models/deskOfficer/deskOfficerDetails');
const deputysecretarydb = require('.././../models/deputySecratery/deputySecretaryDetails');
const isEmpty = require('is-empty');
const sha256 = require('sha256');
const jwt = require('jsonwebtoken');
let secret = 'rapidqubepvtltd';
const CryptoJS = require("crypto-js");
const config  = require('../../config/config');
module.exports = {
    studentLogin: studentLogin
}

function studentLogin(req, res) {
    return new Promise(async (resolve, reject) => {

        var email_id = req.email_id;
        // let bytes_email  = CryptoJS.AES.decrypt(email_id.toString(), 'Rpqb$2018');
        // email_id = bytes_email.toString(CryptoJS.enc.Utf8);
        console.log(email_id);
        var password = req.password;
        let bytes_password  = CryptoJS.AES.decrypt(password.toString(), 'Rpqb$2018');
        password = bytes_password.toString(CryptoJS.enc.Utf8);
        console.log('original', password);

        const hashPassword = sha256(password);
        console.log('hashPassword', hashPassword)

        await db.find({
            "email_id": email_id
        })
            .then((result) => {
                if (isEmpty(result)) {
                    deputysecretarydb.find({
                        "email_id": email_id
                    })
                        .then((response) => {
                            if (isEmpty(response)) {
                                deskofficerdb.find({
                                    "email_id": email_id
                                })
                                    .then((res) => {
                                        if (isEmpty(res)) {
                                            admindb.find({
                                                "email_id": email_id
                                            })
                                                .then((findAdmin) => {
                                                    if (isEmpty(findAdmin)) {
                                                        return resolve({
                                                            "message": "Given email id is not registered with us."
                                                        })
                                                    }
                                                    else {
                                                        for (var i = 0; i < findAdmin.length; i++) {
                                                            if (findAdmin[i].email_id == email_id) {
                                                                if (findAdmin[i].password == hashPassword) {
                                                                    let token = jwt.sign({ email_id },
                                                                        secret,
                                                                        {
                                                                            expiresIn: '300000' // expires in 24 hours
                                                                        }
                                                                    );
                                                                    return resolve({
                                                                        "_id": findAdmin[0]._id,
                                                                        "first_name": findAdmin[0].first_name,
                                                                        "registration_status": true,
                                                                        "user_type": findAdmin[0].user_type,
                                                                        "token": token
                                                                    })
                                                                }
                                                                else {
                                                                    return resolve({
                                                                        "message": "Incorrect Password"
                                                                    })
                                                                }
                                                            }
                                                        }
                                                    }
                                                })

                                        }
                                        else {
                                            for (var i = 0; i < res.length; i++) {
                                                if (res[i].email_id == email_id) {
                                                    if (res[i].password == hashPassword) {
                                                        let token = jwt.sign({ email_id },
                                                            secret,
                                                            {
                                                                expiresIn: '300000' // expires in 24 hours
                                                            }
                                                        );
                                                        return resolve({
                                                            "_id": res[i]._id,
                                                            "first_name": res[i].first_name,
                                                            "registration_status": true,
                                                            "user_type": res[i].user_type,
                                                            "token": token
                                                        })
                                                    }
                                                    else {
                                                        return resolve({
                                                            "message": "Incorrect Password"
                                                        })
                                                    }
                                                }
                                            }
                                        }
                                    })
                            }
                            else {
                                for (var i = 0; i < response.length; i++) {
                                    if (response[i].email_id == email_id) {
                                        if (response[i].password == hashPassword) {
                                            let token = jwt.sign({ email_id },
                                                secret,
                                                {
                                                    expiresIn: '300000' // expires in 24 hours
                                                }
                                            );
                                            return resolve({
                                                "_id": response[i]._id,
                                                "first_name": response[i].first_name,
                                                "registration_status": true,
                                                "user_type": response[i].user_type,
                                                "token": token
                                            })
                                        }
                                        else {
                                            return resolve({
                                                "message": "Incorrect Password"
                                            })
                                        }
                                    }
                                }
                            }
                        })
                }
                else {
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].email_id == email_id) {
                            if (result[i].password == hashPassword) {
                                let token = jwt.sign({ email_id },
                                    secret,
                                    {
                                        expiresIn: '30000000' // expires in 24 hours
                                    }
                                );
                                return resolve({
                                    "_id": result[i]._id,
                                    "first_name": result[i].first_name,
                                    "registration_status": result[i].registration_status,
                                    "user_type": "student",
                                    "token": token
                                })
                            }
                            else {
                                return resolve({
                                    "message": "Incorrect Password"
                                })
                            }
                        }
                    }
                }
            })
            .catch((error) => {
                return resolve({
                    "message": "This is error."
                })
            })
    })
}