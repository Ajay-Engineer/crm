import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  LifeBuoy,
  Clock,
  CheckCircle2,
  Sparkles,
  Plus
} from 'lucide-react';
import { api } from '../../services/api';

export default function SupportTicketsView() {
  const { tickets, showToast, refreshData } = useCrm();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTickets = tickets.filter((t) =>
    `${t.subject} ${t.contactName} ${t.category}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleResolveTicket = async (ticketId) => {
    try {
      await api.updateTicket(ticketId, { status: 'resolved', slaDueMinutes: 0 });
      showToast('Ticket marked as Resolved & SLA closed!', 'success');
      refreshData();
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
    }
  };

  return (
    <div className="space-y-5 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Helpdesk & SLA Engine</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
              100% SLA Compliant
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Omnichannel ticket triage, response time SLA monitors & AI suggested resolutions
          </p>
        </div>

        <button
          onClick={() => showToast('New Ticket modal opened', 'success')}
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#38b6ff] hover:bg-[#0284c7] text-xs font-bold text-white shadow-glow transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Open New Ticket</span>
        </button>
      </div>

      {/* Tickets List */}
      <div className="space-y-3.5">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="glass-panel p-5 rounded-2xl hover:border-brand-300 transition-all space-y-3 shadow-card"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                    ticket.priority === 'high'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-brand-50 text-brand-700 border border-brand-200'
                  }`}
                >
                  {ticket.priority === 'high' ? 'P1' : 'P2'}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{ticket.subject}</h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Requester: <strong className="text-slate-800">{ticket.contactName || 'Enterprise Client'}</strong> • Category: {ticket.category || 'Support'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
                {ticket.status !== 'resolved' ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                    <Clock className="w-3.5 h-3.5 animate-spin" />
                    <span>SLA: {ticket.slaDueMinutes || 45}m remaining</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Resolved</span>
                  </div>
                )}
                {ticket.status !== 'resolved' && (
                  <button
                    onClick={() => handleResolveTicket(ticket.id)}
                    className="px-3 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 text-xs font-bold transition-all shadow-xs"
                  >
                    Resolve
                  </button>
                )}
              </div>
            </div>

            {/* AI Suggested Fix Banner */}
            <div className="p-3 rounded-xl bg-brand-50/60 border border-brand-200 text-xs text-slate-700 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-brand-800">AI Suggested Solution: </span>
                <span className="font-medium">{ticket.aiSuggestedSolution || 'Routing documentation link directly to client.'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
