import type { ItineraryData } from "../../domain/types";

export const itineraryData: ItineraryData = {
  subtitle: "A Day in Hoi An",
  title: "How to Spend 24 Hours",
  description: "A perfectly curated day for first-time wanderers.",
  days: [
    {
      label: "24 Hours",
      timeline: [
        {
          time: "5:30 AM",
          title: "Sunrise at the Japanese Bridge",
          description:
            "Beat the crowds. The bridge glows gold at dawn. No ticket needed before 7 AM.",
          icon: "wb_twilight",
        },
        {
          time: "7:00 AM",
          title: "Breakfast Like a Local",
          description:
            "Mi Quang at Madam Khanh or fresh Banh Mi from the corner of Tran Phu Street.",
          icon: "breakfast_dining",
        },
        {
          time: "9:00 AM",
          title: "Heritage Walking Tour",
          description:
            "Pick up a heritage ticket ($6) and explore the Old House of Tan Ky, Phuc Kien Assembly Hall, and the Cantonese Quarter.",
          icon: "temple_buddhist",
        },
        {
          time: "12:00 PM",
          title: "Lunch: Cao Lau Quest",
          description:
            "The only place to get real Cao Lau is Hoi An. Try Thanh Cao Lau on Thai Phien Street — water from the ancient Ba Le Well.",
          icon: "restaurant",
        },
        {
          time: "2:00 PM",
          title: "Tra Que Vegetable Village",
          description:
            "Cycle 3 km to the organic village. Join a farming experience or just walk the green fields.",
          icon: "pedal_bike",
        },
        {
          time: "4:30 PM",
          title: "Thu Bon River Sunset",
          description:
            "Grab a riverfront seat at a cafe on Bach Dang Street. Watch the sky turn the water pink and gold.",
          icon: "water",
        },
        {
          time: "6:00 PM",
          title: "Lantern Lighting Ceremony",
          description:
            "Buy a paper lantern ($1) from a street vendor and release it on the river as the town lights up.",
          icon: "celebration",
        },
        {
          time: "7:00 PM",
          title: "Night Market & Street Food",
          description:
            "Wander Nguyen Hoang Night Market. Try Banh Xeo, grilled corn, and fresh sugarcane juice.",
          icon: "storefront",
        },
        {
          time: "9:00 PM",
          title: "Rooftop Bar Finale",
          description:
            "End at a rooftop bar on Nguyen Thai Hoc Street with a view of the lantern-lit rooftops.",
          icon: "local_bar",
        },
      ],
    },
    {
      label: "Perfect Weekend",
      timeline: [
        {
          time: "Day 1",
          title: "Old Town Immersion",
          description: "Follow the 24-hour itinerary above for your first day.",
          icon: "calendar_today",
        },
        {
          time: "Day 2 AM",
          title: "An Bang Beach Morning",
          description:
            "Cycle 4 km to An Bang. Fresh seafood breakfast on the sand. Swim, read, relax.",
          icon: "beach_access",
        },
        {
          time: "Day 2 PM",
          title: "Cam Thanh Basket Boats",
          description:
            "Afternoon in the water coconut forest. Learn to spin a basket boat from local fishermen.",
          icon: "directions_boat",
        },
        {
          time: "Day 2 Evening",
          title: "Cooking Class Finale",
          description:
            "End with a 4-hour cooking class. Shop the market, prep ingredients, eat your creations.",
          icon: "soup_kitchen",
        },
      ],
    },
    {
      label: "Rainy Day Plan B",
      timeline: [
        {
          time: "Morning",
          title: "Indoor Craft Workshops",
          description:
            "Lantern making, silk painting, or wood carving at Hoi An Handicraft Workshop.",
          icon: "palette",
        },
        {
          time: "Lunch",
          title: "Cafe Hopping",
          description:
            "Hoi An has incredible cafes. Try Faifo Coffee (rooftop), The Espresso Station, or Reaching Out Teahouse (silent, supports deaf staff).",
          icon: "coffee",
        },
        {
          time: "Afternoon",
          title: "Museum Hopping",
          description:
            "Museum of Trade Ceramics, Sa Huynh Culture Museum, and the Folk Culture Museum — all under $2.",
          icon: "museum",
        },
        {
          time: "Evening",
          title: "Cooking at Your Homestay",
          description:
            "Ask your host to teach you a family recipe. Shop the wet market together, cook, share stories.",
          icon: "home",
        },
      ],
    },
  ],
};
