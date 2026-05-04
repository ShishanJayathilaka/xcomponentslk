"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/cart-context";
import {
  ChevronRight,
  MessageCircle,
  Package,
  RotateCcw,
  Share2,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import type { Product } from "@/data/products";
import ProductMiniCard from "./ProductMiniCard";

function Stars({ value, size = "md" }: { value: number; size?: "sm" | "md" }) {
  const full = Math.floor(value);
  const frac = value - full;
  const dim = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-500" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = i < full ? 1 : i === full ? frac : 0;
        return (
          <span key={i} className="relative inline-block">
            <Star className={`${dim} text-slate-300 dark:text-slate-600`} />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className={`${dim} fill-current`} />
            </span>
          </span>
        );
      })}
    </span>
  );
}

function formatUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

type Tab = "description" | "specs" | "reviews";

export default function ProductPDPClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const router = useRouter();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const gallery = useMemo(
    () =>
      [product.imageUrl, ...(product.galleryUrls ?? [])].filter(
        (x): x is string => Boolean(x)
      ),
    [product.imageUrl, product.galleryUrls]
  );
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<Tab>("description");
  const variantValues = product.variantOptions?.values ?? [];
  const [variantIdx, setVariantIdx] = useState(0);

  const activeTier = [...(product.quantityTiers ?? [])]
    .reverse()
    .find((t) => qty >= t.minQty);

  return (
    <main className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500">
        <Link href="/" className="hover:text-cyan-600 dark:hover:text-cyan-400">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 opacity-60" />
        <Link
          href="/products"
          className="hover:text-cyan-600 dark:hover:text-cyan-400"
        >
          Inventory
        </Link>
        <ChevronRight className="w-3 h-3 opacity-60" />
        <span className="text-slate-800 dark:text-slate-200 truncate max-w-[200px] md:max-w-md">
          {product.name}
        </span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shadow-sm">
            {gallery.length > 0 ? (
              <Image
                key={gallery[activeImg]}
                src={gallery[activeImg]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-slate-400">
                <Package className="w-12 h-12 opacity-40" />
                <span className="font-mono text-xs uppercase">Image slot</span>
              </div>
            )}
            {product.discountPercent != null && (
              <span className="absolute left-4 top-4 rounded-md bg-rose-600 px-2 py-1 text-xs font-black text-white">
                −{product.discountPercent}%
              </span>
            )}
          </div>
          {gallery.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {gallery.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                    i === activeImg
                      ? "border-cyan-500 ring-2 ring-cyan-500/30"
                      : "border-transparent ring-1 ring-slate-200 dark:ring-slate-700"
                  }`}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Buy box */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-2">
              {product.serial} · {product.category}
            </p>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-tight">
              {product.name}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Stars value={product.rating} />
                <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                  {product.rating.toFixed(1)}
                </span>
                {product.ratingCount != null && (
                  <Link
                    href="#reviews"
                    className="text-cyan-600 dark:text-cyan-400 hover:underline font-mono text-xs"
                  >
                    {product.ratingCount} reviews
                  </Link>
                )}
              </div>
              {product.unitsSold && (
                <span className="text-slate-500 dark:text-slate-400 font-mono text-xs">
                  {product.unitsSold}
                </span>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5 md:p-6 space-y-5">
            <div className="flex flex-wrap items-end gap-3">
              <span className="text-3xl font-black font-mono text-cyan-600 dark:text-cyan-400">
                {product.price}
              </span>
              {product.listPrice && (
                <span className="text-lg text-slate-400 line-through font-mono">
                  {product.listPrice}
                </span>
              )}
              {product.discountPercent != null && (
                <span className="rounded bg-rose-500/15 text-rose-600 dark:text-rose-400 px-2 py-0.5 text-xs font-black">
                  {product.discountPercent}% off
                </span>
              )}
            </div>

            {product.quantityTiers && product.quantityTiers.length > 0 && (
              <div className="rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 px-4 py-3 space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                  Order quantity discounts
                </p>
                <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                  {product.quantityTiers.map((t) => (
                    <li key={t.minQty} className="flex gap-2">
                      <span className="font-mono text-cyan-600 dark:text-cyan-400 shrink-0">
                        {t.minQty}+ pcs
                      </span>
                      <span>extra {t.extraPercentOff}% off list</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.spendSaveTiers && product.spendSaveTiers.length > 0 && (
              <ul className="text-sm font-medium text-emerald-700 dark:text-emerald-400 space-y-1">
                {product.spendSaveTiers.map((s, i) => (
                  <li key={i}>
                    Save {formatUsd(s.saveAmount)} on {formatUsd(s.minSpend)}+ cart
                  </li>
                ))}
              </ul>
            )}

            {activeTier && (
              <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                Your quantity qualifies for an extra {activeTier.extraPercentOff}% off
                (stacked at checkout when applicable).
              </p>
            )}

            {product.taxNote && (
              <p className="text-xs text-slate-500 dark:text-slate-400">{product.taxNote}</p>
            )}

            {variantValues.length > 0 && product.variantOptions && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400 mb-2">
                  {product.variantOptions.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {variantValues.map((v, i) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setVariantIdx(i)}
                      className={`rounded-lg border px-3 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
                        i === variantIdx
                          ? "border-cyan-500 bg-cyan-500/10 text-cyan-800 dark:text-cyan-200"
                          : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-cyan-500/50"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <div>
                <label
                  htmlFor="qty"
                  className="block text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400 mb-2"
                >
                  Quantity
                </label>
                <input
                  id="qty"
                  type="number"
                  min={1}
                  max={product.maxQtyPerOrder ?? 999}
                  value={qty}
                  onChange={(e) => {
                    const n = Math.max(
                      1,
                      Math.min(
                        product.maxQtyPerOrder ?? 999,
                        parseInt(e.target.value, 10) || 1
                      )
                    );
                    setQty(n);
                  }}
                  className="w-28 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-950 px-3 py-2 font-mono text-sm font-bold"
                />
                {product.maxQtyPerOrder != null && (
                  <p className="mt-1 text-[11px] text-slate-500">
                    Max {product.maxQtyPerOrder} pcs / shopper
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-2 sm:ml-auto">
                <button
                  type="button"
                  onClick={() => {
                    addItem(product.id, qty);
                    setAdded(true);
                    window.setTimeout(() => setAdded(false), 2200);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 text-sm font-black uppercase tracking-wide transition-colors shadow-lg shadow-cyan-600/25"
                >
                  {added ? "Added" : "Add to cart"}
                </button>
                {added && (
                  <button
                    type="button"
                    onClick={() => router.push("/cart")}
                    className="inline-flex items-center justify-center rounded-xl border border-cyan-300 dark:border-cyan-700 bg-cyan-50 dark:bg-cyan-950/40 px-4 py-3 text-xs font-black uppercase tracking-wide text-cyan-800 dark:text-cyan-300"
                  >
                    View cart
                  </button>
                )}
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-slate-600 p-3 text-slate-600 dark:text-slate-300 hover:border-cyan-500/50"
                  aria-label="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {product.sellPoints && product.sellPoints.length > 0 && (
            <div>
              <h2 className="text-sm font-black uppercase tracking-wide text-slate-900 dark:text-white mb-3">
                Product sell points
              </h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {product.sellPoints.map((pt) => (
                  <li
                    key={pt}
                    className="flex gap-2 text-sm text-slate-600 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 px-3 py-2"
                  >
                    <span className="text-cyan-500 font-bold">·</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            {product.shipping && (
              <div className="flex gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 p-4">
                <Truck className="w-5 h-5 shrink-0 text-cyan-600 dark:text-cyan-400" />
                <div className="text-xs space-y-1">
                  <p className="font-bold uppercase text-slate-900 dark:text-white">
                    Shipping
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">{product.shipping.fee}</p>
                  <p className="text-slate-500">{product.shipping.dispatchDays}</p>
                  <p className="text-emerald-600 dark:text-emerald-400 font-mono">
                    Delivery: {product.shipping.eta}
                  </p>
                </div>
              </div>
            )}
            {product.returnsNote && (
              <div className="flex gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 p-4">
                <RotateCcw className="w-5 h-5 shrink-0 text-cyan-600 dark:text-cyan-400" />
                <div className="text-xs space-y-1">
                  <p className="font-bold uppercase text-slate-900 dark:text-white">
                    Return & refund
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">{product.returnsNote}</p>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-12 w-12 rounded-full bg-cyan-500/20 flex items-center justify-center font-black text-cyan-700 dark:text-cyan-300">
                {product.supplier?.name?.charAt(0) ?? "S"}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-slate-900 dark:text-white truncate">
                  {product.supplier?.name ?? "Store"}
                </p>
                <p className="text-xs text-slate-500">
                  {product.supplier?.role}
                  {product.supplier?.positiveFeedback && (
                    <span className="ml-2 font-mono text-emerald-600 dark:text-emerald-400">
                      {product.supplier.positiveFeedback} positive
                    </span>
                  )}
                  {product.supplier?.followers && (
                    <span className="ml-2 font-mono text-slate-400">
                      {product.supplier.followers} followers
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex gap-2 sm:ml-auto">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2 text-xs font-bold uppercase text-slate-700 dark:text-slate-200 hover:border-cyan-500/50"
              >
                <MessageCircle className="w-4 h-4" />
                Message
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 shrink-0 text-cyan-600 dark:text-cyan-400 mt-0.5" />
            <span>
              Secure checkout: we do not share your project details with third parties without
              consent. Enterprise quotes available on request.
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div id="reviews" className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-10">
        <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 mb-8">
          {(
            [
              ["description", "Description"],
              ["specs", "Specifications"],
              ["reviews", "Reviews"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`px-4 py-3 text-xs font-black uppercase tracking-widest border-b-2 -mb-px transition-colors ${
                tab === id
                  ? "border-cyan-500 text-cyan-600 dark:text-cyan-400"
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "description" && (
          <div className="max-w-3xl">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
              {product.longDescription ?? product.desc}
            </p>
          </div>
        )}

        {tab === "specs" && (
          <div className="max-w-3xl overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-sm">
              <tbody>
                {(product.specs ?? []).map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-slate-100 dark:border-slate-800 last:border-0"
                  >
                    <th className="bg-slate-50 dark:bg-slate-900/80 px-4 py-3 text-left font-mono text-xs uppercase text-slate-500 w-2/5">
                      {row.label}
                    </th>
                    <td className="px-4 py-3 text-slate-800 dark:text-slate-200">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {(!product.specs || product.specs.length === 0) && (
              <p className="p-6 text-slate-500 text-sm">No specifications published.</p>
            )}
          </div>
        )}

        {tab === "reviews" && (
          <div className="max-w-3xl space-y-6">
            <div className="flex flex-wrap items-end gap-4">
              <div>
                <p className="text-4xl font-black text-slate-900 dark:text-white tabular-nums">
                  {product.rating.toFixed(1)}
                </p>
                <Stars value={product.rating} />
                {product.ratingCount != null && (
                  <p className="text-sm text-slate-500 mt-1 font-mono">
                    {product.ratingCount} ratings · verified deployments
                  </p>
                )}
              </div>
            </div>
            <ul className="space-y-6">
              {(product.reviews ?? []).map((r) => (
                <li
                  key={r.id}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Stars value={r.rating} size="sm" />
                    <span className="font-bold text-slate-900 dark:text-white">{r.rating}</span>
                  </div>
                  {r.variantLabel && (
                    <p className="text-[11px] font-mono text-slate-500 mb-2">{r.variantLabel}</p>
                  )}
                  {r.title && (
                    <p className="font-bold text-slate-800 dark:text-slate-100 mb-1">{r.title}</p>
                  )}
                  <p className="text-sm text-slate-600 dark:text-slate-300">{r.body}</p>
                  <p className="mt-3 text-xs text-slate-400 font-mono">
                    {r.author} · {r.date}
                  </p>
                </li>
              ))}
            </ul>
            {(!product.reviews || product.reviews.length === 0) && (
              <p className="text-slate-500 text-sm">No reviews yet.</p>
            )}
          </div>
        )}
      </div>

      {related.length > 0 && (
        <section className="mt-20 border-t border-slate-200 dark:border-slate-800 pt-12">
          <div className="flex items-end justify-between gap-4 mb-8">
            <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
              More in {product.category}
            </h2>
            <Link
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className="text-xs font-bold uppercase tracking-wide text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              View category
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductMiniCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
