"use strict"

// var SHA256 = require("crypto-js/sha256");
const crypto = require('crypto');
const image2base64 = require('image-to-base64');
const student_db = require('../models/student/studentDetails');
const invoke = require('../fabcar/javascript/invoke')
const query = require('../fabcar/javascript/query')

module.exports = {
    hashConvertion, univercityCheck, encription
}

async function hashConvertion(application_no) {

    return new Promise(async (resolve, reject) => {

        student_db.findOne({ "application_form.application_no": application_no}, {_id: 0, 'application_form.$': 1})
            .then((data) => {
                let attestation_docs = data['application_form'][0]['attestation_docs']
                console.log('attestation_docs', attestation_docs)
                let hash = []
                attestation_docs.map((obj) => {
                    let file_path = "./" + obj['certificate_photo']
                    image2base64(file_path)
                        .then((base64) => {
                            // console.log('base64', base64)
                            return crypto.createHash('md5').update(base64).digest('hex');
                        })
                        .then( async (convert_hash) => {
                            hash.push(convert_hash)
                        })
                })
                resolve({ "hash": hash, status: true })
               
            })
            .catch((error) => {
                reject({ status: false, error })
            })
    })
}



function univercityCheck(hash) {

    return new Promise(async (resolve, reject) => {
        let getHash = await query.main(hash)
        if(getHash.includes('does not exist')){
          return resolve({status: false, message:'no data is here' })
        }
        let hashData =  JSON.parse(getHash)
        console.log("hashData", hashData)
       let getDeputy = await query.main('pkregistry')
       console.log("getDeputy", getDeputy)
        let deputyList = JSON.parse(getDeputy)

        let encrypthash = hashData.encrypthash
        let date = hashData.date

        let chk = []
        deputyList.map((obj) =>{
            let pub_key = obj.pub
    
        var buffer = Buffer.from(encrypthash, "base64");
        try {          
            var decrypted = crypto.publicDecrypt(pub_key, buffer);
            const verifyed = decrypted.toString('utf8')
            if(verifyed){
                let retData = {
                    status: true,
                    owner: obj.owner,
                    designation: obj.designation,
                    date: date
                }
                resolve(retData)
            }
          
        } catch (error) {
          
        }
        })
        resolve({status: false, message:'no data is here' })
    })
}



async function encription(arrayHash, private_key){

    // let private_key =  private_key_n.replace('-----BEGIN ENCRYPTED PRIVATE KEY-----', '-----BEGIN ENCRYPTED PRIVATE KEY-----\n')
    //                         .replace('-----END ENCRYPTED PRIVATE KEY-----', '\n-----END ENCRYPTED PRIVATE KEY-----')
    
   
    return new Promise(async (resolve, reject) => {
 
  
    let val = await arrayHash.map( async (hash, index) =>{

    let key  = hash //arrayHash[0].slice(0,10);
    // let hash = key
        var buffer = Buffer.from(hash);
        var encrypthash = crypto.privateEncrypt(private_key, buffer);
        const signature = encrypthash.toString("base64");
   let data = {
        "encrypthash": signature,
        "date": new Date()
    }

        let result =  await invoke.main(key, data)
        
        return 'result'
    })
       
    resolve(val)
})



}