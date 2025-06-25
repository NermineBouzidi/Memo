import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { 
        user: process.env.MAIL_USER, // SMTP username
        pass: process.env.MAIL_PASS  // SMTP password
    }       

})  ;

export default transporter;