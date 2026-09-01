import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import confetti from 'canvas-confetti';

const CrmContext = createContext(null);

export function CrmProvider({ children }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Core Data Stores
  const [kpis, setKpis] = useState(null);
  const [leads, setLeads] = useState([]);
  const [deals, setDeals] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [activities, setActivities] = useState([]);
  const [workflows, setWorkflows] = useState([]);
  const [customSchemas, setCustomSchemas] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [awsStatus, setAwsStatus] = useState(null);

  // Selected Entity Details (for Customer 360, Drawer, etc.)
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [selectedContact360, setSelectedContact360] = useState(null);
  const [selectedCustomSchemaId, setSelectedCustomSchemaId] = useState('schema_property');

  // Modals & Drawers
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [isAddDealModalOpen, setIsAddDealModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Toast Notification
  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Trigger celebration confetti
  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38b6ff', '#10b981', '#ffffff', '#0284c7'],
    });
  };

  // Fetch all Initial CRM Data from AWS DynamoDB
  const refreshData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [kpiRes, leadsRes, dealsRes, contactsRes, compRes, actRes, wfRes, schemaRes, tickRes, awsRes] =
        await Promise.allSettled([
          api.getDashboardKPIs(),
          api.getLeads(),
          api.getDeals(),
          api.getContacts(),
          api.getCompanies(),
          api.getActivities(),
          api.getWorkflows(),
          api.getCustomSchemas(),
          api.getTickets(),
          api.getAwsStatus(),
        ]);

      if (kpiRes.status === 'fulfilled') setKpis(kpiRes.value.data);
      if (leadsRes.status === 'fulfilled') setLeads(leadsRes.value.data);
      if (dealsRes.status === 'fulfilled') setDeals(dealsRes.value.data);
      if (contactsRes.status === 'fulfilled') setContacts(contactsRes.value.data);
      if (compRes.status === 'fulfilled') setCompanies(compRes.value.data);
      if (actRes.status === 'fulfilled') setActivities(actRes.value.data);
      if (wfRes.status === 'fulfilled') setWorkflows(wfRes.value.data);
      if (schemaRes.status === 'fulfilled') setCustomSchemas(schemaRes.value.data);
      if (tickRes.status === 'fulfilled') setTickets(tickRes.value.data);
      if (awsRes.status === 'fulfilled') setAwsStatus(awsRes.value);
    } catch (err) {
      console.error('Failed to load CRM data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Fetch Customer 360 when contact is selected
  const openCustomer360 = async (contactId) => {
    try {
      setSelectedContactId(contactId);
      setActiveTab('customer360');
      const res = await api.getContactById(contactId);
      setSelectedContact360(res.data);
    } catch (err) {
      showToast(`Failed to load customer 360: ${err.message}`, 'error');
    }
  };

  // 1-Click Convert Lead to Contact+Company+Deal
  const handleConvertLead = async (leadId) => {
    try {
      const res = await api.convertLead(leadId);
      showToast('🎉 Lead successfully converted to Contact, Company & Deal!', 'success');
      triggerCelebration();
      await refreshData();
      if (res.data?.contact?.id) {
        openCustomer360(res.data.contact.id);
      }
    } catch (err) {
      showToast(`Conversion failed: ${err.message}`, 'error');
    }
  };

  // Drag & Drop Deal Stage Update
  const handleDealStageChange = async (dealId, newStageId) => {
    try {
      // Optimistic UI update
      setDeals((prev) =>
        prev.map((d) => (d.id === dealId ? { ...d, stageId: newStageId } : d))
      );

      if (newStageId === 'stg_won') {
        triggerCelebration();
        showToast('🏆 DEAL CLOSED WON! Outstanding work!', 'success');
      }

      await api.updateDealStage(dealId, newStageId);
      refreshData();
    } catch (err) {
      showToast(`Failed to update deal stage: ${err.message}`, 'error');
      refreshData();
    }
  };

  return (
    <CrmContext.Provider
      value={{
        activeTab,
        setActiveTab,
        loading,
        error,
        kpis,
        leads,
        deals,
        contacts,
        companies,
        activities,
        workflows,
        customSchemas,
        tickets,
        awsStatus,
        selectedContactId,
        selectedContact360,
        selectedCustomSchemaId,
        setSelectedCustomSchemaId,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isAiDrawerOpen,
        setIsAiDrawerOpen,
        isAddLeadModalOpen,
        setIsAddLeadModalOpen,
        isAddDealModalOpen,
        setIsAddDealModalOpen,
        notification,
        showToast,
        triggerCelebration,
        refreshData,
        openCustomer360,
        handleConvertLead,
        handleDealStageChange,
      }}
    >
      {children}
    </CrmContext.Provider>
  );
}

export function useCrm() {
  const context = useContext(CrmContext);
  if (!context) throw new Error('useCrm must be used within a CrmProvider');
  return context;
}
