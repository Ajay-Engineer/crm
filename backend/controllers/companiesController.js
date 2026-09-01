const DynamoModel = require('../models/dynamoModel');
const { v4: uuidv4 } = require('uuid');

exports.getCompanies = async (req, res) => {
  try {
    const companies = await DynamoModel.queryByType(req.orgId, 'company');
    res.json({ success: true, count: companies.length, data: companies });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createCompany = async (req, res) => {
  try {
    const id = `comp_${uuidv4().slice(0, 8)}`;
    const saved = await DynamoModel.putItem(req.orgId, 'company', id, req.body);
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const updated = await DynamoModel.updateItem(req.orgId, 'company', req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    await DynamoModel.deleteItem(req.orgId, 'company', req.params.id);
    res.json({ success: true, message: 'Company deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
