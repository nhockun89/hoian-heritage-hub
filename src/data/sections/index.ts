/**
 * Section data barrel.
 *
 * Each export corresponds to one section of the home page. The
 * underlying values are produced by the per-section files in
 * this directory; this barrel exists so the rest of the codebase
 * can keep using the same import path (`./sections/...`) as the
 * page migrates component-by-component to props.
 *
 * The `mockData` re-export below is the legacy shim: components
 * that still `import { heroData } from "../data/mockData"` will
 * keep working until each one is migrated to take its data as a
 * prop.
 */

export { heroData } from "./hero";
export { categoryShortcuts } from "./categoryShortcuts";
export { heritageData } from "./heritage";
export { thisMonthData } from "./thisMonth";
export { discoverData } from "./discover";
export { howToExploreData } from "./howToExplore";
export { experiencesData } from "./experiences";
export { itineraryData } from "./itinerary";
export { localSecretsData } from "./localSecrets";
export { photoGalleryData } from "./photoGallery";
export { featuredData } from "./featured";
export { foodData } from "./food";
export { newsletterData } from "./newsletter";
export { footerData } from "./footer";
