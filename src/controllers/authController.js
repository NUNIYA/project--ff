const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getLoginPage = (req, res) => {
    res.render('auth/login', {
        title: 'Login',
        error_msg: req.flash('error_msg'),
        success_msg: req.flash('success_msg')
    });
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            req.flash('error_msg', 'Invalid email or password');
            return res.redirect('/auth/login');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash('error_msg', 'Invalid email or password');
            return res.redirect('/auth/login');
        }

        req.session.userId = user._id;
        
        // Redirect based on role
        switch (user.role) {
            case 'admin':
                return res.redirect('/admin/dashboard');
            case 'member':
                return res.redirect('/member/dashboard');
            case 'trainer':
                return res.redirect('/trainer/dashboard');
            default:
                return res.redirect('/');
        }
    } catch (error) {
        console.error('Login error:', error);
        req.flash('error_msg', 'Login error occurred');
        res.redirect('/auth/login');
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) console.error('Logout error:', err);
        res.redirect('/auth/login');
    });
};