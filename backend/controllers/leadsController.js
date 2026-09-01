const DynamoModel = require('../models/dynamoModel');
const { v4: uuidv4 } = require('uuid');

// AI Lead Scoring & Intent Evaluation
function calculateAILeadScore(lead) {
  let score = 50;
  if (lead.email && !lead.email.includes('gmail.com') && !lead.email.includes('yahoo.com')) score += 15;
  if (lead.phone) score += 10;
  if (lead.estimatedBudget > 30000) score += 15;
  if (lead.source === 'Website Demo Request' || lead.source === 'WhatsApp Inbound Chat') score += 10;
  return Math.min(99, Math.max(10, score));
}

exports.getLeads = async (req, res) => {
  try {
    const leads = await DynamoModel.queryByType(req.orgId, 'lead');
    res.json({ success: true, count: leads.length, data: leads });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createLead = async (req, res) => {
  try {
    const id = `lead_${uuidv4().slice(0, 8)}`;
    const score = calculateAILeadScore(req.body);
    const newLead = {
      ...req.body,
      leadScore: req.body.leadScore || score,
      status: req.body.status || 'new',
      source: req.body.source || 'Direct',
    };
    const saved = await DynamoModel.putItem(req.orgId, 'lead', id, newLead);
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const updated = await DynamoModel.updateItem(req.orgId, 'lead', req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    await DynamoModel.deleteItem(req.orgId, 'lead', req.params.id);
    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Convert Lead -> Contact + Company + Deal in 1 click
exports.convertLead = async (req, res) => {
  try {
    const lead = await DynamoModel.getItem(req.orgId, 'lead', req.params.id);
    if (!lead) return res.status(404).json({ success: false, error: 'Lead not found' });

    // 1. Create Company
    const compId = `comp_${uuidv4().slice(0, 8)}`;
    const compName = lead.company || `${lead.firstName}'s Enterprise`;
    const company = await DynamoModel.putItem(req.orgId, 'company', compId, {
      name: compName,
      phone: lead.phone,
      industry: 'General / Converted Lead',
      annualRevenue: lead.estimatedBudget ? lead.estimatedBudget * 5 : 500000,
    });

    // 2. Create Contact
    const contId = `cont_${uuidv4().slice(0, 8)}`;
    const contact = await DynamoModel.putItem(req.orgId, 'contact', contId, {
      companyId: compId,
      companyName: compName,
      firstName: lead.firstName,
      lastName: lead.lastName,
      email: lead.email,
      phone: lead.phone,
      jobTitle: 'Primary Decision Maker',
      status: 'customer',
      leadScore: lead.leadScore || 90,
      aiHealthScore: 95,
      lastInteraction: 'Converted from Lead today',
    });

    // 3. Create Opportunity / Deal
    const dealId = `deal_${uuidv4().slice(0, 8)}`;
    const deal = await DynamoModel.putItem(req.orgId, 'deal', dealId, {
      pipelineId: 'pipe_sales_default',
      stageId: 'stg_discovery',
      title: `${compName} — Expansion Deal`,
      companyId: compId,
      companyName: compName,
      contactId: contId,
      contactName: `${lead.firstName} ${lead.lastName || ''}`,
      value: lead.estimatedBudget || 25000,
      currency: 'USD',
      expectedCloseDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      aiWinProbability: 65,
      status: 'open',
    });

    // Update Lead status to converted
    await DynamoModel.updateItem(req.orgId, 'lead', req.params.id, {
      status: 'converted',
      convertedContactId: contId,
      convertedCompanyId: compId,
      convertedDealId: dealId,
    });

    res.json({
      success: true,
      message: 'Lead successfully converted to Contact, Company & Deal!',
      data: { company, contact, deal },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
