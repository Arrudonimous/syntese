import { NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";
import { cookies } from "next/headers";

export async function middleware(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const tokenVerified = await verifyToken(token);

  const { pathname } = req.nextUrl;
  const isDashboardRoute = pathname.startsWith("/dashboards");
  const isHomeRoute = pathname === "/";

  if (isDashboardRoute && (!token || !tokenVerified)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isHomeRoute && token && tokenVerified) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/"], // Aplica o middleware às rotas dentro de /dashboards e à home
};