import contactModel from "../models/contactModel.js";
import transporter from "../config/nodemailer.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables
// Create a new product (service)
export const submitContact = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Save to database
    const newContact = await contactModel.create({ name, email, message });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: process.env.MAIL_USER, // where you want to receive contact form emails
      subject: `New Contact Form Submission from ${name}`,
      text: `
        You have received a new message from your website contact form.

        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      replyTo: email, // so you can reply to the user directly
    };

    // Await the sending of the email (no callback)
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    return res
      .status(201)
      .json({
        success: true,
        message: "Contact form submitted and email sent",
        data: newContact,
      });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
