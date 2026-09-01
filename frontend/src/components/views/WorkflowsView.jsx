import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  Zap,
  Play,
  CheckCircle,
  Plus,
  GitBranch,
  Clock,
  Sparkles
} from 'lucide-react';
import { api } from '../../services/api';

export default function WorkflowsView() {
  const { workflows, showToast, refreshData } = useCrm();
  const [runningWfId, setRunningWfId] = useState(null);
  const [simulationLogs, setSimulationLogs] = useState(null);

  const handleTestWorkflow = async (wfId) => {
    try {
      setRunningWfId(wfId);
      const res = await api.runTestWorkflow(wfId);
      setSimulationLogs({ wfId, logs: res.logs });
      showToast('Workflow simulation completed successfully!', 'success');
      refreshData();
    } catch (err) {
      showToast(`Workflow execution failed: ${err.message}`, 'error');
    } finally {
      setRunningWfId(null);
    }
  };

  return (
    <div className="space-y-5 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Visual Workflow Automation Engine</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
              Trigger-Action Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Multi-branch automations across WhatsApp, Email, CRM pipelines and AI actions
          </p>
        </div>

        <button
          onClick={() => showToast('Workflow Builder Canvas ready for custom nodes!', 'success')}
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#38b6ff] hover:bg-[#0284c7] text-xs font-bold text-white shadow-glow transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>New Workflow Rule</span>
        </button>
      </div>

      {/* Visual Workflow Cards */}
      <div className="space-y-4">
        {workflows.map((wf) => (
          <div
            key={wf.id}
            className="glass-panel p-5 rounded-2xl hover:border-brand-300 transition-all space-y-4 shadow-card"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{wf.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span>Executions: <strong className="text-slate-800 font-bold">{wf.stats?.totalExecuted || 0}</strong></span>
                    <span>•</span>
                    <span className="text-emerald-700 font-bold">Success: {wf.stats?.successRate || '100%'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <button
                  onClick={() => handleTestWorkflow(wf.id)}
                  disabled={runningWfId === wf.id}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-brand-700 shadow-xs transition-all disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-brand-500" />
                  <span>{runningWfId === wf.id ? 'Simulating...' : 'Test Execution'}</span>
                </button>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  ACTIVE
                </span>
              </div>
            </div>

            {/* Visual Node Flow (Trigger -> Condition -> Actions) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              {/* 1. Trigger Node */}
              <div className="p-3 rounded-xl bg-white border border-brand-200 space-y-1 shadow-xs">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-brand-700">
                  <Clock className="w-3 h-3 text-brand-500" />
                  <span>1. Trigger Event</span>
                </div>
                <div className="text-xs font-bold text-slate-900">
                  {wf.trigger?.event || 'lead.created'}
                </div>
                <p className="text-[11px] text-slate-500 font-medium">{wf.trigger?.label || 'Inbound webhook / API event'}</p>
              </div>

              {/* 2. Condition Node */}
              <div className="p-3 rounded-xl bg-white border border-amber-200 space-y-1 shadow-xs">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-amber-800">
                  <GitBranch className="w-3 h-3 text-amber-600" />
                  <span>2. Condition Gate</span>
                </div>
                <div className="text-xs font-bold text-slate-900">
                  {wf.conditions?.[0]?.field || 'Lead Score'} &gt; {wf.conditions?.[0]?.value || 75}
                </div>
                <p className="text-[11px] text-slate-500 font-medium">Evaluates high buying intent threshold</p>
              </div>

              {/* 3. Action Node */}
              <div className="p-3 rounded-xl bg-white border border-emerald-200 space-y-1 shadow-xs">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-emerald-700">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  <span>3. Dispatched Actions</span>
                </div>
                <div className="text-xs font-bold text-slate-900">
                  {wf.actions?.length || 2} Automated Actions
                </div>
                <p className="text-[11px] text-slate-500 font-medium">Instant WhatsApp + Owner Assigned</p>
              </div>
            </div>

            {/* Live Simulation Output */}
            {simulationLogs?.wfId === wf.id && (
              <div className="p-3.5 rounded-xl bg-brand-50/70 border border-brand-300 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-brand-800">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                    <span>Real-Time Execution Logs</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 font-extrabold">STATUS: 200 OK</span>
                </div>
                <div className="space-y-1 font-mono text-[11px] text-slate-800 bg-white p-3 rounded-xl border border-slate-200 shadow-inner">
                  {simulationLogs.logs.map((log, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span>{log.step}: {log.details}</span>
                      <span className="text-emerald-600 font-bold">[{log.status}]</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
