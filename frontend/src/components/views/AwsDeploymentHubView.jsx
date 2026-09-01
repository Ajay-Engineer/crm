import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  MessageSquare,
  Mail,
  CreditCard,
  Video,
  CheckCircle2,
  Share2,
  Calendar,
  Layers,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

const INTEGRATIONS = [
  {
    id: 'int_wa',
    name: 'WhatsApp Business API',
    category: 'Messaging & Sales',
    desc: 'Instant two-way chat, automated lead capture templates, and interactive quotation messaging.',
    status: 'ACTIVE',
    icon: MessageSquare,
    badge: 'Connected',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'int_mail',
    name: 'Omnichannel Email Sync (Google & Outlook)',
    category: 'Communications',
    desc: 'Bi-directional email logging, thread tracking, and AI-assisted reply drafting directly on Customer 360 dossiers.',
    status: 'ACTIVE',
    icon: Mail,
    badge: 'Connected',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'int_stripe',
    name: 'Payment & Invoice Gateway (Stripe / Razorpay)',
    category: 'Billing & Invoicing',
    desc: 'One-click invoice generation from Won Deals, payment link dispatches, and automatic revenue ledger sync.',
    status: 'ACTIVE',
    icon: CreditCard,
    badge: 'Connected',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'int_zoom',
    name: 'Zoom & Google Meet Video Calls',
    category: 'Meetings',
    desc: 'One-click meeting scheduling from contact profiles and automatic AI meeting summary logs.',
    status: 'ACTIVE',
    icon: Video,
    badge: 'Connected',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'int_cal',
    name: 'Calendar & Appointment Booking',
    category: 'Scheduling',
    desc: 'Public booking links for client self-scheduling and automatic lead creation.',
    status: 'READY',
    icon: Calendar,
    badge: 'Ready to Connect',
    badgeColor: 'bg-brand-50 text-brand-700 border-brand-200',
  },
  {
    id: 'int_webhook',
    name: 'Custom Webhooks & REST API',
    category: 'Developer & Ops',
    desc: 'Connect external web forms, e-commerce stores, and ERP systems with real-time JSON webhooks.',
    status: 'READY',
    icon: Share2,
    badge: 'Configured',
    badgeColor: 'bg-brand-50 text-brand-700 border-brand-200',
  },
];

export default function AwsDeploymentHubView() {
  const { showToast } = useCrm();

  return (
    <div className="space-y-5 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Integrations & Connected Apps
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              4 Active Connections
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Connect your favorite messaging, billing, meeting, and marketing tools to automate business workflows
          </p>
        </div>

        <button
          onClick={() => showToast('New app connector wizard opened!', 'success')}
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#38b6ff] hover:bg-[#0284c7] text-xs font-bold text-white shadow-glow transition-all"
        >
          <Layers className="w-4 h-4" />
          <span>Browse App Directory</span>
        </button>
      </div>

      {/* Integration Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {INTEGRATIONS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="glass-panel p-5 rounded-2xl border border-slate-200 hover:border-brand-300 hover:shadow-card-hover transition-all space-y-4 shadow-card group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600 shadow-xs group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{item.name}</h3>
                    <span className="text-[11px] font-semibold text-brand-600">
                      {item.category}
                    </span>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                  {item.badge}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Real-Time Sync</span>
                </span>

                <button
                  onClick={() => showToast(`${item.name} settings opened`, 'success')}
                  className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 group-hover:underline"
                >
                  <span>Manage Settings</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
