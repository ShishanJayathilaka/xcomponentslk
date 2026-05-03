"use client";

import { Search, ShoppingCart, Menu } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo & Mobile Menu */}
        <div className="flex items-center gap-4">
          <Menu className="md:hidden w-6 h-6 cursor-pointer" />
          <div className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 cursor-pointer">
            Component<span className="text-slate-900 dark:text-white">Hub</span>
          </div>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
          <input
            type="text"
            placeholder="Search specifications, parts, or datasheets..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <ThemeToggle />
          <div className="relative cursor-pointer hover:text-blue-600 transition-colors">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              0
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}