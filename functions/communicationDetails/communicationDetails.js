
const commDB = require('.././../models/communication/communication');
var nodemailer = require('nodemailer');
const config = require('../../config/config')

module.exports = {
    communicationDetails
}

function communicationDetails(req,res){
    return new Promise(async (resolve, reject) => {

        const email_id = req.email_id;
    const contact_no = req.contact_no;
    const subject = req.subject;
    const message = req.message;
    // const file = req.file.path;

        var transporter = nodemailer.createTransport({
            host: config.mail_service,
            port:config.port,
            auth: {
                 user: config.mail_id,
                pass: config.mail_password
            }
        });

        const commObj = new commDB(req);
        await commObj.save(function (error,response){
            if(response != null){
                transporter.sendMail({
                    from : config.mail_id,
                    to : config.communicate,
                    subject : subject,
                    text : "Hello DeskOfficer,\n\n" + message +"\n\n"+
                           "You can contact to the concerned person through email :- "+email_id+"\n or \n"+
                           "You can call to the concerned person at mobile no :-"+contact_no+
                            "\n\nThank you"

                },
                function(error, info){
                    if(error){
                        console.log(error)
                    }
                    else{
                            console.log("Email sent: " + info.response);
                    }
                })
            return resolve({
                "message": "Success"
            });
            }
            else{
                return resolve({
                    "message": "Error"
                });
            }
            
        });
    });
}
