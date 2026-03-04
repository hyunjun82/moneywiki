"use client";

import { Phone, Clock, MapPin, ExternalLink } from "lucide-react";

export interface ContactInfo { name: string; description?: string; phone?: string; hours?: string; address?: string; url?: string }

export function ContactCard({ contacts }: { contacts: ContactInfo[] }) {
  return (
    <div className="my-6 grid gap-3 sm:grid-cols-2">
      {contacts.map((c, i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
          <h4 className="text-sm font-bold text-gray-900">{c.name}</h4>
          {c.description && <p className="text-xs text-gray-400 mt-0.5">{c.description}</p>}
          <div className="mt-3 space-y-1.5">
            {c.phone && <a href={`tel:${c.phone}`} className="flex items-center gap-2 text-sm text-[#1B3A5C] hover:underline"><Phone className="h-3.5 w-3.5" />{c.phone}</a>}
            {c.hours && <div className="flex items-center gap-2 text-xs text-gray-500"><Clock className="h-3.5 w-3.5" />{c.hours}</div>}
            {c.address && <div className="flex items-center gap-2 text-xs text-gray-500"><MapPin className="h-3.5 w-3.5" />{c.address}</div>}
            {c.url && <a href={c.url} className="flex items-center gap-2 text-xs text-blue-500 hover:underline"><ExternalLink className="h-3.5 w-3.5" />홈페이지</a>}
          </div>
        </div>
      ))}
    </div>
  );
}
