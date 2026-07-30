import type { FoodPageData } from "../../domain/types";

/**
 * Mock adapter for the dedicated Food page.
 *
 * This file is the single source of truth for the editorial data
 * shown on /food: hero copy, must-try dishes, vibe tags, places,
 * riverside ambiance, and kitchen stories.
 *
 * The component (`src/pages/FoodPage.tsx`) consumes the typed
 * `FoodPageData` object and wires it to React state and UI. A
 * future live Supabase adapter can return the same shape.
 */

export const foodPageData: FoodPageData = {
  hero: {
    eyebrow: "Culinary Archives",
    title: "The Taste of Antiquity",
    description:
      "In Hoi An, history is not just preserved in golden walls and silk lanterns; it is served daily in steaming bowls of broth and crisped baguettes. Discover the centuries-old recipes that define the Ancient Town.",
    cta: "Discover the Flavors",
    imageUrl:
      "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=1400&h=900&fit=crop",
  },

  search: {
    placeholder: "Search dishes, places, or vibes…",
    suggestionsTitle: "Matching vibes",
  },

  mustTaste: {
    title: "Must-Taste Icons",
    description: "Essential flavors that define the Ancient Town's palate.",
    items: [
      {
        id: "cao-lau",
        tag: "HERITAGE SOUL",
        title: "Cao Lầu Noodles",
        location: "Old Town",
        price: "$$",
        servingPlaceCount: 12,
        imageUrl:
          "https://images.unsplash.com/photo-1552611052-33e04de081de?w=600&h=800&fit=crop",
      },
      {
        id: "banh-mi",
        tag: "THE WORLD'S BEST",
        title: "Bánh Mì Hội An",
        location: "Ba Le Well Area",
        price: "$$",
        servingPlaceCount: 8,
        imageUrl:
          "https://images.unsplash.com/photo-1600454309261-3dc9b7594592?w=600&h=800&fit=crop",
      },
      {
        id: "white-rose",
        tag: "HAND-CRAFTED ART",
        title: "White Rose Dumplings",
        location: "Hai Ba Trung St.",
        price: "$$$",
        servingPlaceCount: 5,
        imageUrl:
          "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&h=800&fit=crop",
      },
      {
        id: "com-ga",
        tag: "STREET CLASSIC",
        title: "Cơm Gà Hội An",
        location: "Central Market",
        price: "$",
        servingPlaceCount: 15,
        imageUrl:
          "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&h=800&fit=crop",
      },
      {
        id: "mi-quang",
        tag: "BREAKFAST FAVORITE",
        title: "Mì Quảng",
        location: "Cam Chau",
        price: "$",
        servingPlaceCount: 10,
        imageUrl:
          "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=800&fit=crop",
      },
      {
        id: "che",
        tag: "SWEET FINISH",
        title: "Chè Hội An",
        location: "Old Town",
        price: "$",
        servingPlaceCount: 7,
        imageUrl:
          "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&h=800&fit=crop",
      },
    ],
  },

  places: {
    title: "Places to Eat",
    subtitle: "Curated Picks",
    description:
      "Match your mood. Each spot is tagged by vibe, neighborhood, and the dishes you came here to find.",
    vibeTags: [
      { id: "street-side", label: "Street-side classic", featured: true },
      { id: "riverside", label: "Riverside calm", featured: true },
      { id: "heritage", label: "Heritage house", featured: true },
      { id: "market", label: "Market energy", featured: true },
      { id: "hidden-alley", label: "Hidden alley", featured: false },
      { id: "date-night", label: "Date-night elegant", featured: false },
      { id: "pet-friendly", label: "Pet-friendly patio", featured: false },
      { id: "late-night", label: "Late-night eats", featured: false },
    ],
    neighborhoods: ["Old Town", "Cam Chau", "Riverside", "Central Market"],
    places: [
      {
        id: "ms-vy",
        name: "Morning Glory Street Food",
        neighborhood: "Old Town",
        price: "$$",
        vibes: ["street-side", "heritage"],
        dishes: ["Cao Lầu Noodles", "White Rose Dumplings"],
        isOpen: true,
        isPetFriendly: false,
        rating: 4.7,
        hours: "10:00 AM – 10:00 PM",
        description:
          "A beloved institution serving refined street classics inside a restored timber merchant house.",
        imageUrl:
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=450&fit=crop",
      },
      {
        id: "banh-mi-phuong",
        name: "Bánh Mì Phượng",
        neighborhood: "Old Town",
        price: "$",
        vibes: ["street-side", "market"],
        dishes: ["Bánh Mì Hội An"],
        isOpen: true,
        isPetFriendly: false,
        rating: 4.8,
        hours: "6:30 AM – 9:30 PM",
        description:
          "Tiny counter, legendary baguettes. Anthony Bourdain called it one of the best in Vietnam.",
        imageUrl:
          "https://images.unsplash.com/photo-1541557435984-1c79685a082b?w=600&h=450&fit=crop",
      },
      {
        id: "cao-lau-khong",
        name: "Cao Lầu Không Gian Xanh",
        neighborhood: "Cam Chau",
        price: "$$",
        vibes: ["hidden-alley", "pet-friendly"],
        dishes: ["Cao Lầu Noodles"],
        isOpen: true,
        isPetFriendly: true,
        rating: 4.5,
        hours: "11:00 AM – 9:00 PM",
        description:
          "Garden setting with hand-pulled noodles and a quiet, leafy courtyard away from the crowds.",
        imageUrl:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=450&fit=crop",
      },
      {
        id: "the-chef",
        name: "The Chef",
        neighborhood: "Riverside",
        price: "$$$",
        vibes: ["riverside", "date-night"],
        dishes: ["White Rose Dumplings"],
        isOpen: true,
        isPetFriendly: false,
        rating: 4.6,
        hours: "5:00 PM – 11:00 PM",
        description:
          "Candle-lit riverside dining with modern interpretations of Hoi An classics.",
        imageUrl:
          "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=450&fit=crop",
      },
      {
        id: "com-ga-ba-buoi",
        name: "Cơm Gà Bà Buội",
        neighborhood: "Old Town",
        price: "$$",
        vibes: ["heritage", "street-side"],
        dishes: ["Cơm Gà Hội An"],
        isOpen: false,
        isPetFriendly: false,
        rating: 4.4,
        hours: "10:00 AM – 3:00 PM",
        description:
          "Family-run since the 1950s. The rice is hand-shredded and the chicken is poached in turmeric.",
        imageUrl:
          "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&h=450&fit=crop",
      },
      {
        id: "nu-eatery",
        name: "Nữ Eatery",
        neighborhood: "Riverside",
        price: "$$$",
        vibes: ["riverside", "date-night", "heritage"],
        dishes: ["Mì Quảng", "White Rose Dumplings"],
        isOpen: true,
        isPetFriendly: false,
        rating: 4.7,
        hours: "12:00 PM – 10:00 PM",
        description:
          "Contemporary Vietnamese tasting menu in a renovated French-colonial villa overlooking the river.",
        imageUrl:
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=450&fit=crop",
      },
      {
        id: "white-rose-binh",
        name: "White Rose Restaurant",
        neighborhood: "Old Town",
        price: "$$$",
        vibes: ["heritage", "market"],
        dishes: ["White Rose Dumplings"],
        isOpen: true,
        isPetFriendly: false,
        rating: 4.3,
        hours: "8:00 AM – 9:00 PM",
        description:
          "The only family in town still making bánh bao bánh vạc by hand each morning.",
        imageUrl:
          "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&h=450&fit=crop",
      },
      {
        id: "mi-quang-1a",
        name: "Mì Quảng 1A",
        neighborhood: "Cam Chau",
        price: "$",
        vibes: ["street-side", "hidden-alley"],
        dishes: ["Mì Quảng"],
        isOpen: false,
        isPetFriendly: true,
        rating: 4.6,
        hours: "6:00 AM – 10:00 AM",
        description:
          "Locals queue at dawn for the peanutty, turmeric-laden breakfast bowls.",
        imageUrl:
          "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=450&fit=crop",
      },
      {
        id: "che-thung",
        name: "Chè Thưng Cô Hoa",
        neighborhood: "Central Market",
        price: "$",
        vibes: ["market", "street-side"],
        dishes: ["Chè Hội An"],
        isOpen: true,
        isPetFriendly: false,
        rating: 4.5,
        hours: "2:00 PM – 9:00 PM",
        description:
          "Sweet soups and jellies served from a decades-old stall under the red market roof.",
        imageUrl:
          "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&h=450&fit=crop",
      },
      {
        id: "coco-riverside",
        name: "Coco Riverside",
        neighborhood: "Riverside",
        price: "$$$",
        vibes: ["riverside", "late-night", "pet-friendly"],
        dishes: ["Cao Lầu Noodles", "Bánh Mì Hội An"],
        isOpen: true,
        isPetFriendly: true,
        rating: 4.2,
        hours: "7:00 AM – 12:00 AM",
        description:
          "All-day café and bistro with deck seating right on the Thu Bon River.",
        imageUrl:
          "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=450&fit=crop",
      },
      {
        id: "secret-garden",
        name: "Secret Garden",
        neighborhood: "Old Town",
        price: "$$",
        vibes: ["hidden-alley", "date-night", "heritage"],
        dishes: ["Cơm Gà Hội An", "Chè Hội An"],
        isOpen: true,
        isPetFriendly: false,
        rating: 4.5,
        hours: "11:00 AM – 10:00 PM",
        description:
          "Rooftop terrace hidden above a silk lantern shop. Best sunset cocktails in town.",
        imageUrl:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=450&fit=crop",
      },
      {
        id: "late-night-banh-mi",
        name: "Bánh Mì Đêm",
        neighborhood: "Old Town",
        price: "$",
        vibes: ["late-night", "street-side"],
        dishes: ["Bánh Mì Hội An"],
        isOpen: true,
        isPetFriendly: false,
        rating: 4.4,
        hours: "8:00 PM – 2:00 AM",
        description:
          "The after-dark baguette counter that fuels motorbike taxi drivers and curious travelers.",
        imageUrl:
          "https://images.unsplash.com/photo-1541557435984-1c79685a082b?w=600&h=450&fit=crop",
      },
    ],
    priceLabel: "Price",
    neighborhoodLabel: "Neighborhood",
    openNowLabel: "Open now",
    petFriendlyLabel: "Pet-friendly",
    loadMoreLabel: "Load more places",
    clearAllLabel: "Clear all",
    emptyHeading: "No places match",
    emptyBody: "Try clearing a filter or searching for a different dish.",
  },

  riverside: {
    eyebrow: "Evening Ambiance",
    title: "Riverside Elegance",
    description:
      "As dusk falls and the lanterns are lit, the banks of the Thu Bon River transform into a culinary stage. Experience elevated local cuisine in heritage merchant houses turned fine dining establishments, where the cool river breeze accompanies every course.",
    cta: "Curated Dining Guide",
    imageUrl:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1400&h=900&fit=crop",
  },

  stories: {
    title: "Kitchen Stories",
    subtitle: "Deep dives into the people and traditions behind the plate.",
    stories: [
      {
        id: "keeper",
        tag: "THE MASTERS",
        title: "The Keeper of the Well",
        excerpt:
          "Meet Mrs. Thanh, who has been drawing water from the Ba Le Well for 40 years to ensure her Cao Lau remains true to its century-old recipe.",
        imageUrl:
          "https://images.unsplash.com/photo-1594020293000-8b169298b9f2?w=800&h=600&fit=crop",
      },
      {
        id: "market",
        tag: "ARCHITECTURE",
        title: "Under the Red Roofs",
        excerpt:
          "The Central Market is a living museum of taste. From savory 'Banh Xeo' to sweet 'Che', every corner holds a legacy.",
        imageUrl:
          "https://images.unsplash.com/photo-1583417267826-aebc4d1542e1?w=800&h=600&fit=crop",
      },
    ],
    miniStory: {
      tag: "RITUALS",
      icon: "local_mall",
      title: "Market Morning Rituals",
      body:
        "A guide to navigating the Central Market at dawn, when the best herbs arrive from Tra Que Village.",
    },
    spiceCard: {
      tag: "INGREDIENTS",
      icon: "potted_plant",
      title: "Spice of Life",
      body:
        "An interactive map of the hidden spice merchants who have supplied the town for generations.",
    },
  },
};
