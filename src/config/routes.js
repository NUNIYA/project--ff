const express = require('express');
const indexRoutes = require('../routes/index');
const authRoutes = require('../routes/auth');
const adminRoutes = require('../routes/admin');
const memberRoutes = require('../routes/member');
const trainerRoutes = require('../routes/trainer');
const registrationRoutes = require('../routes/registration');

const configureRoutes = (app) => {
  app.use('/', indexRoutes);
  app.use('/auth', authRoutes);
  app.use('/admin', adminRoutes);
  app.use('/member', memberRoutes);
  app.use('/trainer', trainerRoutes);
  app.use('/register', registrationRoutes);
};

module.exports = configureRoutes;