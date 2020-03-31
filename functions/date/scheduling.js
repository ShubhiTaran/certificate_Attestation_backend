"use strict"

const datedb = require("../../models/calander/date");
const db = require('.././../models/student/studentDetails')

module.exports = {
    scheduling : scheduling
}

function scheduling(req, res){
    return new Promise(async(resolve, reject) => {

        var date = req.date;
        var day = req.day;
        var slot = req.slot;
        var application_no = req.application_no;
        var user_id = req.user_id;

        console.log(date);
        console.log(day);
        console.log(slot);
        console.log(application_no);
        console.log(user_id);

        var email_id;

        
        

        await db.find({
            "_id" : user_id
        })
        .then((result) => {
            for(var i = 0; i < result.length; i++){
                if(result[i]._id == user_id){
                    email_id = result[i].email_id;
                }
            }
        });


        await datedb.find({"date" : date})
        .then((result) => {
                if(result != null){
                    var counter = 0;
                    console.log(result[0].slot.length)
                    for(var i = 0; i < result[0].slot.length; i++){
                        if(result[0].slot[i].slot_no == slot){
                        counter = counter + 1;
                        return resolve({
                            "message" : "Given slot is already booked / blocked."
                        })
                    }
                }
                    if(counter == 0){
                        datedb.findOneAndUpdate({"date" : date}, {
                            $push : {
                                slot : [{
                                    slot_no : slot,
                                    email_id : email_id
                                }]
                            }
                        })
                        .then((result) => {
                            if( slot == 1 ){
                                slot = "2:00 to 2:15"
                            }
                            else if( slot == 2 ){
                                slot = "2:15 to 2:30"
                            }
                            else if( slot == 3 ){
                                slot = "2:30 to 2:45"
                            }
                            else if(slot == 4){
                                slot = "2:45 to 3:00"
                            }
                            else if(slot == 5){
                                slot = "3:00 to 3:15"
                            }
                            else if(slot == 6){
                                slot = "3:15 to 3:30"
                            }
                            else if(slot == 7){
                                slot = "3:30 to 3:45"
                            }
                            else if(slot == 8){
                                slot = "3:45 to 4:00"
                            }
                            else if(slot == 9){
                                slot = "4:00 to 4:15"
                            }
                            else if(slot == 10){
                                slot = "4:15 to 4:30"
                            }
                            else if(slot == 11){
                                slot = "4:30 to 4:45"
                            }
                            else if(slot == 12){
                                slot = "4:45 to 5:00"
                            }

                        db.findOneAndUpdate({'application_form.application_no' : application_no}, {
                            $set : {
                                "application_form.$.appointment_date" : day+" "+date+" "+slot,
                            }
                        }, {new : true})
                        .then((res) => {

                            return resolve({
                                "message" : res
                            })

                        })
                        .catch((error) => {

                            return resolve({
                                "message" : error
                            })

                        })
             
                    })
                    .catch((error) => {
                        return resolve({
                            "message" : error
                        })
                    })
                }
            }
            
        })
        .catch((error) => {
            var obj = {
                date : date,
                day : day,
                slot : [{
                    slot_no : slot,
                    email_id : email_id
                }]
            }
            var dateObj = new datedb(obj);
            dateObj.save(function(error){
                if(error){
                    return resolve({
                        "message" : error
                    })
                 }
                else{
                    if( slot == 1 ){
                        slot = "2:00 to 2:15"
                    }
                    else if( slot == 2 ){
                        slot = "2:15 to 2:30"
                     }
                    else if( slot == 3 ){
                        slot = "2:30 to 2:45"
                    }
                    else if(slot == 4){
                        slot = "2:45 to 3:00"
                    }
                    else if(slot == 5){
                        slot = "3:00 to 3:15"
                    }
                    else if(slot == 6){
                        slot = "3:15 to 3:30"
                    }
                    else if(slot == 7){
                        slot = "3:30 to 3:45"
                    }
                    else if(slot == 8){
                        slot = "3:45 to 4:00"
                    }
                    else if(slot == 9){
                        slot = "4:00 to 4:15"
                    }
                    else if(slot == 10){
                        slot = "4:15 to 4:30"
                    }
                    else if(slot == 11){
                        slot = "4:30 to 4:45"
                    }
                    else if(slot == 12){
                        slot = "4:45 to 5:00"
                    }
                    db.findOneAndUpdate({'application_form.application_no' : application_no}, {
                        $set : {
                            "application_form.$.appointment_date" : day+" "+date+" "+slot,
                        }
                    }, {new : true})
                    .then((result) => {

                        return resolve({
                            "message" : result
                        })

                })
                .catch((error) => {

                    return resolve({
                        "message" : error
                    })

                })

            }
        })
        })
    })
}