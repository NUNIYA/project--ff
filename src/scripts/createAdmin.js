require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const { getMongoConfig } = require('../utils/mongoConfig');

async function createAdminUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, getMongoConfig());
    
    const adminUser = await User.create({
      email: 'admin@aau.edu.et',
      password: 'admin123',
      role: 'admin',
      campus: '4kilo',
      isTemporaryPassword: false
    });

    console.log('Admin user created successfully:', adminUser.email);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdminUser();