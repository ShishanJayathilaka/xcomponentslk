"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent } from "react";
import type { LucideIcon } from "lucide-react";
import { Cpu, Camera, Activity, MonitorPlay, ShoppingCart } from "lucide-react";
import type { Product } from "@/data/products";

const iconMap: Record<string, LucideIcon> = {
  "Automation & PLCs": Cpu,
  "Machine Vision AI": Camera,
  "Telemetry & Sensors": Activity,
  "Robotics & AGV": MonitorPlay,
};

export default function ProductCard3D({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const Icon = iconMap[product.category] ?? Cpu;
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Link href={`/products/${product.id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        style={{ perspective: 1000 }}
        className="group"
      >
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative bg-slate-200 dark:bg-slate-800 p-[1px] transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)]"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            clipPath:
              "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
          }}
        >
          <div
            className="relative h-full bg-white dark:bg-slate-950 flex flex-col overflow-hidden"
            style={{
              clipPath:
                "polygon(19px 0, 100% 0, 100% calc(100% - 19px), calc(100% - 19px) 100%, 0 100%, 0 19px)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="relative aspect-[16/10] w-full shrink-0 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-slate-400">
                  <span className="font-mono text-[9px] uppercase tracking-widest">
                    Image slot
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">{product.serial}</span>
                </div>
              )}
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-slate-300 dark:text-slate-700 leading-none pointer-events-none select-none">
                {product.serial}
                <br />
                400-X-MOD
              </div>

              <div style={{ transform: "translateZ(40px)" }} className="mb-4 mt-2">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-400 group-hover:text-cyan-500 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              <div style={{ transform: "translateZ(30px)" }} className="flex-grow">
                <h3 className="text-lg font-black uppercase text-slate-900 dark:text-white mb-1">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                  {product.desc}
                </p>
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-xl font-mono font-bold text-cyan-600 dark:text-cyan-400">
                    {product.price}
                  </span>
                  {product.listPrice && (
                    <span className="text-sm text-slate-400 line-through font-mono">
                      {product.listPrice}
                    </span>
                  )}
                </div>
              </div>

              <div
                style={{ transform: "translateZ(20px)" }}
                className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-900 flex items-center justify-between"
              >
                <div className="flex items-center gap-1.5 text-[10px] font-bold font-mono text-emerald-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />{" "}
                  {product.status}
                </div>
                <span className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg text-xs font-black group-hover:bg-cyan-600 dark:group-hover:bg-cyan-400 transition-colors">
                  VIEW <ShoppingCart className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
}
