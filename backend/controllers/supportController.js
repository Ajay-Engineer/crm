const DynamoModel = require('../models/dynamoModel');
const { v4: uuidv4 } = require('uuid');

exports.getTickets = async (req, res) => {
  try {
    const tickets = await DynamoModel.queryByType(req.orgId, 'ticket');
    res.json({ success: true, count: tickets.length, data: tickets });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createTicket = async (req, res) => {
  try {
    const id = `tick_${uuidv4().slice(0, 8)}`;
    const newTicket = {
      ...req.body,
      status: req.body.status || 'open',
      priority: req.body.priority || 'medium',
      slaDueMinutes: req.body.priority === 'high' ? 60 : 240,
      aiSuggestedSolution: 'AI analyzed subject: routing to tier-1 engineer with auto-knowledge base links.',
    };
    const saved = await DynamoModel.putItem(req.orgId, 'ticket', id, newTicket);
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const updated = await DynamoModel.updateItem(req.orgId, 'ticket', req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    await DynamoModel.deleteItem(req.orgId, 'ticket', req.params.id);
    res.json({ success: true, message: 'Ticket deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
