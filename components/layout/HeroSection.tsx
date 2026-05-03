"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

const HERO_SLIDES = [
  { id: 1, title: "Next-Gen Machine Vision", subtitle: "High-speed AI inspection cameras for operations and defect detection.", image: "bg-gradient-to-r from-blue-900 to-slate-900" },
  { id: 2, title: "Laser SLAM Navigation", subtitle: "Advanced lidar and navigation modules for AGVs and industrial AMRs.", image: "bg-gradient-to-r from-emerald-900 to-slate-900" },
  { id: 3, title: "Industrial IoT & Telemetry", subtitle: "High-precision flowmeters and edge acquisition modules for factory networks.", image: "bg-gradient-to-r from-purple-900 to-slate-900" },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));

  return (
    <section>
      {/* DESKTOP CAROUSEL (Hidden on Mobile) */}
      <div className="hidden md:block relative h-[500px] w-full overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className={`absolute inset-0 ${HERO_SLIDES[currentSlide].image} flex items-center`}
          >
            <div className="container mx-auto px-12 text-white">
              <motion.h1
                initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
                className="text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight"
              >
                {HERO_SLIDES[currentSlide].title}
              </motion.h1>
              <motion.p
                initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}
                className="text-xl max-w-2xl mb-8 text-slate-300"
              >
                {HERO_SLIDES[currentSlide].subtitle}
              </motion.p>
              <motion.button
                initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg shadow-blue-600/30"
              >
                Explore Specifications
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm">
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm">
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {/* MOBILE HERO (Hidden on Desktop) */}
      <div className="block md:hidden bg-gradient-to-b from-blue-900 to-slate-900 text-white py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Enterprise Components</h1>
        <p className="text-slate-300 mb-8 text-lg">Your trusted source for industrial automation, vision AI, and robotics.</p>
        <button className="w-full bg-blue-600 active:bg-blue-700 py-4 rounded-lg font-bold text-lg shadow-lg">Shop Now</button>
      </div>
    </section>
  );
}