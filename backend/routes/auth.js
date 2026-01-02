const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

// Password validation helper
const validatePassword = (password) => {
    if (!password || password.length < 6) {
        return 'Password must be at least 6 characters long';
    }
    return null;
};

// User Register - Handle OPTIONS preflight
router.options('/register', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

// User Register
router.post('/register', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Validate required fields
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required: fullName, email, and password'
            });
        }

        // Trim whitespace from all fields
        const trimmedFullName = fullName.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            return res.status(400).json({ message: 'Please enter a valid email address' });
        }

        // Validate password
        const passwordError = validatePassword(trimmedPassword);
        if (passwordError) {
            return res.status(400).json({ message: passwordError });
        }

        // Check if email already exists
        let user = await User.findOne({ email: trimmedEmail });
        if (user) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Create new user
        user = new User({ fullName: trimmedFullName, email: trimmedEmail, password: trimmedPassword });
        await user.save();
        console.log('New user registered:', { id: user._id, email: user.email });

        // Generate token
        const token = jwt.sign(
            { id: user._id, role: 'user' },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1d' }
        );

        res.json({
            message: 'Registration successful',
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: 'user'
            }
        });
    } catch (err) {
        console.error('Registration error:', err);

        // Handle duplicate key error
        if (err.code === 11000) {
            return res.status(400).json({
                message: 'Email already registered'
            });
        }

        // Handle validation errors
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({
                message: errors.join(', ')
            });
        }

        res.status(500).json({
            message: 'Registration failed. Please try again.'
        });
    }
});

// User Register - Handle unsupported methods (except POST and OPTIONS)
router.all('/register', (req, res) => {
    res.status(405).json({ message: 'Method not allowed' });
});

// User Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Email and password are required' 
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ 
                message: 'Invalid email or password' 
            });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ 
                message: 'Invalid email or password' 
            });
        }

        const token = jwt.sign(
            { id: user._id, role: 'user' },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1d' }
        );

        console.log('User logged in:', { id: user._id, email: user.email });

        res.json({
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: 'user'
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ 
            message: 'Login failed. Please try again.' 
        });
    }
});

// Admin Login
router.post('/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Email and password are required' 
            });
        }

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ 
                message: 'Invalid email or password' 
            });
        }

        const isPasswordValid = await admin.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ 
                message: 'Invalid email or password' 
            });
        }

        const token = jwt.sign(
            { id: admin._id, role: 'admin' }, 
            process.env.JWT_SECRET || 'secret', 
            { expiresIn: '1d' }
        );
        
        console.log('Admin logged in:', { id: admin._id, email: admin.email });
        
        res.json({ 
            token, 
            admin: { 
                id: admin._id, 
                email: admin.email, 
                role: 'admin' 
            } 
        });
    } catch (err) {
        console.error('Admin login error:', err);
        res.status(500).json({ 
            message: 'Login failed. Please try again.' 
        });
    }
});

module.exports = router;
