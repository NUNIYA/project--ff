const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');
const trainerRegistrationController = require('../controllers/trainerRegistrationController');
const upload = require('../middleware/upload');
const Package = require('../models/Package');

const memberUploadFields = upload.fields([
  { name: 'studentId', maxCount: 1 },
  { name: 'paymentProof', maxCount: 1 }
]);

const trainerUpload = upload.single('cv');

// Member registration routes
router.get('/member', async (req, res) => {
  try {
    const packages = await Package.find();
    res.render('registration/member', {
      title: 'Become a Member',
      packages: packages?.length ? packages : [],
      user: req.user
    });
  } catch (error) {
    req.flash('error_msg', 'Error loading registration page');
    res.redirect('/');
  }
});

router.post('/member', memberUploadFields, registrationController.registerMember);

// Trainer registration routes
router.get('/trainer', (req, res) => {
  res.render('registration/trainer', {
    title: 'Apply as Trainer',
    user: req.user
  });
});

router.post('/trainer', trainerUpload, trainerRegistrationController.registerTrainer);

module.exports = router;