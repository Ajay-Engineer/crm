import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  Zap,
  Play,
  CheckCircle,
  Plus,
  ArrowRight,
  GitBranch,
  Clock,
  Sparkles,
  Bell,
  MessageSquare,
  ShieldCheck
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
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-white">Visual Workflow Automation Engine</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Autonomous Trigger-Action
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Design multi-branch automations across WhatsApp, Email, CRM pipelines and AI actions
          </p>
        </div>

        <button
          onClick={() => showToast('Workflow Builder Canvas ready for custom nodes!', 'success')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-xs font-bold text-slate-950 shadow-glow transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>New Workflow Rule</span>
        </button>
      </div>

      {/* Visual Workflow Cards */}
      <div className="space-y-6">
        {workflows.map((wf) => (
          <div
            key={wf.id}
            className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-brand-400/40 transition-all space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{wf.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span>Executions: <strong className="text-white">{wf.stats?.totalExecuted || 0}</strong></span>
                    <span>•</span>
                    <span className="text-emerald-400 font-semibold">Success: {wf.stats?.successRate || '100%'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleTestWorkflow(wf.id)}
                  disabled={runningWfId === wf.id}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-semibold text-brand-300 shadow-sm transition-all disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-brand-400" />
                  <span>{runningWfId === wf.id ? 'Simulating...' : 'Test Execution'}</span>
                </button>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  ACTIVE
                </span>
              </div>
            </div>

            {/* Visual Node Flow (Trigger -> Condition -> Actions) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              {/* 1. Trigger Node */}
              <div className="p-3 rounded-lg bg-slate-900 border border-brand-500/30 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-brand-400">
                  <Clock className="w-3 h-3" />
                  <span>1. Trigger Event</span>
                </div>
                <div className="text-xs font-semibold text-white">
                  {wf.trigger?.event || 'lead.created'}
                </div>
                <p className="text-[11px] text-slate-400">{wf.trigger?.label || 'Inbound webhook / API event'}</p>
              </div>

              {/* 2. Condition Node */}
              <div className="p-3 rounded-lg bg-slate-900 border border-amber-500/30 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-amber-400">
                  <GitBranch className="w-3 h-3" />
                  <span>2. Condition Gate</span>
                </div>
                <div className="text-xs font-semibold text-white">
                  {wf.conditions?.[0]?.field || 'Lead Score'} &gt; {wf.conditions?.[0]?.value || 75}
                </div>
                <p className="text-[11px] text-slate-400">Evaluates high buying intent threshold</p>
              </div>

              {/* 3. Action Node */}
              <div className="p-3 rounded-lg bg-slate-900 border border-emerald-500/30 space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-emerald-400">
                  <CheckCircle className="w-3 h-3" />
                  <span>3. Dispatched Actions</span>
                </div>
                <div className="text-xs font-semibold text-white">
                  {wf.actions?.length || 2} Automated Actions
                </div>
                <p className="text-[11px] text-slate-400">Instant WhatsApp + Owner Assigned</p>
              </div>
            </div>

            {/* Live Simulation Output Drawer if triggered */}
            {simulationLogs?.wfId === wf.id && (
              <div className="p-3.5 rounded-xl bg-slate-900 border border-brand-400/40 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-brand-300">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                    <span>Real-Time Execution Logs (DynamoDB & SQS Stream)</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">STATUS: 200 OK</span>
                </div>
                <div className="space-y-1 font-mono text-[11px] text-slate-300 bg-slate-950 p-2.5 rounded-lg">
                  {simulationLogs.logs.map((log, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span>{log.step}: {log.details}</span>
                      <span className="text-emerald-400">[{log.status}]</span>
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
