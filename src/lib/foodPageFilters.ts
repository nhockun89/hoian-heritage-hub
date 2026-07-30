import type { PlaceData, VibeTagData } from "../domain/types";

/**
 * Pure filtering helpers for the Food page.
 *
 * These functions have no React dependencies and are tested
 * independently. The FoodPage component wires React state into
 * `filterPlaces`; the helpers decide which places are visible.
 */

export interface FilterOptions {
  readonly query: string;
  readonly activeVibe: string | null;
  readonly price: string;
  readonly openNow: boolean;
  readonly neighborhood: string;
  readonly petFriendly: boolean;
}

export function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function matchesQuery(item: string, query: string): boolean {
  return normalize(item).includes(normalize(query));
}

export function getVibeSuggestions(
  query: string,
  vibeTags: readonly VibeTagData[],
): readonly VibeTagData[] {
  if (!query || query.length < 2) return [];
  return vibeTags.filter((vibe) => matchesQuery(vibe.label, query));
}

export function buildDirectionsUrl(
  name: string,
  neighborhood: string,
): string {
  const query = encodeURIComponent(`${name}, ${neighborhood}, Hoi An, Vietnam`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function filterPlaces(
  places: readonly PlaceData[],
  vibeTags: readonly VibeTagData[],
  options: FilterOptions,
): readonly PlaceData[] {
  const {
    query,
    activeVibe,
    price,
    openNow,
    neighborhood,
    petFriendly,
  } = options;

  return places.filter((place) => {
    const matchesSearch =
      !query ||
      matchesQuery(place.name, query) ||
      place.dishes.some((dish) => matchesQuery(dish, query)) ||
      place.vibes.some((vibeId) => {
        const label = vibeTags.find((t) => t.id === vibeId)?.label ?? "";
        return matchesQuery(label, query);
      }) ||
      matchesQuery(place.neighborhood, query);

    const matchesVibe = !activeVibe || place.vibes.includes(activeVibe);
    const matchesPrice = price === "Any" || place.price === price;
    const matchesOpen = !openNow || place.isOpen;
    const matchesNeighborhood =
      neighborhood === "Any" || place.neighborhood === neighborhood;
    const matchesPet = !petFriendly || place.isPetFriendly;

    return (
      matchesSearch &&
      matchesVibe &&
      matchesPrice &&
      matchesOpen &&
      matchesNeighborhood &&
      matchesPet
    );
  });
}

export interface ActiveFilterChip {
  readonly key: string;
  readonly label: string;
}

export function buildActiveFilterChips(
  options: FilterOptions,
  vibeTags: readonly VibeTagData[],
): readonly ActiveFilterChip[] {
  const chips: ActiveFilterChip[] = [];

  if (options.activeVibe) {
    const label = vibeTags.find((v) => v.id === options.activeVibe)?.label ?? options.activeVibe;
    chips.push({ key: "vibe", label: `Vibe: ${label}` });
  }
  if (options.price !== "Any") {
    chips.push({ key: "price", label: `Price: ${options.price}` });
  }
  if (options.neighborhood !== "Any") {
    chips.push({
      key: "neighborhood",
      label: `Neighborhood: ${options.neighborhood}`,
    });
  }
  if (options.openNow) {
    chips.push({ key: "openNow", label: "Open now" });
  }
  if (options.petFriendly) {
    chips.push({ key: "petFriendly", label: "Pet-friendly" });
  }

  return chips;
}
