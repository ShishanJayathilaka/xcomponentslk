"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Zap } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Grid, Sphere, Line } from "@react-three/drei";

function circuitNodePosition(index: number): [number, number, number] {
  const s = index * 127.1;
  const x = (Math.sin(s) * 0.5 + Math.cos(s * 1.3) * 0.25) * 20;
  const y = Math.sin(s * 0.7) * 0.5 * 5;
  const z = (Math.cos(s * 0.9) * 0.5 + Math.sin(s * 0.3) * 0.25) * 20;
  return [x, y, z];
}

const CIRCUIT_NODES = Array.from({ length: 15 }, (_, i) =>
  circuitNodePosition(i)
);

function CircuitBoard3D({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
      groupRef.current.rotation.x =
        (isDark ? 0.2 : 0.15) + Math.cos(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, -10]}>
      <Grid
        position={[0, -2, 0]}
        args={[50, 50]}
        cellSize={1}
        cellThickness={1}
        cellColor={isDark ? "#06b6d4" : "#06b6d4"}
        sectionSize={5}
        sectionThickness={1.5}
        sectionColor={isDark ? "#3b82f6" : "#0284c7"}
        fadeDistance={isDark ? 40 : 45}
        fadeStrength={isDark ? 1 : 1.15}
      />

      {CIRCUIT_NODES.map((pos, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={pos}>
            <boxGeometry args={[0.8, 0.2, 0.8]} />
            <meshStandardMaterial
              color={isDark ? "#1e293b" : "#94a3b8"}
              metalness={isDark ? 0.8 : 0.45}
              roughness={isDark ? 0.2 : 0.35}
            />
            <Sphere args={[0.05]} position={[0, 0.15, 0]}>
              <meshBasicMaterial
                color={i % 3 === 0 ? (isDark ? "#10b981" : "#059669") : isDark ? "#06b6d4" : "#0891b2"}
              />
            </Sphere>
          </mesh>

          <Line
            points={[
              [0, 0, 0],
              [0, -pos[1] - 2, 0],
            ]}
            color="#0ea5e9"
            lineWidth={1}
            transparent
            opacity={isDark ? 0.3 : 0.35}
          />
        </Float>
      ))}

      <ambientLight intensity={isDark ? 0.5 : 0.72} />
      <pointLight
        position={[10, 12, 14]}
        intensity={isDark ? 1 : 0.95}
        color={isDark ? "#06b6d4" : "#e0f2fe"}
      />
      <pointLight
        position={[-10, -6, -8]}
        intensity={isDark ? 0.5 : 0.45}
        color={isDark ? "#3b82f6" : "#38bdf8"}
      />
    </group>
  );
}

const HERO_SLIDES = [
  {
    id: 1,
    badge: "Vision AI architecture",
    title: "Next-gen machine vision",
    subtitle:
      "High-speed AI inspection cameras for line throughput and sub-millimeter defect detection.",
  },
  {
    id: 2,
    badge: "Autonomous navigation",
    title: "Laser SLAM modules",
    subtitle:
      "Safety-rated LiDAR and motion stacks for AGVs, AMRs, and payload routing in live plants.",
  },
  {
    id: 3,
    badge: "Industrial telemetry",
    title: "Edge IoT acquisition",
    subtitle:
      "Precision sensing and edge gateways for factory-wide MQTT, OPC UA, and historian feeds.",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));

  return (
    <section className="relative h-[560px] md:h-[600px] w-full overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 via-white to-sky-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      <div className="absolute inset-0 z-0 opacity-[0.85] dark:opacity-70">
        {mounted && (
          <Canvas key={isDark ? "dark" : "light"} camera={{ position: [0, 2, 15], fov: 50 }}>
            <fog
              attach="fog"
              args={isDark ? (["#020617", 10, 40] as const) : (["#f1f5f9", 12, 38] as const)}
            />
            <CircuitBoard3D isDark={isDark} />
          </Canvas>
        )}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_45%,transparent_0%,rgba(241,245,249,0.5)_55%,rgba(226,232,240,0.92)_100%)] dark:bg-[radial-gradient(ellipse_75%_65%_at_50%_45%,transparent_0%,rgba(15,23,42,0.35)_55%,rgba(2,6,23,0.92)_100%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-slate-100/90 dark:from-slate-950/20 dark:via-transparent dark:to-slate-950/95"
          aria-hidden
        />
      </div>

      <div className="relative z-10 h-full container mx-auto px-6 md:px-12 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 36, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -36, filter: "blur(8px)" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-200/90 dark:border-cyan-700/60 text-cyan-800 dark:text-cyan-300 font-mono text-xs sm:text-sm font-bold tracking-widest uppercase shadow-sm shadow-cyan-500/10 dark:shadow-none">
              <Zap className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" aria-hidden />
              {HERO_SLIDES[currentSlide].badge}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-5 text-slate-900 dark:text-white tracking-tighter leading-[1.05]">
              {HERO_SLIDES[currentSlide].title}
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl mb-10 text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl">
              {HERO_SLIDES[currentSlide].subtitle}
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold shadow-lg shadow-cyan-600/25 dark:shadow-cyan-500/20 transition-all hover:shadow-cyan-500/35"
              >
                Explore inventory
                <ChevronRight className="w-5 h-5" aria-hidden />
              </Link>
              <Link
                href="/products?category=Automation%20%26%20PLCs"
                className="inline-flex items-center justify-center px-6 py-3.5 sm:py-4 rounded-xl font-bold border-2 border-slate-200 dark:border-slate-600 bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 hover:border-cyan-300 dark:hover:border-cyan-500 hover:text-cyan-800 dark:hover:text-cyan-300 transition-colors"
              >
                PLCs &amp; controllers
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute right-4 sm:right-6 bottom-10 sm:bottom-12 z-20 flex gap-3">
        <button
          type="button"
          onClick={prevSlide}
          className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-white/95 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 shadow-md shadow-slate-200/50 dark:shadow-slate-950/50 hover:bg-cyan-600 hover:border-cyan-600 dark:hover:bg-cyan-500 dark:hover:border-cyan-500 hover:text-white transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-white/95 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 shadow-md shadow-slate-200/50 dark:shadow-slate-950/50 hover:bg-cyan-600 hover:border-cyan-600 dark:hover:bg-cyan-500 dark:hover:border-cyan-500 hover:text-white transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute left-4 sm:left-6 bottom-12 sm:bottom-16 z-20 flex gap-2.5">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? "w-10 sm:w-12 bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.55)]"
                : "w-4 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
