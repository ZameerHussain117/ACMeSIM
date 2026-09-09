// Represents an account in the system — either a regular customer or an admin.
// Note: password is stored as a bcrypt hash, never plain text.

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    // --- Identity & auth ---
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true, // stored as a bcrypt hash — hashing happens in the auth service, not here
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    // --- Profile ---
    name: {
      type: String,
      trim: true,
    },
    profilePicture: {
      type: String, // URL to an image, e.g. stored in S3/Cloud storage
      default: null,
    },

    // --- Account state ---
    isVerified: {
      type: Boolean,
      default: false, // flips to true once the signup OTP is confirmed
    },
    rewardPoints: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // adds createdAt / updatedAt automatically
  }
);

module.exports = mongoose.model('User', userSchema);
