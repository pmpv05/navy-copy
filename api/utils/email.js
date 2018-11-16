const nodemailer = require('nodemailer');

const user = 'noreply.navywp@gmail.com';
const pass = '89oSCOgxBc55';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user,
    pass,
  },
});

const sendEmail = ({ recipient, subject, text }, onCompletion) => {
  const mailOptions = {
    from: user,
    to: recipient,
    subject,
    text,
  };
  transporter.sendMail(mailOptions, error => {
    if (error) {
      onCompletion(error);
    } else {
      onCompletion(null);
    }
  });
};

module.exports = sendEmail;
