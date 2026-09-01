const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const leadsController = require('../controllers/leadsController');
const contactsController = require('../controllers/contactsController');
const companiesController = require('../controllers/companiesController');
const dealsController = require('../controllers/dealsController');
const pipelinesController = require('../controllers/pipelinesController');
const activitiesController = require('../controllers/activitiesController');
const workflowsController = require('../controllers/workflowsController');
const customObjectsController = require('../controllers/customObjectsController');
const supportController = require('../controllers/supportController');
const aiController = require('../controllers/aiController');
const analyticsController = require('../controllers/analyticsController');
const adminController = require('../controllers/adminController');

// Public health check & AWS status check
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'HIG AI Automation CRM API',
    version: '1.0.0',
    aws_region: process.env.AWS_REGION || 'ap-south-1',
    dynamodb_table: process.env.DYNAMODB_TABLE_NAME || 'HIG_CRM_MAIN',
  });
});

router.get('/aws/status', adminController.testAWSConnection);

// Apply auth & tenant context to all CRM endpoints
router.use(authMiddleware);

// Leads
router.get('/leads', leadsController.getLeads);
router.post('/leads', leadsController.createLead);
router.put('/leads/:id', leadsController.updateLead);
router.delete('/leads/:id', leadsController.deleteLead);
router.post('/leads/:id/convert', leadsController.convertLead);

// Contacts & Customer 360
router.get('/contacts', contactsController.getContacts);
router.get('/contacts/:id', contactsController.getContactById);
router.post('/contacts', contactsController.createContact);
router.put('/contacts/:id', contactsController.updateContact);
router.delete('/contacts/:id', contactsController.deleteContact);

// Companies
router.get('/companies', companiesController.getCompanies);
router.post('/companies', companiesController.createCompany);
router.put('/companies/:id', companiesController.updateCompany);
router.delete('/companies/:id', companiesController.deleteCompany);

// Deals & Pipelines
router.get('/deals', dealsController.getDeals);
router.post('/deals', dealsController.createDeal);
router.put('/deals/:id', dealsController.updateDeal);
router.patch('/deals/:id/stage', dealsController.updateDealStage);
router.delete('/deals/:id', dealsController.deleteDeal);

router.get('/pipelines', pipelinesController.getPipelines);
router.post('/pipelines', pipelinesController.createPipeline);
router.put('/pipelines/:id', pipelinesController.updatePipeline);

// Omnichannel Activities
router.get('/activities', activitiesController.getActivities);
router.post('/activities', activitiesController.createActivity);
router.put('/activities/:id', activitiesController.updateActivity);
router.delete('/activities/:id', activitiesController.deleteActivity);

// Workflows & Automations
router.get('/workflows', workflowsController.getWorkflows);
router.post('/workflows', workflowsController.createWorkflow);
router.put('/workflows/:id', workflowsController.updateWorkflow);
router.delete('/workflows/:id', workflowsController.deleteWorkflow);
router.post('/workflows/:id/run-test', workflowsController.runTestWorkflow);

// Custom Object Schema & Dynamic Records Studio
router.get('/custom-objects/schemas', customObjectsController.getSchemas);
router.post('/custom-objects/schemas', customObjectsController.createSchema);
router.get('/custom-objects/:schemaId/records', customObjectsController.getRecords);
router.post('/custom-objects/:schemaId/records', customObjectsController.createRecord);
router.put('/custom-objects/:schemaId/records/:recordId', customObjectsController.updateRecord);
router.delete('/custom-objects/:schemaId/records/:recordId', customObjectsController.deleteRecord);

// Support & Helpdesk
router.get('/tickets', supportController.getTickets);
router.post('/tickets', supportController.createTicket);
router.put('/tickets/:id', supportController.updateTicket);
router.delete('/tickets/:id', supportController.deleteTicket);

// AI Layer
router.post('/ai/query', aiController.queryBusinessAnalyst);
router.post('/ai/smart-reply', aiController.generateSmartReply);

// Analytics
router.get('/analytics/dashboard', analyticsController.getDashboardKPIs);

// Admin & Settings
router.get('/admin/settings', adminController.getSettings);
router.put('/admin/settings', adminController.updateSettings);

module.exports = router;
