import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const { pathname } = req.nextUrl;

  // ✅ Danh sách public route (ai cũng vào được)
  const publicPaths = ["/login"];

  // Nếu user đã login → chặn vào login/register
  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/newsfeed", req.url));
  }

  // Nếu route không nằm trong publicPaths và chưa login → redirect login
  const isPublic = publicPaths.some(path => pathname.startsWith(path));
 console.log("Middleware check:", { pathname, isPublic, token });
  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  // Áp dụng middleware cho tất cả route trừ static và API
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};
