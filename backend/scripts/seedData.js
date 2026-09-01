const DynamoModel = require('../models/dynamoModel');
const { v4: uuidv4 } = require('uuid');

const ORG_ID = 'default_org';

async function seedDatabase() {
  console.log(`🌱 Seeding initial rich CRM data into DynamoDB for Org: ${ORG_ID}...`);

  const now = new Date().toISOString();

  // 1. Organization & Branding
  const org = {
    id: ORG_ID,
    entityType: 'organization',
    orgId: ORG_ID,
    name: 'HIG AI Automation Enterprise',
    slug: 'hig-automation',
    plan: 'Enterprise AI Suite',
    branding: {
      primaryColor: '#38B6FF',
      secondaryColor: '#0284C7',
      darkColor: '#0B132B',
      logoUrl: '/logo.png',
      brandName: 'HIG AI AUTOMATION',
    },
    createdAt: now,
  };
  await DynamoModel.putItem(ORG_ID, 'organization', ORG_ID, org);

  // 2. Pipelines
  const salesPipeline = {
    id: 'pipe_sales_default',
    entityType: 'pipeline',
    orgId: ORG_ID,
    name: 'Enterprise Sales Pipeline',
    isDefault: true,
    stages: [
      { id: 'stg_lead_in', name: 'New Lead Inbound', order: 1, probability: 10, color: '#94A3B8' },
      { id: 'stg_discovery', name: 'Discovery & Qualification', order: 2, probability: 30, color: '#38B6FF' },
      { id: 'stg_proposal', name: 'Proposal / Demo Sent', order: 3, probability: 60, color: '#6366F1' },
      { id: 'stg_negotiation', name: 'Contract Negotiation', order: 4, probability: 80, color: '#F59E0B' },
      { id: 'stg_won', name: 'Closed Won 🏆', order: 5, probability: 100, color: '#10B981' },
      { id: 'stg_lost', name: 'Closed Lost', order: 6, probability: 0, color: '#EF4444' },
    ],
  };
  await DynamoModel.putItem(ORG_ID, 'pipeline', salesPipeline.id, salesPipeline);

  // 3. Companies
  const companies = [
    {
      id: 'comp_001',
      entityType: 'company',
      orgId: ORG_ID,
      name: 'Apex AI Robotics Inc',
      domain: 'apexrobotics.ai',
      industry: 'Automation & Hardware',
      annualRevenue: 14500000,
      employees: '250-500',
      phone: '+1 (555) 234-8900',
      city: 'San Francisco, CA',
      tags: ['Enterprise', 'Tier-1', 'AI Hardware'],
    },
    {
      id: 'comp_002',
      entityType: 'company',
      orgId: ORG_ID,
      name: 'Horizon Real Estate Holdings',
      domain: 'horizonre.com',
      industry: 'Real Estate & Properties',
      annualRevenue: 32000000,
      employees: '500+',
      phone: '+1 (555) 890-1234',
      city: 'Miami, FL',
      tags: ['Luxury Brokerage', 'Custom Objects'],
    },
    {
      id: 'comp_003',
      entityType: 'company',
      orgId: ORG_ID,
      name: 'NovaCare Health Systems',
      domain: 'novacarehealth.org',
      industry: 'Healthcare & Life Sciences',
      annualRevenue: 54000000,
      employees: '1000+',
      phone: '+1 (555) 678-9012',
      city: 'Boston, MA',
      tags: ['Healthcare', 'HIPAA', 'SLA Critical'],
    },
    {
      id: 'comp_004',
      entityType: 'company',
      orgId: ORG_ID,
      name: 'CloudPulse Technologies',
      domain: 'cloudpulse.io',
      industry: 'SaaS / B2B Software',
      annualRevenue: 8500000,
      employees: '50-100',
      phone: '+1 (555) 432-5678',
      city: 'Austin, TX',
      tags: ['High Growth', 'SaaS', 'High LTV'],
    },
  ];

  for (const c of companies) {
    await DynamoModel.putItem(ORG_ID, 'company', c.id, c);
  }

  // 4. Contacts
  const contacts = [
    {
      id: 'cont_001',
      entityType: 'contact',
      orgId: ORG_ID,
      companyId: 'comp_001',
      companyName: 'Apex AI Robotics Inc',
      firstName: 'Elena',
      lastName: 'Rostova',
      email: 'elena.rostova@apexrobotics.ai',
      phone: '+1 (555) 891-2345',
      jobTitle: 'VP of Global Operations',
      status: 'customer',
      leadScore: 94,
      aiHealthScore: 98,
      lastInteraction: 'Yesterday via WhatsApp',
      notes: 'Decision maker for upcoming global automation rollout.',
    },
    {
      id: 'cont_002',
      entityType: 'contact',
      orgId: ORG_ID,
      companyId: 'comp_002',
      companyName: 'Horizon Real Estate Holdings',
      firstName: 'Marcus',
      lastName: 'Vance',
      email: 'marcus.vance@horizonre.com',
      phone: '+1 (555) 443-7890',
      jobTitle: 'Chief Revenue Officer',
      status: 'qualified',
      leadScore: 88,
      aiHealthScore: 85,
      lastInteraction: '3 hours ago via Email',
      notes: 'Looking to replace Salesforce with HIG AI Automation CRM for 120 agents.',
    },
    {
      id: 'cont_003',
      entityType: 'contact',
      orgId: ORG_ID,
      companyId: 'comp_003',
      companyName: 'NovaCare Health Systems',
      firstName: 'Dr. Sarah',
      lastName: 'Jenkins',
      email: 'sjenkins@novacarehealth.org',
      phone: '+1 (555) 912-3456',
      jobTitle: 'Head of Patient Experience',
      status: 'customer',
      leadScore: 92,
      aiHealthScore: 96,
      lastInteraction: '2 days ago via Zoom Meeting',
      notes: 'Requires custom Patient Care workflows and SLA notifications.',
    },
  ];

  for (const ct of contacts) {
    await DynamoModel.putItem(ORG_ID, 'contact', ct.id, ct);
  }

  // 5. Leads
  const leads = [
    {
      id: 'lead_001',
      entityType: 'lead',
      orgId: ORG_ID,
      firstName: 'David',
      lastName: 'Kowalski',
      email: 'david@zenithlogistics.com',
      phone: '+1 (555) 789-0123',
      company: 'Zenith Logistics Global',
      source: 'Website Demo Request',
      status: 'new',
      leadScore: 89,
      aiIntent: 'High Buying Intent — Expressed urgent interest in multi-branch CRM automation.',
      estimatedBudget: 45000,
      assignedTo: 'Ajai (Admin)',
      createdAt: now,
    },
    {
      id: 'lead_002',
      entityType: 'lead',
      orgId: ORG_ID,
      firstName: 'Sophia',
      lastName: 'Chen',
      email: 'sophia@luminawealth.com',
      phone: '+1 (555) 345-6789',
      company: 'Lumina Wealth Advisory',
      source: 'LinkedIn Ad Campaign',
      status: 'contacted',
      leadScore: 76,
      aiIntent: 'Warm Lead — Wants to automate client follow-ups via WhatsApp and AI Email briefs.',
      estimatedBudget: 28000,
      assignedTo: 'Ajai (Admin)',
      createdAt: now,
    },
    {
      id: 'lead_003',
      entityType: 'lead',
      orgId: ORG_ID,
      firstName: 'Liam',
      lastName: 'O\'Connor',
      email: 'liam@celtichospitality.ie',
      phone: '+353 1 890 2341',
      company: 'Celtic Luxury Hotels',
      source: 'WhatsApp Inbound Chat',
      status: 'qualified',
      leadScore: 95,
      aiIntent: 'Hot Deal Ready — Wants custom Property/Reservation object and VIP guest tracking.',
      estimatedBudget: 65000,
      assignedTo: 'Ajai (Admin)',
      createdAt: now,
    },
  ];

  for (const l of leads) {
    await DynamoModel.putItem(ORG_ID, 'lead', l.id, l);
  }

  // 6. Deals
  const deals = [
    {
      id: 'deal_001',
      entityType: 'deal',
      orgId: ORG_ID,
      pipelineId: 'pipe_sales_default',
      stageId: 'stg_negotiation',
      title: 'Horizon RE — 120-Seat Enterprise Migration',
      companyId: 'comp_002',
      companyName: 'Horizon Real Estate Holdings',
      contactId: 'cont_002',
      contactName: 'Marcus Vance',
      value: 84000,
      currency: 'USD',
      expectedCloseDate: '2026-09-25',
      aiWinProbability: 88,
      aiRiskAlert: 'Low Risk — Contract terms aligned, waiting on final legal signoff.',
      status: 'open',
    },
    {
      id: 'deal_002',
      entityType: 'deal',
      orgId: ORG_ID,
      pipelineId: 'pipe_sales_default',
      stageId: 'stg_proposal',
      title: 'Apex Robotics — Global AI Voice & WhatsApp Connect',
      companyId: 'comp_001',
      companyName: 'Apex AI Robotics Inc',
      contactId: 'cont_001',
      contactName: 'Elena Rostova',
      value: 120000,
      currency: 'USD',
      expectedCloseDate: '2026-10-15',
      aiWinProbability: 75,
      aiRiskAlert: 'Medium Risk — Competitor presented demo yesterday. Schedule VIP tech review.',
      status: 'open',
    },
    {
      id: 'deal_003',
      entityType: 'deal',
      orgId: ORG_ID,
      pipelineId: 'pipe_sales_default',
      stageId: 'stg_won',
      title: 'NovaCare Health — Multi-Facility Patient CRM',
      companyId: 'comp_003',
      companyName: 'NovaCare Health Systems',
      contactId: 'cont_003',
      contactName: 'Dr. Sarah Jenkins',
      value: 175000,
      currency: 'USD',
      expectedCloseDate: '2026-08-20',
      aiWinProbability: 100,
      aiRiskAlert: 'Won 🏆 Onboarding commenced smoothly.',
      status: 'won',
    },
    {
      id: 'deal_004',
      entityType: 'deal',
      orgId: ORG_ID,
      pipelineId: 'pipe_sales_default',
      stageId: 'stg_discovery',
      title: 'CloudPulse — AI Customer Journey Automations',
      companyId: 'comp_004',
      companyName: 'CloudPulse Technologies',
      contactId: 'cont_001',
      contactName: 'Elena Rostova',
      value: 36000,
      currency: 'USD',
      expectedCloseDate: '2026-11-01',
      aiWinProbability: 60,
      aiRiskAlert: 'Action Required: Send custom API documentation.',
      status: 'open',
    },
  ];

  for (const d of deals) {
    await DynamoModel.putItem(ORG_ID, 'deal', d.id, d);
  }

  // 7. Omnichannel Activities / Timeline
  const activities = [
    {
      id: 'act_001',
      entityType: 'activity',
      orgId: ORG_ID,
      contactId: 'cont_002',
      dealId: 'deal_001',
      type: 'whatsapp',
      title: 'WhatsApp Conversation with Marcus Vance',
      content: 'Marcus: "The custom property fields and AI automation templates look fantastic. Sending agreement to our legal team today."',
      metadata: { direction: 'inbound', channel: 'WhatsApp Business' },
      createdAt: now,
    },
    {
      id: 'act_002',
      entityType: 'activity',
      orgId: ORG_ID,
      contactId: 'cont_001',
      dealId: 'deal_002',
      type: 'meeting',
      title: 'Executive AI Architecture Presentation',
      content: 'Presented HIG AI Automation Serverless architecture on AWS Lambda + DynamoDB. Elena confirmed it exceeds their latency benchmarks.',
      metadata: { durationMinutes: 45, platform: 'Zoom' },
      createdAt: now,
    },
    {
      id: 'act_003',
      entityType: 'activity',
      orgId: ORG_ID,
      contactId: 'cont_003',
      dealId: 'deal_003',
      type: 'ai_insight',
      title: 'AI Customer Health Diagnostic',
      content: 'AI detected zero open support tickets in last 14 days and 100% SLA compliance. Customer Health Score: 98/100.',
      metadata: { confidence: 0.98 },
      createdAt: now,
    },
  ];

  for (const act of activities) {
    await DynamoModel.putItem(ORG_ID, 'activity', act.id, act);
  }

  // 8. Workflows
  const workflows = [
    {
      id: 'wf_001',
      entityType: 'workflow',
      orgId: ORG_ID,
      name: 'High-Intent Lead WhatsApp & AI Follow-Up',
      isActive: true,
      trigger: {
        event: 'lead.created',
        label: 'When a new lead is captured from website/ads',
      },
      conditions: [
        { field: 'leadScore', operator: 'greater_than', value: 75 },
      ],
      actions: [
        { type: 'send_whatsapp', template: 'instant_welcome_vip', recipient: '{{lead.phone}}' },
        { type: 'assign_owner', target: 'user_admin_001' },
        { type: 'create_task', title: 'Call high-priority lead within 1 hour', dueInHours: 1 },
      ],
      stats: { totalExecuted: 142, successRate: '99.3%' },
    },
    {
      id: 'wf_002',
      entityType: 'workflow',
      orgId: ORG_ID,
      name: 'Automated Deal Stage Notification & SLA Escalate',
      isActive: true,
      trigger: {
        event: 'deal.stalled',
        label: 'When deal stays in Negotiation stage > 5 days',
      },
      conditions: [
        { field: 'value', operator: 'greater_than', value: 50000 },
      ],
      actions: [
        { type: 'notify_channel', channel: '#executive-deals', message: '⚠️ High-value deal stalled: {{deal.title}}' },
        { type: 'ai_generate_brief', task: 'Generate revival email with special discount' },
      ],
      stats: { totalExecuted: 38, successRate: '100%' },
    },
  ];

  for (const wf of workflows) {
    await DynamoModel.putItem(ORG_ID, 'workflow', wf.id, wf);
  }

  // 9. Custom Objects (Universal Schema Studio)
  const customObjectSchemas = [
    {
      id: 'schema_property',
      entityType: 'custom_object_schema',
      orgId: ORG_ID,
      name: 'Property',
      singularLabel: 'Property',
      pluralLabel: 'Properties',
      icon: 'Building2',
      color: '#38B6FF',
      industryPreset: 'Real Estate',
      fields: [
        { key: 'propertyCode', label: 'Listing ID', type: 'text', required: true },
        { key: 'propertyType', label: 'Type', type: 'select', options: ['Luxury Villa', 'Penthouse', 'Commercial Office', 'Plot'] },
        { key: 'price', label: 'List Price ($)', type: 'currency', required: true },
        { key: 'bedrooms', label: 'Bedrooms', type: 'number' },
        { key: 'location', label: 'Location / City', type: 'text' },
        { key: 'status', label: 'Availability', type: 'select', options: ['Available', 'Under Offer', 'Sold'] },
      ],
    },
    {
      id: 'schema_patient',
      entityType: 'custom_object_schema',
      orgId: ORG_ID,
      name: 'Patient Dossier',
      singularLabel: 'Patient Dossier',
      pluralLabel: 'Patient Dossiers',
      icon: 'HeartPulse',
      color: '#10B981',
      industryPreset: 'Healthcare',
      fields: [
        { key: 'mrn', label: 'Medical Record #', type: 'text', required: true },
        { key: 'bloodGroup', label: 'Blood Group', type: 'select', options: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] },
        { key: 'primaryPhysician', label: 'Assigned Physician', type: 'text' },
        { key: 'lastCheckup', label: 'Last Consultation', type: 'date' },
      ],
    },
  ];

  for (const cos of customObjectSchemas) {
    await DynamoModel.putItem(ORG_ID, 'custom_object_schema', cos.id, cos);
  }

  // Custom Object Sample Records
  const customRecords = [
    {
      id: 'rec_prop_01',
      entityType: 'custom_record_schema_property',
      schemaId: 'schema_property',
      orgId: ORG_ID,
      data: {
        propertyCode: 'VILLA-MIA-09',
        propertyType: 'Luxury Villa',
        price: 2850000,
        bedrooms: 6,
        location: 'Star Island, Miami, FL',
        status: 'Available',
      },
    },
    {
      id: 'rec_prop_02',
      entityType: 'custom_record_schema_property',
      schemaId: 'schema_property',
      orgId: ORG_ID,
      data: {
        propertyCode: 'PENT-NYC-44',
        propertyType: 'Penthouse',
        price: 4900000,
        bedrooms: 4,
        location: 'Tribeca, New York, NY',
        status: 'Under Offer',
      },
    },
  ];

  for (const cr of customRecords) {
    await DynamoModel.putItem(ORG_ID, cr.entityType, cr.id, cr);
  }

  // 10. Support Tickets
  const tickets = [
    {
      id: 'tick_001',
      entityType: 'ticket',
      orgId: ORG_ID,
      contactId: 'cont_001',
      contactName: 'Elena Rostova (Apex Robotics)',
      subject: 'Request for custom AWS S3 Document bucket integration',
      priority: 'high',
      status: 'in_progress',
      slaDueMinutes: 45,
      assignedTo: 'Ajai (Admin)',
      category: 'Technical Integration',
      aiSuggestedSolution: 'Provide direct pre-signed URL S3 API documentation and verify IAM bucket policy permissions.',
      createdAt: now,
    },
    {
      id: 'tick_002',
      entityType: 'ticket',
      orgId: ORG_ID,
      contactId: 'cont_002',
      contactName: 'Marcus Vance (Horizon RE)',
      subject: 'Add 15 additional broker accounts to workspace',
      priority: 'medium',
      status: 'resolved',
      slaDueMinutes: 0,
      assignedTo: 'Ajai (Admin)',
      category: 'Billing & Licenses',
      aiSuggestedSolution: 'Seat tier automatically upgraded from Growth to Enterprise. Confirmation sent via email.',
      createdAt: now,
    },
  ];

  for (const tk of tickets) {
    await DynamoModel.putItem(ORG_ID, 'ticket', tk.id, tk);
  }

  console.log('✅ DynamoDB Seeding completed successfully!');
}

if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Seeding error:', err);
      process.exit(1);
    });
}

module.exports = { seedDatabase };
