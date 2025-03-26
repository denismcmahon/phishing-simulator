const Target = require('../models/Target');

exports.getAllTargets = async (req, res) => {
  const targets = await Target.find().sort({ createdAt: -1 });
  res.json(targets);
};

exports.createTarget = async (req, res) => {
  const target = new Target(req.body);
  await target.save();
  res.status(201).json(target);
};

exports.updateTarget = async (req, res) => {
  const updated = await Target.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteTarget = async (req, res) => {
  await Target.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
