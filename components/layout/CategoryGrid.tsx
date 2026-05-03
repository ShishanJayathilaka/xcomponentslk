"use client";

import { motion } from "framer-motion";
import { Cpu, Camera, Activity, MonitorPlay, ChevronRight } from "lucide-react";

const CATEGORIES = [
  { name: "Automation & PLCs", icon: Cpu, desc: "Industrial controllers, I/O modules, and logic gates." },
  { name: "Machine Vision AI", icon: Camera, desc: "Lenses, smart cameras, and defect detection sensors." },
  { name: "Telemetry & Sensors", icon: Activity, desc: "Flowmeters, pressure sensors, and MQTT gateways." },
  { name: "Robotics & AGV", icon: MonitorPlay, desc: "Motor controllers, Laser SLAM, and RFID triggers." },
];

export default function CategoryGrid() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900 dark:text-white tracking-tight">Browse Categories</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Find specific modules for your next engineering project.</p>
        </div>
        <button className="hidden md:flex items-center text-blue-600 dark:text-blue-400 font-bold hover:underline transition-all">
          View All Catalog <ChevronRight className="w-5 h-5 ml-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.name}
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-2xl hover:shadow-blue-900/5 dark:hover:shadow-blue-900/20 transition-all cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{category.name}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{category.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}