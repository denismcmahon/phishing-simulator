const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // or your provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendPhishingEmail = (mailInfo) => {
  const { to, subject, html } = { ...mailInfo };
  console.log('DM ==> sendPhishingEmail ==> to: ', to);
  console.log('DM ==> sendPhishingEmail ==> subject: ', subject);
  console.log('DM ==> sendPhishingEmail ==> html: ', html);
  return transporter.sendMail({
    from: `"PhishSim" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: html
  });
};

module.exports = { sendPhishingEmail };
