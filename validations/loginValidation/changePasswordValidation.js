
const changePassword = require('.././../functions/Registration_login/changePassword');

module.exports = {
    changePasswordValidation : changePasswordValidation,
}

function changePasswordValidation(req, callback){
    const old_password = req.old_password;
    const new_password = req.new_password;
    const user_id = req.user_id;


    if(
        !old_password ||
        !new_password
    ){
        callback("Fail from validation.")
    }
    else{
        var credentials = {
            user_id : user_id,
            old_password : old_password,
            password : new_password
        }
        changePassword.changePassword(credentials)
        .then((result) => {
            console.log(result);
            callback(result)
        })
    }
}