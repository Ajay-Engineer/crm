// Initial Fallback / Seed Data for Static Hosted Deployments (Firebase Hosting)
const LOCAL_STORAGE_KEY = 'HIG_CRM_LOCAL_STORE_V1';

const initialStore = {
  kpis: {
    summary: {
      totalPipelineValue: 415000,
      wonValue: 175000,
      winRate: 68,
      avgDealSize: 83000,
      totalLeads: 3,
      totalContacts: 3,
      totalCompanies: 4,
      openTickets: 1,
      totalActivities: 3,
    },
    monthlyRevenue: [
      { month: 'Apr', revenue: 42000, target: 40000 },
      { month: 'May', revenue: 68000, target: 55000 },
      { month: 'Jun', revenue: 95000, target: 80000 },
      { month: 'Jul', revenue: 130000, target: 110000 },
      { month: 'Aug', revenue: 175000, target: 150000 },
      { month: 'Sep (Forecast)', revenue: 220000, target: 180000 },
    ],
    stageDistribution: [
      { stage: 'New Inbound', count: 4, value: 35000 },
      { stage: 'Discovery', count: 3, value: 36000 },
      { stage: 'Proposal Sent', count: 2, value: 120000 },
      { stage: 'Negotiation', count: 1, value: 84000 },
      { stage: 'Closed Won', count: 2, value: 175000 },
    ],
    leadSources: [
      { name: 'Website Demo Request', count: 7, color: '#38b6ff' },
      { name: 'WhatsApp Inbound', count: 5, color: '#10b981' },
      { name: 'LinkedIn Ads', count: 4, color: '#6366f1' },
      { name: 'Referral / Direct', count: 3, color: '#f59e0b' },
    ],
  },
  deals: [
    {
      id: 'deal_001',
      pipelineId: 'pipe_sales_default',
      stageId: 'stg_negotiation',
      title: 'Horizon RE — 120-Seat Enterprise Migration',
      companyName: 'Horizon Real Estate Holdings',
      contactName: 'Marcus Vance',
      value: 84000,
      expectedCloseDate: '2026-09-25',
      aiWinProbability: 88,
      aiRiskAlert: 'Low Risk — Contract terms aligned, waiting on final legal signoff.',
      status: 'open',
    },
    {
      id: 'deal_002',
      pipelineId: 'pipe_sales_default',
      stageId: 'stg_proposal',
      title: 'Apex Robotics — Global AI Voice & WhatsApp Connect',
      companyName: 'Apex AI Robotics Inc',
      contactName: 'Elena Rostova',
      value: 120000,
      expectedCloseDate: '2026-10-15',
      aiWinProbability: 75,
      aiRiskAlert: 'Medium Risk — Competitor presented demo yesterday. Schedule VIP tech review.',
      status: 'open',
    },
    {
      id: 'deal_003',
      pipelineId: 'pipe_sales_default',
      stageId: 'stg_won',
      title: 'NovaCare Health — Multi-Facility Patient CRM',
      companyName: 'NovaCare Health Systems',
      contactName: 'Dr. Sarah Jenkins',
      value: 175000,
      expectedCloseDate: '2026-08-20',
      aiWinProbability: 100,
      aiRiskAlert: 'Won 🏆 Onboarding commenced smoothly.',
      status: 'won',
    },
    {
      id: 'deal_004',
      pipelineId: 'pipe_sales_default',
      stageId: 'stg_discovery',
      title: 'CloudPulse — AI Customer Journey Automations',
      companyName: 'CloudPulse Technologies',
      contactName: 'Elena Rostova',
      value: 36000,
      expectedCloseDate: '2026-11-01',
      aiWinProbability: 60,
      aiRiskAlert: 'Action Required: Send custom API documentation.',
      status: 'open',
    },
  ],
  leads: [
    {
      id: 'lead_001',
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
      createdAt: new Date().toISOString(),
    },
    {
      id: 'lead_002',
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
      createdAt: new Date().toISOString(),
    },
    {
      id: 'lead_003',
      firstName: 'Liam',
      lastName: "O'Connor",
      email: 'liam@celtichospitality.ie',
      phone: '+353 1 890 2341',
      company: 'Celtic Luxury Hotels',
      source: 'WhatsApp Inbound Chat',
      status: 'qualified',
      leadScore: 95,
      aiIntent: 'Hot Deal Ready — Wants custom Property/Reservation object and VIP guest tracking.',
      estimatedBudget: 65000,
      createdAt: new Date().toISOString(),
    },
  ],
  contacts: [
    {
      id: 'cont_001',
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
    },
    {
      id: 'cont_002',
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
    },
    {
      id: 'cont_003',
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
    },
  ],
  companies: [
    {
      id: 'comp_001',
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
      name: 'CloudPulse Technologies',
      domain: 'cloudpulse.io',
      industry: 'SaaS / B2B Software',
      annualRevenue: 8500000,
      employees: '50-100',
      phone: '+1 (555) 432-5678',
      city: 'Austin, TX',
      tags: ['High Growth', 'SaaS', 'High LTV'],
    },
  ],
  activities: [
    {
      id: 'act_001',
      type: 'whatsapp',
      title: 'WhatsApp Conversation with Marcus Vance',
      content: 'Marcus: "The custom property fields and AI automation templates look fantastic. Sending agreement to our legal team today."',
      metadata: { channel: 'WhatsApp Business' },
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: 'act_002',
      type: 'meeting',
      title: 'Executive AI Architecture Presentation',
      content: 'Presented HIG AI Automation Serverless architecture on AWS Lambda + DynamoDB. Elena confirmed it exceeds their latency benchmarks.',
      metadata: { channel: 'Zoom Video Call' },
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
    {
      id: 'act_003',
      type: 'ai_insight',
      title: 'AI Customer Health Diagnostic',
      content: 'AI detected zero open support tickets in last 14 days and 100% SLA compliance. Customer Health Score: 98/100.',
      metadata: { channel: 'Autonomous AI' },
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    },
  ],
  workflows: [
    {
      id: 'wf_001',
      name: 'High-Intent Lead WhatsApp & AI Follow-Up',
      isActive: true,
      trigger: {
        event: 'lead.created',
        label: 'When a new lead is captured from website/ads',
      },
      conditions: [{ field: 'leadScore', operator: 'greater_than', value: 75 }],
      actions: [
        { type: 'send_whatsapp', template: 'instant_welcome_vip', recipient: '{{lead.phone}}' },
        { type: 'assign_owner', target: 'user_admin_001' },
      ],
      stats: { totalExecuted: 142, successRate: '99.3%' },
    },
    {
      id: 'wf_002',
      name: 'Automated Deal Stage Notification & SLA Escalate',
      isActive: true,
      trigger: {
        event: 'deal.stalled',
        label: 'When deal stays in Negotiation stage > 5 days',
      },
      conditions: [{ field: 'value', operator: 'greater_than', value: 50000 }],
      actions: [
        { type: 'notify_channel', channel: '#executive-deals', message: '⚠️ High-value deal stalled' },
      ],
      stats: { totalExecuted: 38, successRate: '100%' },
    },
  ],
  customSchemas: [
    {
      id: 'schema_property',
      name: 'Property',
      singularLabel: 'Property',
      pluralLabel: 'Properties',
      industryPreset: 'Real Estate',
      fields: [
        { key: 'propertyCode', label: 'Listing ID', type: 'text' },
        { key: 'propertyType', label: 'Type', type: 'select' },
        { key: 'price', label: 'List Price ($)', type: 'currency' },
        { key: 'bedrooms', label: 'Bedrooms', type: 'number' },
        { key: 'location', label: 'Location / City', type: 'text' },
      ],
    },
    {
      id: 'schema_patient',
      name: 'Patient Dossier',
      singularLabel: 'Patient Dossier',
      pluralLabel: 'Patient Dossiers',
      industryPreset: 'Healthcare',
      fields: [
        { key: 'mrn', label: 'Medical Record #', type: 'text' },
        { key: 'bloodGroup', label: 'Blood Group', type: 'select' },
        { key: 'primaryPhysician', label: 'Assigned Physician', type: 'text' },
      ],
    },
  ],
  customRecords: {
    schema_property: [
      {
        id: 'rec_prop_01',
        data: {
          propertyCode: 'VILLA-MIA-09',
          propertyType: 'Luxury Villa',
          price: 2850000,
          bedrooms: 6,
          location: 'Star Island, Miami, FL',
        },
      },
      {
        id: 'rec_prop_02',
        data: {
          propertyCode: 'PENT-NYC-44',
          propertyType: 'Penthouse',
          price: 4900000,
          bedrooms: 4,
          location: 'Tribeca, New York, NY',
        },
      },
    ],
    schema_patient: [
      {
        id: 'rec_pat_01',
        data: {
          mrn: 'MRN-88219',
          bloodGroup: 'O+',
          primaryPhysician: 'Dr. Sarah Jenkins',
        },
      },
    ],
  },
  tickets: [
    {
      id: 'tick_001',
      contactName: 'Elena Rostova (Apex Robotics)',
      subject: 'Request for custom AWS S3 Document bucket integration',
      priority: 'high',
      status: 'in_progress',
      slaDueMinutes: 45,
      category: 'Technical Integration',
      aiSuggestedSolution: 'Provide direct pre-signed URL S3 API documentation and verify IAM bucket policy permissions.',
    },
    {
      id: 'tick_002',
      contactName: 'Marcus Vance (Horizon RE)',
      subject: 'Add 15 additional broker accounts to workspace',
      priority: 'medium',
      status: 'resolved',
      slaDueMinutes: 0,
      category: 'Billing & Licenses',
      aiSuggestedSolution: 'Seat tier upgraded to Enterprise automatically.',
    },
  ],
  awsStatus: {
    success: true,
    status: 'CONNECTED',
    provider: 'Amazon Web Services (AWS)',
    region: 'ap-south-1',
    database: 'Amazon DynamoDB (Serverless On-Demand)',
    tableName: 'HIG_CRM_MAIN',
    tableStatus: 'ACTIVE',
    itemCount: 24,
    tableSizeBytes: 14200,
  },
};

function getLocalStore() {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return initialStore;
}

function saveLocalStore(store) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store));
  } catch (e) {}
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1';

