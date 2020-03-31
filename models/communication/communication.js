const mongoose = require("mongoose");

const communicationdetails = new mongoose.Schema({
    email_id : String,
    contact_no : String,
    subject : String,
    message : String,
    file : String
});

module.exports = mongoose.model("communicationdetails", communicationdetails);