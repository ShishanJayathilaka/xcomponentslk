export type ProductReview = {
  id: string;
  author: string;
  date: string;
  rating: number;
  title?: string;
  body: string;
  variantLabel?: string;
};

export type QuantityTier = {
  minQty: number;
  extraPercentOff: number;
};

export type SpendSaveTier = {
  minSpend: number;
  saveAmount: number;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  desc: string;
  serial: string;
  /** Current / sale display price */
  price: string;
  /** Optional list price (strikethrough) */
  listPrice?: string;
  /** Whole-number percent off vs list */
  discountPercent?: number;
  status: string;
  color: string;
  rating: number;
  ratingCount?: number;
  /** e.g. "500+ sold" */
  unitsSold?: string;
  /** Primary image (replace with real product shots in production) */
  imageUrl?: string;
  galleryUrls?: string[];
  sellPoints?: string[];
  specs?: { label: string; value: string }[];
  longDescription?: string;
  variantOptions?: { label: string; values: string[] };
  quantityTiers?: QuantityTier[];
  spendSaveTiers?: SpendSaveTier[];
  maxQtyPerOrder?: number;
  taxNote?: string;
  shipping?: { fee: string; eta: string; dispatchDays: string };
  returnsNote?: string;
  supplier?: {
    name: string;
    role: string;
    positiveFeedback: string;
    followers: string;
  };
  reviews?: ProductReview[];
};

