const DynamoModel = require('../models/dynamoModel');
const { v4: uuidv4 } = require('uuid');

exports.getPipelines = async (req, res) => {
  try {
    const pipelines = await DynamoModel.queryByType(req.orgId, 'pipeline');
    res.json({ success: true, data: pipelines });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createPipeline = async (req, res) => {
  try {
    const id = `pipe_${uuidv4().slice(0, 8)}`;
    const saved = await DynamoModel.putItem(req.orgId, 'pipeline', id, req.body);
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updatePipeline = async (req, res) => {
  try {
    const updated = await DynamoModel.updateItem(req.orgId, 'pipeline', req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
