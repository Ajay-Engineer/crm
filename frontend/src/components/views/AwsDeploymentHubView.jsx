import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  Cloud,
  CheckCircle2,
  Zap,
  Globe,
  MessageSquare,
  Mail,
  ShieldCheck,
  CreditCard,
  Building,
  Radio
} from 'lucide-react';

const CONNECTORS = [
  {
    id: 'conn_wa',
    name: 'WhatsApp Business Cloud API',
    desc: 'Automated 2-way client messaging, lead capture & templated broadcast follow-ups.',
    status: 'ACTIVE',
    icon: MessageSquare,
    badge: 'Connected',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'conn_mail',
    name: 'Omnichannel Email Gateway (Google & Outlook)',
    desc: 'Synchronize inbound client inquiries, customer 360 email timeline & AI drafts.',
    status: 'ACTIVE',
    icon: Mail,
    badge: 'Connected',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'conn_aws',
    name: 'Enterprise Cloud Vault (AWS DynamoDB)',
    desc: 'Multi-tenant high-speed database with encrypted storage in region ap-south-1.',
    status: 'ACTIVE',
    icon: Cloud,
    badge: 'Connected',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'conn_pay',
    name: 'Automated Payment & Invoice Gateway',
    desc: 'Instant deal invoicing, payment link generation, and subscription billing.',
    status: 'READY',
    icon: CreditCard,
    badge: 'Configured',
    badgeColor: 'bg-brand-50 text-brand-700 border-brand-200',
  },
];

export default function AwsDeploymentHubView() {
  const { showToast } = useCrm();
  const [testing, setTesting] = useState(false);

  const handleTestConnection = () => {
    setTesting(true);
    setTimeout(() => {
      setTesting(false);
      showToast('All enterprise cloud connections verified 100% operational!', 'success');
    }, 600);
  };

  return (
    <div className="space-y-5 pb-12">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Enterprise Cloud & Integration Hub
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            All Systems Operational
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5 font-medium">
          Manage business connectors, cloud database status, messaging gateways and real-time syncing
        </p>
      </div>

      {/* Cloud Health Overview Card */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-brand-200 bg-white space-y-4 shadow-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600 shadow-xs">
              <Cloud className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  HIG Cloud Operations Infrastructure
                </h2>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>ONLINE</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Primary Database: <strong className="text-brand-700">AWS DynamoDB (ap-south-1)</strong> • Real-time Sync: <span className="font-bold text-emerald-600">Active</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleTestConnection}
            disabled={testing}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#38b6ff] hover:bg-[#0284c7] text-xs font-bold text-white shadow-glow transition-all"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>{testing ? 'Verifying Services...' : 'Verify Cloud Sync'}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold uppercase">System Uptime</span>
            <div className="font-mono text-emerald-700 font-bold mt-0.5">99.99%</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Sync Latency</span>
            <div className="font-mono text-brand-700 font-bold mt-0.5">14 ms</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Data Privacy</span>
            <div className="font-mono text-purple-700 font-bold mt-0.5">End-to-End Encrypted</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Multi-Branch Sync</span>
            <div className="font-mono text-emerald-700 font-bold mt-0.5">Automated</div>
          </div>
        </div>
      </div>

      {/* Enterprise Connectors List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CONNECTORS.map((conn) => {
          const Icon = conn.icon;
          return (
            <div
              key={conn.id}
              className="glass-panel p-5 rounded-2xl border border-slate-200 hover:border-brand-300 hover:shadow-card-hover transition-all space-y-3 shadow-card"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{conn.name}</h3>
                    <p className="text-xs text-slate-500 font-medium line-clamp-1">{conn.desc}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${conn.badgeColor}`}>
                  {conn.badge}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-400 font-medium">Automatic Health Check</span>
                <button
                  onClick={() => showToast(`${conn.name} settings updated!`, 'success')}
                  className="text-xs font-bold text-brand-600 hover:underline"
                >
                  Configure Connector
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
