const DynamoModel = require('../models/dynamoModel');
const { v4: uuidv4 } = require('uuid');

exports.getDeals = async (req, res) => {
  try {
    const deals = await DynamoModel.queryByType(req.orgId, 'deal');
    res.json({ success: true, count: deals.length, data: deals });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createDeal = async (req, res) => {
  try {
    const id = `deal_${uuidv4().slice(0, 8)}`;
    const newDeal = {
      ...req.body,
      pipelineId: req.body.pipelineId || 'pipe_sales_default',
      stageId: req.body.stageId || 'stg_lead_in',
      value: Number(req.body.value) || 0,
      currency: req.body.currency || 'USD',
      status: req.body.status || 'open',
      aiWinProbability: req.body.aiWinProbability || 50,
    };
    const saved = await DynamoModel.putItem(req.orgId, 'deal', id, newDeal);
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateDeal = async (req, res) => {
  try {
    const updated = await DynamoModel.updateItem(req.orgId, 'deal', req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update Kanban Stage (Drag & Drop)
exports.updateDealStage = async (req, res) => {
  try {
    const { stageId, status } = req.body;
    const updates = { stageId };
    if (status) updates.status = status;
    if (stageId === 'stg_won') {
      updates.status = 'won';
      updates.aiWinProbability = 100;
    } else if (stageId === 'stg_lost') {
      updates.status = 'lost';
      updates.aiWinProbability = 0;
    }

    const updated = await DynamoModel.updateItem(req.orgId, 'deal', req.params.id, updates);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteDeal = async (req, res) => {
  try {
    await DynamoModel.deleteItem(req.orgId, 'deal', req.params.id);
    res.json({ success: true, message: 'Deal deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
