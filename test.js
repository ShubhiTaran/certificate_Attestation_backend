var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'htedu.maharashtra@gmail.com',
    pass: 'New1@2020'
  }
});

var mailOptions = {
  from: 'htedu.maharashtra@gmail.com',
  to: 'shubhi.taran@rapidqube.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
