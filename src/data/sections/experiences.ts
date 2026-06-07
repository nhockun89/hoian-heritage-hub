import type { ExperiencesData } from "../../domain/types";

export const experiencesData: ExperiencesData = {
  title: "Curated Experiences",
  subtitle: "What to Do",
  description:
    "Handpicked activities and experiences that showcase the best of Hoi An. Find out how to do them yourself or with local guides.",
  filters: [
    { label: "All", value: "All" },
    { label: "Heritage", value: "Heritage Sites" },
    { label: "Food", value: "Food & Drink" },
    { label: "Nature", value: "Nature & Outdoors" },
    { label: "Arts", value: "Arts & Crafts" },
    { label: "Activities", value: "Activities & Experiences" },
    { label: "Local Life", value: "Local Life & Markets" },
    { label: "Stays", value: "Stays & Accommodation" },
  ],
  items: [
    {
      id: 1,
      title: "Ancient Town Walking Tour",
      category: "Heritage Sites",
      rating: 4.9,
      reviews: 128,
      duration: "3 hours",
      price: "Free - $15",
      imageUrl:
        "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&q=80",
      tag: "Self-guided or Local Guide",
      howTo:
        "Start at the Japanese Bridge at sunrise. Pick up a heritage map ($2) from the ticket booth.",
    },
    {
      id: 2,
      title: "Sunset River Cruise",
      category: "Nature & Outdoors",
      rating: 4.8,
      reviews: 96,
      duration: "2 hours",
      price: "$10 - $25",
      imageUrl:
        "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=600&q=80",
      tag: "Boat Rental or Tour",
      howTo:
        "Head to the Thu Bon River dock at 5 PM. Negotiate with boat captains directly.",
    },
    {
      id: 3,
      title: "Cooking Class with Local Chef",
      category: "Food & Drink",
      rating: 5.0,
      reviews: 215,
      duration: "4 hours",
      price: "$20 - $45",
      imageUrl:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
      tag: "Hands-on Workshop",
      howTo:
        "Book a day ahead at Morning Glory Cooking School or ask your homestay host for a home visit.",
    },
    {
      id: 4,
      title: "Basket Boat Adventure",
      category: "Activities & Experiences",
      rating: 4.7,
      reviews: 84,
      duration: "2.5 hours",
      price: "$15 - $30",
      imageUrl:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
      tag: "Guided Experience",
      howTo:
        "Take a bicycle to Cam Thanh village. Local families offer basket boat rides at the water coconut forest.",
    },
    {
      id: 5,
      title: "Lantern Making Workshop",
      category: "Arts & Crafts",
      rating: 4.9,
      reviews: 156,
      duration: "2 hours",
      price: "$8 - $15",
      imageUrl:
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=600&q=80",
      tag: "Family Friendly",
      howTo:
        "Visit Hoi An Handicraft Workshop on Nguyen Thai Hoc Street. No booking needed for morning sessions.",
    },
    {
      id: 6,
      title: "Coconut Forest Cycling",
      category: "Nature & Outdoors",
      rating: 4.6,
      reviews: 72,
      duration: "5 hours",
      price: "Free (bike rental $3/day)",
      imageUrl:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
      tag: "Self-guided Adventure",
      howTo:
        "Rent a bicycle in the old town. Follow the rural paths to Cam Kim Island and Tra Que vegetable village.",
    },
    {
      id: 7,
      title: "Street Food Night Tour",
      category: "Food & Drink",
      rating: 4.8,
      reviews: 189,
      duration: "3 hours",
      price: "Free (food $5-10)",
      imageUrl:
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80",
      tag: "Self-guided Route",
      howTo:
        "Start at the Night Market on Nguyen Hoang Street at 6 PM. Follow our free food map.",
    },
    {
      id: 8,
      title: "Traditional Silk Weaving",
      category: "Arts & Crafts",
      rating: 4.7,
      reviews: 63,
      duration: "1.5 hours",
      price: "$5 - $12",
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
      tag: "Cultural Demo",
      howTo:
        "Visit the Hoi An Silk Village on Nguyen Tat Thanh Street. Watch artisans, try the loom, buy direct.",
    },
    {
      id: 9,
      title: "Morning Market Exploration",
      category: "Local Life & Markets",
      rating: 4.8,
      reviews: 112,
      duration: "2 hours",
      price: "Free",
      imageUrl:
        "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&q=80",
      tag: "Self-guided Experience",
      howTo:
        "Wake up early and head to the Central Market on Nguyen Hoang Street. Best before 8 AM for the freshest produce and local energy.",
    },
    {
      id: 10,
      title: "Heritage Homestay Experience",
      category: "Stays & Accommodation",
      rating: 4.9,
      reviews: 245,
      duration: "1-3 nights",
      price: "$15 - $50/night",
      imageUrl:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
      tag: "Authentic Stay",
      howTo:
        "Book a family-run homestay in the Old Town. Your host will share breakfast, stories, and insider tips.",
    },
    {
      id: 11,
      title: "Wood Carving Workshop",
      category: "Arts & Crafts",
      rating: 4.6,
      reviews: 45,
      duration: "3 hours",
      price: "$12 - $20",
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
      tag: "Hands-on",
      howTo:
        "Kim Bong Carpentry Village across the river. Learn traditional joinery from master craftspeople.",
    },
    {
      id: 12,
      title: "Tailor-Made Clothing",
      category: "Local Life & Markets",
      rating: 4.7,
      reviews: 310,
      duration: "1-2 days",
      price: "$20 - $100",
      imageUrl:
        "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&q=80",
      tag: "Shopping",
      howTo:
        "Choose fabric in the morning, get measured, pick up your custom garment the next day. Try Yaly or Bebe Tailor.",
    },
  ],
};
