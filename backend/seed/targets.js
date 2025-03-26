const mongoose = require('mongoose');
const Target = require('../models/Target');

const targets = [
  {
    name: 'Denis McMahon',
    email: 'denismcmahon@gmail.com',
    department: 'Engineering',
    role: 'Senior Developer'
  },
  {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    department: 'HR',
    role: 'HR Manager'
  },
  {
    name: 'John Smith',
    email: 'john.smith@example.com',
    department: 'IT',
    role: 'Security Analyst'
  },
  {
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    department: 'Finance',
    role: 'Accountant'
  }
];

async function seed() {
  try {
    await mongoose.connect('mongodb://localhost:27017/phishing-simulator');

    await Target.deleteMany();
    await Target.insertMany(targets); 

    console.log('Targets seeded successfully!');
  } catch (err) {
    console.error('Error seeding targets:', err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
