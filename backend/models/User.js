// Represents an account in the system — either a regular customer or an admin.
// Note: password is stored as a bcrypt hash, never plain text (unless logging in via Google).

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
      required: function() {
        // Password is only required if the user signs up locally (not via Google)
        return this.authProvider === 'local';
      },
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple users to have 'null' or missing googleId without breaking uniqueness
    },
    authProvider: {
      type: String,
      enum: ['local', 'google'],
      default: 'local',
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
      type: String, // URL to an image, e.g. stored in S3/Cloud storage or Google profile pic
      default: null,
    },

    // --- Account state ---
    isVerified: {
      type: Boolean,
      default: function() {
        // Google accounts are already verified by Google
        return this.authProvider === 'google';
      }, 
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