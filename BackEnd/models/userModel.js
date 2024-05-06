const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define schema for leave request
const leaveRequestSchema = new Schema(
  {
    leaveType: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "disapproved"],
      default: "pending",
    },
  },
  { timestamps: true },
);

// Define schema for user model
const userModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    leaveRequests: [leaveRequestSchema], // Embed leaveRequestSchema as a subdocument array
  },
  {
    timestamps: true, // Add timestamps (createdAt, updatedAt)
  },
);

const User = mongoose.model("User", userModel);

module.exports = User;
