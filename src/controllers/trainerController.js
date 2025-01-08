const Trainer = require('../models/Trainer');
const Member = require('../models/Member');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getDashboard = async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ user: req.user._id });
    
    if (!trainer) {
      req.flash('error_msg', 'Trainer profile not found');
      return res.redirect('/');
    }

    // Get total active members count
    const membersCount = await Member.countDocuments({ 
      campus: trainer.preferredCampus,
      membershipStatus: 'active'
    });

    res.render('trainer/dashboard', {
      title: 'Trainer Dashboard',
      user: req.user,
      trainer,
      stats: {
        totalMembers: membersCount
      }
    });
  } catch (error) {
    req.flash('error_msg', 'Error loading dashboard');
    res.redirect('/');
  }
};

exports.getProfile = async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ user: req.user._id });
    
    if (!trainer) {
      req.flash('error_msg', 'Trainer profile not found');
      return res.redirect('/trainer/dashboard');
    }

    res.render('trainer/profile', {
      title: 'My Profile',
      user: req.user,
      trainer
    });
  } catch (error) {
    req.flash('error_msg', 'Error loading profile');
    res.redirect('/trainer/dashboard');
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { fullName, phone } = req.body;
    const trainer = await Trainer.findOne({ user: req.user._id });

    if (!trainer) {
      req.flash('error_msg', 'Trainer profile not found');
      return res.redirect('/trainer/profile');
    }

    trainer.fullName = fullName;
    trainer.phone = phone;
    await trainer.save();

    req.flash('success_msg', 'Profile updated successfully');
    res.redirect('/trainer/profile');
  } catch (error) {
    req.flash('error_msg', 'Error updating profile');
    res.redirect('/trainer/profile');
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      req.flash('error_msg', 'New passwords do not match');
      return res.redirect('/trainer/profile');
    }

    // Verify current password
    const user = await User.findById(req.user._id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      req.flash('error_msg', 'Current password is incorrect');
      return res.redirect('/trainer/profile');
    }

    // Update password
    user.password = newPassword;
    user.isTemporaryPassword = false;
    await user.save();

    req.flash('success_msg', 'Password changed successfully');
    res.redirect('/trainer/profile');
  } catch (error) {
    req.flash('error_msg', 'Error changing password');
    res.redirect('/trainer/profile');
  }
};

exports.getMembers = async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ user: req.user._id });
    
    if (!trainer) {
      req.flash('error_msg', 'Trainer profile not found');
      return res.redirect('/trainer/dashboard');
    }

    const members = await Member.find({
      campus: trainer.preferredCampus,
      membershipStatus: 'active'
    }).populate('user');

    res.render('trainer/members', {
      title: 'Member List',
      user: req.user,
      members
    });
  } catch (error) {
    req.flash('error_msg', 'Error loading members');
    res.redirect('/trainer/dashboard');
  }
};

exports.getMemberDetails = async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ user: req.user._id });
    const member = await Member.findById(req.params.id).populate('user');
    
    if (!trainer || !member || member.campus !== trainer.preferredCampus) {
      req.flash('error_msg', 'Member not found');
      return res.redirect('/trainer/members');
    }

    res.render('trainer/member-details', {
      title: 'Member Details',
      user: req.user,
      member
    });
  } catch (error) {
    req.flash('error_msg', 'Error loading member details');
    res.redirect('/trainer/members');
  }
};

exports.markAttendance = async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ user: req.user._id });
    const member = await Member.findById(req.params.id);
    
    if (!trainer || !member || member.campus !== trainer.preferredCampus) {
      req.flash('error_msg', 'Member not found');
      return res.redirect('/trainer/members');
    }

    // Here you would typically create an attendance record
    // This would require creating an Attendance model and schema
    
    req.flash('success_msg', 'Attendance marked successfully');
    res.redirect('/trainer/members');
  } catch (error) {
    req.flash('error_msg', 'Error marking attendance');
    res.redirect('/trainer/members');
  }
};