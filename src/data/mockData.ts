/**
 * Legacy re-export shim. The 596-line mockData.ts has been split
 * into per-section files under `./sections/`. This file re-exports
 * the same names from the new locations so the components
 * continue to work without changes.
 *
 * The components are being migrated to take their data as a prop
 * (see Round 4 of the architecture deepening pass). When every
 * component imports from `./sections/<name>` directly, this
 * shim will be removed.
 */

export {
  heroData,
  categoryShortcuts,
  heritageData,
  thisMonthData,
  discoverData,
  howToExploreData,
  experiencesData,
  itineraryData,
  localSecretsData,
  photoGalleryData,
  featuredData,
  foodData,
  newsletterData,
  footerData,
} from "./sections";
