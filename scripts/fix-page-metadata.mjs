import fs from "fs";
import path from "path";

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

for (const file of walk("app")) {
  if (file.includes("[id]")) continue;
  let s = fs.readFileSync(file, "utf8");
  if (!s.includes("export const metadata")) continue;
  if (s.includes("pageMetadata(")) continue;

  const route = routeFromFile(file);

  s = s.replace(
    /\| Berkshire Hathaway HomeServices[^"]*/g,
    "| Dr. Jan Duffy",
  );
  s = s.replace(
    /title: "Berkshire Hathaway HomeServices ([^"]+)"/g,
    'title: "$1 | Dr. Jan Duffy"',
  );
  s = s.replace(
    /title: "Dr\. Jan Duffy - Berkshire Hathaway HomeServices[^"]*"/g,
    'title: "Dr. Jan Duffy, REALTOR® | Summerlin Homes"',
  );

  if (!s.includes('@/lib/page-metadata"')) {
    if (s.includes('import type { Metadata } from "next";')) {
      s = s.replace(
        'import type { Metadata } from "next";',
        'import type { Metadata } from "next";\nimport { pageMetadata } from "@/lib/page-metadata";',
      );
    } else {
      s = `import { pageMetadata } from "@/lib/page-metadata";\n` + s;
    }
  }

  const re = /export const metadata: Metadata = (\{[\s\S]*?\n\});/m;
  const m = s.match(re);
  if (!m) continue;
  const inner = m[1].slice(1, -1).trim();
  const replacement = `export const metadata: Metadata = pageMetadata({\n  path: "${route}",\n${inner}\n});`;
  s = s.replace(re, replacement);
  fs.writeFileSync(file, s);
}
