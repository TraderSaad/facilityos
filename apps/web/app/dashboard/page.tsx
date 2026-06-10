'use client';

import { useMemo } from 'react';
import { useAuth } from '../providers';

const stats = [
  { label: 'Active tenants', value: '18' },
  { label: 'Open work orders', value: '24' },
  { label: 'Last sync', value: '2m ago' },
  { label: 'ESG score', value: '89 / 100' }
];

const trends = [
  { title: 'Occupancy', value: '92%', delta: '+3%' },
  { title: 'Asset utilization', value: '78%', delta: '+5%' },
  { title: 'Energy savings', value: '14%', delta: '+1.2%' }
];

export default function DashboardPage() {
  const auth = useAuth();

  const welcomeName = useMemo(() => auth?.user?.name || auth?.user?.email || 'Operator', [auth?.user]);

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-8 shadow-soft backdrop-blur-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-brand-300">Dashboard</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Welcome back, {welcomeName}</h1>
            <p className="mt-3 text-slate-400">Your enterprise facility operations workspace is ready. Monitor KPIs, manage tenants, and explore the module suite.</p>
          </div>
          <div className="inline-flex items-center gap-3 rounded-3xl bg-slate-950/90 px-5 py-4 text-sm text-slate-300 shadow-sm">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-200">{auth?.user?.name?.charAt(0).toUpperCase() || 'F'}</span>
            <div>
              <p className="font-medium text-white">{auth?.user?.name || auth?.user?.email}</p>
              <p className="text-xs text-slate-500">Tenant ID: {auth?.user?.tenantId}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-4">
        {stats.map((metric) => (
          <div key={metric.label} className="rounded-[1.75rem] border border-slate-800/90 bg-slate-950/90 p-6 shadow-soft transition hover:border-brand-500/40">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{metric.label}</p>
            <p className="mt-4 text-3xl font-semibold text-white">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-8 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-brand-300">Operational insights</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Week overview</h2>
            </div>
            <span className="rounded-2xl bg-slate-800/90 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-400">Updated just now</span>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {trends.map((trend) => (
              <div key={trend.title} className="rounded-3xl border border-slate-800/90 bg-slate-950/90 p-5">
                <p className="text-sm text-slate-400">{trend.title}</p>
                <p className="mt-3 text-2xl font-semibold text-white">{trend.value}</p>
                <p className="mt-2 text-sm text-emerald-400">{trend.delta} vs last week</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.35em] text-brand-300">Workspace activity</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Recent updates</h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-3xl border border-slate-800/90 bg-slate-950/90 p-5">
              <p className="text-sm text-slate-400">CRM system synced with latest visitor log.</p>
              <p className="mt-2 text-sm text-slate-500">2 minutes ago</p>
            </div>
            <div className="rounded-3xl border border-slate-800/90 bg-slate-950/90 p-5">
              <p className="text-sm text-slate-400">Preventive maintenance schedule refreshed.</p>
              <p className="mt-2 text-sm text-slate-500">15 minutes ago</p>
            </div>
            <div className="rounded-3xl border border-slate-800/90 bg-slate-950/90 p-5">
              <p className="text-sm text-slate-400">New asset category added to the system.</p>
              <p className="mt-2 text-sm text-slate-500">1 hour ago</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
