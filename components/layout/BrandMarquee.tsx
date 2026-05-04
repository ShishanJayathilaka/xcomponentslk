"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useTheme } from "next-themes";
import type { Group } from "three";

const BRANDS = ["SIEMENS", "OMRON", "KEYENCE", "COGNEX", "SICK", "SCHNEIDER"];

const PLATE_DARK = ["#0c4a6e", "#164e63", "#1e3a8a", "#0e7490", "#1d4ed8", "#155e75"];
const PLATE_LIGHT = ["#bae6fd", "#a5f3fc", "#bfdbfe", "#7dd3fc", "#93c5fd", "#99f6e4"];
const TEXT_ON_DARK = "#ecfeff";
const TEXT_ON_LIGHT = "#0e7490";

function BrandChip({
  name,
  x,
  plateColor,
  textColor,
  plateWidth,
  plateHeight,
  fontSize,
}: {
  name: string;
  x: number;
  plateColor: string;
  textColor: string;
  plateWidth: number;
  plateHeight: number;
  fontSize: number;
}) {
  return (
    <group position={[x, 0, 0]}>
      <mesh>
        <boxGeometry args={[plateWidth, plateHeight, 0.06]} />
        <meshStandardMaterial
          color={plateColor}
          metalness={0.32}
          roughness={0.3}
          envMapIntensity={0.8}
        />
      </mesh>
      <Text
        position={[0, 0, 0.05]}
        fontSize={fontSize}
        color={textColor}
        anchorX="center"
        anchorY="middle"
        maxWidth={plateWidth * 0.9}
        letterSpacing={0.02}
      >
        {name}
      </Text>
    </group>
  );
}

function MarqueeScene({ isDark }: { isDark: boolean }) {
  const trackRef = useRef<Group>(null);
  const viewport = useThree((s) => s.viewport);
  const n = BRANDS.length;

  const itemSpan = Math.max(2.2, viewport.width * 0.2);
  const plateWidth = itemSpan * 0.9;
  const plateHeight = Math.max(0.45, viewport.height * 0.62);
  const fontSize = Math.max(0.2, Math.min(0.48, viewport.height * 0.38));

  const slots = useMemo(() => [...BRANDS, ...BRANDS], []);
  const plateColors = isDark ? PLATE_DARK : PLATE_LIGHT;
  const textColor = isDark ? TEXT_ON_DARK : TEXT_ON_LIGHT;

  useFrame((_, delta) => {
    const g = trackRef.current;
    if (!g) return;
    const loopWidth = n * itemSpan;
    const speed = viewport.width * 0.028;
    g.position.x -= speed * delta;
    if (g.position.x < -loopWidth) {
      g.position.x += loopWidth;
    }
  });

  return (
    <>
      <ambientLight intensity={isDark ? 0.35 : 0.62} color={isDark ? "#1e293b" : "#e0f2fe"} />
      <directionalLight
        position={[8, 5, 10]}
        intensity={isDark ? 0.55 : 0.95}
        color={isDark ? "#38bdf8" : "#f8fafc"}
      />
      <pointLight position={[-6, 0, 6]} intensity={isDark ? 0.45 : 0.42} color="#22d3ee" />
      <pointLight position={[6, 0, 6]} intensity={isDark ? 0.35 : 0.5} color="#3b82f6" />

      <group ref={trackRef}>
        {slots.map((name, i) => (
          <BrandChip
            key={`${name}-${i}`}
            name={name}
            x={i * itemSpan}
            plateColor={plateColors[i % plateColors.length]}
            textColor={textColor}
            plateWidth={plateWidth}
            plateHeight={plateHeight}
            fontSize={fontSize}
          />
        ))}
      </group>
    </>
  );
}

export default function BrandMarquee() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className="w-full h-40 bg-gradient-to-b from-sky-50 to-white dark:from-slate-950 dark:to-slate-900 border-y border-sky-100 dark:border-slate-800 flex flex-col overflow-hidden shadow-inner shadow-sky-100/60 dark:shadow-inner dark:shadow-slate-950/80 transition-colors duration-300">
      <div className="shrink-0 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2.5 pb-1.5 border-b border-sky-100 dark:border-slate-800 text-center bg-white/60 dark:bg-slate-900/50">
        <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.26em] text-cyan-800 dark:text-cyan-300/95 uppercase leading-tight">
          Authorized component partners
        </p>
      </div>

      <div className="relative min-h-0 flex-1 w-full bg-sky-50/40 dark:bg-slate-950/60">
        {mounted && (
          <Canvas
            key={isDark ? "dark" : "light"}
            className="!h-full !w-full block"
            camera={{ position: [0, 0, 11], fov: 32 }}
            dpr={[1, 2]}
            gl={{ alpha: true, antialias: true }}
          >
            <MarqueeScene isDark={isDark} />
          </Canvas>
        )}
      </div>
    </div>
  );
}
