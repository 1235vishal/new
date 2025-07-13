const express = require('express');
const router = express.Router();
const contactModel = require('../models/contactModel');

// Save contact (used by both forms)
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        await contactModel.saveContact({ name, email, phone, message });
        res.status(201).json({ message: "Contact submitted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all contact submissions (for admin panel)
router.get('/', async (req, res) => {
    try {
        const contacts = await contactModel.getAllContacts();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE contact by ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await contactModel.deleteContact(req.params.id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Contact not found" });
        }
        res.json({ message: "Contact deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
