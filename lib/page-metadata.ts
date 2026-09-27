import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site-url";

export type PageMetadataInput = {
  /** Path on this site, e.g. `/about` */
  path: string;
  title: string;
  description: string;
  keywords?: string[];
};

/** Per-page SEO: unique title + self-referencing apex canonical (no BHHS in title). */
export function pageMetadata(input: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(input.path);
  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: { canonical },
    openGraph: {
      title: input.title,
      description: input.description,
      url: canonical,
      type: "website",
    },
  };
}
