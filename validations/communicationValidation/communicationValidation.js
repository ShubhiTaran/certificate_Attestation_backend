
const communicationDetails = require('.././../functions/communicationDetails/communicationDetails');

module.exports = {
    communicationValidation
}

function communicationValidation(req, callback){
    const email_id = req.body.email_id;
    const contact_no = req.body.contact_no;
    const subject = req.body.subject;
    const message = req.body.message;
    // const file = req.file.path;

    if(!email_id ||
       !contact_no ||
       !subject ||
       !message 
    ){
        callback("Fail from validation.")
    }
    
    var commDetails = {
        email_id : email_id,
        contact_no : contact_no,
        subject : subject,
        message : message,
        // file : file
    }
    communicationDetails.communicationDetails(commDetails)
    .then((result)=>{
        callback(result);
    });
}