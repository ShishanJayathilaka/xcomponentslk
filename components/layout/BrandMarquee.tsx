"use client";

import { motion } from "framer-motion";

const BRANDS = ["SIEMENS", "OMRON", "KEYENCE", "ALLEN-BRADLEY", "COGNEX", "SICK", "MITSUBISHI", "SCHNEIDER"];

export default function BrandMarquee() {
  return (
    <div className="w-full bg-white dark:bg-slate-950 py-8 overflow-hidden border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="container mx-auto px-4 mb-6 text-center">
        <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          Trusted components from industry leaders
        </p>
      </div>

      <div className="flex relative w-full overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30, // Adjust speed here
          }}
        >
          {/* Double array for seamless looping */}
          {[...BRANDS, ...BRANDS].map((brand, index) => (
            <div key={index} className="flex items-center justify-center mx-8 md:mx-16 min-w-[150px]">
              <span className="text-2xl md:text-3xl font-extrabold text-slate-300 dark:text-slate-800 opacity-70 hover:opacity-100 hover:text-blue-500 dark:hover:text-blue-500 transition-all cursor-pointer">
                {brand}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}