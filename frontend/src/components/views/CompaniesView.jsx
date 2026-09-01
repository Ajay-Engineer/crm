import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  Building2,
  DollarSign,
  Users,
  Search,
  MapPin,
  Globe
} from 'lucide-react';

export default function CompaniesView() {
  const { companies, deals } = useCrm();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompanies = companies.filter((c) =>
    `${c.name} ${c.industry} ${c.city}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-5 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Companies & Accounts</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
              Enterprise Accounts
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Manage organization hierarchy, industry segments, annual revenue & linked pipeline deals
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search companies, industries..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-400 shadow-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCompanies.map((comp) => {
          const linkedDeals = deals.filter((d) => d.companyId === comp.id);
          const totalValue = linkedDeals.reduce((sum, d) => sum + (Number(d.value) || 0), 0);

          return (
            <div
              key={comp.id}
              className="glass-panel p-5 rounded-2xl hover:border-brand-300 hover:shadow-card-hover transition-all space-y-4 shadow-card"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600 shadow-xs">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{comp.name}</h3>
                    <p className="text-xs text-slate-500 font-semibold">{comp.industry}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Linked Deals</span>
                  <div className="text-xs font-black font-mono text-emerald-600">
                    ${totalValue > 0 ? totalValue.toLocaleString() : (comp.annualRevenue ? (comp.annualRevenue / 100).toLocaleString() : '84,000')}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100 font-medium">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{comp.city || 'Global HQ'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>{comp.employees || '100-250'} Employees</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>{comp.domain || 'enterprise.com'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                  <span>Rev: ${(comp.annualRevenue ? comp.annualRevenue / 1000000 : 15).toFixed(1)}M/yr</span>
                </div>
              </div>

              {comp.tags && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {comp.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-brand-800 border border-slate-200"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
