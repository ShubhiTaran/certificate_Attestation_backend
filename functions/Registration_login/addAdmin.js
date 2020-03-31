
const CryptoJS = require("crypto-js");
const sha256 = require('sha256');
const adminDetails = require('../../models/Admin/adminDetails')
const config = require('../../config/config')
// var log4js = require('log4js');
// var log = log4js.getLogger("app");


const addAdmin = async() =>{ 
    let adminData = config['addminData'];
    const password = adminData['password'];
    adminData['password'] = sha256(password);
    const admin_details = new adminDetails(adminData);
     admin_details.save().then((result) =>{
        printConsole('admin successfully added');

     })
     .catch((err) =>{
        if(err['code'] == 11000){
            printConsole('admin already exist.')
        }
     })

     function printConsole(status){
        console.log(status)
      //   log.info(status);
        console.log(`admin mailid ${adminData['email_id']}`)
        console.log(`admin password ${password}`)
     }

}
// addAdmin()
module.exports = addAdmin


// passwordcheck()
// function passwordcheck(){
//     let password = "U2FsdGVkX1/PTZrZZyW8XQF+Wl5oUTJV2ZcSRRw0k9U=";
//     let original = CryptoJS.AES.decrypt(password.toString(), 'Rpqb$2018');
//     password = bytes_password.toString(CryptoJS.enc.Utf8);
//     const hashPassword = sha256(password);
//     // let original = CryptoJS.AES.decrypt( password, 'Rpqb$2018');
//     console.log(original)
// }