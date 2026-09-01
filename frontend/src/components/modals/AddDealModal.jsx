import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { X, Plus, DollarSign } from 'lucide-react';
import { api } from '../../services/api';

export default function AddDealModal() {
  const { isAddDealModalOpen, setIsAddDealModalOpen, showToast, refreshData } = useCrm();
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    contactName: '',
    value: '',
    stageId: 'stg_discovery',
    expectedCloseDate: '',
    aiWinProbability: 70,
  });
  const [loading, setLoading] = useState(false);

  if (!isAddDealModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.createDeal({
        ...formData,
        value: Number(formData.value) || 0,
        pipelineId: 'pipe_sales_default',
      });
      showToast('New deal created & added to Kanban pipeline!', 'success');
      setIsAddDealModalOpen(false);
      setFormData({
        title: '',
        companyName: '',
        contactName: '',
        value: '',
        stageId: 'stg_discovery',
        expectedCloseDate: '',
        aiWinProbability: 70,
      });
      refreshData();
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white p-5 sm:p-6 rounded-2xl border border-brand-200 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-brand-600" />
            <h2 className="text-base font-bold text-slate-900">Create New Opportunity / Deal</h2>
          </div>
          <button
            onClick={() => setIsAddDealModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Deal Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-400 focus:bg-white"
              placeholder="e.g. Zenith Logistics — 100-Seat AI OS Rollout"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Company Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-400 focus:bg-white"
                placeholder="e.g. Zenith Logistics"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Primary Contact</label>
              <input
                type="text"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-400 focus:bg-white"
                placeholder="e.g. David Kowalski"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Deal Value ($) *</label>
              <input
                type="number"
                required
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-400 focus:bg-white"
                placeholder="55000"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Pipeline Stage</label>
              <select
                value={formData.stageId}
                onChange={(e) => setFormData({ ...formData, stageId: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-400 focus:bg-white"
              >
                <option value="stg_lead_in">New Inbound</option>
                <option value="stg_discovery">Discovery & Qual</option>
                <option value="stg_proposal">Proposal Sent</option>
                <option value="stg_negotiation">Negotiation</option>
                <option value="stg_won">Closed Won</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Expected Close Date</label>
              <input
                type="date"
                value={formData.expectedCloseDate}
                onChange={(e) => setFormData({ ...formData, expectedCloseDate: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-400 focus:bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">AI Win Probability (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.aiWinProbability}
                onChange={(e) => setFormData({ ...formData, aiWinProbability: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-400 focus:bg-white"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddDealModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#38b6ff] hover:bg-[#0284c7] text-xs font-bold text-white shadow-glow disabled:opacity-50 transition-all"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>{loading ? 'Creating...' : 'Create Deal'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
