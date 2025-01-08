const Member = require('../models/Member');
const User = require('../models/User');
const { sendWelcomeEmail } = require('../utils/email');
const { generateTempPassword } = require('../utils/auth');
const fs = require('fs');
const path = require('path');

exports.registerMember = async (req, res) => {
  try {
    const {
      fullName,
      email,
      age,
      phone,
      isStudent,
      selectedPackage,
      campus
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error_msg', 'Email already registered');
      return res.redirect('/register/member');
    }

    // Validate file uploads
    if (isStudent === 'true' && (!req.files || !req.files.studentId)) {
      req.flash('error_msg', 'Student ID photo is required for students');
      return res.redirect('/register/member');
    }

    if (!req.files || !req.files.paymentProof) {
      req.flash('error_msg', 'Payment proof is required');
      return res.redirect('/register/member');
    }

    // Create temporary password
    const tempPassword = generateTempPassword();

    // Create user account
    const user = await User.create({
      email,
      password: tempPassword,
      role: 'member',
      campus
    });

    // Create member profile
    const memberData = {
      user: user._id,
      fullName,
      age: parseInt(age),
      phone,
      isStudent: isStudent === 'true',
      selectedPackage,
      campus,
      paymentProof: req.files.paymentProof[0].filename
    };

    // Only add studentIdPhoto if user is a student
    if (isStudent === 'true' && req.files.studentId) {
      memberData.studentIdPhoto = req.files.studentId[0].filename;
    }

    const member = await Member.create(memberData);

    // Send welcome email with credentials
    await sendWelcomeEmail(email, tempPassword);

    req.flash('success_msg', 'Registration successful! Check your email for login credentials.');
    res.redirect('/auth/login');
  } catch (error) {
    console.error('Registration error:', error);
    // Delete uploaded files if registration fails
    if (req.files) {
      Object.values(req.files).forEach(files => {
        files.forEach(file => {
          fs.unlink(file.path, err => {
            if (err) console.error('Error deleting file:', err);
          });
        });
      });
    }
    req.flash('error_msg', 'Registration failed. Please try again.');
    res.redirect('/register/member');
  }
};