require("dotenv").config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: "vrusanov885@gmail.com",
  from: process.env.SENDGRID_SENDER,
  subject: "Nodemailer test",
  text: "Aloha",
  html: "<b>Hello</b>",
};

sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent!!!!!!!!!!!!!");
  })
  .catch((error) => {
    console.log(error);
  });
