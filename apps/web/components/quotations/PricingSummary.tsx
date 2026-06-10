'use client';

import React from 'react';

export default function PricingSummary() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="rounded-3xl border border-slate-800/90 bg-slate-950/90 p-6">
        <p className="text-sm text-slate-400">Quotation value</p>
        <p className="mt-3 text-2xl font-semibold text-white">$120,000</p>
      </div>
      <div className="rounded-3xl border border-slate-800/90 bg-slate-950/90 p-6">
        <p className="text-sm text-slate-400">Win ratio</p>
        <p className="mt-3 text-2xl font-semibold text-white">34%</p>
      </div>
      <div className="rounded-3xl border border-slate-800/90 bg-slate-950/90 p-6">
        <p className="text-sm text-slate-400">Expected revenue</p>
        <p className="mt-3 text-2xl font-semibold text-white">$41,000</p>
      </div>
    </div>
  );
}
