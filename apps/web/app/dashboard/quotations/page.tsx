'use client';

import Link from 'next/link';
import PricingSummary from '../../../components/quotations/PricingSummary';

export default function QuotationsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-brand-300">Quotations</p>
            <h1 className="mt-2 text-2xl font-semibold text-white">Quotation engine</h1>
          </div>
          <Link href="/dashboard/quotations/new" className="rounded-3xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white">New Quotation</Link>
        </div>
      </div>

      <PricingSummary />
    </div>
  );
}
