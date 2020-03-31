const mongoose = require("mongoose");

const studentDetails = new mongoose.Schema({
    set_password_id : String,
    first_name : String,
    middle_name : String,
    last_name : String,
    gender : String,
    dob : String,
    email_otp : {
        type : String,
        required : true,
        sparse : true
    },
    nationality : String,
    registration_status : {
        type : Boolean,
        default : false,
    },
    email_choice : {
        type : Boolean,
        default : false
    },
    contact_status : {
        type : Boolean,
        default : false
    },
    contact : {
        type : String,
        unique : true,
        required : true
    },
    email_id : {
        type : String,
        unique : true,
        required : true
    },
    password : String,
    university_name : String,
    registration_date : {
        type : Date,
        default : Date.now,
    },
    application_form : [{
        application_status : {
            type : String,
            default: "Pending"
        },
        appointment_date : String,
        application_no : {
            type : String,
            unique : true,
            sparse : true
        },
        application_date : {
            type : Date,
            default : Date.now,
        },
        applicant_type : String,
        full_name : String,
        full_name_remark : String,
        sex : String,
        sex_remark : String,
        nationality : String,
        nationality_remark : String,
        valid_visa : String,
        date_of_birth : String,
        date_of_birth_remark : String,
        father_name : String,
        father_name_remark : String,
        mother_name : String,
        mother_name_remark : String,
        relationship_with_applicant : String,
        relationship_with_applicant_remark : String,

        designation : String,
        designation_remark : String,
        name_of_organization : String,
        name_of_organization_remark : String,
        organization_address : String,
        organization_address_remark : String,
        pan_card_number : String,
        pan_card_number_remark : String,
        purpose_for_authentication : String,
        purpose_for_authentication_remark : String,
        course : String,
        course_remark : String,
        name_of_college : String,
        name_of_college_remark : String,
        college_address : String,
        college_address_remark : String,
        year_of_passing : String,
        year_of_passing_remark : String,

        onbehalf_designation : String,
        onbehalf_designation_remark : String,
        onbehalf_name_of_organization : String,
        onbehalf_name_of_organization_remark : String,
        onbehalf_organization_address : String,
        onbehalf_organization_address_remark : String,
        onbehalf_pan_card_number : String,
        onbehalf_pan_card_number_remark : String,
        onbehalf_purpose_for_authentication : String,
        onbehalf_purpose_for_authentication_remark : String,
        onbehalf_course : String,
        onbehalf_course_remark : String,
        onbehalf_name_of_college : String,
        onbehalf_name_of_college_remark : String,
        onbehalf_college_address : String,
        onbehalf_college_address_remark : String,
        
        present_country : String,
        present_country_remark : String,
        present_state : String,
        present_state_remark : String,
        present_city :String,
        present_city_remark : String,
        present_house_no : String,
        present_house_no_remark : String,
        present_street_no : String,
        present_street_no_remark : String,
        present_pincode : Number,
        present_pincode_remark : String,
        present_mobile : String,
        present_mobile_remark : String,
        present_email_id : String,
        present_email_id_remark : String,

        
        permanent_country : String,
        permanent_country_remark : String,
        permanent_state : String,
        permanent_state_remark : String,
        permanent_city :String,
        permanent_city_remark : String,
        permanent_house_no : String,
        permanent_house_no_remark : String,
        permanent_street_no : String,
        permanent_street_no_remark : String,
        permanent_pincode : Number,
        permanent_pincode_remark : String,
        permanent_mobile : String,
        permanent_mobile_remark : String,
        permanent_email_id : String,
        permanent_email_id_remark : String,

        guarantor_status : {
            type : Boolean,
            default : false
        },
        guarantor_name : String,
        guarantor_name_remark : String,
        guarantor_country : String,
        guarantor_country_remark : String,
        guarantor_state : String,
        guarantor_state_remark : String,
        guarantor_city : String,
        guarantor_city_remark : String,
        guarantor_house_no : String,
        guarantor_house_no_remark : String,
        guarantor_street_no : String,
        guarantor_street_no_remark : String,
        guarantor_contact : String,
        guarantor_contact_remark : String,
        guarantor_pincode : String,
        guarantor_pincode_remark : String,
   
        primary_status : {
            type : String,
            default : "Pending"
        },
        final_status : {
            type : String,
            default : "Pending"
        },
        primary_reason : String,
        final_reason : String,
        personal_photo : {
            type : String
        },
        personal_photo_remark : String,
        personal_photo_status : {
            type : Boolean,
            default : false
        },
        signature_photo : {
            type : String
        },
        signature_photo_remark : String,
        signature_photo_status : {
            type : Boolean,
            default : false
        },
        passport_photo_status : {
            type : Boolean,
            default : false
        },
        
        passport_number : String,
        passport_issue_place : String,
        passport_expire_date : String,
        passport_upload_date : {
             type : Date,
                default : Date.now
            },
        passport_photo : {
                type : String
            },
        passport_photo_remark : String,
        callletter_upload_date : {
            type : Date,
            default : Date.now
        },
        callletter_photo : {
            type : String,
        },
        callletter_photo_remark : String,
        callletter_photo_status : {
            type : Boolean,
            default : false
        },
        affidavit_upload_date : {
            type : Date,
            default : Date.now
        },
        affidavit_photo : {
            type : String,
        },
        affidavit_photo_remark : String,
        affidavit_photo_status : {
            type : Boolean,
            default : false
        },
        visa_upload_date:{
            type : Date,
            default : Date.now
        },
        visa_photo : {
            type : String,
        },
        visa_photo_remark : String,
        visa_photo_status : {
            type : Boolean,
            default : false
        },
        certificate_photo_status : {
            type : Boolean,
            default : false
        },
        certificate_photo_remark : [],
        attestation_docs : [{
            certificate_photo : {
                type : String,
            }, 
            certificate_no : String,
            Type_of_Document:String,
            name_of_exam : String,
            year : Number,
            name_of_institute : String,
            certificate_upload_date : {
                type : Date,
                default : Date.now
            }
        }]
    }]
});

module.exports = mongoose.model("studentdetails", studentDetails);
