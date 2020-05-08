var nodemailer = require('nodemailer');
require('dotenv').config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});

// var mailOptions = {
//   from: 'shukla.1291@gmail.com',
//   to: 'er.satyavrat@gmail.com',
//   subject: 'FIRE IN YOUR ASSS!!!! :P',
//   text: 'That was easy!'
// };

module.exports = transporter.sendMail.bind(transporter);