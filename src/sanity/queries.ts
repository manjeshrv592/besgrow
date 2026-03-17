import { groq } from "next-sanity";

// ─── Home Page ───
export const homePageQuery = groq`*[_type == "homePage"][0]{
  heroBackgroundImage,
  heroImage,
  heroTitle,
  heroDescription
}`;

// ─── Contact Page ───
export const contactPageQuery = groq`*[_type == "contactPage"][0]{
  backgroundImage,
  sidebarBackgroundImage,
  title,
  body
}`;

// ─── About Page ───
export const aboutPageQuery = groq`*[_type == "aboutPage"][0]{
  backgroundImage,
  sidebarBackgroundImage,
  title,
  body,
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
  slug,
  productImage,
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
