import mongoose from "mongoose";

const DemoSchema = new mongoose.Schema({
  
  userEmail: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  metadata: {
    name: { type: String, required: true },
    phone: { type: String },
    company: { type: String },
    sector: { type: String },
  },
  status: {
    type: String,
    enum: ["pending", "approved", "postponed", "rejected", "completed"],
    default: "pending",
  },
  /*requestedDate: {
    type: Date,
    required: true
  },*/
  approvedDate: {
    type: Date
  },
  postponedDate: {
    type: Date
  },
  adminNotes: {
    type: String
  },

  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

DemoSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("Demo", DemoSchema);