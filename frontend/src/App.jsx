import React from 'react';
import { CrmProvider, useCrm } from './context/CrmContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardView from './components/views/DashboardView';
import DealsKanbanView from './components/views/DealsKanbanView';
import LeadsView from './components/views/LeadsView';
import ContactsView from './components/views/ContactsView';
import Customer360View from './components/views/Customer360View';
import CompaniesView from './components/views/CompaniesView';
import CommunicationsView from './components/views/CommunicationsView';
import WorkflowsView from './components/views/WorkflowsView';
import CustomObjectsView from './components/views/CustomObjectsView';
import SupportTicketsView from './components/views/SupportTicketsView';
import AiAnalystView from './components/views/AiAnalystView';
import AnalyticsView from './components/views/AnalyticsView';
import AwsDeploymentHubView from './components/views/AwsDeploymentHubView';
import SettingsView from './components/views/SettingsView';
import AddLeadModal from './components/modals/AddLeadModal';
import AddDealModal from './components/modals/AddDealModal';
import AiCopilotDrawer from './components/modals/AiCopilotDrawer';
import { CheckCircle2, AlertCircle } from 'lucide-react';

function CrmContent() {
  const { activeTab, notification } = useCrm();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'deals':
        return <DealsKanbanView />;
      case 'leads':
        return <LeadsView />;
      case 'contacts':
        return <ContactsView />;
      case 'customer360':
        return <Customer360View />;
      case 'companies':
        return <CompaniesView />;
      case 'communications':
        return <CommunicationsView />;
      case 'workflows':
        return <WorkflowsView />;
      case 'custom_objects':
        return <CustomObjectsView />;
      case 'support':
        return <SupportTicketsView />;
      case 'ai_analyst':
        return <AiAnalystView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'aws_hub':
        return <AwsDeploymentHubView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F9FD] text-slate-900 flex flex-col font-sans selection:bg-[#38b6ff] selection:text-white">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-3.5 sm:p-5 lg:p-6 bg-[#F4F9FD]">
          <div className="max-w-7xl mx-auto">
            {renderActiveView()}
          </div>
        </main>
      </div>

      {/* Global Modals & Drawers */}
      <AddLeadModal />
      <AddDealModal />
      <AiCopilotDrawer />

      {/* Floating Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-2xl border text-xs font-bold ${
              notification.type === 'error'
                ? 'bg-rose-50 text-rose-800 border-rose-200'
                : 'bg-white text-brand-800 border-brand-300 shadow-glow'
            }`}
          >
            {notification.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-500" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-brand-500" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <CrmProvider>
      <CrmContent />
    </CrmProvider>
  );
}
