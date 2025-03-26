const express = require('express');
const router = express.Router();
const controller = require('../controllers/emailTemplateController');

router.get('/', controller.getAllTemplates);
router.post('/', controller.createTemplate);
router.put('/:id', controller.updateTemplate);
router.delete('/:id', controller.deleteTemplate);

module.exports = router;