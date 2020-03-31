"use strict"

var removeUser = require('.././../functions/Registration_login/removeUser');
var log4js = require('log4js');
var log = log4js.getLogger("route");

module.exports = {
    removeUserValidation : removeUserValidation
}

function removeUserValidation(req, callback){

    var _id = req._id;
    var user_type = req.user_type;

    if(
        !_id ||
        !user_type
    ){
        log.info("Fail from validation.");
        callback({
            "message" : "Fail from validation."
        });
    }
    else{

        var obj = {
            _id : _id,
            user_type : user_type
        }
        removeUser.removeUser(obj)
        .then((result) => {
            console.log(result);
            callback(result);
        })

    }

}