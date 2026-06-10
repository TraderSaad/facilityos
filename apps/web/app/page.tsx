import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col gap-10 px-6 py-10 lg:flex-row lg:items-center lg:px-12">
        <section className="flex-1 rounded-[2rem] border border-slate-800/80 bg-slate-900/90 p-10 shadow-soft backdrop-blur-xl lg:p-16">
          <div className="flex items-center gap-3 text-brand-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-brand-500/10 text-2xl">F</div>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-brand-300">FacilityOS</p>
              <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">Enterprise facilities management, modernized.</h1>
            </div>
          </div>
          <p className="mt-8 max-w-2xl text-slate-300 leading-8 sm:text-lg">
            Launch a secure multi-tenant platform with polished enterprise workflows, secure auth, and a modern dark interface.
          </p>
          <div className="mt-10 grid gap-6 sm:max-w-xl sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-800/90 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Experience</p>
              <p className="mt-3 text-xl font-semibold text-white">Fast auth flow</p>
              <p className="mt-2 text-slate-400">Login and registration workflows connected to Identity Service APIs.</p>
            </div>
            <div className="rounded-3xl border border-slate-800/90 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Support</p>
              <p className="mt-3 text-xl font-semibold text-white">Tenant-first UI</p>
              <p className="mt-2 text-slate-400">Dashboard foundation with notifications, tenant switching, and enterprise navigation.</p>
            </div>
          </div>
        </section>

        <section className="w-full max-w-xl rounded-[2rem] border border-slate-800/80 bg-slate-900/90 p-8 shadow-soft backdrop-blur-xl lg:p-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-brand-300">Login preview</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Ready to get started?</h2>
            </div>
            <span className="rounded-2xl bg-slate-800 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-300">No backend required</span>
          </div>

          <div className="mt-8 space-y-5 rounded-3xl border border-slate-800/90 bg-slate-950/80 p-6">
            <div>
              <p className="text-sm font-semibold text-slate-300">Demo credentials</p>
              <p className="mt-3 text-sm text-slate-400">Use these values to preview the app without backend setup:</p>
              <div className="mt-4 text-sm text-slate-200">
                <p>Email: <span className="font-medium text-white">demo@facilityos.local</span></p>
                <p>Password: <span className="font-medium text-white">Password123</span></p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-slate-400">Need a new account? Register and start a secure tenant sandbox.</p>
              <p className="text-sm text-slate-400">Forgot your password? Use the reset workflow to continue.</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/login" className="button-primary w-full text-center sm:w-auto">Login to your tenant</Link>
            <Link href="/register" className="button-secondary w-full text-center sm:w-auto">Create an account</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
