const mongoose = require('mongoose');
const Campaign = require('../models/Campaign');

const dummyCampaigns = [
  {
    name: 'HR Policy Reminder',
    sent: 10,
    clicks: 5,
    submits: 2,
    status: 'Done'
  },
  {
    name: 'IT Security Check',
    sent: 7,
    clicks: 3,
    submits: 1,
    status: 'Ongoing'
  },
  {
    name: 'Benefit Re-Enrollment',
    sent: 0,
    clicks: 0,
    submits: 0,
    status: 'Draft'
  }
];

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/phishing-simulator');
  await Campaign.deleteMany();
  await Campaign.insertMany(dummyCampaigns);
  console.log('Seeded updated dummy campaign data');
  mongoose.disconnect();
}

seed();
