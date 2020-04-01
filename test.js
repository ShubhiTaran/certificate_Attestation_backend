var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: 'email.gov.in',
  port:465,
  auth: {
    user: 'certauth.hted-mh@gov.in',
    pass: 'W1%dL0%aF7'
  }
});

var mailOptions = {
  from: 'certauth.hted-mh@gov.in',
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
