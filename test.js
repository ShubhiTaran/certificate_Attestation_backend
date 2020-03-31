var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'relay.nic.in',
  auth: {
    user: 'certauth.hted-mh@gov.in',
    pass: 'W1%dL0%aF7'
  }
});

var mailOptions = {
  from: 'certauth.hted-mh@gov.in',
  to: 'sree.kannan@rapidqube.com',
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
