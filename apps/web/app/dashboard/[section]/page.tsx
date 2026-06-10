import Link from 'next/link';

const moduleLabels: Record<string, string> = {
  crm: 'CRM',
  assets: 'Assets',
  'work-orders': 'Work Orders',
  'preventive-maintenance': 'Preventive Maintenance',
  inspections: 'Inspections',
  contractors: 'Contractors',
  visitors: 'Visitors',
  'space-management': 'Space Management',
  energy: 'Energy',
  esg: 'ESG',
  reports: 'Reports',
  admin: 'Admin'
};

export function generateStaticParams() {
  return Object.keys(moduleLabels).map((section) => ({ section }));
}

export default function DashboardSectionPage({ params }: { params: { section: string } }) {
  const title = moduleLabels[params.section] ?? 'Workspace';

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-8 shadow-soft backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-brand-300">{title}</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">{title}</h1>
          </div>
          <div className="rounded-3xl bg-slate-950/90 p-4 text-sm text-slate-300">
            <p className="font-medium text-white">Current module</p>
            <p className="mt-1 text-slate-400">Placeholder data for foundational dashboard navigation.</p>
          </div>
        </div>
      </div>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-[1.75rem] border border-slate-800/90 bg-slate-950/90 p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Overview</p>
          <p className="mt-4 text-lg font-semibold text-white">{title} workspace</p>
          <p className="mt-3 text-slate-400">This workspace placeholder is ready for module-specific widgets, filters, and quick actions.</p>
        </div>
        <div className="rounded-[1.75rem] border border-slate-800/90 bg-slate-950/90 p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Key metrics</p>
          <ul className="mt-4 space-y-3 text-slate-300">
            <li>• Status indicators and alerts</li>
            <li>• Tenant health score</li>
            <li>• Workflow backlog</li>
          </ul>
        </div>
        <div className="rounded-[1.75rem] border border-slate-800/90 bg-slate-950/90 p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Action center</p>
          <div className="mt-4 flex flex-col gap-3">
            <button className="rounded-3xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-400">Create new ticket</button>
            <button className="rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-brand-400">View module guide</button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-8 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm uppercase tracking-[0.35em] text-brand-300">Breadcrumb</p>
            <Link href="/dashboard" className="text-sm font-medium text-brand-300 hover:text-brand-200">Back to dashboard</Link>
          </div>
          <div className="mt-6 rounded-[1.75rem] bg-slate-950/90 p-6">
            <p className="text-slate-300">You are viewing the {title} module placeholder. Build your business workflows and analytics here.</p>
          </div>
        </div>
        <div className="rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.35em] text-brand-300">Insights</p>
          <div className="mt-6 space-y-4">
            <div className="rounded-3xl border border-slate-800/90 bg-slate-950/90 p-5">
              <p className="text-sm text-slate-400">Leverage dashboards to monitor operations across facilities.</p>
            </div>
            <div className="rounded-3xl border border-slate-800/90 bg-slate-950/90 p-5">
              <p className="text-sm text-slate-400">Integrate with tenant and user security for a consistent experience.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
