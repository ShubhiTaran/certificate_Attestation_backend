const mongoose = require("mongoose");

const applicationDetails = new mongoose.Schema({
    app_no: String, //app_no
    Prefixnumber : Number, // 1
    series : String,    //  HTE2020-0001
});

module.exports = mongoose.model("applicationDetails", applicationDetails);