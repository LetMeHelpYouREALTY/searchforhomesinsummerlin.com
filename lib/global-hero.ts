/**
 * Compact global hero banner config — shown on every page via root layout.
 * Distinct from full-bleed PageHero (homepage / page-level heroes).
 */

export type GlobalHeroConfig = {
  src: string;
  alt: string;
  tagline: string;
  phoneDisplay?: string;
  phoneTel?: string;
};

export const GLOBAL_HERO: GlobalHeroConfig = {
  src: "/Image/hero_bg_1.jpg",
  alt: "Summerlin area homes and desert landscape near Las Vegas, Nevada",
  tagline: "Summerlin homes for sale — search by village with Dr. Jan Duffy",
  phoneDisplay: "(702) 222-1964",
  phoneTel: "tel:+17022221964",
};
