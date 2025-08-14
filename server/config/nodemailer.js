import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


 const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // STARTTLS
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
        });
export const sendInvoiceEmail = async (to, subject, text, html, attachments = []) => {
  try {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to,
      subject,
      text,
      html,
      attachments
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export default transporter;