"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";

export default function CartIconLink() {
  const { itemCount } = useCart();
  const display = itemCount > 99 ? "99+" : String(itemCount);

  return (
    <Link
      href="/cart"
      className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 hover:bg-cyan-50/80 dark:hover:bg-cyan-950/40 transition-colors"
      aria-label={`Shopping cart, ${itemCount} items`}
    >
      <ShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute top-1 right-1 flex h-4 min-w-[1rem] px-1 items-center justify-center rounded-full bg-cyan-600 dark:bg-cyan-500 text-[10px] font-black text-white leading-none">
          {display}
        </span>
      )}
    </Link>
  );
}
