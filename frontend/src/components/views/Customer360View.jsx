import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  User,
  Building,
  Mail,
  Phone,
  DollarSign,
  HeartPulse,
  Sparkles,
  Calendar,
  MessageSquare,
  LifeBuoy,
  Plus,
  Send,
  ArrowLeft,
  CheckCircle,
  FileText,
  Clock
} from 'lucide-react';
import { api } from '../../services/api';

export default function Customer360View() {
  const { selectedContact360, setActiveTab, showToast, refreshData } = useCrm();
  const [newNote, setNewNote] = useState('');
  const [noteChannel, setNoteChannel] = useState('whatsapp');
  const [submittingNote, setSubmittingNote] = useState(false);

  const contact = selectedContact360 || {
    firstName: 'Elena',
    lastName: 'Rostova',
    jobTitle: 'VP of Global Operations',
    companyName: 'Apex AI Robotics Inc',
    email: 'elena.rostova@apexrobotics.ai',
    phone: '+1 (555) 891-2345',
    leadScore: 94,
    aiHealthScore: 98,
    customer360: {
      totalDealValue: 120000,
      openTicketsCount: 1,
      deals: [
        { id: 'deal_002', title: 'Apex Robotics — Global AI Voice & WhatsApp Connect', value: 120000, stageId: 'stg_proposal', status: 'open' },
      ],
      tickets: [
        { id: 'tick_001', subject: 'Request for custom AWS S3 Document bucket integration', priority: 'high', status: 'in_progress' },
      ],
      activities: [
        {
          id: 'act_001',
          type: 'whatsapp',
          title: 'WhatsApp Note',
          content: 'Confirmed interest in enterprise multi-branch AI orchestration.',
          createdAt: new Date().toISOString(),
        },
      ],
    },
  };

  const handleAddActivity = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      setSubmittingNote(true);
      await api.createActivity({
        contactId: contact.id,
        type: noteChannel,
        title: `${noteChannel.toUpperCase()} Note added by Ajai`,
        content: newNote,
        metadata: { channel: noteChannel },
      });
      showToast('Activity logged to Customer 360 timeline!', 'success');
      setNewNote('');
      refreshData();
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
    } finally {
      setSubmittingNote(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('contacts')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Directory</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Customer ID:</span>
          <span className="text-xs font-mono text-brand-300 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">
            {contact.id || 'cont_001'}
          </span>
        </div>
      </div>

      {/* Customer 360 Header Profile Card */}
      <div className="glass-panel p-6 rounded-2xl border border-brand-400/30 bg-gradient-to-r from-slate-900 via-navy-900 to-slate-950 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-500 to-emerald-400 p-[2px] shadow-glow">
              <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center text-xl font-extrabold text-white">
                {contact.firstName?.[0]}
                {contact.lastName?.[0]}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-white">
                  {contact.firstName} {contact.lastName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {contact.status || 'Active Enterprise'}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                {contact.jobTitle} • <strong className="text-brand-300">{contact.companyName}</strong>
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  {contact.email}
                </span>
                {contact.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    {contact.phone}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center min-w-[100px]">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Value</span>
              <div className="text-sm font-extrabold font-mono text-emerald-400">
                ${(contact.customer360?.totalDealValue || 120000).toLocaleString()}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center min-w-[100px]">
              <span className="text-[10px] uppercase font-bold text-slate-400">AI Health</span>
              <div className="text-sm font-extrabold font-mono text-brand-300">
                {contact.aiHealthScore || 98}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 360 Linked Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Linked Deals & Support Tickets (1 col) */}
        <div className="space-y-6">
          {/* Linked Deals */}
          <div className="glass-panel p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-brand-400" />
                <span>Linked Opportunities</span>
              </h3>
              <span className="text-xs font-bold text-brand-400">
                {contact.customer360?.deals?.length || 1}
              </span>
            </div>

            <div className="space-y-2">
              {(contact.customer360?.deals || []).map((d) => (
                <div key={d.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span className="line-clamp-1">{d.title}</span>
                    <span className="font-mono text-emerald-400">${Number(d.value).toLocaleString()}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 font-semibold">
                    Stage: {d.stageId}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Support Tickets */}
          <div className="glass-panel p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <LifeBuoy className="w-4 h-4 text-rose-400" />
                <span>Support Tickets</span>
              </h3>
              <span className="text-xs font-bold text-rose-400">
                {contact.customer360?.tickets?.length || 1} Active
              </span>
            </div>

            <div className="space-y-2">
              {(contact.customer360?.tickets || []).map((t) => (
                <div key={t.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span className="line-clamp-1">{t.subject}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300">
                      {t.priority}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">Status: {t.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Omnichannel Relationship Timeline & Logger (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Activity Logger */}
          <div className="glass-panel p-5 rounded-2xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>Log Omnichannel Interaction</span>
            </h3>

            <form onSubmit={handleAddActivity} className="space-y-3">
              <div className="flex items-center gap-2">
                {['whatsapp', 'email', 'call', 'meeting', 'note'].map((channel) => (
                  <button
                    key={channel}
                    type="button"
                    onClick={() => setNoteChannel(channel)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                      noteChannel === channel
                        ? 'bg-brand-500 text-slate-950 font-bold shadow-glow'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {channel}
                  </button>
                ))}
              </div>

              <div className="relative">
                <textarea
                  rows={3}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder={`Type ${noteChannel} summary, client decision or next action...`}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-400"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submittingNote || !newNote.trim()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-xs font-bold text-slate-950 shadow-glow disabled:opacity-50 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Log Activity</span>
                </button>
              </div>
            </form>
          </div>

          {/* Omnichannel History Timeline */}
          <div className="glass-panel p-5 rounded-2xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-400" />
              <span>Omnichannel Relationship Timeline</span>
            </h3>

            <div className="space-y-4 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              {(contact.customer360?.activities || []).map((act) => (
                <div key={act.id} className="relative pl-10">
                  <div className="absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full bg-brand-400 border-2 border-slate-950"></div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{act.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(act.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{act.content}</p>
                    <span className="inline-block text-[10px] font-bold uppercase text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">
                      Channel: {act.metadata?.channel || act.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
