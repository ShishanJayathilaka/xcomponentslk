"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PRODUCTS, type Product } from "@/data/products";
import { parsePriceUsd } from "@/lib/parse-price";

const STORAGE_KEY = "componenthub-cart-v1";
export const LAST_ORDER_SNAPSHOT_KEY = "componenthub-last-order-v1";

export type LastOrderSnapshot = {
  ref: string;
  placedAt: number;
  email: string;
  lines: { name: string; qty: number; total: number }[];
  subtotal: number;
  paymentMethod: PaymentMethodId | null;
};

export type CartLine = {
  productId: string;
  qty: number;
};

export type ShippingDetails = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  line1: string;
  line2: string;
  city: string;
  region: string;
  postal: string;
  country: string;
};

export const emptyShipping = (): ShippingDetails => ({
  fullName: "",
  email: "",
  phone: "",
  company: "",
  line1: "",
  line2: "",
  city: "",
  region: "",
  postal: "",
  country: "",
});

export type PaymentMethodId = "card" | "net30" | "ach";

type Persisted = {
  lines: CartLine[];
  shipping: ShippingDetails;
  paymentMethod: PaymentMethodId | null;
};

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  enrichedLines: { product: Product; qty: number; lineTotal: number }[];
  subtotal: number;
  shipping: ShippingDetails;
  paymentMethod: PaymentMethodId | null;
  addItem: (productId: string, qty: number) => void;
  setLineQty: (productId: string, qty: number) => void;
  removeLine: (productId: string) => void;
  clearCart: () => void;
  setShipping: (patch: Partial<ShippingDetails>) => void;
  setPaymentMethod: (m: PaymentMethodId | null) => void;
  /** Writes session snapshot; does not mutate cart (call after navigation or from thank-you). */
  exportOrderSnapshot: () => string;
  /** Clears cart + checkout draft after a successful order (thank-you page). */
  clearAfterSuccessfulOrder: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function loadPersisted(): Persisted {
  if (typeof window === "undefined") {
    return { lines: [], shipping: emptyShipping(), paymentMethod: null };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { lines: [], shipping: emptyShipping(), paymentMethod: null };
    }
    const p = JSON.parse(raw) as Partial<Persisted>;
    return {
      lines: Array.isArray(p.lines) ? p.lines : [],
      shipping: { ...emptyShipping(), ...p.shipping },
      paymentMethod:
        p.paymentMethod === "card" || p.paymentMethod === "net30" || p.paymentMethod === "ach"
          ? p.paymentMethod
          : null,
    };
  } catch {
    return { lines: [], shipping: emptyShipping(), paymentMethod: null };
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [shipping, setShippingState] = useState<ShippingDetails>(emptyShipping);
  const [paymentMethod, setPaymentMethodState] = useState<PaymentMethodId | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const p = loadPersisted();
    setLines(p.lines);
    setShippingState(p.shipping);
    setPaymentMethodState(p.paymentMethod);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const payload: Persisted = { lines, shipping, paymentMethod };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [lines, shipping, paymentMethod, hydrated]);

  const addItem = useCallback((productId: string, qty: number) => {
    if (qty < 1) return;
    setLines((prev) => {
      const i = prev.findIndex((l) => l.productId === productId);
      if (i === -1) return [...prev, { productId, qty }];
      const next = [...prev];
      const p = PRODUCTS.find((x) => x.id === productId);
      const max = p?.maxQtyPerOrder ?? 999;
      next[i] = { productId, qty: Math.min(max, next[i].qty + qty) };
      return next;
    });
  }, []);

  const setLineQty = useCallback((productId: string, qty: number) => {
    if (qty < 1) {
      setLines((prev) => prev.filter((l) => l.productId !== productId));
      return;
    }
    setLines((prev) => {
      const p = PRODUCTS.find((x) => x.id === productId);
      const max = p?.maxQtyPerOrder ?? 999;
      const q = Math.min(max, qty);
      return prev.map((l) => (l.productId === productId ? { ...l, qty: q } : l));
    });
  }, []);

  const removeLine = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setLines([]);
  }, []);

  const setShipping = useCallback((patch: Partial<ShippingDetails>) => {
    setShippingState((s) => ({ ...s, ...patch }));
  }, []);

  const setPaymentMethod = useCallback((m: PaymentMethodId | null) => {
    setPaymentMethodState(m);
  }, []);

  const enrichedLines = useMemo(() => {
    return lines
      .map((l) => {
        const product = PRODUCTS.find((p) => p.id === l.productId);
        if (!product) return null;
        const unit = parsePriceUsd(product.price);
        return { product, qty: l.qty, lineTotal: unit * l.qty };
      })
      .filter((x): x is NonNullable<typeof x> => x != null);
  }, [lines]);

  const subtotal = useMemo(
    () => enrichedLines.reduce((s, l) => s + l.lineTotal, 0),
    [enrichedLines]
  );

  const itemCount = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);

  const exportOrderSnapshot = useCallback(() => {
    const ref = `CHB-${Date.now().toString(36).toUpperCase().slice(-8)}`;
    const linesSnap = lines
      .map((l) => {
        const p = PRODUCTS.find((x) => x.id === l.productId);
        if (!p) return null;
        return {
          name: p.name,
          qty: l.qty,
          total: parsePriceUsd(p.price) * l.qty,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x != null);
    const sub = linesSnap.reduce((s, x) => s + x.total, 0);

    if (typeof window !== "undefined") {
      const snap: LastOrderSnapshot = {
        ref,
        placedAt: Date.now(),
        email: shipping.email,
        lines: linesSnap,
        subtotal: sub,
        paymentMethod,
      };
      sessionStorage.setItem(LAST_ORDER_SNAPSHOT_KEY, JSON.stringify(snap));
    }

    return ref;
  }, [lines, shipping, paymentMethod]);

  const clearAfterSuccessfulOrder = useCallback(() => {
    setLines([]);
    setShippingState(emptyShipping());
    setPaymentMethodState(null);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      itemCount,
      enrichedLines,
      subtotal,
      shipping,
      paymentMethod,
      addItem,
      setLineQty,
      removeLine,
      clearCart,
      setShipping,
      setPaymentMethod,
      exportOrderSnapshot,
      clearAfterSuccessfulOrder,
    }),
    [
      lines,
      itemCount,
      enrichedLines,
      subtotal,
      shipping,
      paymentMethod,
      addItem,
      setLineQty,
      removeLine,
      clearCart,
      setShipping,
      setPaymentMethod,
      exportOrderSnapshot,
      clearAfterSuccessfulOrder,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
