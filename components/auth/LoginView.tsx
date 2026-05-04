"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, User } from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, ready } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const from = searchParams.get("from") || "/cart";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const ok = login(username, password);
    setSubmitting(false);
    if (!ok) {
      setError("Invalid username or password.");
      return;
    }
    const target = from.startsWith("/") ? from : "/cart";
    router.push(target);
    router.refresh();
  };

  return (
    <main className="container mx-auto px-4 py-16 max-w-md">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xl shadow-slate-200/50 dark:shadow-none p-8">
        <div className="mb-8 text-center">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-2">
            ComponentHub
          </p>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            Sign in
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Customer access is required before opening your cart or checkout.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">
              Username
            </span>
            <div className="relative mt-1.5">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                autoComplete="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={!ready}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 pl-10 pr-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                placeholder="TestUser"
                required
              />
            </div>
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">
              Password
            </span>
            <div className="relative mt-1.5">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                autoComplete="current-password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={!ready}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 pl-10 pr-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                placeholder="••••••••"
                required
              />
            </div>
          </label>

          {error && (
            <p className="text-sm font-medium text-rose-600 dark:text-rose-400" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!ready || submitting}
            className="w-full rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white py-3 font-black uppercase tracking-wide text-sm shadow-lg shadow-cyan-600/25"
          >
            {submitting ? "Signing in…" : "Sign in & continue"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Demo account: <span className="font-mono text-slate-700 dark:text-slate-300">TestUser</span> /{" "}
          <span className="font-mono text-slate-700 dark:text-slate-300">Admin1224@</span>
        </p>

        <Link
          href="/"
          className="mt-4 block text-center text-xs font-bold uppercase text-cyan-700 dark:text-cyan-400 hover:underline"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}

export default function LoginView() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-20 text-center font-mono text-cyan-600 text-sm">
          Loading…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
