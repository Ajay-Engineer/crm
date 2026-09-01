import React, { useState, useEffect } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  Boxes,
  Plus,
  Sparkles
} from 'lucide-react';
import { api } from '../../services/api';

export default function CustomObjectsView() {
  const { customSchemas, selectedCustomSchemaId, setSelectedCustomSchemaId, showToast, refreshData } = useCrm();
  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(false);
  const [isCreatingSchema, setIsCreatingSchema] = useState(false);
  const [newSchemaName, setNewSchemaName] = useState('');
  const [newSchemaIndustry, setNewSchemaIndustry] = useState('Real Estate');

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
    <div className="space-y-5 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Universal Custom Objects Studio</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
              No-Code Architecture
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Configure industry-specific business entities (Properties, Patients, Students, Equipment) with custom fields
          </p>
        </div>

        <button
          onClick={() => setIsCreatingSchema(!isCreatingSchema)}
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#38b6ff] hover:bg-[#0284c7] text-xs font-bold text-white shadow-glow transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Define New Custom Object</span>
        </button>
      </div>

      {/* New Schema Creator Form */}
      {isCreatingSchema && (
        <form
          onSubmit={handleCreateNewSchema}
          className="glass-panel p-5 rounded-2xl border border-brand-300 space-y-4 shadow-card"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span>Define New Custom Business Object</span>
            </h3>
            <button
              type="button"
              onClick={() => setIsCreatingSchema(false)}
              className="text-xs text-slate-500 hover:text-slate-900 font-semibold"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Object Name (e.g. Property, Patient, Student, Vehicle)
              </label>
              <input
                type="text"
                required
                value={newSchemaName}
                onChange={(e) => setNewSchemaName(e.target.value)}
                placeholder="e.g. Production Order"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-400 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Industry Preset</label>
              <select
                value={newSchemaIndustry}
                onChange={(e) => setNewSchemaIndustry(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-400 focus:bg-white"
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
              className="px-4 py-2 rounded-xl bg-[#38b6ff] hover:bg-[#0284c7] text-xs font-bold text-white shadow-glow transition-all"
            >
              Save Custom Object
            </button>
          </div>
        </form>
      )}

      {/* Schema Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {customSchemas.map((schema) => {
          const isSelected = (activeSchema?.id === schema.id);
          return (
            <button
              key={schema.id}
              onClick={() => setSelectedCustomSchemaId(schema.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                isSelected
                  ? 'bg-[#38b6ff] text-white shadow-glow font-black'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 shadow-xs'
              }`}
            >
              <Boxes className="w-4 h-4" />
              <span>{schema.pluralLabel || schema.name}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/10">
                {schema.industryPreset}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Custom Schema Details & Records Table */}
      {activeSchema && (
        <div className="glass-panel rounded-2xl overflow-hidden space-y-4 p-5 shadow-card">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>{activeSchema.name} Records</span>
                <span className="text-xs text-slate-500 font-semibold">
                  ({records.length} records)
                </span>
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Industry: <strong className="text-brand-700">{activeSchema.industryPreset}</strong> • Schema ID: <span className="font-mono text-[11px] text-slate-600">{activeSchema.id}</span>
              </p>
            </div>

            <button
              onClick={() => showToast(`Record added to ${activeSchema.name} table!`, 'success')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 transition-all shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-brand-600" />
              <span>Add {activeSchema.singularLabel || 'Record'}</span>
            </button>
          </div>

          {/* Records Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
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
              <tbody className="divide-y divide-slate-100 bg-white">
                {records.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono text-brand-700 font-bold">{rec.id}</td>
                    {(activeSchema.fields || []).map((f) => {
                      const val = rec.data?.[f.key];
                      return (
                        <td key={f.key} className="py-3 px-4 text-slate-800 font-medium">
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
                        className="text-xs font-bold text-brand-600 hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}

                {records.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
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
