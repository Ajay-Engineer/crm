const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1';

async function request(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'x-organization-id': 'default_org',
    ...options.headers,
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });
    
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP ${res.status}: ${res.statusText}`);
    }
    
    return await res.json();
  } catch (err) {
    console.error(`API Error on [${options.method || 'GET'}] ${endpoint}:`, err);
    throw err;
  }
}

export const api = {
  // AWS Status
  getAwsStatus: () => request('/aws/status'),
  
  // Dashboard & Analytics
  getDashboardKPIs: () => request('/analytics/dashboard'),
  
  // Leads
  getLeads: () => request('/leads'),
  createLead: (data) => request('/leads', { method: 'POST', body: JSON.stringify(data) }),
  updateLead: (id, data) => request(`/leads/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteLead: (id) => request(`/leads/${id}`, { method: 'DELETE' }),
  convertLead: (id) => request(`/leads/${id}/convert`, { method: 'POST' }),

  // Contacts & Customer 360
  getContacts: () => request('/contacts'),
  getContactById: (id) => request(`/contacts/${id}`),
  createContact: (data) => request('/contacts', { method: 'POST', body: JSON.stringify(data) }),
  updateContact: (id, data) => request(`/contacts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteContact: (id) => request(`/contacts/${id}`, { method: 'DELETE' }),

  // Companies
  getCompanies: () => request('/companies'),
  createCompany: (data) => request('/companies', { method: 'POST', body: JSON.stringify(data) }),
  updateCompany: (id, data) => request(`/companies/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCompany: (id) => request(`/companies/${id}`, { method: 'DELETE' }),

  // Deals & Pipelines
  getDeals: () => request('/deals'),
  createDeal: (data) => request('/deals', { method: 'POST', body: JSON.stringify(data) }),
  updateDeal: (id, data) => request(`/deals/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  updateDealStage: (id, stageId, status) => request(`/deals/${id}/stage`, { method: 'PATCH', body: JSON.stringify({ stageId, status }) }),
  deleteDeal: (id) => request(`/deals/${id}`, { method: 'DELETE' }),
  getPipelines: () => request('/pipelines'),

  // Activities
  getActivities: () => request('/activities'),
  createActivity: (data) => request('/activities', { method: 'POST', body: JSON.stringify(data) }),

  // Workflows
  getWorkflows: () => request('/workflows'),
  createWorkflow: (data) => request('/workflows', { method: 'POST', body: JSON.stringify(data) }),
  updateWorkflow: (id, data) => request(`/workflows/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteWorkflow: (id) => request(`/workflows/${id}`, { method: 'DELETE' }),
  runTestWorkflow: (id) => request(`/workflows/${id}/run-test`, { method: 'POST' }),

  // Custom Objects
  getCustomSchemas: () => request('/custom-objects/schemas'),
  createCustomSchema: (data) => request('/custom-objects/schemas', { method: 'POST', body: JSON.stringify(data) }),
  getCustomRecords: (schemaId) => request(`/custom-objects/${schemaId}/records`),
  createCustomRecord: (schemaId, data) => request(`/custom-objects/${schemaId}/records`, { method: 'POST', body: JSON.stringify(data) }),
  deleteCustomRecord: (schemaId, recordId) => request(`/custom-objects/${schemaId}/records/${recordId}`, { method: 'DELETE' }),

  // Support Tickets
  getTickets: () => request('/tickets'),
  createTicket: (data) => request('/tickets', { method: 'POST', body: JSON.stringify(data) }),
  updateTicket: (id, data) => request(`/tickets/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTicket: (id) => request(`/tickets/${id}`, { method: 'DELETE' }),

  // AI Assistant
  queryAi: (query) => request('/ai/query', { method: 'POST', body: JSON.stringify({ query }) }),
  generateSmartReply: (data) => request('/ai/smart-reply', { method: 'POST', body: JSON.stringify(data) }),

  // Settings
  getSettings: () => request('/admin/settings'),
  updateSettings: (data) => request('/admin/settings', { method: 'PUT', body: JSON.stringify(data) }),
};
