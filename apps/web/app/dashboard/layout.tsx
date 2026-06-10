'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../providers';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'CRM', href: '/dashboard/crm' },
  { label: 'Opportunities', href: '/dashboard/opportunities' },
  { label: 'Tenders', href: '/dashboard/tenders' },
  { label: 'Quotations', href: '/dashboard/quotations' },
  { label: 'Assets', href: '/dashboard/assets' },
  { label: 'Work Orders', href: '/dashboard/work-orders' },
  { label: 'Preventive Maintenance', href: '/dashboard/preventive-maintenance' },
  { label: 'Inspections', href: '/dashboard/inspections' },
  { label: 'Contractors', href: '/dashboard/contractors' },
  { label: 'Visitors', href: '/dashboard/visitors' },
  { label: 'Space Management', href: '/dashboard/space-management' },
  { label: 'Energy', href: '/dashboard/energy' },
  { label: 'ESG', href: '/dashboard/esg' },
  { label: 'Reports', href: '/dashboard/reports' },
  { label: 'Admin', href: '/dashboard/admin' }
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!auth) return;
    if (auth.initialized && !auth.user) {
      router.replace('/login');
    }
  }, [auth, router]);

  const activePath = useMemo(() => pathname.replace(/\/$/, ''), [pathname]);

  if (!auth || !auth.initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-200">
        Loading workspace…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <aside className={`transition-all duration-300 ${sidebarOpen ? 'w-72' : 'w-20'} border-r border-slate-800/90 bg-slate-950/95`}> 
          <div className="flex h-full flex-col justify-between">
            <div className="space-y-8 p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-brand-500/15 text-xl text-brand-300">F</div>
                  {sidebarOpen ? <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-slate-500">FacilityOS</p>
                    <p className="text-base font-semibold text-white">Workspace</p>
                  </div> : null}
                </div>
                <button
                  type="button"
                  onClick={() => setSidebarOpen((open) => !open)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-slate-900 text-slate-300 transition hover:bg-slate-800"
                  aria-label="Toggle sidebar"
                >
                  {sidebarOpen ? '«' : '»'}
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const active = activePath === item.href || (item.href !== '/dashboard' && activePath.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group flex items-center gap-3 rounded-3xl px-4 py-3 text-sm transition ${active ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
                    >
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-800 text-slate-300 group-hover:bg-brand-500/15">{item.label.charAt(0)}</span>
                      {sidebarOpen ? <span>{item.label}</span> : null}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="border-t border-slate-800/90 p-6">
              <div className="rounded-3xl bg-slate-900/90 p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Signed in as</p>
                <p className="mt-3 font-semibold text-white">{auth.user?.name || auth.user?.email || 'Workspace user'}</p>
                <p className="text-sm text-slate-400">Tenant: {auth.user?.tenantId || 'Unknown'}</p>
                <button
                  type="button"
                  onClick={auth.logout}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-3xl bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="border-b border-slate-800/90 bg-slate-950/95 px-6 py-5 shadow-sm backdrop-blur-xl lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-brand-300">Workspace</p>
                <p className="text-lg font-semibold text-white">{activePath === '/dashboard' ? 'Dashboard' : activePath.split('/').slice(2).join(' / ')}</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200 transition hover:border-brand-400 hover:text-white">
                  Notifications
                </button>
                <button className="rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200 transition hover:border-brand-400 hover:text-white">
                  Tenant switcher
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
