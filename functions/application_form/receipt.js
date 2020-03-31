const PDFDocument = require('pdfkit');
var path = require('path');
var fs = require('fs');

let createReceipt = async function(userData,callback) {
     var imgPath = path.resolve(__dirname, '../..');
     imgPath = imgPath+'/public/gomLogo.png';
     var filePath = 'public/'+userData.name+'Receipt.pdf';
    console.log(filePath);
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filePath));
    doc.image(imgPath, 270, 5,{width: 70}).moveDown(2);
    doc.font('Times-Bold').fontSize(15).text('Receipt',{align: 'center'}).moveDown(4);
    doc.fontSize(10).text('Full Name',100, 170,{continued: true});
    doc.fontSize(10).text(':',220, 170,{continued: true});
    doc.fontSize(10).text(userData.name,280, 170,).moveDown();
    doc.fontSize(10).text('Father Name',100,200,{continued: true});
    doc.fontSize(10).text(':',209,200,{continued: true});
    doc.fontSize(10).text(userData.father_name,266,200).moveDown();
    doc.fontSize(10).text('Mother Name',100,230,{continued: true});
    doc.fontSize(10).text(':',206,230,{continued: true});
    doc.fontSize(10).text(userData.mother_name,264,230).moveDown();
    doc.fontSize(10).text('Application Number',100,260,{continued: true});
    doc.fontSize(10).text(':',179,260,{continued: true});
    doc.fontSize(10).text(userData.application_number,235,260).moveDown();
    doc.fontSize(10).text('Appointment Date',100,290,{continued: true});
    doc.fontSize(10).text(':',189,290,{continued: true});
    doc.fontSize(10).text(userData.appointment_date,247,290).moveDown();
    doc.fontSize(10).text('Meeting Address',100,320,{continued: true});
    doc.fontSize(10).text(':',195,320,{continued: true});
    doc.fontSize(10).text("Higher & Technical Education Department,",250,320).moveDown();
    doc.fontSize(10).text("4th Floor, Annexe Building, Mantralaya, Mumbai",328,330).moveDown();
    doc.font('Times-Bold').fontSize(15).text('Please Bring these Manadatory Documents',100, 380).moveDown(2);
    if(userData.applicant_type == "nri" || userData.applicant_type == "foreigner"){

        doc.fontSize(10).text("1)  University Attestation on all certificates").moveDown(2);
        doc.fontSize(10).text("2)  Attestation on all certificates by Notary").moveDown(2);
        doc.fontSize(10).text("3)  Students Passport size color photograph").moveDown(2);
        doc.fontSize(10).text("4)  Student’s Passport").moveDown(2);
        doc.fontSize(10).text("5)  Student’s old passport (delayed application for attestation, if applicant comes for certificate attestation at a later stage after going back to his/her home country)").moveDown(2);
        doc.fontSize(10).text("6)  Student’s Stay VISA/Stay VISA extension").moveDown(2);
        doc.fontSize(10).text("7)  Student’s Old Stay VISA(delayed application for attestation, if applicant comes for certificate attestation at a later stage after going back to his/her home country)").moveDown(3);
        doc.font('Times-Bold').fontSize(8).text('Important:',{continued: true});
        doc.font('Times-Roman').fontSize(8).text("Please note that Home Department Stamp is not mandatory for online submission of documents. However, the documents should be verified by Home Department before submitting to Higher & Technical Education Department for physical verification.");  

    }else if(userData.applicant_type == "indian"){

        doc.fontSize(10).text("1)  Board /University Attestation on all certificates").moveDown(2);
        doc.fontSize(10).text("2)  Attestation on all certificates by Notary").moveDown(2);
        doc.fontSize(10).text("3)  Students Passport size color photograph").moveDown(2);
        doc.fontSize(10).text("4)  Student’s Passport").moveDown(2);
        doc.fontSize(10).text("5)  Student’s VISA / Declaration letter mentioning VISA to be obtained in future for Higher Education").moveDown(2);
        doc.fontSize(10).text("6)  Offer letter by Foreign University").moveDown(3);
        doc.font('Times-Bold').fontSize(8).text('Important:',{continued: true});
        doc.font('Times-Roman').fontSize(8).text("Please note that Home Department Stamp is not mandatory for online submission of documents. However, the documents should be verified by Home Department before submitting to Higher & Technical Education Department for physical verification.");

    }else if(userData.applicant_type == "behalf" && userData.nationality == "india"){

        doc.fontSize(10).text("1)  Board /University Attestation on all certificates").moveDown(2);
        doc.fontSize(10).text("2)  Attestation on all certificates by Notary").moveDown(2);
        doc.fontSize(10).text("3)  Students Passport size color photograph").moveDown(2);
        doc.fontSize(10).text("4)  Student’s Passport").moveDown(2);
        doc.fontSize(10).text("5)  Student’s VISA / Declaration letter mentioning VISA to be obtained in future for Higher Education").moveDown(2);
        doc.fontSize(10).text("6)  Offer letter by Foreign University").moveDown(2);
        doc.fontSize(10).text("7)  Authority letter on Rs.100 stamp paper (with photograph of candidate and authority").moveDown(2);
        doc.fontSize(10).text("8)  Photo ID proof of authorized person").moveDown(2);
        doc.fontSize(10).text("9)  Passport size color photograph of Authorized person").moveDown(3);
        doc.font('Times-Bold').fontSize(8).text('Important:',{continued: true});
        doc.font('Times-Roman').fontSize(8).text("Please note that Home Department Stamp is not mandatory for online submission of documents. However, the documents should be verified by Home Department before submitting to Higher & Technical Education Department for physical verification.");

    }else if(userData.applicant_type == "behalf" && userData.nationality != "india"){

        doc.fontSize(10).text("1)  University Attestation on all certificates").moveDown(2);
        doc.fontSize(10).text("2)  Attestation on all certificates by Notary").moveDown(2);
        doc.fontSize(10).text("3)  Students Passport size color photograph").moveDown(2);
        doc.fontSize(10).text("4)  Student’s Passport").moveDown(2);
        doc.fontSize(10).text("5)  Student’s old passport (delayed application for attestation, if applicant comes for certificate attestation at a later stage after going back to his/her home country)").moveDown(2);
        doc.fontSize(10).text("6)  Student’s Stay VISA/Stay VISA extension").moveDown(2);
        doc.fontSize(10).text("7)  Student’s Old Stay VISA(delayed application for attestation, if applicant comes for certificate attestation at a later stage after going back to his/her home country)").moveDown(2);
        doc.fontSize(10).text("8)  Authority letter on Rs. 100 Stamp Paper (with photograph of candidate and authority)").moveDown(2);
        doc.fontSize(10).text("9)  Photo ID proof of authorized person").moveDown(2);
        doc.fontSize(10).text("10) Passport size color photograph of Authorized person").moveDown(2);
        doc.fontSize(10).text("11) Mail/ courier transaction proof").moveDown(3);
        doc.font('Times-Bold').fontSize(8).text('Important:',{continued: true});
        doc.font('Times-Roman').fontSize(8).text("Please note that Home Department Stamp is not mandatory for online submission of documents. However, the documents should be verified by Home Department before submitting to Higher & Technical Education Department for physical verification.");
        
    }
    doc.end();

    callback (filePath);
}

module.exports = {
    createReceipt
}