"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Package, ArrowRight } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { formatUsd } from "@/lib/parse-price";

export default function CartPageClient() {
  const router = useRouter();
  const { enrichedLines, subtotal, setLineQty, removeLine, itemCount } = useCart();

  const estTax = subtotal * 0.08;
  const total = subtotal + estTax;

  return (
    <main className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="mb-8">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-2">
          Deployment cart
        </p>
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
          Cart summary
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl">
          Executive view of line items, quantities, and estimated totals before checkout.
        </p>
      </div>

      {enrichedLines.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/40 p-12 text-center">
          <Package className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <p className="text-slate-600 dark:text-slate-400 font-medium mb-6">Your cart is empty.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 font-bold uppercase tracking-wide text-sm"
          >
            Browse inventory
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {enrichedLines.map(({ product, qty, lineTotal }) => (
              <div
                key={product.id}
                className="flex gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4 shadow-sm"
              >
                <Link
                  href={`/products/${product.id}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800"
                >
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[10px] font-mono text-slate-400">
                      IMG
                    </div>
                  )}
                </Link>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/products/${product.id}`}
                    className="font-bold text-slate-900 dark:text-white hover:text-cyan-700 dark:hover:text-cyan-300 line-clamp-2"
                  >
                    {product.name}
                  </Link>
                  <p className="text-xs font-mono text-slate-500 mt-1">{product.serial}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    <label className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500">
                      Qty
                      <input
                        type="number"
                        min={1}
                        max={product.maxQtyPerOrder ?? 999}
                        value={qty}
                        onChange={(e) =>
                          setLineQty(product.id, parseInt(e.target.value, 10) || 1)
                        }
                        className="w-16 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-2 py-1 font-mono text-sm font-bold"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => removeLine(product.id)}
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase text-rose-600 hover:text-rose-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-mono font-black text-cyan-600 dark:text-cyan-400">
                    {formatUsd(lineTotal)}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">{product.price} / unit</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 shadow-sm">
              <h2 className="text-sm font-black uppercase tracking-wide text-slate-900 dark:text-white mb-4">
                Executive summary
              </h2>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <dt>SKU lines</dt>
                  <dd className="font-mono font-bold text-slate-900 dark:text-white">
                    {enrichedLines.length}
                  </dd>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <dt>Units</dt>
                  <dd className="font-mono font-bold text-slate-900 dark:text-white">{itemCount}</dd>
                </div>
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
                <div className="border-t border-slate-200 dark:border-slate-800 pt-3 flex justify-between font-black text-slate-900 dark:text-white">
                  <dt>Total</dt>
                  <dd className="font-mono text-lg text-cyan-600 dark:text-cyan-400">
                    {formatUsd(total)}
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-[11px] text-slate-500 leading-relaxed">
                Shipping and duties are finalized at checkout. B2B quotes may override retail
                totals.
              </p>
              <button
                type="button"
                onClick={() => router.push("/checkout/shipping")}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white py-3.5 font-black uppercase tracking-wide text-sm shadow-lg shadow-cyan-600/25"
              >
                Proceed to checkout
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/products"
                className="mt-3 block text-center text-xs font-bold uppercase text-cyan-700 dark:text-cyan-400 hover:underline"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
