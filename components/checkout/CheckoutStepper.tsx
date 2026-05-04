"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check } from "lucide-react";

const STEPS = [
  { href: "/cart", label: "Cart summary" },
  { href: "/checkout/shipping", label: "Your details" },
  { href: "/checkout/payment", label: "Payment" },
  { href: "/checkout/confirm", label: "Confirm" },
  { href: "/checkout/complete", label: "Thank you" },
] as const;

export default function CheckoutStepper() {
  const pathname = usePathname();
  const activeIndex = STEPS.findIndex((s) => pathname === s.href || pathname.startsWith(s.href + "/"));
  const current = activeIndex === -1 ? 0 : activeIndex;

  return (
    <div className="w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <ol className="flex flex-wrap items-center justify-center gap-2 sm:gap-0 sm:justify-between max-w-4xl mx-auto">
          {STEPS.map((step, i) => {
            const isLast = i === STEPS.length - 1;
            const done = i < current;
            const active = i === current;
            const showCheck = done || (active && isLast);
            return (
              <li key={step.href} className="flex items-center gap-1 sm:gap-2">
                {i > 0 && (
                  <span
                    className="hidden sm:block w-6 lg:w-10 h-px bg-slate-200 dark:bg-slate-700 mx-1"
                    aria-hidden
                  />
                )}
                <Link
                  href={step.href}
                  className={`flex items-center gap-2 rounded-lg px-2 py-1.5 sm:px-3 text-[10px] sm:text-xs font-bold uppercase tracking-wide transition-colors ${
                    active
                      ? "bg-cyan-50 dark:bg-cyan-950/50 text-cyan-800 dark:text-cyan-300 ring-1 ring-cyan-200 dark:ring-cyan-800"
                      : done
                        ? "text-emerald-700 dark:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                        : "text-slate-400 dark:text-slate-600 pointer-events-none"
                  }`}
                  aria-current={active ? "step" : undefined}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black ${
                      showCheck
                        ? "bg-emerald-500 text-white"
                        : active
                          ? "bg-cyan-600 text-white"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                    }`}
                  >
                    {showCheck ? (
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    ) : (
                      i + 1
                    )}
                  </span>
                  <span className="max-w-[5.5rem] sm:max-w-none leading-tight">{step.label}</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
