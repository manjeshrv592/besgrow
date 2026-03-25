// Block types
export { blockContent } from "./blocks/blockContent";
export { twoColumnGrid } from "./blocks/twoColumnGrid";
export { brochureButton } from "./blocks/brochureButton";

// Collection documents
export { productCategory } from "./documents/productCategory";
export { product } from "./documents/product";
export { country } from "./documents/country";
export { distributor } from "./documents/distributor";

// Singletons
export { homePage } from "./singletons/homePage";
export { contactPage } from "./singletons/contactPage";
export { aboutPage } from "./singletons/aboutPage";
export { productsListingPage } from "./singletons/productsListingPage";
export { distributorsPage } from "./singletons/distributorsPage";
export { preFooter } from "./singletons/preFooter";
export { footer } from "./singletons/footer";

// All singleton type names (used for structure configuration)
export const singletonTypes = [
  "homePage",
  "contactPage",
  "aboutPage",
  "productsListingPage",
  "distributorsPage",
  "preFooter",
  "footer",
] as const;
