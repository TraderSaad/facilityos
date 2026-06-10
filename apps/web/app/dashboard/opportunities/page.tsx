'use client';

import Link from 'next/link';

export default function OpportunitiesPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-brand-300">Opportunities</p>
            <h1 className="mt-2 text-2xl font-semibold text-white">Pipeline & deals</h1>
          </div>
          <Link href="/dashboard/opportunities/new" className="rounded-3xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white">New Opportunity</Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-800/90 bg-slate-950/90 p-6">Kanban and list placeholder</div>
        <div className="rounded-3xl border border-slate-800/90 bg-slate-950/90 p-6">Filters and analytics placeholder</div>
      </div>
    </div>
  );
}
