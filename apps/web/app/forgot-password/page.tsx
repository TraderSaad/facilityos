'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-4xl flex-col gap-10">
        <section className="rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-10 shadow-soft backdrop-blur-xl lg:p-14">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.35em] text-brand-300">Password Reset</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Forgot your password?</h1>
          </div>
          <p className="max-w-2xl text-slate-400 leading-8">
            Enter your work email and we will send password recovery instructions. This is a demo workflow built for enterprise SaaS use cases.
          </p>
        </section>

        <section className="rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-8 shadow-soft backdrop-blur-xl lg:p-10">
          {submitted ? (
            <div className="space-y-4">
              <p className="text-slate-300">If an account exists for <span className="font-medium text-white">{email}</span>, password recovery instructions have been sent.</p>
              <p className="text-sm text-slate-400">If you remember your password, you can <Link href="/login" className="text-brand-300 hover:text-brand-200">sign in instead</Link>.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <label className="block text-sm font-medium text-slate-300">
                Work email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.currentTarget.value)}
                  required
                  className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20"
                  placeholder="you@facilityos.local"
                />
              </label>

              <button
                type="submit"
                className="button-primary w-full text-center"
              >
                Send reset link
              </button>
            </form>
          )}

          <p className="mt-6 text-sm text-slate-400">
            Back to <Link href="/login" className="text-brand-300 hover:text-brand-200">sign in</Link> or <Link href="/register" className="text-brand-300 hover:text-brand-200">create a new account</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}
