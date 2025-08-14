
import express from "express";
import Demo from "../models/DemoModel.js";
import sanitizeHtml from "sanitize-html";
import sendSupportEmail from "../config/email.js";
import fs from "fs/promises";
import path from "path";
import multer from "multer";
import { body, validationResult } from "express-validator";

const router = express.Router();

// Configure multer to handle FormData (no file uploads, just fields)
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/demo - Create a new demo request (no auth required)
// POST /api/demo - Create a new demo request (no auth required)
router.post("/", upload.none(), async (req, res) => {
  try {
    // Extract fields from FormData
    const { name, email, phone, company, sector, message, captcha } = req.body;

    // Basic validation
    if (!name || !email || !phone || !company || !sector || !message || !captcha) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Simple email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // Create new demo request
    const demo = new Demo({
      userEmail: email,
      message: message,
      metadata: {
        name: name,
        phone: phone,
        company: company,
        sector: sector
      },
      status: "pending", // Use one of the allowed enum values
    });

    await demo.save();

    // Log to console for now (replace with proper logging)
    console.log(`New demo request from ${email}`);

    return res.status(201).json({
      success: true,
      message: "Demo request received successfully",
      demoId: demo._id,
    });
  } catch (error) {
    console.error("Error processing demo request:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message // Only include in development
    });
  }
});


// new rdv gets 

router.get("/rdv", async (req, res) => {
  try {
    const rdvs = await Demo.find({}).sort({ createdAt: -1 });
    res.status(200).json(rdvs);
  } catch (error) {
    console.error("Error fetching RDVs:", error);
    res.status(500).json({ message: "Error fetching RDVs" });
  }
});

// PUT /api/rdv/:id/approve - Approve an RDV
router.put("/rdv/:id/approve", 
  [
    body("approvedDate").isISO8601().toDate(),
    body("adminNotes").optional().isString().trim()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { approvedDate, adminNotes } = req.body;
      
      const updatedRdv = await Demo.findByIdAndUpdate(
        req.params.id,
        {
          status: "approved",
          approvedDate,
          postponedDate: null,
          adminNotes,
          updatedAt: new Date()
        },
        { new: true }
      );

      if (!updatedRdv) {
        return res.status(404).json({ message: "RDV not found" });
      }

      // Send approval email to client
      await sendSupportEmail({
        userEmail: updatedRdv.userEmail,
        subject: "Your RDV has been approved",
        message: `Your RDV request has been approved for ${approvedDate}. ${adminNotes ? `Notes: ${adminNotes}` : ''}`
      });

      res.status(200).json(updatedRdv);
    } catch (error) {
      console.error("Error approving RDV:", error);
      res.status(500).json({ message: "Error approving RDV" });
    }
  }
);

// PUT /api/rdv/:id/postpone - Postpone an RDV
router.put("/rdv/:id/postpone", 
  [
    body("postponedDate").isISO8601().toDate(),
    body("adminNotes").optional().isString().trim()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { postponedDate, adminNotes } = req.body;
      
      const updatedRdv = await Demo.findByIdAndUpdate(
        req.params.id,
        {
          status: "postponed",
          postponedDate,
          approvedDate: null,
          adminNotes,
          updatedAt: new Date()
        },
        { new: true }
      );

      if (!updatedRdv) {
        return res.status(404).json({ message: "RDV not found" });
      }

      // Send postponement email to client
      await sendSupportEmail({
        userEmail: updatedRdv.userEmail,
        subject: "Your RDV has been postponed",
        message: `Your RDV request has been postponed to ${postponedDate}. ${adminNotes ? `Notes: ${adminNotes}` : ''}`
      });

      res.status(200).json(updatedRdv);
    } catch (error) {
      console.error("Error postponing RDV:", error);
      res.status(500).json({ message: "Error postponing RDV" });
    }
  }
);

// PUT /api/rdv/:id/reject - Reject an RDV
router.put("/rdv/:id/reject", 
  [
    body("adminNotes").optional().isString().trim()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { adminNotes } = req.body;
      
      const updatedRdv = await Demo.findByIdAndUpdate(
        req.params.id,
        {
          status: "rejected",
          approvedDate: null,
          postponedDate: null,
          adminNotes,
          updatedAt: new Date()
        },
        { new: true }
      );

      if (!updatedRdv) {
        return res.status(404).json({ message: "RDV not found" });
      }

      // Send rejection email to client
      await sendSupportEmail({
        userEmail: updatedRdv.userEmail,
        subject: "Your RDV has been rejected",
        message: `Your RDV request has been rejected. ${adminNotes ? `Notes: ${adminNotes}` : ''}`
      });

      res.status(200).json(updatedRdv);
    } catch (error) {
      console.error("Error rejecting RDV:", error);
      res.status(500).json({ message: "Error rejecting RDV" });
    }
  }
);

// Add this route right before the export default router line

// GET /api/demo/rdv/client - Get all RDVs for a specific client by email
// Add these routes right before the export default router line

// Change this route in your backend
router.get('/client-rdvs-by-email/:email', async (req, res) => {
  try {
    const { email } = req.params;
    
    // Get all RDVs for this email
    const rdvs = await Demo.find({ userEmail: email })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      email: email,
      totalRdvs: rdvs.length,
      rdvs: rdvs.map(rdv => ({
        id: rdv._id,
        message: rdv.message,
        status: rdv.status,
        metadata: rdv.metadata,
        approvedDate: rdv.approvedDate,
        postponedDate: rdv.postponedDate,
        adminNotes: rdv.adminNotes,
        createdAt: rdv.createdAt,
        updatedAt: rdv.updatedAt
      }))
    });
  } catch (error) {
    console.error('Error fetching client RDVs:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
// Add this route to your demoRoutes.js
router.get('/rdv/stats', async (req, res) => {
  try {
    const stats = await Demo.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          pending: { $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] } },
          approved: { $sum: { $cond: [{ $eq: ["$status", "approved"] }, 1, 0] } },
          rejected: { $sum: { $cond: [{ $eq: ["$status", "rejected"] }, 1, 0] } },
          postponed: { $sum: { $cond: [{ $eq: ["$status", "postponed"] }, 1, 0] } },
          completed: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } }
        }
      },
      { $project: { _id: 0 } }
    ]);
    
    res.status(200).json(stats[0] || {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      postponed: 0,
      completed: 0
    });
  } catch (error) {
    console.error("Error fetching RDV stats:", error);
    res.status(500).json({ message: "Error fetching statistics" });
  }
});


export default router;
