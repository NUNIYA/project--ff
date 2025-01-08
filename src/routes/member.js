const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const { protect, restrictTo } = require('../middleware/auth');

// Protect all member routes
router.use(protect);
router.use(restrictTo('member'));

// Dashboard
router.get('/dashboard', memberController.getDashboard);

// Profile
router.get('/profile', memberController.getProfile);
router.post('/profile/update', memberController.updateProfile);
router.post('/profile/change-password', memberController.changePassword);

// Membership
router.post('/cancel-membership', memberController.cancelMembership);

// Complaints
router.get('/complaints', memberController.getComplaints);
router.post('/complaints/new', memberController.createComplaint);

module.exports = router;