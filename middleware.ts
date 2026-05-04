import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE } from "@/lib/auth-demo";

export function middleware(request: NextRequest) {
  const loggedIn = request.cookies.get(AUTH_COOKIE)?.value === "1";
  if (loggedIn) {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/login";
  const from = request.nextUrl.pathname + request.nextUrl.search;
  loginUrl.searchParams.set("from", from || "/cart");
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/cart", "/cart/(.*)", "/checkout", "/checkout/(.*)"],
};
