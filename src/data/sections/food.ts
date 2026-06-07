import type { FoodData } from "../../domain/types";

export const foodData: FoodData = {
  subtitle: "Artisan Flavors",
  title: "Savor the Story",
  description:
    "Each dish in Hoi An is a chapter of history, influenced by Japanese, Chinese, and French traders who once walked these streets.",
  items: [
    {
      name: "Cao Lau",
      description:
        "The signature noodle dish, traditionally made with water from the ancient Ba Le Well.",
      imageUrl:
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80",
      price: "$$",
      cuisine: "Signature Dish",
      location: "Best at: Thanh Cao Lau, Thai Phien Street",
      neighborhood: "Old Town",
      cta: "Find Restaurants",
    },
    {
      name: "White Rose",
      description:
        "Delicate shrimp dumplings resembling white roses, a guarded family secret for generations.",
      imageUrl:
        "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&q=80",
      price: "$$",
      cuisine: "Street Food",
      location: "Original: Bong Hong Trang, Nhi Trung Street",
      neighborhood: "Old Town",
      cta: "View Recipe",
    },
    {
      name: "Banh Mi Hoi An",
      description:
        "Crispy baguettes filled with savory pork, pate, and a symphony of fresh local herbs.",
      imageUrl:
        "https://images.unsplash.com/photo-1600454309261-3dc9b7594592?w=600&q=80",
      price: "$",
      cuisine: "Street Food",
      location: "Best: Madame Khanh (The Banh Mi Queen)",
      neighborhood: "Old Town",
      cta: "Best Spots",
    },
    {
      name: "Heritage Coffee",
      description:
        "Slow-drip robusta blended with artisanal techniques in the heart of the old town.",
      imageUrl:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
      price: "$",
      cuisine: "Beverage",
      location: "Best: Faifo Coffee (rooftop views)",
      neighborhood: "Old Town",
      cta: "Cafe Guide",
    },
  ],
};
