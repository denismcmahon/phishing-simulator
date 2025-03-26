const express = require('express');
const router = express.Router();
const controller = require('../controllers/targetController');

router.get('/', controller.getAllTargets);
router.post('/', controller.createTarget);
router.put('/:id', controller.updateTarget);
router.delete('/:id', controller.deleteTarget);

module.exports = router;
