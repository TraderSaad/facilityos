'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../providers';

export default function LoginPage() {
  const router = useRouter();
  const auth = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth?.initialized && auth.user) {
      router.replace('/dashboard');
    }
  }, [auth?.initialized, auth?.user, router]);

  const updateForm = (field: 'email' | 'password', value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await auth?.login(form);
      router.replace('/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Unable to log in');
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
              <p className="text-sm uppercase tracking-[0.35em] text-brand-300">Secure access</p>
              <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">Sign in to FacilityOS</h1>
            </div>
          </div>
          <p className="max-w-xl text-slate-400 leading-8">
            Access your tenant dashboard with a secure JWT session. Enter your credentials to continue.
          </p>
          <div className="mt-10 rounded-[1.75rem] border border-slate-800/90 bg-slate-950/80 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Demo credentials</p>
            <p className="mt-3 text-sm text-slate-300">demo@facilityos.local / Password123</p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-8 shadow-soft backdrop-blur-xl lg:p-10">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.35em] text-brand-300">Login</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Enterprise authentication</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error ? (
              <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200">{error}</div>
            ) : null}

            <label className="block text-sm font-medium text-slate-300">
              Email
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
                placeholder="Enter your password"
              />
            </label>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-3xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
              <Link href="/forgot-password" className="text-sm font-medium text-brand-300 transition hover:text-brand-200">
                Forgot password?
              </Link>
            </div>
          </form>

          <div className="mt-8 rounded-3xl border border-slate-800/90 bg-slate-950/80 p-5 text-sm text-slate-400">
            <p>
              New to FacilityOS? <Link href="/register" className="text-brand-300 hover:text-brand-200">Create your tenant account</Link>.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
