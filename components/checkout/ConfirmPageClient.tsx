"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { formatUsd } from "@/lib/parse-price";

const PAY_LABEL: Record<string, string> = {
  card: "Card",
  net30: "Net 30 invoice",
  ach: "ACH / wire",
};

export default function ConfirmPageClient() {
  const router = useRouter();
  const { enrichedLines, subtotal, shipping, paymentMethod, exportOrderSnapshot } = useCart();
  const [busy, setBusy] = useState(false);

  const estTax = subtotal * 0.08;
  const total = subtotal + estTax;

  useEffect(() => {
    if (enrichedLines.length === 0) router.replace("/cart");
  }, [enrichedLines.length, router]);

  const paymentLabel = useMemo(
    () => (paymentMethod ? PAY_LABEL[paymentMethod] ?? paymentMethod : "—"),
    [paymentMethod]
  );

  const onPay = () => {
    if (!paymentMethod || enrichedLines.length === 0) return;
    setBusy(true);
    const ref = exportOrderSnapshot();
    router.push(`/checkout/complete?ref=${encodeURIComponent(ref)}`);
  };

  if (enrichedLines.length === 0) return null;

  return (
    <main className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-2">
        Confirm payment
      </h1>
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-8">
        Review your order, billing path, and ship-to details before submitting.
      </p>

      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 shadow-sm">
          <h2 className="text-xs font-black uppercase tracking-widest text-cyan-700 dark:text-cyan-400 mb-4">
            Ship to
          </h2>
          <address className="not-italic text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <p className="font-bold text-slate-900 dark:text-white">{shipping.fullName}</p>
            <p>{shipping.company}</p>
            <p>{shipping.line1}</p>
            {shipping.line2 && <p>{shipping.line2}</p>}
            <p>
              {shipping.city}, {shipping.region} {shipping.postal}
            </p>
            <p>{shipping.country}</p>
            <p className="mt-2 font-mono text-xs text-slate-500">{shipping.email}</p>
            <p className="font-mono text-xs text-slate-500">{shipping.phone}</p>
          </address>
        </section>

        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 shadow-sm">
          <h2 className="text-xs font-black uppercase tracking-widest text-cyan-700 dark:text-cyan-400 mb-4">
            Payment
          </h2>
          <p className="text-sm font-bold text-slate-900 dark:text-white">{paymentLabel}</p>
          <p className="mt-2 text-xs text-slate-500 leading-relaxed">
            By confirming, you agree to ComponentHub procurement terms for demo transactions.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 shadow-sm">
          <h2 className="text-xs font-black uppercase tracking-widest text-cyan-700 dark:text-cyan-400 mb-4">
            Order lines
          </h2>
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {enrichedLines.map(({ product, qty, lineTotal }) => (
              <li key={product.id} className="flex justify-between gap-4 py-3 text-sm first:pt-0">
                <span className="text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-white">{product.name}</span>
                  <span className="text-slate-500"> × {qty}</span>
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white shrink-0">
                  {formatUsd(lineTotal)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4 text-sm">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <dt>Subtotal</dt>
              <dd className="font-mono font-bold text-slate-900 dark:text-white">
                {formatUsd(subtotal)}
              </dd>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <dt>Est. tax (8%)</dt>
              <dd className="font-mono font-bold text-slate-900 dark:text-white">
                {formatUsd(estTax)}
              </dd>
            </div>
            <div className="flex justify-between text-lg font-black pt-2">
              <dt className="text-slate-900 dark:text-white">Total</dt>
              <dd className="font-mono text-cyan-600 dark:text-cyan-400">{formatUsd(total)}</dd>
            </div>
          </dl>
        </section>

        <div className="flex items-start gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30 p-4 text-xs text-slate-600 dark:text-slate-400">
          <ShieldCheck className="w-5 h-5 shrink-0 text-cyan-600 dark:text-cyan-400" />
          <span>
            Secure demo checkout. No payment credentials are collected in this environment.
          </span>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
          <Link
            href="/checkout/payment"
            className="inline-flex justify-center items-center rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-3 text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Back
          </Link>
          <button
            type="button"
            disabled={busy || !paymentMethod}
            onClick={onPay}
            className="inline-flex justify-center items-center rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white px-8 py-3.5 text-sm font-black uppercase tracking-wide shadow-lg shadow-cyan-600/25"
          >
            {busy ? "Processing…" : "Confirm payment"}
          </button>
        </div>
      </div>
    </main>
  );
}
