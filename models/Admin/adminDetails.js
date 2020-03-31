const mongoose = require("mongoose");

const adminDetails = new mongoose.Schema({
    password : String,
    user_type : String,
    first_name : String,
    middle_name : String,
    last_name : String,
    phone_number : {
        type : Number,
      unique : true,
      required : true,
      sparse : true
    },
    email_id : {
        type : String,
        unique : true,
        required : true,
        sparse : true
    },
});

module.exports = mongoose.model("adminDetails", adminDetails);