const DynamoModel = require('../models/dynamoModel');
const { v4: uuidv4 } = require('uuid');

exports.getActivities = async (req, res) => {
  try {
    const activities = await DynamoModel.queryByType(req.orgId, 'activity');
    // Sort latest first
    activities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ success: true, count: activities.length, data: activities });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createActivity = async (req, res) => {
  try {
    const id = `act_${uuidv4().slice(0, 8)}`;
    const saved = await DynamoModel.putItem(req.orgId, 'activity', id, req.body);
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateActivity = async (req, res) => {
  try {
    const updated = await DynamoModel.updateItem(req.orgId, 'activity', req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    await DynamoModel.deleteItem(req.orgId, 'activity', req.params.id);
    res.json({ success: true, message: 'Activity deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
