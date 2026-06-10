'use client';

import React from 'react';

const columns = [
  { id: 'new', title: 'New' },
  { id: 'contacted', title: 'Contacted' },
  { id: 'qualified', title: 'Qualified' },
  { id: 'proposal', title: 'Proposal' },
  { id: 'won', title: 'Won' }
];

export default function KanbanBoard() {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      {columns.map((col) => (
        <div key={col.id} className="rounded-2xl border border-slate-800/90 bg-slate-950/90 p-4">
          <h3 className="text-sm font-semibold text-white">{col.title}</h3>
          <div className="mt-4 space-y-3 min-h-[120px]">
            <div className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-3 text-sm text-slate-200">Sample card</div>
          </div>
        </div>
      ))}
    </div>
  );
}
