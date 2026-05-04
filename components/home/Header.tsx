"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Menu } from "lucide-react";
import { useAuth } from "../auth/auth-context";
import ThemeToggle from "../ui/ThemeToggle";
import CartIconLink from "../cart/CartIconLink";

const nav = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Inventory" },
  { href: "/cart", label: "Cart" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, ready, logout } = useAuth();

  const onLogout = () => {
    logout();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 shadow-sm shadow-slate-200/40 dark:shadow-none dark:backdrop-blur-md backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 lg:gap-10 min-w-0">
          <button
            type="button"
            className="md:hidden p-2 -ml-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link href="/" className="shrink-0 group flex items-baseline gap-0.5">
            <span className="text-xl sm:text-2xl font-black tracking-tighter bg-gradient-to-r from-slate-800 via-cyan-700 to-cyan-600 dark:from-slate-200 dark:via-cyan-400 dark:to-cyan-300 bg-clip-text text-transparent">
              Component
            </span>
            <span className="text-xl sm:text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
              Hub
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map(({ href, label }) => {
              const active =
                href === "/"
                  ? pathname === "/"
                  : href === "/cart"
                    ? pathname === "/cart" || pathname.startsWith("/checkout")
                    : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors ${
                    active
                      ? "bg-cyan-50 dark:bg-cyan-950/50 text-cyan-800 dark:text-cyan-300 ring-1 ring-cyan-200/80 dark:ring-cyan-700/80"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="hidden sm:flex flex-1 max-w-md lg:max-w-xl mx-2 lg:mx-6 relative min-w-0">
          <label htmlFor="header-search" className="sr-only">
            Search catalog
          </label>
          <input
            id="header-search"
            type="search"
            placeholder="Search parts, serials, datasheets…"
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 dark:focus:ring-cyan-400/25 focus:border-cyan-400 dark:focus:border-cyan-500 transition-shadow"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {ready &&
            (user ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline max-w-[7rem] truncate text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                  {user}
                </span>
                <button
                  type="button"
                  onClick={onLogout}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 px-2.5 py-1.5 text-[10px] sm:text-xs font-black uppercase tracking-wide text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                href={`/login?from=${encodeURIComponent(pathname || "/")}`}
                className="rounded-lg border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/40 px-2.5 py-1.5 text-[10px] sm:text-xs font-black uppercase tracking-wide text-cyan-800 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-900/50"
              >
                Sign in
              </Link>
            ))}
          <ThemeToggle />
          <CartIconLink />
        </div>
      </div>

      <nav
        className="md:hidden flex border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 transition-colors"
        aria-label="Primary"
      >
        {nav.map(({ href, label }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : href === "/cart"
                ? pathname === "/cart" || pathname.startsWith("/checkout")
                : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 py-2.5 text-center text-xs font-bold uppercase tracking-wide transition-colors ${
                active
                  ? "text-cyan-800 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/40 border-b-2 border-cyan-500"
                  : "text-slate-600 dark:text-slate-400 border-b-2 border-transparent hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
