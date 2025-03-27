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