import { NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";
import { cookies } from "next/headers"; // Importa cookies corretamente

export async function middleware(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const tokenVerified = await verifyToken(token)

  if (!token || !tokenVerified) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Define quais rotas serão protegidas pelo middleware
export const config = {
  matcher: ["/dashboard/:path*"], // Protege todas as rotas dentro de /features
};
