import fs from "fs";
import path from "path";

const SITE = "https://searchforhomesinsummerlin.com";

function walk(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(p));
    else if (ent.name === "page.tsx") out.push(p);
  }
  return out;
}

function routeFromFile(file) {
  const rel = path.relative("app", file).replace(/\\/g, "/");
  if (rel === "page.tsx") return "/";
  const dir = path.dirname(rel);
  return dir === "." ? "/" : `/${dir}`;
}

function canonicalFor(route) {
  return route === "/" ? SITE : `${SITE}${route}`;
}

for (const file of walk("app")) {
  if (file.includes("[id]")) continue;
  let s = fs.readFileSync(file, "utf8");
  if (!s.includes("export const metadata")) continue;
  if (s.includes("alternates:") && s.includes("canonical:")) continue;

  const route = routeFromFile(file);
  const canonical = canonicalFor(route);

  const insert = `  alternates: { canonical: "${canonical}" },\n  openGraph: { url: "${canonical}" },\n`;

  s = s.replace(
    /export const metadata: Metadata = \{\n/,
    `export const metadata: Metadata = {\n${insert}`,
  );

  // If openGraph already exists, remove duplicate openGraph line we added - simplify: only add alternates
  if (s.includes("openGraph:") && s.match(/openGraph:/g).length > 1) {
    s = fs.readFileSync(file, "utf8");
    const insertAlt = `  alternates: { canonical: "${canonical}" },\n`;
    s = s.replace(
      /export const metadata: Metadata = \{\n/,
      `export const metadata: Metadata = {\n${insertAlt}`,
    );
    // patch existing openGraph url
    s = s.replace(
      /url:\s*"https:\/\/heyberkshire\.com[^"]*"/g,
      `url: "${canonical}"`,
    );
    fs.writeFileSync(file, s);
    continue;
  }

  fs.writeFileSync(file, s);
}
