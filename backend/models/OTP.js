// Stores one-time codes used at two specific moments only: account signup
// verification and payment confirmation. Not used on every login, by design.

const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema(
  {
    // Reference by email rather than requiring a User to already exist,
    // since OTP is generated during signup BEFORE the account is fully created.
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    code: {
      type: String,
      required: true, // store as a hashed value in production; plain here for FYP simplicity
    },

    purpose: {
      type: String,
      enum: ['signup', 'payment'],
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true, // e.g. now + 5 minutes — checked before accepting the code
    },

    used: {
      type: Boolean,
      default: false, // prevents replaying the same OTP twice
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('OTP', otpSchema);