async function safeFetch(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-organization-id': 'default_org',
        ...options.headers,
      },
    });

    const contentType = res.headers.get('content-type');
    if (res.ok && contentType && contentType.includes('application/json')) {
      return await res.json();
    }
  } catch (err) {
    // Network or offline fallback
  }
  return null;
}

export const api = {
  // AWS Status
  getAwsStatus: async () => {
    const live = await safeFetch('/aws/status');
    if (live) return live;
    return getLocalStore().awsStatus;
  },

  // Dashboard & Analytics
  getDashboardKPIs: async () => {
    const live = await safeFetch('/analytics/dashboard');
    if (live) return live;
    const store = getLocalStore();
    return {
      success: true,
      data: {
        ...store.kpis,
        recentActivities: store.activities.slice(0, 5),
      },
    };
  },

  // Leads
  getLeads: async () => {
    const live = await safeFetch('/leads');
    if (live) return live;
    return { success: true, data: getLocalStore().leads };
  },

  createLead: async (data) => {
    const live = await safeFetch('/leads', { method: 'POST', body: JSON.stringify(data) });
    if (live) return live;

    const store = getLocalStore();
    const newLead = {
      id: `lead_${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      leadScore: data.leadScore || 85,
      status: 'new',
      ...data,
    };
    store.leads.unshift(newLead);
    store.kpis.summary.totalLeads += 1;
    saveLocalStore(store);
    return { success: true, data: newLead };
  },

  updateLead: async (id, data) => {
    const live = await safeFetch(`/leads/${id}`, { method: 'PUT', body: JSON.stringify(data) });
    if (live) return live;

    const store = getLocalStore();
    store.leads = store.leads.map((l) => (l.id === id ? { ...l, ...data } : l));
    saveLocalStore(store);
    return { success: true, data };
  },

  convertLead: async (id) => {
    const live = await safeFetch(`/leads/${id}/convert`, { method: 'POST' });
    if (live) return live;

    const store = getLocalStore();
    const lead = store.leads.find((l) => l.id === id);
    if (lead) {
      lead.status = 'converted';
      // Create deal
      const newDeal = {
        id: `deal_${Date.now().toString().slice(-6)}`,
        pipelineId: 'pipe_sales_default',
        stageId: 'stg_discovery',
        title: `${lead.company || lead.firstName} — Enterprise Expansion`,
        companyName: lead.company || `${lead.firstName} Inc`,
        contactName: `${lead.firstName} ${lead.lastName || ''}`,
        value: lead.estimatedBudget || 35000,
        expectedCloseDate: '2026-10-30',
        aiWinProbability: 70,
        status: 'open',
      };
      store.deals.unshift(newDeal);
      store.kpis.summary.totalPipelineValue += newDeal.value;
      saveLocalStore(store);
      return { success: true, data: { deal: newDeal } };
    }
    return { success: true };
  },

  // Contacts
  getContacts: async () => {
    const live = await safeFetch('/contacts');
    if (live) return live;
    return { success: true, data: getLocalStore().contacts };
  },

  getContactById: async (id) => {
    const live = await safeFetch(`/contacts/${id}`);
    if (live) return live;

    const store = getLocalStore();
    const contact = store.contacts.find((c) => c.id === id) || store.contacts[0];
    return {
      success: true,
      data: {
        ...contact,
        customer360: {
          deals: store.deals.filter((d) => d.contactName?.includes(contact.firstName)),
          tickets: store.tickets.filter((t) => t.contactName?.includes(contact.firstName)),
          activities: store.activities,
          totalDealValue: 120000,
          openTicketsCount: 1,
        },
      },
    };
  },

  // Companies
  getCompanies: async () => {
    const live = await safeFetch('/companies');
    if (live) return live;
    return { success: true, data: getLocalStore().companies };
  },

  // Deals & Pipelines
  getDeals: async () => {
    const live = await safeFetch('/deals');
    if (live) return live;
    return { success: true, data: getLocalStore().deals };
  },

  createDeal: async (data) => {
    const live = await safeFetch('/deals', { method: 'POST', body: JSON.stringify(data) });
    if (live) return live;

    const store = getLocalStore();
    const newDeal = {
      id: `deal_${Date.now().toString().slice(-6)}`,
      pipelineId: 'pipe_sales_default',
      stageId: data.stageId || 'stg_lead_in',
      value: Number(data.value) || 25000,
      status: 'open',
      aiWinProbability: data.aiWinProbability || 60,
      ...data,
    };
    store.deals.unshift(newDeal);
    store.kpis.summary.totalPipelineValue += newDeal.value;
    saveLocalStore(store);
    return { success: true, data: newDeal };
  },

  updateDealStage: async (id, stageId, status) => {
    const live = await safeFetch(`/deals/${id}/stage`, {
      method: 'PATCH',
      body: JSON.stringify({ stageId, status }),
    });
    if (live) return live;

    const store = getLocalStore();
    store.deals = store.deals.map((d) =>
      d.id === id ? { ...d, stageId, status: status || d.status } : d
    );
    saveLocalStore(store);
    return { success: true };
  },

  // Activities
  getActivities: async () => {
    const live = await safeFetch('/activities');
    if (live) return live;
    return { success: true, data: getLocalStore().activities };
  },

  createActivity: async (data) => {
    const live = await safeFetch('/activities', { method: 'POST', body: JSON.stringify(data) });
    if (live) return live;

    const store = getLocalStore();
    const newAct = {
      id: `act_${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      ...data,
    };
    store.activities.unshift(newAct);
    saveLocalStore(store);
    return { success: true, data: newAct };
  },

  // Workflows
  getWorkflows: async () => {
    const live = await safeFetch('/workflows');
    if (live) return live;
    return { success: true, data: getLocalStore().workflows };
  },

  runTestWorkflow: async (id) => {
    const live = await safeFetch(`/workflows/${id}/run-test`, { method: 'POST' });
    if (live) return live;

    return {
      success: true,
      logs: [
        { step: '1. Trigger Evaluated', status: 'MATCH', details: 'Trigger event captured successfully.' },
        { step: '2. Conditions Passed', status: 'PASSED', details: 'Threshold criteria satisfied.' },
        { step: '3. Actions Dispatched', status: 'EXECUTED', details: 'All automation actions executed.' },
      ],
    };
  },

  // Custom Objects
  getCustomSchemas: async () => {
    const live = await safeFetch('/custom-objects/schemas');
    if (live) return live;
    return { success: true, data: getLocalStore().customSchemas };
  },

  createCustomSchema: async (data) => {
    const live = await safeFetch('/custom-objects/schemas', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (live) return live;

    const store = getLocalStore();
    const id = `schema_${data.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    const newSchema = { id, ...data };
    store.customSchemas.push(newSchema);
    store.customRecords[id] = [];
    saveLocalStore(store);
    return { success: true, data: newSchema };
  },

  getCustomRecords: async (schemaId) => {
    const live = await safeFetch(`/custom-objects/${schemaId}/records`);
    if (live) return live;
    const store = getLocalStore();
    return { success: true, data: store.customRecords[schemaId] || [] };
  },

  // Support Tickets
  getTickets: async () => {
    const live = await safeFetch('/tickets');
    if (live) return live;
    return { success: true, data: getLocalStore().tickets };
  },

  updateTicket: async (id, data) => {
    const live = await safeFetch(`/tickets/${id}`, { method: 'PUT', body: JSON.stringify(data) });
    if (live) return live;

    const store = getLocalStore();
    store.tickets = store.tickets.map((t) => (t.id === id ? { ...t, ...data } : t));
    saveLocalStore(store);
    return { success: true, data };
  },

  // AI Assistant Engine
  queryAi: async (query) => {
    const live = await safeFetch('/ai/query', { method: 'POST', body: JSON.stringify({ query }) });
    if (live) return live;

    const lower = (query || '').toLowerCase();
    let answer = `🤖 **HIG AI Business Analyst**:\n\nAnalyzing your entire **AWS DynamoDB** single-table CRM dataset:\n\n* **Active Pipeline**: **$415,000** across 4 opportunities.\n* **Closed Won Revenue**: **$175,000**.\n* **High-Intent Leads**: **3 leads ready for closing**.\n\n💡 **Recommendation**: Horizon Real Estate deal is ready for legal signing.`;
    
    if (lower.includes('lead') || lower.includes('hot')) {
      answer = `🎯 **HIG Lead Intelligence**:\n\n* **Top Lead**: **Liam O'Connor** (Celtic Luxury Hotels) — AI Score: **95/100**.\n* **Intent**: Urgent interest in custom Property/Reservation schema.\n* **Action**: WhatsApp welcome message has been dispatched.`;
    } else if (lower.includes('risk') || lower.includes('stalled')) {
      answer = `⚠️ **HIG Deal Risk Radar**:\n\n* **Stalled Deal**: *Apex AI Robotics* ($120,000) has been in Proposal stage for 12 days.\n* **Suggested Action**: Send technical AWS S3 deployment brief.`;
    }

    return {
      success: true,
      answer,
      actionSuggestions: ['View Deal Pipeline', 'Summarize today\'s hot leads', 'Run revenue forecast'],
    };
  },

  generateSmartReply: async ({ recipientName, channel }) => {
    const live = await safeFetch('/ai/smart-reply', {
      method: 'POST',
      body: JSON.stringify({ recipientName, channel }),
    });
    if (live) return live;

    return {
      success: true,
      draft: `Hi ${recipientName || 'there'}! 👋 This is Ajai from HIG AI Automation. Following up on your enterprise CRM deployment. Let me know if Thursday 2 PM works for a brief walk-through!`,
    };
  },

  // Settings
  getSettings: async () => {
    const live = await safeFetch('/admin/settings');
    if (live) return live;
    return {
      success: true,
      data: {
        name: 'HIG AI AUTOMATION',
        branding: { primaryColor: '#38B6FF', logoUrl: '/logo.png' },
      },
    };
  },

  updateSettings: async (data) => {
    const live = await safeFetch('/admin/settings', { method: 'PUT', body: JSON.stringify(data) });
    if (live) return live;
    return { success: true, data };
  },
};
