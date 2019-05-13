import * as nodemailer from "nodemailer";

export default (req, res, next) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // generated ethereal user
      pass: process.env.SMTP_PASS // generated ethereal password
    }
  });
  // transporter.sendMail({})
  req.smpt = transporter;
  next();
};
