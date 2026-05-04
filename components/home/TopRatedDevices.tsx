import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { getTopRatedProducts } from "@/data/products";

export default function TopRatedDevices() {
  const top = getTopRatedProducts(5);

  return (
    <section className="border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 py-14 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest mb-2">
              Engineer picks
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Top rated devices
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-xl">
              Highest-rated modules from verified deployments—tap a card for full specs, tier
              pricing, and reviews.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 self-start md:self-auto px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 text-sm font-bold uppercase tracking-wide hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 md:gap-6">
          {top.map((p, rank) => (
            <li key={p.id}>
              <Link
                href={`/products/${p.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 shadow-sm transition-all hover:border-cyan-500/40 hover:shadow-[0_12px_40px_-12px_rgba(6,182,212,0.35)]"
              >
                <div className="relative aspect-[4/3] w-full bg-slate-200 dark:bg-slate-800">
                  {p.imageUrl ? (
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-slate-400">
                      <span className="font-mono text-[10px] uppercase tracking-widest">
                        Image slot
                      </span>
                      <span className="text-xs font-bold text-slate-500">{p.serial}</span>
                    </div>
                  )}
                  <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950/85 font-mono text-sm font-black text-cyan-400 backdrop-blur-sm">
                    {rank + 1}
                  </span>
                  {p.discountPercent != null && (
                    <span className="absolute right-3 top-3 rounded-md bg-rose-600 px-2 py-0.5 text-[10px] font-black text-white">
                      −{p.discountPercent}%
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                    {p.serial}
                  </p>
                  <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors min-h-[2.5rem]">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 flex-1">
                    {p.desc}
                  </p>

                  <div className="mt-4 flex items-end justify-between gap-2 border-t border-slate-200/80 dark:border-slate-800 pt-3">
                    <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-current shrink-0" aria-hidden />
                      <span className="font-mono text-xs font-bold tabular-nums">
                        {p.rating.toFixed(2)}
                      </span>
                      {p.ratingCount != null && (
                        <span className="text-[10px] text-slate-500">({p.ratingCount})</span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="block font-mono text-sm font-black text-cyan-600 dark:text-cyan-400">
                        {p.price}
                      </span>
                      {p.listPrice && (
                        <span className="text-[10px] text-slate-400 line-through font-mono">
                          {p.listPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
