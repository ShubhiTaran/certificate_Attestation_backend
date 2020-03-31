const db = require('.././../models/student/studentDetails');
const admindb = require('.././../models/Admin/adminDetails');
const deskofficerdb = require('.././../models/deskOfficer/deskOfficerDetails');
const deputysecretarydb = require('.././../models/deputySecratery/deputySecretaryDetails');
const isEmpty = require('is-empty');
const sha256 = require('sha256');

module.exports = {
    changePassword: changePassword,
}

function changePassword(req, res) {
    return new Promise(async (resolve, reject) => {
        const user_id = req.user_id;
        const old_password = req.old_password;
        const oldHash = sha256(old_password);
        const password = req.password;
        const hashPassword = sha256(password);

        await db.find({
            "_id": user_id
        })
            .then((findStudent) => {
                if (isEmpty(findStudent)) {
                    deputysecretarydb.find({
                        "_id": user_id
                    })
                        .then((findDeputy) => {
                            if (isEmpty(findDeputy)) {
                                deskofficerdb.find({
                                    "_id": user_id
                                })
                                    .then((findDesk) => {
                                        if (isEmpty(findDesk)) {
                                            admindb.find({
                                                "_id": user_id
                                            })
                                                .then((findAdmin) => {
                                                    if (isEmpty(findAdmin)) {
                                                        return resolve({
                                                            "message": "User Not Found"
                                                        })
                                                    }
                                                    else {
                                                        if (oldHash == findAdmin[0].password) {
                                                            admindb.findOneAndUpdate({ "_id": user_id }, {
                                                                $set: {
                                                                    "password": hashPassword
                                                                }
                                                            }, { new: true })
                                                                .then((result) => {
                                                                    return resolve({
                                                                        "message": "success"
                                                                    })

                                                                });
                                                        }
                                                        else {
                                                            return resolve({
                                                                "message": "Old Password not matched"
                                                            })
                                                        }
                                                    }
                                                })
                                        }
                                        else {
                                            if (oldHash == findDesk[0].password) {
                                                deskofficerdb.findOneAndUpdate({ "_id": user_id }, {
                                                    $set: {
                                                        "password": hashPassword
                                                    }
                                                }, { new: true })
                                                    .then((result) => {
                                                        return resolve({
                                                            "message": "success"
                                                        })

                                                    });
                                            }
                                            else {
                                                return resolve({
                                                    "message": "Old Password not matched"
                                                });
                                            }
                                        }
                                    });
                            }
                            else {
                                if (oldHash == findDeputy[0].password) {
                                    deputysecretarydb.findOneAndUpdate({ "_id": user_id }, {
                                        $set: {
                                            "password": hashPassword
                                        }
                                    }, { new: true })
                                        .then((result) => {
                                            return resolve({
                                                "message": "success"
                                            })

                                        });
                                }
                                else {
                                    return resolve({
                                        "message": "Old Password not matched"
                                    });
                                }
                            }
                        });
                } else {
                    if (oldHash == findStudent[0].password) {
                        db.findOneAndUpdate({ "_id": user_id }, {
                            $set: {
                                "password": hashPassword
                            }
                        }, { new: true })
                            .then((result) => {
                                return resolve({
                                    "message": "success"
                                })

                            });
                    }
                    else {
                        return resolve({
                            "message": "Old Password not matched"
                        });
                    }
                }
            });
    });

}