import { Suspense } from "react";
import CompletePageClient from "@/components/checkout/CompletePageClient";

export default function CheckoutCompletePage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-20 text-center font-mono text-cyan-600">
          Loading…
        </div>
      }
    >
      <CompletePageClient />
    </Suspense>
  );
}
