"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import ProductCard3D from "@/components/data/ProductCard3D";
import { PRODUCTS } from "@/data/products";

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get("category") || "All";

  return (
    <main className="container mx-auto px-4 py-12 min-h-[60vh]">
      <div className="mb-12 border-l-4 border-cyan-500 pl-6">
        <h1 className="text-4xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-2">
          Inventory
        </h1>
        <p className="text-slate-500 font-mono text-sm uppercase">
          Sector: <span className="text-cyan-500">{categoryQuery}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.filter(
          (p) => categoryQuery === "All" || p.category === categoryQuery
        ).map((product, index) => (
          <ProductCard3D key={product.id} product={product} index={index} />
        ))}
      </div>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center font-mono text-cyan-500">
            INITIATING_DATABASE...
          </div>
        }
      >
        <ProductsContent />
      </Suspense>
      <Footer />
    </div>
  );
}
