import contactModel from "../models/contactModel.js";
import transporter from "../config/nodemailer.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables
// Create a new product (service)
export const submitContact = async (req, res) => {
  const { name, email, message ,subject } = req.body;
  try {
    if (!name || !email || !message || !subject) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Save to database
    const newContact = await contactModel.create({ name, email, message , subject });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: process.env.MAIL_USER, // where you want to receive contact form emails
      subject: `New Contact: ${subject}`,
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


// Update message (status changes)
export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedMessage = await contactModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    
    res.json({ 
      success: true, 
      message: updatedMessage 
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Update failed" 
    });
  }
};
// Delete message
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    await contactModel.findByIdAndDelete(id);
    
    res.json({ 
      success: true, 
      message: "Message deleted" 
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Delete failed" 
    });
  }
};

// Get all messages
export const getAllContacts = async (req, res) => {
  try {
    const messages = await contactModel.find().sort({ createdAt: -1 });
    
    res.json({ 
      success: true, 
      messages 
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Failed to retrieve messages" 
    });
  }
};

// Get message by ID
export const getContactById = async (req, res) => { 
  try {
    const { id } = req.params;
    const message = await contactModel.findById(id);
    
    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: "Message not found" 
      });
    }
    
    res.json({ 
      success: true, 
      message 
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Failed to retrieve message" 
    });
  }
}

//reply
export const replyToContact = async (req, res) => {
  const { id } = req.params;
  const { replyMessage } = req.body;

  try {
    if (!replyMessage) {
      return res.status(400).json({
        success: false,
        message: "Reply message is required",
      });
    }

    // Find the contact message by ID
    const contact = await contactModel.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    // Send reply email to the user
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: contact.email,
      subject: `Re: ${contact.subject}`,
      text: `Dear ${contact.name},\n\n${replyMessage}\n\nBest regards,\nYour Team`,
    };

    await transporter.sendMail(mailOptions);

    // Update the contact document (optional)
    contact.reply = replyMessage;
    contact.repliedAt = new Date();
    contact.status = "resolved"; // optionally track status
    await contact.save();

    return res.status(200).json({
      success: true,
      message: "Reply sent and saved successfully",
    });

  } catch (error) {
    console.error("Error replying to contact:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send reply",
    });
  }
};