"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/components/auth/auth-context";
import { CartProvider } from "@/components/cart/cart-context";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
