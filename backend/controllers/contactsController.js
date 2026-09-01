const DynamoModel = require('../models/dynamoModel');
const { v4: uuidv4 } = require('uuid');

exports.getContacts = async (req, res) => {
  try {
    const contacts = await DynamoModel.queryByType(req.orgId, 'contact');
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getContactById = async (req, res) => {
  try {
    const contact = await DynamoModel.getItem(req.orgId, 'contact', req.params.id);
    if (!contact) return res.status(404).json({ success: false, error: 'Contact not found' });

    // Fetch Customer 360 Linked Records
    const [allActivities, allDeals, allTickets] = await Promise.all([
      DynamoModel.queryByType(req.orgId, 'activity'),
      DynamoModel.queryByType(req.orgId, 'deal'),
      DynamoModel.queryByType(req.orgId, 'ticket'),
    ]);

    const linkedActivities = allActivities.filter((a) => a.contactId === req.params.id);
    const linkedDeals = allDeals.filter((d) => d.contactId === req.params.id);
    const linkedTickets = allTickets.filter((t) => t.contactId === req.params.id);

    res.json({
      success: true,
      data: {
        ...contact,
        customer360: {
          activities: linkedActivities,
          deals: linkedDeals,
          tickets: linkedTickets,
          totalDealValue: linkedDeals.reduce((sum, d) => sum + (Number(d.value) || 0), 0),
          openTicketsCount: linkedTickets.filter((t) => t.status !== 'resolved').length,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createContact = async (req, res) => {
  try {
    const id = `cont_${uuidv4().slice(0, 8)}`;
    const newContact = {
      ...req.body,
      leadScore: req.body.leadScore || 80,
      aiHealthScore: req.body.aiHealthScore || 90,
      status: req.body.status || 'qualified',
    };
    const saved = await DynamoModel.putItem(req.orgId, 'contact', id, newContact);
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const updated = await DynamoModel.updateItem(req.orgId, 'contact', req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    await DynamoModel.deleteItem(req.orgId, 'contact', req.params.id);
    res.json({ success: true, message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
