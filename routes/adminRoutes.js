
const express = require('express');
const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModel');
const router = express.Router();

// Register Admin
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        await adminModel.register(username, email, password);
        res.status(201).json({ message: '✅ Admin registered successfully' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: '❌ Email or Username already exists' });
        }
        res.status(500).json({ error: error.message });
    }
});

// Login Admin
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const admin = await adminModel.login(email, password);

        if (!admin) {
            return res.status(401).json({ error: '❌ Invalid email or password' });
        }

        const token = jwt.sign(
            { id: admin.id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: '✅ Login successful',
            token,
            admin: {
                id: admin.id,
                username: admin.username,
                email: admin.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
