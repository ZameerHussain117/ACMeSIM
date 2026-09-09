// Represents a purchasable eSIM data package. Field names and structure are
// deliberately shaped to resemble what the real eSIMgo API would likely return,
// so that swapping mock data for live eSIMgo data later requires minimal changes.

const mongoose = require('mongoose');

const esimPackageSchema = new mongoose.Schema(
  {
    // eSIMgo (or our mock) package identifier — kept separate from Mongo's own _id
    // so we can match records back to the external provider later.
    externalId: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true, // e.g. "France 5GB / 30 Days"
    },

    type: {
      type: String,
      enum: ['local', 'regional', 'global'],
      required: true,
    },

    // For "local": a single country code (e.g. "FR").
    // For "regional": a list of country codes (e.g. ["FR","DE","IT"]).
    // For "global": left empty or set to a marker like ["*"].
    countries: {
      type: [String],
      default: [],
    },

    region: {
      type: String, // human-readable label, e.g. "Europe", "Worldwide"
      default: null,
    },

    dataAmountMB: {
      type: Number,
      required: true, // stored in MB; null/very large value could represent "unlimited"
    },
    isUnlimited: {
      type: Boolean,
      default: false,
    },

    validityDays: {
      type: Number,
      required: true, // e.g. 7, 15, 30
    },

    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'USD',
    },

    isActive: {
      type: Boolean,
      default: true, // lets admins hide a package without deleting it
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ESIMPackage', esimPackageSchema);
