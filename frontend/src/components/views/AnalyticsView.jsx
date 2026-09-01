import React from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  BarChart3,
  PieChart as PieIcon
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function AnalyticsView() {
  const { kpis } = useCrm();

  const stageDistribution = kpis?.stageDistribution || [
    { stage: 'New Inbound', count: 4, value: 35000 },
    { stage: 'Discovery', count: 3, value: 36000 },
    { stage: 'Proposal Sent', count: 2, value: 120000 },
    { stage: 'Negotiation', count: 1, value: 84000 },
    { stage: 'Closed Won', count: 2, value: 175000 },
  ];

  const leadSources = kpis?.leadSources || [
    { name: 'Website Demo Request', count: 7, color: '#38b6ff' },
    { name: 'WhatsApp Inbound', count: 5, color: '#10b981' },
    { name: 'LinkedIn Ads', count: 4, color: '#6366f1' },
    { name: 'Referral / Direct', count: 3, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-5 pb-12">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Reporting & Revenue Analytics</h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
            Real-time Telemetry
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5 font-medium">
          Business intelligence across pipeline conversion, win/loss rates & lead sources
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Pipeline Stage Distribution */}
        <div className="glass-panel p-5 rounded-2xl space-y-4 shadow-card">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-brand-600" />
            <span>Pipeline Value by Stage</span>
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stageDistribution} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <XAxis dataKey="stage" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#38b6ff', borderRadius: '12px', fontSize: '12px', color: '#0f172a' }}
                  formatter={(val) => [`$${val.toLocaleString()}`, 'Pipeline Value']}
                />
                <Bar dataKey="value" fill="#38b6ff" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Source Breakdown Pie Chart */}
        <div className="glass-panel p-5 rounded-2xl space-y-4 shadow-card">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-emerald-600" />
            <span>Lead Acquisition Attribution</span>
          </h3>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leadSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {leadSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#38b6ff', borderRadius: '12px', fontSize: '12px', color: '#0f172a' }}
                  formatter={(val, name, entry) => [`${val} Leads (${entry.payload.name})`, 'Count']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            {leadSources.map((src) => (
              <div key={src.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: src.color }}></span>
                <span className="text-slate-600 truncate font-medium">{src.name}:</span>
                <span className="font-extrabold text-slate-900">{src.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
