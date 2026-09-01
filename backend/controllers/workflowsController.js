const DynamoModel = require('../models/dynamoModel');
const { v4: uuidv4 } = require('uuid');

exports.getWorkflows = async (req, res) => {
  try {
    const workflows = await DynamoModel.queryByType(req.orgId, 'workflow');
    res.json({ success: true, count: workflows.length, data: workflows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createWorkflow = async (req, res) => {
  try {
    const id = `wf_${uuidv4().slice(0, 8)}`;
    const newWf = {
      ...req.body,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true,
      stats: { totalExecuted: 0, successRate: '100%' },
    };
    const saved = await DynamoModel.putItem(req.orgId, 'workflow', id, newWf);
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateWorkflow = async (req, res) => {
  try {
    const updated = await DynamoModel.updateItem(req.orgId, 'workflow', req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteWorkflow = async (req, res) => {
  try {
    await DynamoModel.deleteItem(req.orgId, 'workflow', req.params.id);
    res.json({ success: true, message: 'Workflow deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Test Execution Simulation
exports.runTestWorkflow = async (req, res) => {
  try {
    const wf = await DynamoModel.getItem(req.orgId, 'workflow', req.params.id);
    if (!wf) return res.status(404).json({ success: false, error: 'Workflow not found' });

    // Simulate execution step-by-step
    const executionLogs = [
      { step: '1. Trigger Evaluated', status: 'MATCH', details: `Event: ${wf.trigger?.event || 'custom.event'} matched payload.` },
      { step: '2. Conditions Checked', status: 'PASSED', details: `Conditions evaluated true.` },
      { step: '3. Actions Dispatched', status: 'EXECUTED', details: `${wf.actions?.length || 0} automation actions executed successfully.` },
    ];

    const currentStats = wf.stats || { totalExecuted: 0, successRate: '100%' };
    await DynamoModel.updateItem(req.orgId, 'workflow', req.params.id, {
      stats: {
        totalExecuted: (currentStats.totalExecuted || 0) + 1,
        successRate: '100%',
      },
    });

    res.json({
      success: true,
      message: 'Workflow test simulation executed successfully!',
      logs: executionLogs,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
