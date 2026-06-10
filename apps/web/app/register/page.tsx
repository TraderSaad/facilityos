'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../providers';

export default function RegisterPage() {
  const router = useRouter();
  const auth = useAuth();
  const [form, setForm] = useState({ email: '', password: '', name: '', tenantName: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth?.initialized && auth.user) {
      router.replace('/dashboard');
    }
  }, [auth?.initialized, auth?.user, router]);

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const tenantId = form.tenantName.trim() || `tenant-${Date.now()}`;
      await auth?.register({
        email: form.email,
        password: form.password,
        name: form.name,
        tenantId
      });
      router.replace('/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Unable to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <section className="rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-10 shadow-soft backdrop-blur-xl lg:p-14">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-brand-500/15 text-2xl text-brand-300">F</div>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-brand-300">Create tenant</p>
              <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">Register a new enterprise account</h1>
            </div>
          </div>
          <p className="max-w-xl text-slate-400 leading-8">
            Securely onboard your team with tenant-aware registration and modern auth. Create a new account and access the dashboard immediately.
          </p>
          <div className="mt-10 rounded-[1.75rem] border border-slate-800/90 bg-slate-950/80 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Ready to launch</p>
            <p className="mt-3 text-sm text-slate-300">Your tenant ID is generated automatically based on your organization name.</p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-8 shadow-soft backdrop-blur-xl lg:p-10">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.35em] text-brand-300">Register</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Join the workspace</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error ? (
              <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200">{error}</div>
            ) : null}

            <label className="block text-sm font-medium text-slate-300">
              Organization name
              <input
                type="text"
                value={form.tenantName}
                onChange={(event) => updateForm('tenantName', event.currentTarget.value)}
                required
                minLength={3}
                className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20"
                placeholder="FacilityOS Labs"
              />
            </label>

            <label className="block text-sm font-medium text-slate-300">
              Full name
              <input
                type="text"
                value={form.name}
                onChange={(event) => updateForm('name', event.currentTarget.value)}
                className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20"
                placeholder="Jane Doe"
              />
            </label>

            <label className="block text-sm font-medium text-slate-300">
              Work email
              <input
                type="email"
                value={form.email}
                onChange={(event) => updateForm('email', event.currentTarget.value)}
                required
                className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20"
                placeholder="you@facilityos.local"
              />
            </label>

            <label className="block text-sm font-medium text-slate-300">
              Password
              <input
                type="password"
                value={form.password}
                onChange={(event) => updateForm('password', event.currentTarget.value)}
                required
                minLength={6}
                className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20"
                placeholder="Create a secure password"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-3xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Creating account…' : 'Create tenant account'}
            </button>
          </form>

          <p className="mt-8 text-sm text-slate-400">
            Already have an account? <Link href="/login" className="text-brand-300 hover:text-brand-200">Sign in here</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}
