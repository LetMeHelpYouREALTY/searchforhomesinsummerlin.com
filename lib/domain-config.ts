/**
 * Single-site configuration for searchforhomesinsummerlin.com.
 * Hard-wired so Vercel preview (*.vercel.app) renders this domain's content.
 */

export interface DomainConfig {
  domain: string;
  neighborhood: string;
  tagline: string;
  title: string;
  description: string;
  heroHeadline: string;
  heroSubheadline: string;
  keywords: string[];
  pageType:
    | "community"
    | "search"
    | "lifestyle"
    | "investment"
    | "55plus"
    | "luxury";
  realscoutAgentId: string;
  ctaBadge: string;
  ctaHeadline: string;
  ctaSubheadline: string;
}

export const SITE_DOMAIN = "searchforhomesinsummerlin.com";

export const SITE_TITLE = "Summerlin Homes for Sale | Dr. Jan Duffy";

const REALSCOUT_AGENT_ID = "QWdlbnQtMjI1MDUw";

export const SITE_DOMAIN_CONFIG: DomainConfig = {
  domain: SITE_DOMAIN,
  neighborhood: "Summerlin",
  tagline: "Search Homes in Summerlin",
  title: SITE_TITLE,
  description:
    "Browse Summerlin homes for sale across villages, resale and attached homes, condos, townhomes, and new construction. MLS search and local guidance from Dr. Jan Duffy.",
  heroHeadline: "Search Homes in Summerlin",
  heroSubheadline:
    "Compare listings community-wide — from established villages to new-build communities across Summerlin.",
  keywords: [
    "Summerlin homes for sale",
    "Summerlin MLS property search",
    "Summerlin homes by village",
    "Summerlin condos and townhomes",
    "Summerlin community homes map",
    "new homes in Summerlin by village",
  ],
  pageType: "search",
  realscoutAgentId: REALSCOUT_AGENT_ID,
  ctaBadge: "Summerlin Specialist",
  ctaHeadline: "Find Your Summerlin Home",
  ctaSubheadline:
    "Tell me your villages, price range, and timing — I will match MLS listings and new-build options across Summerlin.",
};

export const SISTER_LINKS: ReadonlyArray<{ href: string; label: string }> = [
  {
    href: "https://summerlinwesthomes.com",
    label: "Summerlin West homes for sale",
  },
  { href: "https://westsummerlinhomes.com", label: "moving to West Summerlin" },
];

export function getDomainConfig(_hostname: string): DomainConfig {
  return SITE_DOMAIN_CONFIG;
}
