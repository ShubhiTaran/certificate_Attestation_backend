"use strict"

const db = require('.././../models/student/studentDetails');
const sha256 = require('sha256');
const isEmpty = require("is-empty");

module.exports = {
    resetPassword : resetPassword
}

function resetPassword(req, res){
    return new Promise(async(resolve, reject) => {

        const set_password_id = req.set_password_id;
        const password = req.password;
        const hashPassword = sha256(password);
        console.log(set_password_id + password + hashPassword);

        var findStudent = await db.find({
            "set_password_id" : set_password_id
        });

        if(isEmpty(findStudent)){
            return resolve({
                "message" : "This link is already used you can not use it again."
            })
        }
        else{
            console.log(findStudent);

            const currentPasswordId = findStudent[0].set_password_id;
    
            if(set_password_id == currentPasswordId){
    
                const resetPassword = await db.findOneAndUpdate({"set_password_id" : set_password_id}, {
                    $set : {
    
                        password : hashPassword,
                        set_password_id : null,
    
                    }
                }, {new : true})
    
                return resolve({
                    "message" : "Your password is successfully updated."
                })
    
            }
            else{
                return resolve({
                    "message" : "This link is already used you can not use it again."
                })
            }
        }
        
    })
}