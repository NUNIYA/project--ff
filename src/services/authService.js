const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/User');

class AuthService {
  generateTempPassword() {
    return crypto.randomBytes(4).toString('hex');
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  async comparePasswords(candidatePassword, hashedPassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  async createUser(email, password, role, campus) {
    const hashedPassword = await this.hashPassword(password);
    return await User.create({
      email,
      password: hashedPassword,
      role,
      campus,
      isTemporaryPassword: true
    });
  }
}

module.exports = new AuthService();