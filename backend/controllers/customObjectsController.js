const DynamoModel = require('../models/dynamoModel');
const { v4: uuidv4 } = require('uuid');

// Schema management (Property, Patient, Vehicle, Student, etc.)
exports.getSchemas = async (req, res) => {
  try {
    const schemas = await DynamoModel.queryByType(req.orgId, 'custom_object_schema');
    res.json({ success: true, count: schemas.length, data: schemas });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createSchema = async (req, res) => {
  try {
    const id = `schema_${req.body.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${uuidv4().slice(0, 4)}`;
    const saved = await DynamoModel.putItem(req.orgId, 'custom_object_schema', id, {
      ...req.body,
      fields: req.body.fields || [],
    });
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Records management for specific custom object schema
exports.getRecords = async (req, res) => {
  try {
    const { schemaId } = req.params;
    const entityType = `custom_record_${schemaId}`;
    const records = await DynamoModel.queryByType(req.orgId, entityType);
    res.json({ success: true, count: records.length, data: records });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createRecord = async (req, res) => {
  try {
    const { schemaId } = req.params;
    const entityType = `custom_record_${schemaId}`;
    const id = `rec_${uuidv4().slice(0, 8)}`;
    const saved = await DynamoModel.putItem(req.orgId, entityType, id, {
      schemaId,
      data: req.body.data || req.body,
    });
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateRecord = async (req, res) => {
  try {
    const { schemaId, recordId } = req.params;
    const entityType = `custom_record_${schemaId}`;
    const updated = await DynamoModel.updateItem(req.orgId, entityType, recordId, {
      data: req.body.data || req.body,
    });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const { schemaId, recordId } = req.params;
    const entityType = `custom_record_${schemaId}`;
    await DynamoModel.deleteItem(req.orgId, entityType, recordId);
    res.json({ success: true, message: 'Custom record deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
