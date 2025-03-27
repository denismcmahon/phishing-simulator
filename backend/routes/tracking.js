const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');

router.get('/click/:campaignId/:targetId', async (req, res) => {
  const { campaignId } = req.params;

  await Campaign.findByIdAndUpdate(campaignId, { $inc: { clicks: 1 } });

  res.redirect(`http://localhost:4200/phish-form`);
});

module.exports = router;
