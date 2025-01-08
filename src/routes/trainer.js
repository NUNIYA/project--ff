const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');
const { protect, restrictTo } = require('../middleware/auth');

// Protect all trainer routes
router.use(protect);
router.use(restrictTo('trainer'));

// Dashboard
router.get('/dashboard', trainerController.getDashboard);

// Profile
router.get('/profile', trainerController.getProfile);
router.post('/profile/update', trainerController.updateProfile);
router.post('/profile/change-password', trainerController.changePassword);

// Members
router.get('/members', trainerController.getMembers);
router.get('/members/:id', trainerController.getMemberDetails);
router.post('/members/:id/attendance', trainerController.markAttendance);

module.exports = router;