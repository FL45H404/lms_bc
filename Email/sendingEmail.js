const nodemailer = require("nodemailer");

exports.sendMailer = function (to, subject, text) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'garimaj9837@gmail.com',
        pass: '8630475803'
    },
  });

  let mailOptions = {
    from: "garimaj9837@gmail.com",
    to: to,
    subject: subject,
    text: text
  };
  
  transporter.sendMail(mailOptions, function (err, info) {
    //console.log('Email sent:::' +JSON.stringify(mailOptions));
    if (err) {
      console.log(err);
    } else {
      console.log("Email successfully sent:::" + info.response);
    }
  });
};