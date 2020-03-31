"use strict"

const applicationForm = require(".././../functions/application_form/applicationForm");

module.exports = {
    applicationFormValidation : applicationFormValidation   
}

function applicationFormValidation(req, callback){

    var application_no = req.application_no;
    var full_name = req.full_name;
    var sex = req.sex;
    var nationality = req.nationality;
    var date_of_birth = req.date_of_birth;
    var father_name = req.father_name;
    var mother_name = req.mother_name;
    var passport_number = req.passport_number;
    var passport_issue_place = req.passport_issue_place;
    var designation = req.designation;
    var name_of_organization = req.name_of_organization;
    var organization_address = req.organization_address;
    var pan_card_number = req.pan_card_number;
    var purpose_for_authentication = req.purpose_for_authentication;
    var course = req.course;
    var name_of_college = req.name_of_college;
    var college_address = req.college_address;
    var present_country = req.present_country;
    var present_state = req.present_state;
    var present_city = req.present_city;
    var present_house_no = req.present_house_no;
    var present_street_no = req.present_street_no;
    var present_pincode = req.present_pincode;
    var present_mobile = req.present_mobile;
    var permanent_country = req.permanent_country;
    var permanent_state = req.permanent_state;
    var permanent_city = req.permanent_city;
    var permanent_house_no = req.permanent_house_no;
    var permanent_street_no = req.permanent_street_no;
    var permanent_pincode = req.permanent_pincode;
    var permanent_mobile = req.permanent_mobile;
    var certificate_no = req.certificate_no;
    var name_of_exam = req.name_of_exam;
    var year = req.year;
    var name_of_institute = req.name_of_institute

    if(
        !application_no ||
        !full_name ||
        !sex ||
        !nationality ||
        !date_of_birth ||
        !father_name ||
        !mother_name ||
        !passport_number ||
        !passport_issue_place ||
        !designation ||
        !name_of_organization ||
        !organization_address ||
        !pan_card_number ||
        !purpose_for_authentication ||
        !course ||
        !name_of_college ||
        !college_address ||
        !present_country ||
        !present_state ||
        !present_city ||
        !present_house_no ||
        !present_street_no ||
        !present_pincode ||
        !present_mobile ||
        !permanent_country ||
        !permanent_state ||
        !permanent_city ||
        !permanent_house_no ||
        !permanent_street_no ||
        !permanent_pincode ||
        !permanent_mobile ||
        !certificate_no ||
        !name_of_exam ||
        !year ||
        !name_of_institute
    ){
        callback("Fail from validation.");
    }
    else if( personal_photo_status === false || 
             passport_photo_status === false ||
             certificate_photo_status <=0 
            ){
                callback({
                    "message" : "Please, fill all details and upload necessary documents."
                })
            }
    else if( applicant_type == "INDIAN" ){
        if(callletter_photo_status === false){
            callback({
                "message" : "Please, upload your call leter from university"
            });
        }
        else{
            var fillFormObject = {
                personal_photo_status : personal_photo_status,
                passport_photo_status : passport_photo_status,
                certificate_photo_status : certificate_photo_status,
                callletter_photo_status : callletter_photo_status,
                application_no : application_no,
                full_name : full_name,
                sex : sex,
                nationality : nationality,
                date_of_birth : date_of_birth,
                father_name : father_name,
                mother_name : mother_name,
                passport_number : passport_number,
                passport_issue_place : passport_issue_place,
                passport_expire_date : req.passport_expire_date,
                designation : designation,
                name_of_organization : name_of_organization,
                organization_address : organization_address,
                pan_card_number : pan_card_number,
                purpose_for_authentication : purpose_for_authentication,
                course : course,
                name_of_college : name_of_college,
                college_address : college_address,
                present_country : present_country,
                present_state : present_state,
                present_city : present_city,
                present_house_no : present_house_no,
                present_street_no : present_street_no,
                present_pincode : present_pincode,
                present_mobile : present_mobile,
                permanent_country : permanent_country,
                permanent_state : permanent_state,
                permanent_city : permanent_city,
                permanent_house_no : permanent_house_no,
                permanent_street_no : permanent_street_no,
                permanent_pincode : permanent_pincode,
                permanent_mobile : permanent_mobile,
                certificate_no : certificate_no,
                name_of_exam : name_of_exam,
                year : year,
                name_of_institute : name_of_institute
            }
    
            applicationForm.applicationForm(fillFormObject)
            .then((result) => {
                console.log(result);
                callback(result);
            })
        }
    }
    else if( applicant_type == "NRI" || applicant_type == "FOREIGNER" ){
        if(visa_photo_status === false){
            callback({
                "message" : "Please, upload scanned copy of your visa."
            })
        }
        else{
            var fillFormObject = {
                personal_photo_status : personal_photo_status,
                passport_photo_status : passport_photo_status,
                certificate_photo_status : certificate_photo_status,
                visa_photo_status : visa_photo_status,
                application_no : application_no,
                full_name : full_name,
                sex : sex,
                nationality : nationality,
                date_of_birth : date_of_birth,
                father_name : father_name,
                mother_name : mother_name,
                passport_number : passport_number,
                passport_issue_place : passport_issue_place,
                passport_expire_date : req.passport_expire_date,
                designation : designation,
                name_of_organization : name_of_organization,
                organization_address : organization_address,
                pan_card_number : pan_card_number,
                purpose_for_authentication : purpose_for_authentication,
                course : course,
                name_of_college : name_of_college,
                college_address : college_address,
                present_country : present_country,
                present_state : present_state,
                present_city : present_city,
                present_house_no : present_house_no,
                present_street_no : present_street_no,
                present_pincode : present_pincode,
                present_mobile : present_mobile,
                permanent_country : permanent_country,
                permanent_state : permanent_state,
                permanent_city : permanent_city,
                permanent_house_no : permanent_house_no,
                permanent_street_no : permanent_street_no,
                permanent_pincode : permanent_pincode,
                permanent_mobile : permanent_mobile,
                certificate_no : certificate_no,
                name_of_exam : name_of_exam,
                year : year,
                name_of_institute : name_of_institute
            }
    
            applicationForm.applicationForm(fillFormObject)
            .then((result) => {
                console.log(result);
                callback(result);
            })
        }

    }
    
    else{

        var fillFormObject = {
            application_no : application_no,
            full_name : full_name,
            sex : sex,
            nationality : nationality,
            date_of_birth : date_of_birth,
            father_name : father_name,
            mother_name : mother_name,
            passport_number : passport_number,
            passport_issue_place : passport_issue_place,
            passport_expire_date : req.passport_expire_date,
            designation : designation,
            name_of_organization : name_of_organization,
            organization_address : organization_address,
            pan_card_number : pan_card_number,
            purpose_for_authentication : purpose_for_authentication,
            course : course,
            name_of_college : name_of_college,
            college_address : college_address,
            present_country : present_country,
            present_state : present_state,
            present_city : present_city,
            present_house_no : present_house_no,
            present_street_no : present_street_no,
            present_pincode : present_pincode,
            present_mobile : present_mobile,
            permanent_country : permanent_country,
            permanent_state : permanent_state,
            permanent_city : permanent_city,
            permanent_house_no : permanent_house_no,
            permanent_street_no : permanent_street_no,
            permanent_pincode : permanent_pincode,
            permanent_mobile : permanent_mobile,
            certificate_no : certificate_no,
            name_of_exam : name_of_exam,
            year : year,
            name_of_institute : name_of_institute
        }

        applicationForm.applicationForm(fillFormObject)
        .then((result) => {
            console.log(result);
            callback(result);
        })

    }

}