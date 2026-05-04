"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useCart, type ShippingDetails } from "@/components/cart/cart-context";

function isShippingValid(s: ShippingDetails) {
  return (
    s.fullName.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email.trim()) &&
    s.phone.trim().length > 5 &&
    s.line1.trim().length > 2 &&
    s.city.trim().length > 1 &&
    s.postal.trim().length > 2 &&
    s.country.trim().length > 1
  );
}

export default function ShippingPageClient() {
  const router = useRouter();
  const { shipping, setShipping, enrichedLines } = useCart();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (enrichedLines.length === 0) router.replace("/cart");
  }, [enrichedLines.length, router]);

  const onContinue = () => {
    if (!isShippingValid(shipping)) {
      setError("Please complete all required fields with valid values.");
      return;
    }
    setError(null);
    router.push("/checkout/payment");
  };

  if (enrichedLines.length === 0) {
    return null;
  }

  const field =
    (key: keyof ShippingDetails, label: string, opts?: { type?: string; required?: boolean }) =>
    (
      <label className="block">
        <span className="text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">
          {label}
          {opts?.required !== false && " *"}
        </span>
        <input
          type={opts?.type ?? "text"}
          value={shipping[key]}
          onChange={(e) => setShipping({ [key]: e.target.value })}
          className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
        />
      </label>
    );

  return (
    <main className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-2">
        Your details &amp; shipping
      </h1>
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-8">
        Bill-to / ship-to contact for this deployment. Used for fulfillment and order updates
        only.
      </p>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 md:p-8 shadow-sm space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          {field("fullName", "Full name")}
          {field("email", "Work email", { type: "email" })}
          {field("phone", "Phone")}
          {field("company", "Company (optional)", { required: false })}
        </div>
        <div className="border-t border-slate-100 dark:border-slate-800 pt-5 space-y-5">
          <p className="text-xs font-black uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
            Shipping address
          </p>
          {field("line1", "Address line 1")}
          {field("line2", "Address line 2 (optional)", { required: false })}
          <div className="grid gap-5 sm:grid-cols-2">
            {field("city", "City")}
            {field("region", "State / region")}
            {field("postal", "Postal code")}
            {field("country", "Country")}
          </div>
        </div>

        {error && (
          <p className="text-sm font-medium text-rose-600 dark:text-rose-400" role="alert">
            {error}
          </p>
        )}

        <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Link
            href="/cart"
            className="inline-flex justify-center items-center rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-3 text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Back to cart
          </Link>
          <button
            type="button"
            onClick={onContinue}
            className="inline-flex justify-center items-center gap-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 text-sm font-black uppercase tracking-wide shadow-lg shadow-cyan-600/25"
          >
            Continue to payment
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </main>
  );
}
