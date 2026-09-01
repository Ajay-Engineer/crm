import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  LifeBuoy,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Plus,
  Search,
  MessageSquare,
  ShieldCheck
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
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-white">Helpdesk & SLA Engine</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              100% SLA Compliant
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Omnichannel ticket triage, response time SLA monitors & AI suggested resolutions
          </p>
        </div>

        <button
          onClick={() => showToast('New Ticket modal opened', 'success')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-xs font-bold text-slate-950 shadow-glow transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Open New Ticket</span>
        </button>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-brand-400/40 transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                    ticket.priority === 'high'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                  }`}
                >
                  {ticket.priority === 'high' ? 'P1' : 'P2'}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{ticket.subject}</h3>
                  <p className="text-xs text-slate-400">
                    Requester: <strong className="text-slate-200">{ticket.contactName || 'Enterprise Client'}</strong> • Category: {ticket.category || 'Support'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                {ticket.status !== 'resolved' ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5 animate-spin" />
                    <span>SLA: {ticket.slaDueMinutes || 45}m remaining</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Resolved</span>
                  </div>
                )}
                {ticket.status !== 'resolved' && (
                  <button
                    onClick={() => handleResolveTicket(ticket.id)}
                    className="px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all"
                  >
                    Resolve
                  </button>
                )}
              </div>
            </div>

            {/* AI Suggested Fix Banner */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-brand-500/20 text-xs text-slate-300 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-brand-300">AI Suggested Solution: </span>
                <span>{ticket.aiSuggestedSolution || 'Routing documentation link directly to client.'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
