import { groq } from "next-sanity";

// ─── Home Page ───
export const homePageQuery = groq`*[_type == "homePage"][0]{
  heroBackgroundImage,
  heroImage,
  heroTitle,
  heroDescription,
  aboutBackgroundImage,
  aboutImage,
  aboutTitle,
  aboutBody,
  partnersTitle,
  partnersDescription,
  europeHeading,
  europeDescription,
  worldHeading,
  worldDescription
}`;

// ─── Contact Page ───
export const contactPageQuery = groq`*[_type == "contactPage"][0]{
  backgroundImage,
  sidebarBackgroundImage,
  title,
  leadText,
  contentText,
  mainImage,
  sidebarTitle,
  sidebarDescription
}`;

// ─── About Page ───
export const aboutPageQuery = groq`*[_type == "aboutPage"][0]{
  backgroundImage,
  sidebarBackgroundImage,
  title,
  leadText,
  contentText,
  mainImage,
  sidebarTitle,
  sidebarDescription,
  googleMapsUrl
}`;

// ─── Products Listing Page ───
export const productsListingPageQuery = groq`*[_type == "productsListingPage"][0]{
  sidebarBackgroundImage,
  sidebarTitle,
  sidebarDescription
}`;

// ─── Product Categories (with nested products) ───
export const productCategoriesQuery = groq`*[_type == "productCategory"] | order(order asc){
  _id,
  title,
  slug,
  summary,
  coverImage,
  image,
  "products": *[_type == "product" && references(^._id)] | order(order asc){
    _id,
    title,
    slug,
    productImage
  }
}`;

// ─── Single Product by slug ───
export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0]{
  _id,
  title,
  "productImage": productImage,
  initialBody,
  body,
  category->{
    _id,
    title,
    slug
  }
}`;

// ─── Pre-Footer ───
export const preFooterQuery = groq`*[_type == "preFooter"][0]{
  backgroundImage,
  text
}`;

// ─── Footer ───
export const footerQuery = groq`*[_type == "footer"][0]{
  addressTitle,
  address,
  email,
  phone,
  facebookUrl,
  twitterUrl,
  instagramUrl,
  linkedinUrl,
  copyrightText
}`;

// ─── Distributors Page (singleton) ───
export const distributorsPageQuery = groq`*[_type == "distributorsPage"][0]{
  backgroundImage,
  sidebarBackgroundImage,
  title,
  description,
  bottomNote,
  europeTabLabel,
  worldTabLabel,
  europeSidebarHeading,
  worldSidebarHeading,
  sidebarSubtext
}`;

// ─── All Countries with Distributors ───
export const countriesWithDistributorsQuery = groq`*[_type == "country" && serviceAvailable == true] | order(name asc){
  _id,
  name,
  code,
  isoNumeric,
  isEurope,
  serviceAvailable,
  distributors[]{
    _key,
    distributorName,
    city,
    coordinates,
    googleMapsLink,
    address,
    phone,
    email,
    website
  }
}`;

// ─── All Countries (for listing) ───
export const allCountriesQuery = groq`*[_type == "country"] | order(name asc){
  _id,
  name,
  code,
  isoNumeric,
  isEurope,
  serviceAvailable,
  "distributorCount": count(distributors)
}`;

// ─── Legal Pages ───
export const privacyPageQuery = groq`*[_type == "privacyPage"][0]{
  title,
  content
}`;

export const cookiePageQuery = groq`*[_type == "cookiePage"][0]{
  title,
  content
}`;

export const termsPageQuery = groq`*[_type == "termsPage"][0]{
  title,
  content
}`;
