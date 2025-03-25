const EmailTemplate = require('../models/EmailTemplate');

exports.getAllTemplates = async (req, res) => {
    try {
        const templates = await EmailTemplate.find().sort({ createdAt: -1 });
        res.json(templates);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch templates' });
    }
};

exports.createTemplate = async (req, res) => {
    try {
        const { name, subject, body } = req.body;
        const newTemplate = new EmailTemplate({ name, subject, body });
        await newTemplate.save();
        res.status(201).json(newTemplate);
    } catch (err) {
        res.status(400).json({ message: 'Failed to create template' });
    }
};

exports.updateTemplate = async (req, res) => {
    try {
        const { name, subject, body } = req.body;
        const updated = await EmailTemplate.findByIdAndUpdate(
            req.params.id,
            { name, subject, body },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: 'Failed to update template' });
    }
};

exports.deleteTemplate = async (req, res) => {
    try {

    } catch (err) {
        res.status(400).json({ message: 'Failed to delete template' });
    }
};