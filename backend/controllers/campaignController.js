const Campaign = require('../models/Campaign');

exports.getAllCampaigns = async (req, res) => {
  const campaigns = await Campaign.find().sort({ createdAt: -1 });
  res.json(campaigns);
};

exports.createCampaign = async (req, res) => {
  const campaign = new Campaign(req.body);
  await campaign.save();
  res.status(201).json(campaign);
};

exports.updateCampaign = async (req, res) => {
  const updated = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteCampaign = async (req, res) => {
  await Campaign.findByIdAndDelete(req.params.id);
  res.status(204).send();
};

exports.sendCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

    const sentCount = campaign.targets.length;

    campaign.sent = sentCount;
    campaign.status = 'Ongoing';
    campaign.startDate = new Date();

    await campaign.save();

    res.json({ message: 'Campaign sent', campaign });
  } catch (err) {
    res.status(500).json({ message: 'Error sending campaign' });
  }
};