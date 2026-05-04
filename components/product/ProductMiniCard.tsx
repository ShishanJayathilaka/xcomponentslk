import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/data/products";

export default function ProductMiniCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-3 hover:border-cyan-500/40 transition-colors"
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="96px"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-[10px] font-mono text-slate-400"
            aria-hidden
          >
            IMG
          </div>
        )}
      </div>
      <div className="min-w-0 flex flex-col justify-between py-0.5">
        <p className="line-clamp-2 text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
          {product.name}
        </p>
        <div className="flex items-center justify-between gap-2 mt-1">
          <span className="font-mono text-sm font-black text-cyan-600 dark:text-cyan-400">
            {product.price}
          </span>
          <span className="flex items-center gap-0.5 text-amber-500 text-xs font-bold tabular-nums">
            <Star className="w-3 h-3 fill-current" aria-hidden />
            {product.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
