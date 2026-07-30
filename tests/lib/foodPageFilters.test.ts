import { describe, it, expect } from "vitest";
import {
  buildActiveFilterChips,
  buildDirectionsUrl,
  filterPlaces,
  getVibeSuggestions,
  matchesQuery,
  normalize,
} from "@/lib/foodPageFilters";
import type { PlaceData, VibeTagData } from "@/domain/types";

const vibeTags: readonly VibeTagData[] = [
  { id: "street-side", label: "Street-side classic", featured: true },
  { id: "riverside", label: "Riverside calm", featured: true },
  { id: "heritage", label: "Heritage house", featured: true },
];

const places: readonly PlaceData[] = [
  {
    id: "p1",
    name: "Bánh Mì Phượng",
    neighborhood: "Old Town",
    price: "$",
    vibes: ["street-side"],
    dishes: ["Bánh Mì Hội An"],
    isOpen: true,
    isPetFriendly: false,
    rating: 4.8,
    hours: "6:30 AM – 9:30 PM",
    description: "Tiny counter, legendary baguettes.",
    imageUrl: "https://example.com/p1.jpg",
  },
  {
    id: "p2",
    name: "Coco Riverside",
    neighborhood: "Riverside",
    price: "$$$",
    vibes: ["riverside", "pet-friendly"],
    dishes: ["Cao Lầu Noodles"],
    isOpen: true,
    isPetFriendly: true,
    rating: 4.2,
    hours: "7:00 AM – 12:00 AM",
    description: "All-day café on the Thu Bon River.",
    imageUrl: "https://example.com/p2.jpg",
  },
  {
    id: "p3",
    name: "Heritage House",
    neighborhood: "Old Town",
    price: "$$",
    vibes: ["heritage"],
    dishes: ["White Rose Dumplings"],
    isOpen: false,
    isPetFriendly: false,
    rating: 4.5,
    hours: "10:00 AM – 10:00 PM",
    description: "Restored timber merchant house.",
    imageUrl: "https://example.com/p3.jpg",
  },
];

const baseOptions = {
  query: "",
  activeVibe: null,
  price: "Any",
  openNow: false,
  neighborhood: "Any",
  petFriendly: false,
};

describe("normalize", () => {
  it("lowercases and removes diacritics", () => {
    expect(normalize("Cao Lầu")).toBe("cao lau");
    expect(normalize("Bánh Mì")).toBe("banh mi");
  });
});

describe("matchesQuery", () => {
  it("matches substrings case-insensitively", () => {
    expect(matchesQuery("Bánh Mì Phượng", "banh mi")).toBe(true);
    expect(matchesQuery("Bánh Mì Phượng", "cao lau")).toBe(false);
  });

  it("matches diacritic-free queries against diacritic text", () => {
    expect(matchesQuery("Cao Lầu", "cao lau")).toBe(true);
  });
});

describe("getVibeSuggestions", () => {
  it("returns empty for short queries", () => {
    expect(getVibeSuggestions("", vibeTags)).toHaveLength(0);
    expect(getVibeSuggestions("s", vibeTags)).toHaveLength(0);
  });

  it("returns matching vibes by label substring", () => {
    const result = getVibeSuggestions("river", vibeTags);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("riverside");
  });

  it("is case- and diacritic-insensitive", () => {
    const result = getVibeSuggestions("HERITAGE", vibeTags);
    expect(result[0].id).toBe("heritage");
  });
});

describe("filterPlaces", () => {
  it("returns all places when no options are set", () => {
    expect(filterPlaces(places, vibeTags, baseOptions)).toHaveLength(3);
  });

  it("filters by name query", () => {
    const result = filterPlaces(places, vibeTags, { ...baseOptions, query: "bánh" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("p1");
  });

  it("filters by dish query", () => {
    const result = filterPlaces(places, vibeTags, { ...baseOptions, query: "cao lau" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("p2");
  });

  it("filters by vibe query", () => {
    const result = filterPlaces(places, vibeTags, { ...baseOptions, query: "riverside" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("p2");
  });

  it("filters by active vibe id", () => {
    const result = filterPlaces(places, vibeTags, { ...baseOptions, activeVibe: "heritage" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("p3");
  });

  it("filters by price", () => {
    const result = filterPlaces(places, vibeTags, { ...baseOptions, price: "$$$" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("p2");
  });

  it("filters by open now", () => {
    const result = filterPlaces(places, vibeTags, { ...baseOptions, openNow: true });
    expect(result.map((p) => p.id).sort()).toEqual(["p1", "p2"]);
  });

  it("filters by neighborhood", () => {
    const result = filterPlaces(places, vibeTags, { ...baseOptions, neighborhood: "Old Town" });
    expect(result).toHaveLength(2);
  });

  it("filters by pet-friendly", () => {
    const result = filterPlaces(places, vibeTags, { ...baseOptions, petFriendly: true });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("p2");
  });

  it("combines multiple filters", () => {
    const result = filterPlaces(places, vibeTags, {
      ...baseOptions,
      neighborhood: "Old Town",
      price: "$",
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("p1");
  });

  it("returns empty when no place matches", () => {
    const result = filterPlaces(places, vibeTags, {
      ...baseOptions,
      query: "pizza",
    });
    expect(result).toHaveLength(0);
  });
});

describe("buildDirectionsUrl", () => {
  it("builds a Google Maps search URL with encoded query", () => {
    const url = buildDirectionsUrl("Bánh Mì Phượng", "Old Town");
    expect(url).toMatch(/^https:\/\/www\.google\.com\/maps\/search\/\?api=1&query=/);
    expect(decodeURIComponent(url)).toContain("Bánh Mì Phượng, Old Town, Hoi An, Vietnam");
  });
});

describe("buildActiveFilterChips", () => {
  it("returns empty when no filters are active", () => {
    expect(buildActiveFilterChips(baseOptions, vibeTags)).toHaveLength(0);
  });

  it("includes a chip for each active filter", () => {
    const chips = buildActiveFilterChips(
      {
        ...baseOptions,
        activeVibe: "street-side",
        price: "$$",
        openNow: true,
        petFriendly: true,
      },
      vibeTags,
    );
    expect(chips).toHaveLength(4);
    expect(chips.map((c) => c.key)).toContain("vibe");
    expect(chips.map((c) => c.label)).toContain("Vibe: Street-side classic");
    expect(chips.map((c) => c.label)).toContain("Price: $$");
    expect(chips.map((c) => c.label)).toContain("Open now");
    expect(chips.map((c) => c.label)).toContain("Pet-friendly");
  });
});
