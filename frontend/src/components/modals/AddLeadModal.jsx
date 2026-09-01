import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { X, UserPlus, Sparkles } from 'lucide-react';
import { api } from '../../services/api';

export default function AddLeadModal() {
  const { isAddLeadModalOpen, setIsAddLeadModalOpen, showToast, refreshData } = useCrm();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    estimatedBudget: '',
    source: 'Website Demo Request',
  });
  const [loading, setLoading] = useState(false);

  if (!isAddLeadModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.createLead({
        ...formData,
        estimatedBudget: Number(formData.estimatedBudget) || 0,
      });
      showToast('New lead captured & AI-scored!', 'success');
      setIsAddLeadModalOpen(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        estimatedBudget: '',
        source: 'Website Demo Request',
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
            <UserPlus className="w-5 h-5 text-brand-600" />
            <h2 className="text-base font-bold text-slate-900">Capture Inbound Lead</h2>
          </div>
          <button
            onClick={() => setIsAddLeadModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">First Name *</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-400 focus:bg-white"
                placeholder="e.g. Liam"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-400 focus:bg-white"
                placeholder="e.g. Gallagher"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Business Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-400 focus:bg-white"
                placeholder="liam@enterprise.com"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">WhatsApp / Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-400 focus:bg-white"
                placeholder="+1 555-0199"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Company Name</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-400 focus:bg-white"
                placeholder="e.g. Apex Global"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Estimated Budget ($)</label>
              <input
                type="number"
                value={formData.estimatedBudget}
                onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-400 focus:bg-white"
                placeholder="50000"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Lead Ingestion Source</label>
            <select
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-400 focus:bg-white"
            >
              <option value="Website Demo Request">Website Demo Request</option>
              <option value="WhatsApp Inbound Chat">WhatsApp Inbound Chat</option>
              <option value="LinkedIn Ad Campaign">LinkedIn Ad Campaign</option>
              <option value="Referral / Direct">Referral / Direct</option>
            </select>
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddLeadModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#38b6ff] hover:bg-[#0284c7] text-xs font-bold text-white shadow-glow disabled:opacity-50 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{loading ? 'Ingesting...' : 'Ingest & AI Score'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
