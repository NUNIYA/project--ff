const Member = require('../models/Member');
const User = require('../models/User');
const Complaint = require('../models/Complaint');
const bcrypt = require('bcryptjs');

exports.getDashboard = async (req, res) => {
  try {
    const member = await Member.findOne({ user: req.user._id });
    
    if (!member) {
      req.flash('error_msg', 'Member profile not found');
      return res.redirect('/');
    }

    res.render('member/dashboard', {
      title: 'Member Dashboard',
      user: req.user,
      member
    });
  } catch (error) {
    req.flash('error_msg', 'Error loading dashboard');
    res.redirect('/');
  }
};

exports.getProfile = async (req, res) => {
  try {
    const member = await Member.findOne({ user: req.user._id });
    
    if (!member) {
      req.flash('error_msg', 'Member profile not found');
      return res.redirect('/member/dashboard');
    }

    res.render('member/profile', {
      title: 'My Profile',
      user: req.user,
      member
    });
  } catch (error) {
    req.flash('error_msg', 'Error loading profile');
    res.redirect('/member/dashboard');
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { fullName, phone } = req.body;
    const member = await Member.findOne({ user: req.user._id });

    if (!member) {
      req.flash('error_msg', 'Member profile not found');
      return res.redirect('/member/profile');
    }

    member.fullName = fullName;
    member.phone = phone;
    await member.save();

    req.flash('success_msg', 'Profile updated successfully');
    res.redirect('/member/profile');
  } catch (error) {
    req.flash('error_msg', 'Error updating profile');
    res.redirect('/member/profile');
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      req.flash('error_msg', 'New passwords do not match');
      return res.redirect('/member/profile');
    }

    // Verify current password
    const user = await User.findById(req.user._id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      req.flash('error_msg', 'Current password is incorrect');
      return res.redirect('/member/profile');
    }

    // Update password
    user.password = newPassword;
    user.isTemporaryPassword = false;
    await user.save();

    req.flash('success_msg', 'Password changed successfully');
    res.redirect('/member/profile');
  } catch (error) {
    req.flash('error_msg', 'Error changing password');
    res.redirect('/member/profile');
  }
};

exports.cancelMembership = async (req, res) => {
  try {
    const member = await Member.findOne({ user: req.user._id });

    if (!member) {
      req.flash('error_msg', 'Member profile not found');
      return res.redirect('/member/dashboard');
    }

    member.membershipStatus = 'cancelled';
    await member.save();

    req.flash('success_msg', 'Membership cancellation request submitted');
    res.redirect('/member/dashboard');
  } catch (error) {
    req.flash('error_msg', 'Error cancelling membership');
    res.redirect('/member/dashboard');
  }
};

exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ 
      member: req.user._id 
    }).sort({ createdAt: -1 });

    res.render('member/complaints', {
      title: 'My Complaints',
      user: req.user,
      complaints
    });
  } catch (error) {
    req.flash('error_msg', 'Error loading complaints');
    res.redirect('/member/dashboard');
  }
};

exports.createComplaint = async (req, res) => {
  try {
    const { subject, description } = req.body;
    const member = await Member.findOne({ user: req.user._id });

    if (!member) {
      req.flash('error_msg', 'Member profile not found');
      return res.redirect('/member/complaints');
    }

    await Complaint.create({
      member: member._id,
      subject,
      description,
      campus: member.campus,
      status: 'pending'
    });

    req.flash('success_msg', 'Complaint submitted successfully');
    res.redirect('/member/complaints');
  } catch (error) {
    req.flash('error_msg', 'Error submitting complaint');
    res.redirect('/member/complaints');
  }
};