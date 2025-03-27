const express = require('express');
const router = express.Router();
const controller = require('../controllers/campaignController');

router.get('/', controller.getAllCampaigns);
router.post('/', controller.createCampaign);
router.put('/:id', controller.updateCampaign);
router.delete('/:id', controller.deleteCampaign);
router.post('/:id/send', controller.sendCampaign);
router.post('/log-click', controller.logClick);
router.post('/track-submit/:campaignId', controller.logSubmit);
router.get('/stats/phish-rate', controller.getPhishingStats);

module.exports = router;
