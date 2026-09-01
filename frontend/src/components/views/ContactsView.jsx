import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  Users,
  Search,
  Building,
  Mail,
  Phone,
  ArrowUpRight,
  Sparkles,
  HeartPulse,
  Award
} from 'lucide-react';

export default function ContactsView() {
  const { contacts, openCustomer360 } = useCrm();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter((c) =>
    `${c.firstName} ${c.lastName} ${c.companyName} ${c.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-white">Contacts & Directory</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
              Customer 360 Linked
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Full contact profiles, omnichannel interaction history and relationship dossiers
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search contacts..."
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-400"
          />
        </div>
      </div>

      {/* Contacts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => openCustomer360(contact.id)}
            className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-brand-400/50 hover:shadow-glow cursor-pointer transition-all space-y-4 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-brand-600 to-brand-400 p-[1px]">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-sm font-bold text-brand-300">
                    {contact.firstName?.[0]}
                    {contact.lastName?.[0]}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-brand-300 transition-colors">
                    {contact.firstName} {contact.lastName}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">{contact.jobTitle}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Health: {contact.aiHealthScore || 90}%
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="font-semibold text-slate-200 truncate">{contact.companyName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="truncate text-slate-400">{contact.email}</span>
              </div>
              {contact.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="text-slate-400">{contact.phone}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
              <span className="text-slate-400 text-[11px]">
                {contact.lastInteraction || 'Active relationship'}
              </span>
              <span className="text-brand-400 font-semibold group-hover:underline flex items-center gap-1">
                <span>View 360 Dossier</span>
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