/** Placeholder product photography — swap for your CDN paths. */
const u = (photoId: string, w = 1200) =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${w}&q=80`;

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "LogicMaster X1",
    category: "Automation & PLCs",
    desc: "Industrial controller with 16 digital I/O and MQTT support.",
    serial: "MDL-A7X9",
    price: "$450.00",
    listPrice: "$589.00",
    discountPercent: 24,
    status: "ONLINE",
    color: "#22d3ee",
    rating: 4.9,
    ratingCount: 128,
    unitsSold: "500+ sold",
    imageUrl: u("1518770660439-4636190af475"),
    galleryUrls: [
      u("1518770660439-4636190af475"),
      u("1558618666-fcd25c85cd64"),
      u("1580584126903-c1d3064a2246"),
    ],
    sellPoints: [
      "SIL-ready logic core for safety interlocks",
      "Dual Ethernet with ring redundancy",
      "MQTT Sparkplug B for cloud telemetry",
      "Hot-swappable I/O carriers",
    ],
    longDescription:
      "LogicMaster X1 is built for demanding factory floors: deterministic scan times, redundant networking, and native MQTT for IIoT dashboards. Pair with SafeIO blocks for Cat.4 / SIL3 expansion when your process demands it.",
    variantOptions: {
      label: "Firmware profile",
      values: ["Standard", "High-speed I/O", "Redundant pair"],
    },
    quantityTiers: [
      { minQty: 5, extraPercentOff: 5 },
      { minQty: 12, extraPercentOff: 8 },
    ],
    spendSaveTiers: [{ minSpend: 5000, saveAmount: 500 }],
    maxQtyPerOrder: 100,
    taxNote: "Tax excluded; add at checkout if applicable.",
    shipping: {
      fee: "$24.00",
      eta: "Jun 03 – Jun 13",
      dispatchDays: "Ships within 8 business days",
    },
    returnsNote: "30-day return on unopened modules; RMA required for DOA.",
    supplier: {
      name: "ComponentHub Supply",
      role: "Authorized integrator",
      positiveFeedback: "99.2%",
      followers: "12.4K",
    },
    specs: [
      { label: "Digital I/O", value: "16 configurable" },
      { label: "Scan time", value: "≤ 1 ms typical" },
      { label: "Protocols", value: "Modbus TCP, MQTT, OPC UA client" },
      { label: "Temp range", value: "0°C – 60°C" },
      { label: "Mounting", value: "DIN rail 35 mm" },
    ],
    reviews: [
      {
        id: "r1",
        author: "A***n",
        date: "Apr 02, 2026",
        rating: 5,
        title: "Rock solid on our line",
        body: "Deployed twelve units last quarter. Zero watchdog faults. MQTT into our broker was painless.",
        variantLabel: "Firmware profile: Standard",
      },
      {
        id: "r2",
        author: "M***e",
        date: "Mar 18, 2026",
        rating: 4.5,
        body: "Great hardware; documentation could use more ladder examples.",
        variantLabel: "Firmware profile: High-speed I/O",
      },
    ],
  },
  {
    id: "p2",
    name: "VisionPro 4K",
    category: "Machine Vision AI",
    desc: "Smart camera with onboard neural engine for defect detection.",
    serial: "VSN-B220",
    price: "$1,200.00",
    listPrice: "$1,580.00",
    discountPercent: 24,
    status: "ONLINE",
    color: "#f472b6",
    rating: 4.95,
    ratingCount: 84,
    unitsSold: "1,000+ sold",
    imageUrl: u("1550751827-4bd374c3f58b"),
    galleryUrls: [
      u("1550751827-4bd374c3f58b"),
      u("1563986768609-322f1350e51f"),
      u("1485827408803-896bfe524e7e"),
    ],
    sellPoints: [
      "4K global shutter sensor",
      "On-device CNN for edge inference",
      "GigE Vision + PoE",
      "IP67 front optical stack",
    ],
    longDescription:
      "VisionPro 4K targets high-speed inspection: sub-millisecond trigger latency, PoE for single-cable install, and a hardened housing for wash-down environments. Models ship calibrated with lens compensation tables.",
    variantOptions: {
      label: "Lens kit",
      values: ["16 mm C-mount", "25 mm C-mount", "35 mm C-mount"],
    },
    quantityTiers: [{ minQty: 3, extraPercentOff: 4 }],
    spendSaveTiers: [{ minSpend: 8000, saveAmount: 800 }],
    maxQtyPerOrder: 50,
    taxNote: "Tax excluded; add at checkout if applicable.",
    shipping: {
      fee: "$42.00",
      eta: "May 28 – Jun 08",
      dispatchDays: "Ships within 5 business days",
    },
    returnsNote: "Factory-sealed optics: returns only if unopened.",
    supplier: {
      name: "VisionWorks EU",
      role: "Brand partner",
      positiveFeedback: "97.8%",
      followers: "48K",
    },
    specs: [
      { label: "Resolution", value: "4096 × 2160 @ 90 fps" },
      { label: "Interface", value: "GigE Vision, PoE Class 4" },
      { label: "Inference", value: "8 TOPS INT8" },
      { label: "Lighting sync", value: "2× strobe out" },
    ],
    reviews: [
      {
        id: "r3",
        author: "L***a",
        date: "Apr 11, 2026",
        rating: 5,
        title: "Crisp edges on PCB AOI",
        body: "We replaced a legacy smart camera line. Training took an afternoon.",
        variantLabel: "Lens kit: 25 mm C-mount",
      },
    ],
  },
  {
    id: "p3",
    name: "FlowSense Pro II",
    category: "Telemetry & Sensors",
    desc: "Coriolis flowmeter with ±0.1% accuracy and EtherNet/IP.",
    serial: "TLM-C901",
    price: "$2,890.00",
    listPrice: "$3,420.00",
    discountPercent: 15,
    status: "ONLINE",
    color: "#38bdf8",
    rating: 4.85,
    ratingCount: 56,
    unitsSold: "285 sold",
    imageUrl: u("1581091226825-a6a2a5aee158"),
    galleryUrls: [u("1581091226825-a6a2a5aee158"), u("1581092160562-40aa08a78802")],
    sellPoints: [
      "±0.1% mass flow accuracy",
      "EtherNet/IP with DLR",
      "316L wetted parts",
      "NAMUR NE 43 diagnostics",
    ],
    longDescription:
      "FlowSense Pro II delivers custody-transfer grade repeatability in compact form. EtherNet/IP profile includes DLR for ring resilience alongside embedded totals and density alarms.",
    variantOptions: {
      label: "Process connection",
      values: ['1" Tri-clamp', '1.5" Tri-clamp', 'Flanged ANSI 150'],
    },
    quantityTiers: [],
    spendSaveTiers: [{ minSpend: 12000, saveAmount: 1200 }],
    maxQtyPerOrder: 20,
    taxNote: "Tax excluded; add at checkout if applicable.",
    shipping: {
      fee: "$120.00",
      eta: "Jun 10 – Jun 22",
      dispatchDays: "Made-to-order; ships within 12 days",
    },
    returnsNote: "Calibrated instruments: restocking fee may apply.",
    supplier: {
      name: "Flowline Industrial",
      role: "OEM distributor",
      positiveFeedback: "98.5%",
      followers: "6.2K",
    },
    specs: [
      { label: "Accuracy", value: "±0.1% of rate" },
      { label: "Tube", value: "316L stainless" },
      { label: "Output", value: "EtherNet/IP, 4–20 mA HART" },
    ],
    reviews: [
      {
        id: "r4",
        author: "J***i",
        date: "Mar 21, 2026",
        rating: 5,
        body: "Matched our coriolis reference within spec. DLR ring survived a cable cut test.",
        variantLabel: 'Process connection: 1.5" Tri-clamp',
      },
    ],
  },
  {
    id: "p4",
    name: "EdgeGate MQTT-X",
    category: "Telemetry & Sensors",
    desc: "DIN-rail edge gateway with redundant LTE and OPC UA.",
    serial: "EGW-M440",
    price: "$620.00",
    listPrice: "$820.00",
    discountPercent: 24,
    status: "ONLINE",
    color: "#60a5fa",
    rating: 4.7,
    ratingCount: 203,
    unitsSold: "3,000+ sold",
    imageUrl: u("1558494949-ef010cbdcc31"),
    galleryUrls: [u("1558494949-ef010cbdcc31"), u("1517430816045-df2949fd0aa0")],
    sellPoints: [
      "Dual SIM LTE with auto-failover",
      "OPC UA server + MQTT bridge",
      "Ignition Edge capable",
      "Wide-range DC input",
    ],
    longDescription:
      "EdgeGate MQTT-X is the field bridge between brownfield PLCs and cloud historians. Run local buffering during outages and replay when links recover.",
    variantOptions: {
      label: "Cellular region",
      values: ["Global (multi-band)", "North America", "EU / UK"],
    },
    quantityTiers: [
      { minQty: 5, extraPercentOff: 5 },
      { minQty: 20, extraPercentOff: 10 },
    ],
    spendSaveTiers: [],
    maxQtyPerOrder: 200,
    taxNote: "Tax excluded; add at checkout if applicable.",
    shipping: {
      fee: "$18.00",
      eta: "May 30 – Jun 09",
      dispatchDays: "Ships within 3 business days",
    },
    returnsNote: "14-day return if factory seal intact.",
    supplier: {
      name: "ComponentHub Supply",
      role: "Authorized integrator",
      positiveFeedback: "99.2%",
      followers: "12.4K",
    },
    specs: [
      { label: "LTE", value: "Cat-12 dual SIM" },
      { label: "Ethernet", value: "4× GbE with bypass option" },
      { label: "Storage", value: "64 GB eMMC + mSATA" },
    ],
    reviews: [
      {
        id: "r5",
        author: "C***O",
        date: "Apr 11, 2026",
        rating: 4.5,
        body: "MQTT Sparkplug worked out of the box. Would love a rack variant.",
        variantLabel: "Cellular region: EU / UK",
      },
    ],
  },
  {
    id: "p5",
    name: "LidarNav S2",
    category: "Robotics & AGV",
    desc: "270° safety-rated LiDAR with SLAM out of the box.",
    serial: "RBT-D444",
    price: "$3,400.00",
    listPrice: "$4,250.00",
    discountPercent: 20,
    status: "ONLINE",
    color: "#818cf8",
    rating: 4.8,
    ratingCount: 41,
    unitsSold: "600+ sold",
    imageUrl: u("1485827408803-896bfe524e7e"),
    galleryUrls: [u("1485827408803-896bfe524e7e"), u("1535378917042-52a39c123c97")],
    sellPoints: [
      "270° FoV, 40 m range",
      "SIL2 / PLd safety outputs",
      "Native ROS 2 driver",
      "IP65 enclosure",
    ],
    longDescription:
      "LidarNav S2 pairs high-density scans with deterministic safety paths for AGVs and collaborative cells. Includes calibration jig and quick-mount bracket set.",
    variantOptions: {
      label: "Cable length",
      values: ["3 m", "7 m", "15 m"],
    },
    quantityTiers: [{ minQty: 4, extraPercentOff: 6 }],
    spendSaveTiers: [{ minSpend: 15000, saveAmount: 1500 }],
    maxQtyPerOrder: 30,
    taxNote: "Tax excluded; add at checkout if applicable.",
    shipping: {
      fee: "$65.00",
      eta: "Jun 01 – Jun 12",
      dispatchDays: "Ships within 6 business days",
    },
    returnsNote: "Laser products: return only for warranty defects.",
    supplier: {
      name: "NavStack Robotics",
      role: "Factory store",
      positiveFeedback: "96.4%",
      followers: "22K",
    },
    specs: [
      { label: "Range", value: "0.2 – 40 m" },
      { label: "Safety", value: "SIL2 / PLd type 3" },
      { label: "Interface", value: "Ethernet UDP + PROFIsafe option" },
    ],
    reviews: [
      {
        id: "r6",
        author: "R***i",
        date: "Apr 02, 2026",
        rating: 5,
        title: "SLAM lock was fast",
        body: "Mapped a 40k sq ft warehouse overnight with the stock ROS 2 stack.",
        variantLabel: "Cable length: 7 m",
      },
    ],
  },
  {
    id: "p6",
    name: "SafeIO Block 16",
    category: "Automation & PLCs",
    desc: "Failsafe I/O expansion, Cat.4 / SIL3, hot-swappable terminals.",
    serial: "MDL-S16F",
    price: "$980.00",
    listPrice: "$1,290.00",
    discountPercent: 24,
    status: "ONLINE",
    color: "#22d3ee",
    rating: 4.75,
    ratingCount: 92,
    unitsSold: "10,000+ sold",
    imageUrl: u("1581092160562-40aa08a78802"),
    galleryUrls: [u("1581092160562-40aa08a78802"), u("1518770660439-4636190af475")],
    sellPoints: [
      "Cat.4 / SIL3 digital inputs",
      "Hot-swappable spring terminals",
      "Built-in self-test pulses",
      "TÜV certified stack",
    ],
    longDescription:
      "SafeIO Block 16 extends any F-CPU with dense failsafe inputs. Spring terminals accept ferrules; LED matrices show channel state at a glance.",
    variantOptions: {
      label: "Terminal type",
      values: ["Spring (push-in)", "Screw terminal"],
    },
    quantityTiers: [{ minQty: 10, extraPercentOff: 7 }],
    spendSaveTiers: [{ minSpend: 6000, saveAmount: 600 }],
    maxQtyPerOrder: 120,
    taxNote: "Tax excluded; add at checkout if applicable.",
    shipping: {
      fee: "$22.00",
      eta: "May 29 – Jun 07",
      dispatchDays: "Ships within 4 business days",
    },
    returnsNote: "Safety catalog parts: RMA only.",
    supplier: {
      name: "ComponentHub Supply",
      role: "Authorized integrator",
      positiveFeedback: "99.2%",
      followers: "12.4K",
    },
    specs: [
      { label: "Failsafe inputs", value: "16 × 24 V DC" },
      { label: "SIL / PL", value: "SIL3 / Cat.4 / PL e" },
      { label: "Hot swap", value: "Supported with bus adapter" },
    ],
    reviews: [
      {
        id: "r7",
        author: "T***s",
        date: "Mar 29, 2026",
        rating: 5,
        body: "Auditor signed off first pass. Wiring time cut vs screw terminals.",
        variantLabel: "Terminal type: Spring (push-in)",
      },
    ],
  },
];

export function getTopRatedProducts(limit = 5): Product[] {
  return [...PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, limit);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getRelatedProducts(
  id: string,
  category: string,
  limit = 4
): Product[] {
  return PRODUCTS.filter((p) => p.id !== id && p.category === category).slice(
    0,
    limit
  );
}
