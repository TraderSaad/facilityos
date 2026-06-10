'use client';

import Link from 'next/link';
import KanbanBoard from '../../../components/kanban/KanbanBoard';

export default function CRMPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-brand-300">CRM</p>
            <h1 className="mt-2 text-2xl font-semibold text-white">Customer relationship management</h1>
          </div>
          <Link href="/dashboard/crm/new" className="rounded-3xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white">New Lead</Link>
        </div>
      </div>

      <KanbanBoard />
    </div>
  );
}
