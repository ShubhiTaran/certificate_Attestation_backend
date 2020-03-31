const mongoose = require("mongoose");

const date = new mongoose.Schema({
    date : String,
    day : String,
    date_remark : String,
    slot : [{
      slot_no : String,
      email_id: String
    }]
});

module.exports = mongoose.model("date", date);
