const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
      w: 'majority',
      ssl: true,
      tls: true
    };

    await mongoose.connect(process.env.MONGODB_URI, options);
    console.log('MongoDB Connected Successfully');
  } catch (err) {
    console.error('Database connection error:', err);
    // Don't exit process, allow app to run with limited functionality
    console.log('Running in offline mode - some features may be limited');
  }
};

module.exports = connectDB;