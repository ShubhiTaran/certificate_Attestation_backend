"use strict"

const datedb = require('.././../models/calander/date');

module.exports = {
    unblockDate : unblockDate
}

function unblockDate(req, res){
    return new Promise(async(resolve, reject) => {

        var date = req.date;
        var day = req.day;
        var date_remark = req.date_remark;
        var slot = req.slot;

        console.log(date);
        console.log(day);
        console.log(slot);
        console.log(date_remark);

        var res;

        await datedb.find({"date" : date})
        .then((result) => {
            console.log(slot.length)
            console.log(result[0].slot.length)
            for(var i = 0; i < slot.length; i++){
                var counter = 0;
                for(var j = 0; j < result[0].slot.length; j++){
                        if(slot[i] == result[0].slot[j].slot_no){
                            counter = counter+1;
                        }
                }
            if(counter !=0 ){
                datedb.findOneAndUpdate({"date" : date}, {
                    $pull : {
                        slot : {
                            slot_no : slot[i]
                        },
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
            }else{
                return resolve({
                    "message" : "Given List is Already unblocked"
                })  
            }
        }
        
        })
        .catch((error) => {
            return resolve({
                "message" : "Date and slot is already unblocked."
            })
        })
    })
}