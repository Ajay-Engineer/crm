import React, { useState, useEffect } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  Boxes,
  Plus,
  Building2,
  HeartPulse,
  Car,
  GraduationCap,
  Sparkles,
  Layers,
  CheckCircle,
  Table,
  Sliders,
  Trash2
} from 'lucide-react';
import { api } from '../../services/api';

export default function CustomObjectsView() {
  const { customSchemas, selectedCustomSchemaId, setSelectedCustomSchemaId, showToast, refreshData } = useCrm();
  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(false);
  const [isCreatingSchema, setIsCreatingSchema] = useState(false);
  const [newSchemaName, setNewSchemaName] = useState('');
  const [newSchemaIndustry, setNewSchemaIndustry] = useState('Real Estate');

  // Load records for active schema
  const activeSchema = customSchemas.find((s) => s.id === selectedCustomSchemaId) || customSchemas[0];

  useEffect(() => {
    if (activeSchema?.id) {
      loadSchemaRecords(activeSchema.id);
    }
  }, [activeSchema?.id]);

  const loadSchemaRecords = async (schemaId) => {
    try {
      setLoadingRecords(true);
      const res = await api.getCustomRecords(schemaId);
      setRecords(res.data || []);
    } catch (err) {
      console.error('Failed to load custom records:', err);
    } finally {
      setLoadingRecords(false);
    }
  };

  const handleCreateNewSchema = async (e) => {
    e.preventDefault();
    if (!newSchemaName.trim()) return;

    try {
      await api.createCustomSchema({
        name: newSchemaName,
        singularLabel: newSchemaName,
        pluralLabel: `${newSchemaName}s`,
        industryPreset: newSchemaIndustry,
        fields: [
          { key: 'code', label: `${newSchemaName} ID`, type: 'text', required: true },
          { key: 'name', label: 'Title / Reference', type: 'text' },
          { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Pending', 'Closed'] },
        ],
      });
      showToast(`Custom Object "${newSchemaName}" created successfully!`, 'success');
      setNewSchemaName('');
      setIsCreatingSchema(false);
      refreshData();
    } catch (err) {
      showToast(`Creation failed: ${err.message}`, 'error');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-white">Universal Custom Objects Studio</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
              No-Code Architecture
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure industry-specific business entities (Properties, Patients, Students, Equipment) with custom fields
          </p>
        </div>

        <button
          onClick={() => setIsCreatingSchema(!isCreatingSchema)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-xs font-bold text-slate-950 shadow-glow transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Define New Custom Object</span>
        </button>
      </div>

      {/* New Schema Creator Form */}
      {isCreatingSchema && (
        <form
          onSubmit={handleCreateNewSchema}
          className="glass-panel p-5 rounded-2xl border border-brand-400/40 space-y-4 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>Define New Custom Business Object</span>
            </h3>
            <button
              type="button"
              onClick={() => setIsCreatingSchema(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Object Name (e.g. Property, Patient, Student, Vehicle)
              </label>
              <input
                type="text"
                required
                value={newSchemaName}
                onChange={(e) => setNewSchemaName(e.target.value)}
                placeholder="e.g. Production Order"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-brand-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Industry Preset</label>
              <select
                value={newSchemaIndustry}
                onChange={(e) => setNewSchemaIndustry(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-brand-400"
              >
                <option value="Real Estate">Real Estate & Properties</option>
                <option value="Healthcare">Healthcare & Clinical</option>
                <option value="Education">Education & Courses</option>
                <option value="Manufacturing">Manufacturing & Inventory</option>
                <option value="Automotive">Automotive & Fleet</option>
                <option value="Custom">Custom Enterprise</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-xs font-bold text-slate-950 shadow-glow transition-all"
            >
              Generate Schema & Table in DynamoDB
            </button>
          </div>
        </form>
      )}

      {/* Schema Switcher Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {customSchemas.map((schema) => {
          const isSelected = (activeSchema?.id === schema.id);
          return (
            <button
              key={schema.id}
              onClick={() => setSelectedCustomSchemaId(schema.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-brand-500 text-slate-950 shadow-glow font-extrabold'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Boxes className="w-4 h-4" />
              <span>{schema.pluralLabel || schema.name}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20">
                {schema.industryPreset}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Custom Schema Details & Records Table */}
      {activeSchema && (
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden space-y-4 p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>{activeSchema.name} Records</span>
                <span className="text-xs text-slate-400 font-normal">
                  ({records.length} records in AWS DynamoDB)
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Industry: <strong className="text-brand-300">{activeSchema.industryPreset}</strong> • Schema ID: <span className="font-mono text-[11px]">{activeSchema.id}</span>
              </p>
            </div>

            <button
              onClick={() => showToast(`Record added to ${activeSchema.name} table!`, 'success')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-semibold text-white transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-brand-400" />
              <span>Add {activeSchema.singularLabel || 'Record'}</span>
            </button>
          </div>

          {/* Records Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-4">Record ID</th>
                  {(activeSchema.fields || []).map((f) => (
                    <th key={f.key} className="py-2.5 px-4">
                      {f.label}
                    </th>
                  ))}
                  <th className="py-2.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {records.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4 font-mono text-brand-300 font-bold">{rec.id}</td>
                    {(activeSchema.fields || []).map((f) => {
                      const val = rec.data?.[f.key];
                      return (
                        <td key={f.key} className="py-3 px-4 text-slate-200 font-medium">
                          {f.type === 'currency' && val
                            ? `$${Number(val).toLocaleString()}`
                            : val !== undefined
                            ? String(val)
                            : '—'}
                        </td>
                      );
                    })}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => showToast('Record details opened in modal', 'success')}
                        className="text-xs font-semibold text-brand-400 hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}

                {records.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500 text-xs">
                      No records created for {activeSchema.name} yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
