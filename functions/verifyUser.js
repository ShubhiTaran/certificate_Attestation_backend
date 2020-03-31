const db = require('../models/student/studentDetails');
const admindb = require('../models/Admin/adminDetails');
const deskofficerdb = require('../models/deskOfficer/deskOfficerDetails');
const deputysecretarydb = require('../models/deputySecratery/deputySecretaryDetails');
const isEmpty = require('is-empty');

module.exports = {
    verifyAdmin: verifyAdmin,
    verifyDeskOfficer: verifyDeskOfficer,
    verifyDeputy: verifyDeputy,
    verifyStudent: verifyStudent
}

function verifyStudent(email_id) {
    return new Promise(async (resolve, reject) => {

        await db.find({
            "email_id": email_id
        })
            .then((findStudent) => {
                if (isEmpty(findStudent)) {
                    return resolve({
                        "status": 404,
                        "message": "User Not Found"
                    });
                } else {
                    return resolve({
                        "message": "success"
                    })
                }
            });
    });

}

function verifyAdmin(email_id) {
    return new Promise(async (resolve, reject) => {
        await admindb.find({
            "email_id": email_id
        })
            .then((findAdmin) => {
                if (isEmpty(findAdmin)) {
                    return resolve({
                        "status": 404,
                        "message": "User Not Found"
                    })
                }
                else {
                    return resolve({
                        "message": "success"
                    })
                }
            })
    })
}

function verifyDeskOfficer(email_id) {
    return new Promise(async (resolve, reject) => {
        await deskofficerdb.find({
            "email_id": email_id
        })
            .then((findDesk) => {
                if (isEmpty(findDesk)) {
                    return resolve({
                        "status": 404,
                        "message": "User Not Found"
                    })
                }
                else {

                    return resolve({
                        "message": "success"
                    })


                }
            });
    })
}

function verifyDeputy(email_id) {
    return new Promise(async (resolve, reject) => {
        deputysecretarydb.find({
            "email_id": email_id
        })
            .then((findDeputy) => {
                if (isEmpty(findDeputy)) {
                    return resolve({
                        "status": 404,
                        "message": "User Not Found"
                    })
                }
                else {

                    return resolve({
                        "message": "success"
                    })


                }
            });
    });
}