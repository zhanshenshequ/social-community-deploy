import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  
  // Theme
  const theme = request.cookies.get("theme")?.value || "light";
  res.headers.set("x-theme", theme);

  return res;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
