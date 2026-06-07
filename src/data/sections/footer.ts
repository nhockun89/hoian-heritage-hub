import type { FooterData } from "../../domain/types";

export const footerData: FooterData = {
  brand: "Hoi An Heritage",
  copyright: `© ${new Date().getFullYear()} Hoi An Heritage. Made for wanderers, by wanderers.`,
  columns: [
    {
      title: "Explore",
      links: [
        "Heritage Sites",
        "Food & Drink",
        "Nature & Outdoors",
        "Arts & Crafts",
        "Activities & Experiences",
        "Local Life & Markets",
        "Stays & Accommodation",
      ],
    },
    {
      title: "Plan",
      links: ["24-Hour Itinerary", "Weekend Guide", "Before You Go", "Local Secrets"],
    },
    {
      title: "Contact",
      items: [
        { icon: "location_on", text: "Old Town, Hoi An, VN" },
        { icon: "mail", text: "hello@hoianheritage.vn" },
        { icon: "call", text: "+84 235 123 456" },
      ],
    },
  ],
  socialIcons: ["public", "share", "camera"],
  popularTags: [
    "Japanese Bridge",
    "Cao Lau",
    "Basket Boats",
    "Silk Lanterns",
    "Cooking Class",
    "Old Town",
    "Thu Bon River",
    "Night Market",
  ],
};
