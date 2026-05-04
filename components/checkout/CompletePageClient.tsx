"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import {
  LAST_ORDER_SNAPSHOT_KEY,
  type LastOrderSnapshot,
  useCart,
} from "@/components/cart/cart-context";
import { formatUsd } from "@/lib/parse-price";

export default function CompletePageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refFromUrl = searchParams.get("ref");
  const { clearAfterSuccessfulOrder } = useCart();
  const [snap, setSnap] = useState<LastOrderSnapshot | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(LAST_ORDER_SNAPSHOT_KEY);
      if (!raw) {
        router.replace("/cart");
        return;
      }
      const parsed = JSON.parse(raw) as LastOrderSnapshot;
      if (refFromUrl && parsed.ref !== refFromUrl) {
        router.replace("/cart");
        return;
      }
      setSnap(parsed);
      clearAfterSuccessfulOrder();
    } catch {
      router.replace("/cart");
    }
  }, [router, refFromUrl, clearAfterSuccessfulOrder]);

  if (!snap) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-slate-500 font-mono text-sm">
        Verifying order…
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12 max-w-lg text-center">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mb-6">
        <CheckCircle2 className="w-9 h-9" strokeWidth={2} />
      </div>
      <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-2">
        Thank you
      </h1>
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
        Your order is recorded. A confirmation has been queued for{" "}
        <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{snap.email}</span>
        .
      </p>
      <p className="font-mono text-lg font-black text-cyan-600 dark:text-cyan-400 mb-2">
        {snap.ref}
      </p>
      <p className="text-xs text-slate-500 mb-8">
        Total {formatUsd(snap.subtotal + snap.subtotal * 0.08)} · {snap.lines.length} line
        {snap.lines.length === 1 ? "" : "s"}
      </p>
      <Link
        href="/products"
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3.5 font-black uppercase tracking-wide text-sm shadow-lg shadow-cyan-600/25"
      >
        Continue shopping
        <ArrowRight className="w-4 h-4" />
      </Link>
      <Link
        href="/"
        className="mt-4 block text-xs font-bold uppercase text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400"
      >
        Back to home
      </Link>
    </main>
  );
}
