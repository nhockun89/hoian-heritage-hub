import type { FeaturedData } from "../../domain/types";

export const featuredData: readonly FeaturedData[] = [
  {
    subtitle: "Legacy Landmark",
    title: "Whispers of the Ancient Bridge",
    description:
      "For over four centuries, the Japanese Covered Bridge has stood as a symbol of cultural harmony. This architectural masterpiece, guarded by stone statues of dogs and monkeys, connects the Japanese and Chinese districts, serving as a silent witness to the ebb and flow of empires.",
    imageUrl:
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200&q=80",
    features: [
      {
        icon: "history",
        title: "Built in 1590",
        description:
          "A testament to 16th-century engineering and spiritual protection.",
      },
      {
        icon: "architecture",
        title: "Cultural Fusion",
        description:
          "Blending Japanese precision with Vietnamese and Chinese soul.",
      },
    ],
    variant: "bridge",
  },
  {
    subtitle: "Sustainable Life",
    title: "Where Green Meets Gold",
    description:
      "Step away from the yellow walls and into the lush green embrace of Cam Thanh. Navigate the coconut water-forests in traditional basket boats and witness the golden sun reflecting off the emerald palm leaves.",
    imageUrl:
      "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1200&q=80",
    cta: "Explore the groves",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    ],
    variant: "green",
  },
];
