const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 16
  },
  phone: {
    type: String,
    required: true
  },
  isStudent: {
    type: Boolean,
    required: true
  },
  studentIdPhoto: {
    type: String,
    required: function() {
      return this.isStudent === true;
    },
    default: null
  },
  selectedPackage: {
    type: String,
    required: true
  },
  paymentProof: {
    type: String,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  membershipStatus: {
    type: String,
    enum: ['active', 'cancelled', 'expired'],
    default: 'active'
  },
  campus: {
    type: String,
    enum: ['4kilo', '6kilo'],
    required: true
  }
});

module.exports = mongoose.model('Member', memberSchema);