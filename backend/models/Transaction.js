// Records a single purchase attempt — links a User to the ESIMPackage they bought
// and tracks the Stripe payment status. This is the source of truth for order history.

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ESIMPackage',
      required: true,
    },

    amount: {
      type: Number,
      required: true, // snapshot of the price paid, in case package price changes later
    },
    currency: {
      type: String,
      default: 'USD',
    },

    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },

    stripePaymentIntentId: {
      type: String,
      default: null, // set once Stripe creates the PaymentIntent
    },

    // --- Activation-related fields (used by the purchase/activation sprint) ---
    qrCodeUrl: {
      type: String,
      default: null,
    },
    activatedAt: {
      type: Date,
      default: null, // set only once the device "latches onto the network"
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Transaction', transactionSchema);
