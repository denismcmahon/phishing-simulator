const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  emailTemplateId: { type: mongoose.Schema.Types.ObjectId, ref: 'EmailTemplate', required: false },
  targets: [{ type: String }],

  sent: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  submits: { type: Number, default: 0 },

  status: {
    type: String,
    enum: ['Draft', 'Ongoing', 'Done'],
    default: 'Draft'
  },

  startDate: { type: Date },
  endDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Campaign', CampaignSchema);
