"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Building2, CreditCard, Landmark } from "lucide-react";
import { useCart, type PaymentMethodId } from "@/components/cart/cart-context";

const OPTIONS: {
  id: PaymentMethodId;
  title: string;
  desc: string;
  icon: typeof CreditCard;
}[] = [
  {
    id: "card",
    title: "Card",
    desc: "Visa, Mastercard, Amex — charged at shipment release.",
    icon: CreditCard,
  },
  {
    id: "net30",
    title: "Net 30 invoice",
    desc: "For approved B2B accounts; subject to credit review.",
    icon: Building2,
  },
  {
    id: "ach",
    title: "ACH / wire",
    desc: "Settlement instructions sent after order confirmation.",
    icon: Landmark,
  },
];

export default function PaymentPageClient() {
  const router = useRouter();
  const { paymentMethod, setPaymentMethod, enrichedLines } = useCart();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (enrichedLines.length === 0) router.replace("/cart");
  }, [enrichedLines.length, router]);

  const onContinue = () => {
    if (!paymentMethod) {
      setError("Select a payment method to continue.");
      return;
    }
    setError(null);
    router.push("/checkout/confirm");
  };

  if (enrichedLines.length === 0) return null;

  return (
    <main className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-2">
        Payment method
      </h1>
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-8">
        Choose how you would like to settle this order. Demo checkout — no real charges.
      </p>

      <div className="space-y-3 mb-8">
        {OPTIONS.map(({ id, title, desc, icon: Icon }) => {
          const selected = paymentMethod === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => {
                setPaymentMethod(id);
                setError(null);
              }}
              className={`w-full flex gap-4 text-left rounded-2xl border p-4 transition-all ${
                selected
                  ? "border-cyan-500 bg-cyan-50/80 dark:bg-cyan-950/30 ring-2 ring-cyan-500/30"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-cyan-300/60"
              }`}
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                  selected
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                }`}
              >
                <Icon className="w-6 h-6" />
              </span>
              <span>
                <span className="block font-black text-slate-900 dark:text-white uppercase tracking-wide text-sm">
                  {title}
                </span>
                <span className="mt-1 block text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {desc}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="mb-4 text-sm font-medium text-rose-600 dark:text-rose-400" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
        <Link
          href="/checkout/shipping"
          className="inline-flex justify-center items-center rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-3 text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          Back
        </Link>
        <button
          type="button"
          onClick={onContinue}
          className="inline-flex justify-center items-center gap-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 text-sm font-black uppercase tracking-wide shadow-lg shadow-cyan-600/25"
        >
          Review &amp; confirm
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </main>
  );
}
