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
  LifeBuoy,
  Send,
  ArrowLeft,
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
    <div className="space-y-5 pb-12">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('contacts')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-brand-600 transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Directory</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Customer ID:</span>
          <span className="text-xs font-mono font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md border border-brand-200">
            {contact.id || 'cont_001'}
          </span>
        </div>
      </div>

      {/* Customer 360 Header Profile Card */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-brand-200 bg-white space-y-4 shadow-card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-brand-400 to-[#0284c7] p-[2px] shadow-glow">
              <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center text-xl font-black text-brand-700">
                {contact.firstName?.[0]}
                {contact.lastName?.[0]}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  {contact.firstName} {contact.lastName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {contact.status || 'Active Enterprise'}
                </span>
              </div>
              <p className="text-xs text-slate-600 font-semibold mt-0.5">
                {contact.jobTitle} • <strong className="text-brand-700">{contact.companyName}</strong>
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2 font-medium">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {contact.email}
                </span>
                {contact.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {contact.phone}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex-1 sm:flex-none p-3 rounded-xl bg-slate-50 border border-slate-200 text-center min-w-[100px]">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Value</span>
              <div className="text-sm font-black font-mono text-emerald-600">
                ${(contact.customer360?.totalDealValue || 120000).toLocaleString()}
              </div>
            </div>
            <div className="flex-1 sm:flex-none p-3 rounded-xl bg-slate-50 border border-slate-200 text-center min-w-[100px]">
              <span className="text-[10px] uppercase font-bold text-slate-400">AI Health</span>
              <div className="text-sm font-black font-mono text-brand-600">
                {contact.aiHealthScore || 98}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 360 Linked Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column: Linked Deals & Support Tickets */}
        <div className="space-y-5">
          {/* Linked Deals */}
          <div className="glass-panel p-5 rounded-2xl space-y-3 shadow-card">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-brand-600" />
                <span>Linked Opportunities</span>
              </h3>
              <span className="text-xs font-bold text-brand-600">
                {contact.customer360?.deals?.length || 1}
              </span>
            </div>

            <div className="space-y-2">
              {(contact.customer360?.deals || []).map((d) => (
                <div key={d.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                    <span className="truncate">{d.title}</span>
                    <span className="font-mono text-emerald-600 shrink-0 font-extrabold">
                      ${Number(d.value).toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-brand-50 text-brand-700 font-bold border border-brand-200 inline-block">
                    Stage: {d.stageId}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Support Tickets */}
          <div className="glass-panel p-5 rounded-2xl space-y-3 shadow-card">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <LifeBuoy className="w-4 h-4 text-rose-500" />
                <span>Support Tickets</span>
              </h3>
              <span className="text-xs font-bold text-rose-600">
                {contact.customer360?.tickets?.length || 1} Active
              </span>
            </div>

            <div className="space-y-2">
              {(contact.customer360?.tickets || []).map((t) => (
                <div key={t.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                    <span className="truncate">{t.subject}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 shrink-0">
                      {t.priority}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Status: {t.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Omnichannel Relationship Timeline & Logger */}
        <div className="lg:col-span-2 space-y-5">
          {/* Quick Activity Logger */}
          <div className="glass-panel p-5 rounded-2xl space-y-3 shadow-card">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span>Log Omnichannel Interaction</span>
            </h3>

            <form onSubmit={handleAddActivity} className="space-y-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {['whatsapp', 'email', 'call', 'meeting', 'note'].map((channel) => (
                  <button
                    key={channel}
                    type="button"
                    onClick={() => setNoteChannel(channel)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      noteChannel === channel
                        ? 'bg-[#38b6ff] text-white shadow-glow'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-400 focus:bg-white transition-all shadow-inner"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submittingNote || !newNote.trim()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#38b6ff] hover:bg-[#0284c7] text-xs font-bold text-white shadow-glow disabled:opacity-50 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Log Activity</span>
                </button>
              </div>
            </form>
          </div>

          {/* Omnichannel History Timeline */}
          <div className="glass-panel p-5 rounded-2xl space-y-4 shadow-card">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-600" />
              <span>Omnichannel Relationship Timeline</span>
            </h3>

            <div className="space-y-3 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {(contact.customer360?.activities || []).map((act) => (
                <div key={act.id} className="relative pl-8">
                  <div className="absolute left-2 top-2 w-3.5 h-3.5 rounded-full bg-[#38b6ff] border-2 border-white shadow-xs"></div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{act.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(act.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{act.content}</p>
                    <span className="inline-block text-[10px] font-bold uppercase text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
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
