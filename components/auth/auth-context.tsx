"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AUTH_COOKIE,
  AUTH_MAX_AGE_SEC,
  DEMO_PASSWORD,
  DEMO_USERNAME,
  USER_COOKIE,
} from "@/lib/auth-demo";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const hit = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));
  if (!hit) return null;
  return decodeURIComponent(hit.slice(name.length + 1));
}

function writeAuthCookies(username: string) {
  const base = `Path=/; Max-Age=${AUTH_MAX_AGE_SEC}; SameSite=Lax`;
  document.cookie = `${AUTH_COOKIE}=1; ${base}`;
  document.cookie = `${USER_COOKIE}=${encodeURIComponent(username)}; ${base}`;
}

function clearAuthCookies() {
  const base = "Path=/; Max-Age=0";
  document.cookie = `${AUTH_COOKIE}=; ${base}`;
  document.cookie = `${USER_COOKIE}=; ${base}`;
}

type AuthContextValue = {
  user: string | null;
  ready: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const logged = readCookie(AUTH_COOKIE) === "1";
    const name = readCookie(USER_COOKIE);
    setUser(logged ? name || DEMO_USERNAME : null);
    setReady(true);
  }, []);

  const login = useCallback((username: string, password: string) => {
    const u = username.trim();
    const p = password;
    if (u === DEMO_USERNAME && p === DEMO_PASSWORD) {
      writeAuthCookies(u);
      setUser(u);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    clearAuthCookies();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, ready, login, logout }),
    [user, ready, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
