const packageService = require('../services/packageService');

exports.getHomePage = (req, res) => {
  res.render('home/index', {
    title: 'Home',
    user: req.user
  });
};

exports.getAboutPage = (req, res) => {
  res.render('home/about', {
    title: 'About Us',
    user: req.user
  });
};

exports.getPackagesPage = async (req, res) => {
  try {
    const packages = await packageService.getPackages();
    res.render('home/packages', {
      title: 'Our Packages',
      packages,
      user: req.user
    });
  } catch (error) {
    req.flash('error_msg', 'Error loading packages');
    res.redirect('/');
  }
};

exports.getContactPage = (req, res) => {
  res.render('home/contact', {
    title: 'Contact Us',
    user: req.user
  });
};

exports.getFaqPage = (req, res) => {
  res.render('home/faq', {
    title: 'FAQ',
    user: req.user
  });
};

exports.getMemberRegistrationPage = async (req, res) => {
  try {
    const packages = await packageService.getPackages();
    res.render('registration/member', {
      title: 'Become a Member',
      user: req.user,
      packages
    });
  } catch (error) {
    req.flash('error_msg', 'Error loading registration page');
    res.redirect('/');
  }
};