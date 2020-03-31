const mongoose = require("mongoose");

const deskOfficerDetails = new mongoose.Schema({

    email_id : {
        type : String,
        unique : true,
        required : true,
        sparse : true
    },
    password : String,
    user_type : String,
    first_name : String,
    middle_name : String,
    last_name : String,
    nationality : String,
    phone_number : {
      type : Number,
      unique : true,
      required : true,
      sparse : true
    } 

});

module.exports = mongoose.model("deskOfficerDetails", deskOfficerDetails);