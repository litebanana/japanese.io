export type Product = {
  id: string;
  name: string;
  jp: string;
  tagline: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  badge?: string;
  accent: string;
  description: string;
};

export const FREE_SHIPPING_THRESHOLD = 10000;

export function formatJPY(value: number): string {
  return "¥" + value.toLocaleString("ja-JP");
}

export const PRODUCTS: Product[] = [
  {
    id: "matte-wax",
    name: "Kage Matte Wax",
    jp: "影マットワックス",
    tagline: "Strong hold · matte finish · yuzu + cedar",
    price: 3200,
    rating: 4.8,
    reviews: 214,
    badge: "Bestseller",
    accent: "#e0231c",
    description:
      "Charred-cedar matte wax with a firm all-day hold. Scoops clean, breaks down fast in palms, rinses out without residue.",
  },
  {
    id: "cordless-clipper",
    name: "Kage Cordless Clipper",
    jp: "影コードレスクリッパー",
    tagline: "Titanium blade · 240-min runtime · USB-C",
    price: 18800,
    compareAt: 22800,
    rating: 4.9,
    reviews: 96,
    badge: "Pro pick",
    accent: "#c9a24a",
    description:
      "Flagship cordless clipper with a Japanese titanium blade, whisper motor and 8 guide combs in a paulownia box.",
  },
  {
    id: "moonwater-pomade",
    name: "Moonwater Pomade",
    jp: "月水ポマード",
    tagline: "Medium shine · water-based · hinoki",
    price: 2800,
    rating: 4.7,
    reviews: 167,
    accent: "#7fb0b8",
    description:
      "Water-based pomade that combs like oil and washes out like gel. Classic side-part shine with hinoki freshness.",
  },
  {
    id: "sanmon-razor",
    name: "Sanmon Straight Razor",
    jp: "山門ストレートレザー",
    tagline: "Shirogami steel · walnut handle",
    price: 12500,
    rating: 4.9,
    reviews: 58,
    badge: "Limited",
    accent: "#dfe7e0",
    description:
      "Hand-finished shirogami steel straight razor balanced for detail lining. Ships honed, stropped and shave-ready.",
  },
  {
    id: "lantern-beard-oil",
    name: "Lantern Beard Oil",
    jp: "灯明ひげ油",
    tagline: "Jojoba + squalane · smoked amber",
    price: 3800,
    rating: 4.6,
    reviews: 141,
    accent: "#ff5a3c",
    description:
      "Weightless beard oil that softens without grease. Smoked amber and black tea — the lantern court after rain.",
  },
  {
    id: "eternity-salt-mist",
    name: "Eternity Sea Salt Mist",
    jp: "永遠シーソルトミスト",
    tagline: "Texture + volume · moonwater minerals",
    price: 2400,
    compareAt: 2900,
    rating: 4.5,
    reviews: 189,
    badge: "New",
    accent: "#9db8ad",
    description:
      "Pre-styler salt mist for grip and airy volume. Spray on damp hair, rough-dry, finish with wax or nothing at all.",
  },
];
