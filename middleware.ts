import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SITE_DOMAIN } from "@/lib/domain-config";

export function middleware(request: NextRequest) {
  const hostname = (request.headers.get("host") || "").toLowerCase();
  let domain = hostname.replace(/^www\./, "").split(":")[0];

  if (domain.endsWith(".vercel.app")) {
    domain = SITE_DOMAIN;
  }

  const response = NextResponse.next();
  response.headers.set("x-domain", domain);
  response.headers.set("x-pathname", request.nextUrl.pathname);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon|images|videos|robots|sitemap).*)"],
};
