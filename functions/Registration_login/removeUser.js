"use strict"

const deputyDB = require('.././../models/deputySecratery/deputySecretaryDetails');
const deskDB = require('.././../models/deskOfficer/deskOfficerDetails');
var log4js = require('log4js');
var log = log4js.getLogger("route");

module.exports = {
    removeUser : removeUser
}

function removeUser(req, res){
    return new Promise(async(resolve, reject) => {

            var _id = req._id;
            var user_type = req.user_type;

            if(user_type == "deskofficer"){

                    await deskDB.findOneAndDelete({
                        "_id" : _id
                    })
                    .then((result) => {
                        log.info("Api name :- removeUser -- Respected user is removed from the system.");
                        return resolve({
                            "message" : "Respected user is removed from the system."
                        })
                    })
                    .catch((error) => {
                        log.info(`Api name :- removeUser -- ${error}`);
                    })

            }
            else{

                await deputyDB.findOneAndDelete({
                    "_id" : _id
                })
                .then((result) => {
                    log.info("Api name :- removeUser -- Respected user is removed from the system.");
                    return resolve({
                        "message" : "Respected user is removed from the system."
                    })
                })
                .catch((error) => {
                    log.info(`Api name :- removeUser -- ${error}`);
                })

            }

    })
}