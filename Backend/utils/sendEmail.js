const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {

    user: process.env.EMAIL_USER,

    pass: process.env.EMAIL_PASS

  }

});
transporter.verify((error, success) => {

  if (error) {

    console.log("❌ SMTP ERROR:", error);

  } else {

    console.log("✅ SMTP Ready");

  }

});

const sendEmail = async (to, subject, text) => {

  await transporter.sendMail({

    from: process.env.EMAIL_USER,

    to,

    subject,

    text

  });

};
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");
module.exports = sendEmail;