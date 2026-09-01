import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  Users,
  Search,
  Building,
  Mail,
  Phone,
  ArrowUpRight,
  Sparkles
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
    <div className="space-y-5 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Contacts & Directory</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
              Customer 360 Linked
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Contact profiles, omnichannel interaction history and relationship dossiers
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search contacts..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-400 shadow-xs"
          />
        </div>
      </div>

      {/* Contacts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => openCustomer360(contact.id)}
            className="glass-panel p-5 rounded-2xl hover:border-brand-300 hover:shadow-card-hover cursor-pointer transition-all space-y-4 group shadow-card"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-400 to-[#0284c7] p-[1px] shadow-sm">
                  <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center text-sm font-extrabold text-brand-700">
                    {contact.firstName?.[0]}
                    {contact.lastName?.[0]}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {contact.firstName} {contact.lastName}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">{contact.jobTitle}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Health: {contact.aiHealthScore || 90}%
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100 font-medium">
              <div className="flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-bold text-slate-800 truncate">{contact.companyName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate text-slate-500">{contact.email}</span>
              </div>
              {contact.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-slate-500">{contact.phone}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-400 text-[11px] font-medium">
                {contact.lastInteraction || 'Active relationship'}
              </span>
              <span className="text-brand-600 font-bold group-hover:underline flex items-center gap-1">
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
