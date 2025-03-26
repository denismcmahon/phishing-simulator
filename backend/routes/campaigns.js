const express = require('express');
const router = express.Router();
const controller = require('../controllers/campaignController');

router.get('/', controller.getAllCampaigns);
router.post('/', controller.createCampaign);
router.put('/:id', controller.updateCampaign);
router.delete('/:id', controller.deleteCampaign);

module.exports = router;
