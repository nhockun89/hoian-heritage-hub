import type { ThisMonthData } from "../../domain/types";

/**
 * Seasonal editorial cards. The `color` and `bgColor` fields are
 * Tailwind class strings drawn from the design-system semantic
 * tokens (text-tertiary, bg-tertiary-container/30, …). They are
 * not `ColorTheme` values — the icon styling follows a different
 * vocabulary than the category-card swatches.
 */
export const thisMonthData: ThisMonthData = {
  subtitle: "This Month in Hoi An",
  title: "What is Happening Now",
  description: "Seasonal highlights, festivals, and events you should not miss.",
  items: [
    {
      icon: "celebration",
      title: "Full Moon Lantern Festival",
      date: "14th of every month",
      description:
        "The old town goes electric-free. Thousands of silk lanterns illuminate the streets as locals release floating candles on the river.",
      color: "text-tertiary",
      bgColor: "bg-tertiary-container/30",
    },
    {
      icon: "wb_sunny",
      title: "Best Time to Visit",
      date: "November - March",
      description:
        "Dry season with pleasant temperatures (20-28°C). Perfect for walking tours and riverside dining.",
      color: "text-primary",
      bgColor: "bg-primary-container/30",
    },
    {
      icon: "palette",
      title: "Craft Workshop Season",
      date: "Ongoing",
      description:
        "Hands-on lantern making, silk weaving, and wood carving workshops led by master artisans in the old town.",
      color: "text-secondary",
      bgColor: "bg-secondary-container/30",
    },
    {
      icon: "restaurant",
      title: "Night Market Flavors",
      date: "Every evening",
      description:
        "Over 50 street food stalls line the river from 5 PM. Cao Lau, Banh Xeo, and fresh sugarcane juice await.",
      color: "text-tertiary",
      bgColor: "bg-tertiary-container/30",
    },
  ],
};
