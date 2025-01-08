require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Package = require('../models/Package');
const bcrypt = require('bcryptjs');

const initializeDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Create admin user if it doesn't exist
        const adminExists = await User.findOne({ email: 'admin@aau.edu.et' });
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await User.create({
                email: 'admin@aau.edu.et',
                password: hashedPassword,
                role: 'admin',
                campus: '4kilo',
                isTemporaryPassword: false
            });
            console.log('Admin user created');
        }

        // Create default packages if they don't exist
        const packagesExist = await Package.countDocuments();
        if (!packagesExist) {
            await Package.insertMany([
                {
                    name: "Student Basic",
                    description: "Perfect for AAU students",
                    price: 500,
                    duration: "1 month",
                    features: [
                        "Access to gym equipment",
                        "Locker access",
                        "Student discount"
                    ],
                    sessions: "Unlimited"
                },
                {
                    name: "Staff Standard",
                    description: "For AAU staff members",
                    price: 800,
                    duration: "1 month",
                    features: [
                        "Access to gym equipment",
                        "Locker access",
                        "1 trainer session/month"
                    ],
                    sessions: "Unlimited"
                },
                {
                    name: "Premium",
                    description: "Full-featured package",
                    price: 1200,
                    duration: "1 month",
                    features: [
                        "Access to gym equipment",
                        "Locker access",
                        "4 trainer sessions/month",
                        "Nutrition consultation"
                    ],
                    sessions: "Unlimited"
                }
            ]);
            console.log('Default packages created');
        }

        console.log('Database initialization completed');
        process.exit(0);
    } catch (error) {
        console.error('Database initialization error:', error);
        process.exit(1);
    }
};

initializeDatabase();