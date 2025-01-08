const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const trainerRegistrationController = require('../controllers/trainerRegistrationController');

// Home page
router.get('/', (req, res) => {
  res.render('home/index', { 
    title: 'Home',
    user: req.user
  });
});

router.get('/about', homeController.getAboutPage);
router.get('/packages', homeController.getPackagesPage);
router.get('/contact', homeController.getContactPage);
router.get('/faq', homeController.getFaqPage);
router.get('/register/member', homeController.getMemberRegistrationPage);
router.get('/register/trainer', trainerRegistrationController.getTrainerRegistrationPage);

module.exports = router;