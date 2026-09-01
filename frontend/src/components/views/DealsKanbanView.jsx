import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  Plus,
  DollarSign,
  TrendingUp,
  Flame,
  AlertCircle,
  Building,
  User,
  Calendar,
  Sparkles,
  Award
} from 'lucide-react';

const STAGES = [
  { id: 'stg_lead_in', name: 'New Inbound', probability: 10, color: 'border-slate-500 text-slate-400 bg-slate-500/10' },
  { id: 'stg_discovery', name: 'Discovery & Qual', probability: 30, color: 'border-brand-500 text-brand-300 bg-brand-500/10' },
  { id: 'stg_proposal', name: 'Proposal Sent', probability: 60, color: 'border-indigo-500 text-indigo-300 bg-indigo-500/10' },
  { id: 'stg_negotiation', name: 'Negotiation', probability: 80, color: 'border-amber-500 text-amber-300 bg-amber-500/10' },
  { id: 'stg_won', name: 'Closed Won 🏆', probability: 100, color: 'border-emerald-500 text-emerald-300 bg-emerald-500/10' },
];

export default function DealsKanbanView() {
  const { deals, handleDealStageChange, setIsAddDealModalOpen, openCustomer360 } = useCrm();
  const [draggedDealId, setDraggedDealId] = useState(null);

  const handleDragStart = (e, dealId) => {
    setDraggedDealId(dealId);
    e.dataTransfer.setData('text/plain', dealId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetStageId) => {
    e.preventDefault();
    const dealId = e.dataTransfer.getData('text/plain') || draggedDealId;
    if (dealId) {
      handleDealStageChange(dealId, targetStageId);
      setDraggedDealId(null);
    }
  };

  const totalPipelineValue = deals.reduce((acc, d) => acc + (Number(d.value) || 0), 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header with Pipeline Totals */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-white">Sales Deal Pipeline</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
              Interactive Kanban
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Total Pipeline Value: <strong className="text-brand-300 font-mono">${totalPipelineValue.toLocaleString()}</strong> across {deals.length} deals
          </p>
        </div>

        <button
          onClick={() => setIsAddDealModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-xs font-bold text-slate-950 shadow-glow transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Deal</span>
        </button>
      </div>

      {/* Drag & Drop Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const stageDeals = deals.filter((d) => d.stageId === stage.id);
          const stageValue = stageDeals.reduce((sum, d) => sum + (Number(d.value) || 0), 0);

          return (
            <div
              key={stage.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.id)}
              className="flex flex-col rounded-2xl bg-slate-900/70 border border-slate-800 p-3 min-h-[550px] transition-colors hover:border-slate-700"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200">{stage.name}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300">
                      {stageDeals.length}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono font-semibold text-brand-400">
                    ${stageValue.toLocaleString()}
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${stage.color}`}>
                  {stage.probability}% Win
                </span>
              </div>

              {/* Deal Cards */}
              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {stageDeals.map((deal) => (
                  <div
                    key={deal.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, deal.id)}
                    className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800/90 hover:border-brand-400/50 hover:shadow-glow cursor-grab active:cursor-grabbing transition-all space-y-2 group relative"
                  >
                    {/* Deal Title & Value */}
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-white group-hover:text-brand-300 transition-colors line-clamp-2">
                        {deal.title}
                      </h4>
                      <span className="text-xs font-extrabold font-mono text-emerald-400 shrink-0">
                        ${Number(deal.value).toLocaleString()}
                      </span>
                    </div>

                    {/* Company & Contact */}
                    <div className="space-y-1 text-[11px] text-slate-400">
                      <div className="flex items-center gap-1.5 truncate">
                        <Building className="w-3 h-3 text-slate-500 shrink-0" />
                        <span className="truncate">{deal.companyName || 'Apex Enterprises'}</span>
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          if (deal.contactId) openCustomer360(deal.contactId);
                        }}
                        className="flex items-center gap-1.5 text-brand-400 hover:underline cursor-pointer truncate"
                      >
                        <User className="w-3 h-3 shrink-0" />
                        <span className="truncate">{deal.contactName || 'Primary Contact'}</span>
                      </div>
                    </div>

                    {/* AI Win Probability & Risk Badge */}
                    <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                      <span className="flex items-center gap-1 text-slate-400">
                        <Sparkles className="w-3 h-3 text-brand-400" />
                        <span>{deal.aiWinProbability || stage.probability}% Win</span>
                      </span>
                      {deal.expectedCloseDate && (
                        <span className="text-slate-400 font-mono">
                          {deal.expectedCloseDate.slice(5)}
                        </span>
                      )}
                    </div>

                    {/* Quick Move Trigger for Mobile */}
                    <div className="md:hidden pt-2 flex items-center gap-1">
                      <select
                        value={deal.stageId}
                        onChange={(e) => handleDealStageChange(deal.id, e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 text-[10px] text-slate-300 rounded p-1"
                      >
                        {STAGES.map((s) => (
                          <option key={s.id} value={s.id}>
                            Move to: {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}

                {stageDeals.length === 0 && (
                  <div className="h-32 flex items-center justify-center border border-dashed border-slate-800 rounded-xl text-[11px] text-slate-500">
                    Drop deals here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
