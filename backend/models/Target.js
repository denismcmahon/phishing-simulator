const mongoose = require('mongoose');

const TargetSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  department: String,
  role: String
}, { timestamps: true });

module.exports = mongoose.model('Target', TargetSchema);
