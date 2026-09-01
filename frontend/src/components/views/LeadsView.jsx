import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  UserPlus,
  Flame,
  Sparkles,
  Download,
  Search,
  Filter,
  Phone,
  Mail,
  Building,
  CheckCircle2,
  Zap
} from 'lucide-react';

export default function LeadsView() {
  const { leads, handleConvertLead, setIsAddLeadModalOpen, showToast } = useCrm();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      `${lead.firstName} ${lead.lastName} ${lead.company} ${lead.email}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportCSV = () => {
    const headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Company', 'Source', 'Status', 'Lead Score'];
    const rows = filteredLeads.map((l) => [
      l.firstName,
      l.lastName || '',
      l.email || '',
      l.phone || '',
      l.company || '',
      l.source || '',
      l.status || '',
      l.leadScore || 0,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `HIG_CRM_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Leads CSV exported successfully!', 'success');
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Lead Engine & Capture</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              AI Scoring Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Automated lead ingestion, AI intent scoring & 1-click deal conversion
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={exportCSV}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 transition-all shadow-xs"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsAddLeadModalOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#38b6ff] hover:bg-[#0284c7] text-xs font-bold text-white shadow-glow transition-all"
          >
            <UserPlus className="w-4 h-4 stroke-[3]" />
            <span>Capture New Lead</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 glass-panel p-3 rounded-2xl shadow-card">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter by name, company, email..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-brand-400 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-500 font-semibold">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1 text-xs text-slate-700 font-semibold focus:outline-none focus:border-brand-400"
          >
            <option value="all">All Leads</option>
            <option value="new">New Inbound</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="glass-panel rounded-2xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Lead Name</th>
                <th className="py-3 px-4">Company & Budget</th>
                <th className="py-3 px-4">AI Score & Intent</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">1-Click Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                      {lead.firstName} {lead.lastName}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-0.5 text-[11px] text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-400" />
                        {lead.email}
                      </span>
                      {lead.phone && (
                        <span className="flex items-center gap-1 text-slate-500">
                          <Phone className="w-3 h-3 text-slate-400" />
                          {lead.phone}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      <span>{lead.company || 'Private Account'}</span>
                    </div>
                    {lead.estimatedBudget && (
                      <div className="text-[11px] font-mono text-emerald-600 font-bold mt-0.5">
                        Est. Budget: ${Number(lead.estimatedBudget).toLocaleString()}
                      </div>
                    )}
                  </td>

                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          lead.leadScore >= 80
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-brand-50 text-brand-700 border-brand-200'
                        }`}
                      >
                        ⚡ Score: {lead.leadScore || 65}/100
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-2">
                      {lead.aiIntent || 'Analyzing intent patterns...'}
                    </p>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="text-[11px] px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                      {lead.source || 'Direct'}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        lead.status === 'converted'
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : lead.status === 'qualified'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-brand-50 text-brand-700 border border-brand-200'
                      }`}
                    >
                      {lead.status.toUpperCase()}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    {lead.status === 'converted' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-purple-700 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Converted
                      </span>
                    ) : (
                      <button
                        onClick={() => handleConvertLead(lead.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#38b6ff] to-emerald-400 hover:opacity-90 text-white font-bold text-xs shadow-xs transition-all"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Convert</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
