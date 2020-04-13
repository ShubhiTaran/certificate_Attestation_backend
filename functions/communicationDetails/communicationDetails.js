
const commDB = require('.././../models/communication/communication');
var nodemailer = require('nodemailer');
const config = require('../../config/config')
const {template}  = require('../../email_template/htmlTemplate')
var log4js = require('log4js');
var log = log4js.getLogger("app");


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
            const name = 'Hello DeskOfficer,';
            const body = `${message} You can contact to the concerned person through email ${email_id} 
                            or You can call to the concerned person at mobile no ${contact_no}`
            if(response != null){
                transporter.sendMail({
                    from : config.mail_id,
                    to : config.communicate,
                    subject : subject,
                    html:template(subject, name, body)
                },
                function(error, info){
                    if(error){
                        console.log(error)
                        log.info("Email failed", error);
                    }
                    else{
                            console.log("Email sent: " + info.response);
                            log.info('Email send: ' + info.response);
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
