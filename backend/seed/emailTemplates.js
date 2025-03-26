const mongoose = require('mongoose');
const EmailTemplate = require('../models/EmailTemplate');

const dummyTemplates = [
  {
    name: 'Security Alert',
    subject: 'Your password was reset',
    body: 'Hi, we noticed your password was changed. If this wasn’t you, click here.'
  },
  {
    name: 'Company Update',
    subject: 'Q1 Benefits Policy',
    body: 'Please review the new HR benefits policy for Q1 2024.'
  }
];

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/phishing-simulator');
  await EmailTemplate.deleteMany(); // optional: clear existing
  await EmailTemplate.insertMany(dummyTemplates);
  console.log('Dummy email templates inserted');
  mongoose.disconnect();
}

seed();
