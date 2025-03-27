const Campaign = require('../models/Campaign');
const { sendPhishingEmail } = require('../services/mailService');
const Target = require('../models/Target');
const EmailTemplate = require('../models/EmailTemplate');

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
  const { id } = req.params;

  const campaign = await Campaign.findById(id);
  const template = await EmailTemplate.findById(campaign.emailTemplateId);
  const targets = await Target.find({ _id: { $in: campaign.targets } });

  for (const target of targets) {
    const trackingUrl = `http://localhost:4200/track-click/${campaign._id}/${target._id}`;
    console.log('DM ==> trackingUrl: ', trackingUrl);
    const htmlWithTracking = template.body.replace(
      '{{tracking_link}}',
      `<a href="${trackingUrl}">Click here to view message</a>`
    );

    await sendPhishingEmail({
      to: target.email,
      subject: template.subject,
      html: htmlWithTracking
    });
  }

  campaign.status = 'Ongoing';
  campaign.sent = targets.length;
  await campaign.save();

  res.json({ message: 'Campaign sent', campaign });
};

exports.logClick = async (req, res) => {
  console.log('DM ==> logClick called');
  console.log('DM ==> req.body:', req.body);

  const { campaignId, targetId } = req.body;

  if (!campaignId || !targetId) {
    console.warn('DM ==> Missing campaignId or targetId');
    return res.status(400).json({ error: 'Missing data' });
  }

  try {
    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    campaign.clicks = (campaign.clicks || 0) + 1;
    await campaign.save();

    return res.status(200).json({ message: 'Click logged successfully' });
  } catch (err) {
    console.error('DM ==> Error logging click:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.logSubmit = async (req, res) => {
  const { campaignId } = req.params;

  try {
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) return res.status(404).json({ error: 'Campaign not found' });

    campaign.submits = (campaign.submits || 0) + 1;
    await campaign.save();

    console.log('DM ==> campaignController.js ==> logSubmit recorded for campaign:', campaignId);

    return res.status(200).json({ message: 'Submission logged successfully' });
  } catch (err) {
    console.error('DM ==> logSubmit error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getPhishingStats = async (req, res) => {
  try {
    const campaigns = await Campaign.find();

    const totalSent = campaigns.reduce((acc, c) => acc + (c.sent || 0), 0);
    const totalSubmits = campaigns.reduce((acc, c) => acc + (c.submits || 0), 0);

    const phishRate = totalSent > 0 ? Math.round((totalSubmits / totalSent) * 100) : 0;

    return res.json({ phishRate, totalSent, totalSubmits });
  } catch (err) {
    console.error('Error calculating phish rate:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

