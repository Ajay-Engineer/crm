import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  Shield,
  Palette,
  Save
} from 'lucide-react';
import { api } from '../../services/api';

export default function SettingsView() {
  const { showToast } = useCrm();
  const [brandName, setBrandName] = useState('HIG AI AUTOMATION');
  const [primaryColor, setPrimaryColor] = useState('#38B6FF');
  const [saving, setSaving] = useState(false);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.updateSettings({
        name: brandName,
        branding: {
          primaryColor,
          brandName,
          logoUrl: '/logo.png',
        },
      });
      showToast('Settings & Branding saved successfully!', 'success');
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const usersList = [
    { name: 'Ajai', email: 'admin@higautomation.ai', role: 'Owner / Enterprise Admin', status: 'Active' },
    { name: 'Elena Rostova', email: 'elena@apexrobotics.ai', role: 'Operations Manager', status: 'Active' },
    { name: 'Marcus Vance', email: 'marcus@horizonre.com', role: 'Sales Director', status: 'Active' },
  ];

  return (
    <div className="space-y-5 pb-12">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Settings & RBAC Governance</h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
            Multi-Tenant Administration
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5 font-medium">
          Configure branding colors, logo assets, team roles, permissions and audit security
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Brand & Organization Identity */}
        <form onSubmit={handleSaveSettings} className="glass-panel p-5 rounded-2xl space-y-4 shadow-card">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
            <Palette className="w-4 h-4 text-brand-600" />
            <span>Brand Identity & Logo Configuration</span>
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Company / Workspace Name</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-400 focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Primary Brand Hex Color (Strict HIG Format)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-9 h-9 rounded-xl cursor-pointer bg-white border border-slate-200"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-mono text-slate-800 font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <img src="/logo.png" alt="HIG Logo" className="h-9 w-auto rounded border border-brand-300" />
              <div className="text-xs">
                <span className="font-bold text-slate-900">Active Brand Favicon & Banner</span>
                <p className="text-[11px] text-slate-500">c:\Users\ajai1\crm\logo.png</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#38b6ff] hover:bg-[#0284c7] text-xs font-bold text-white shadow-glow transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Organization Settings'}</span>
          </button>
        </form>

        {/* Team RBAC Roles */}
        <div className="glass-panel p-5 rounded-2xl space-y-4 shadow-card">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Role-Based Access Control (RBAC)</span>
          </h3>

          <div className="space-y-2.5">
            {usersList.map((u, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white border border-brand-200 flex items-center justify-center text-xs font-extrabold text-brand-700 shadow-xs">
                    {u.name[0]}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{u.name}</h4>
                    <p className="text-[10px] text-slate-500">{u.email}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
