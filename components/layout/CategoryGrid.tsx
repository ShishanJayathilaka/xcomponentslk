"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Cpu, Camera, Activity, MonitorPlay, Zap, ChevronRight } from "lucide-react";
import type { MouseEvent } from "react";
import Link from "next/link"; // Import Link for navigation

const CATEGORIES = [
  { 
    name: "Automation & PLCs", 
    slug: "Automation & PLCs", // Matches the filter in your products page
    icon: Cpu, 
    desc: "Industrial controllers, I/O modules, and logic gates.", 
    serial: "MDL-A7X9" 
  },
  { 
    name: "Machine Vision AI", 
    slug: "Machine Vision AI", 
    icon: Camera, 
    desc: "Lenses, smart cameras, and defect detection sensors.", 
    serial: "VSN-B220" 
  },
  { 
    name: "Telemetry & Sensors", 
    slug: "Telemetry & Sensors", 
    icon: Activity, 
    desc: "Flowmeters, pressure sensors, and MQTT gateways.", 
    serial: "TLM-C901" 
  },
  { 
    name: "Robotics & AGV", 
    slug: "Robotics & AGV", 
    icon: MonitorPlay, 
    desc: "Motor controllers, Laser SLAM, and RFID triggers.", 
    serial: "RBT-D444" 
  },
];

function Card3D({ category, index }: { category: typeof CATEGORIES[0], index: number }) {
  const Icon = category.icon;
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      style={{ perspective: 1200 }}
      className="relative group h-full w-full"
    >
      {/* Wrap the hardware card in a Link */}
      <Link href={`/products?category=${encodeURIComponent(category.slug)}`}>
        <motion.div 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative h-full bg-slate-200 dark:bg-slate-800 p-[2px] transition-shadow duration-500 hover:shadow-[0_20px_40px_-10px_rgba(6,182,212,0.4)] cursor-pointer"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)" 
          }}
        >
          <div 
            className="relative h-full bg-white dark:bg-slate-950 p-6 md:p-8 flex flex-col overflow-hidden"
            style={{ 
              clipPath: "polygon(19px 0, 100% 0, 100% calc(100% - 19px), calc(100% - 19px) 100%, 0 100%, 0 19px)",
              transformStyle: "preserve-3d" 
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40 group-hover:opacity-20 transition-opacity" />

            <div 
              style={{ transform: "translateZ(20px)" }}
              className="absolute top-4 right-4 font-mono text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded"
            >
              SN: {category.serial}
            </div>

            <div style={{ transform: "translateZ(50px)" }} className="relative mb-6 inline-flex shadow-xl">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 flex items-center justify-center relative z-10 group-hover:border-cyan-500/50 transition-colors duration-300"
                   style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}
              >
                <Icon className="w-8 h-8 text-slate-700 dark:text-slate-300 group-hover:text-cyan-500 transition-colors duration-300" />
              </div>
              <div className="absolute top-1/2 left-full w-12 h-[1px] bg-slate-300 dark:bg-slate-700 group-hover:bg-cyan-500/50 transition-colors duration-300" />
            </div>

            <div style={{ transform: "translateZ(30px)" }} className="relative z-10 flex-grow">
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white uppercase tracking-wide group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                {category.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                {category.desc}
              </p>
            </div>

            <div style={{ transform: "translateZ(15px)" }} className="relative z-10 mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> ONLINE</span>
              <span className="text-cyan-600 dark:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                INITIATE <ChevronRight className="w-4 h-4 ml-1" />
              </span>
            </div>
          </div>
        </motion.div>
      </Link>

      {/* Decorative Hardware Pins */}
      <div className="absolute -left-1 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-0">
        {[1, 2, 3].map((pin) => (
          <div 
            key={pin} 
            className="w-2 h-4 bg-slate-300 dark:bg-slate-700 group-hover:bg-amber-400 dark:group-hover:bg-amber-500 transition-colors duration-300 rounded-l-sm shadow-sm"
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function CategoryGrid() {
  return (
    <section className="container mx-auto px-4 py-24 relative">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2 text-cyan-600 dark:text-cyan-400 font-mono text-sm uppercase tracking-widest font-bold">
            <Zap className="w-4 h-4" /> Component Database active
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white uppercase tracking-tight">
            Hardware Modules
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {CATEGORIES.map((category, index) => (
          <Card3D key={category.name} category={category} index={index} />
        ))}
      </div>
    </section>
  );
}