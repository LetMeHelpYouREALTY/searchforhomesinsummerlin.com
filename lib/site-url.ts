/** Canonical site origin (apex). Override in Vercel with NEXT_PUBLIC_SITE_URL. */
const DEFAULT_SITE_URL = "https://searchforhomesinsummerlin.com";

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const base = fromEnv && fromEnv.length > 0 ? fromEnv : DEFAULT_SITE_URL;
  return base.replace(/\/$/, "");
}

export function absoluteUrl(pathname: string): string {
  const base = getSiteUrl();
  if (!pathname || pathname === "/") {
    return base;
  }
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}
