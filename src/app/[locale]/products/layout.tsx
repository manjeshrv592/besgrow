import Container from "@/components/layout/Container";
import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Link from "next/link";
import { sanityFetch } from "@/sanity/live";
import {
  productsListingPageQuery,
  productCategoriesQuery,
} from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { getLocalizedString } from "@/sanity/utils";
import type { LanguageId } from "@/sanity/schemas/languages";
import { setRequestLocale } from "next-intl/server";

// Fallback data
const fallbackSidebar = {
  sidebarTitle: "Product Catalog",
  sidebarDescription: "Browse our premium selection of horticultural products",
};

const fallbackCategories = [
  {
    title: "Sphagnum Moss",
    items: [
      "New Zealand Spagmoss",
      "Argentinian Sphagnum Moss",
      "Chilean Sphagnum Moss",
    ],
  },
  {
    title: "Orchid Bark",
    items: ["Premium Orchid Bark", "Fine Grade Bark", "Coarse Grade Bark"],
  },
  {
    title: "Fernwood",
    items: ["Fernwood Tree Fern Fibre", "Fernwood Chunks", "Fernwood Panels"],
  },
  {
    title: "Grand Akad Ama",
    items: ["Akadama Fine", "Akadama Medium", "Akadama Coarse"],
  },
  {
    title: "Bulk Items",
    items: ["Bulk Sphagnum Moss", "Bulk Orchid Bark", "Bulk Perlite"],
  },
  {
    title: "Other",
    items: ["Perlite", "Charcoal", "Coconut Husk Chips", "Pumice"],
  },
];

// Types
interface InternationalizedValue {
  _key: string;
  value: string;
}

interface SanityProduct {
  _id: string;
  title: InternationalizedValue[];
  slug: { current: string };
}

interface SanityCategory {
  _id: string;
  title: InternationalizedValue[];
  slug: { current: string };
  products?: SanityProduct[];
}

import ProductsSidebar from "./ProductsSidebar";
import ProductsMobileSheet from "./ProductsMobileSheet";

interface ProductsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function ProductsLayout({
  children,
  params,
}: ProductsLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale as LanguageId;

  const [{ data: pageData }, { data: categories }] = await Promise.all([
    sanityFetch({ query: productsListingPageQuery }),
    sanityFetch({ query: productCategoriesQuery }),
  ]);

  const sidebarTitle = getLocalizedString(pageData?.sidebarTitle, lang, fallbackSidebar.sidebarTitle);
  const sidebarDescription = getLocalizedString(pageData?.sidebarDescription, lang, fallbackSidebar.sidebarDescription);
  const sidebarBgSrc = pageData?.sidebarBackgroundImage
    ? urlFor(pageData.sidebarBackgroundImage).width(600).quality(75).url()
    : "/img/products-bg.jpg";

  const useSanity = categories && categories.length > 0;

  const productCategories = useSanity
    ? (categories as SanityCategory[]).map((cat) => ({
        title: getLocalizedString(cat.title, lang, "Category"),
        items: (cat.products || []).map((p) => ({
          title: getLocalizedString(p.title, lang, "Product"),
          slug: p.slug?.current || "",
        })),
      }))
    : fallbackCategories.map((cat) => ({
        title: cat.title,
        items: cat.items.map((item) => ({ title: item, slug: "" })),
      }));

  return (
    <section className="relative">
      <Image
        src="/img/inner-page-compo.jpg"
        alt="Beautiful landscape with blue sky with leaves illustration"
        fill
        className="object-cover"
        priority
      />
      <Container className="relative z-20 h-full">
        <div className="flex h-full flex-col lg:flex-row lg:gap-24">
          {/* Main content area — rendered by page.tsx or [slug]/page.tsx */}
          <div className="flex flex-1 flex-col gap-8 px-4 py-8 pb-24 lg:px-0 lg:py-[12vh] lg:pb-[12vh]">{children}</div>

          {/* Shared Sidebar - hidden on mobile */}
          <div className="relative hidden basis-[27%] flex-col border-x border-neutral-300 px-4 py-[12vh] lg:flex">
            <Image
              alt="fawn image"
              className="object-cover"
              src={sidebarBgSrc}
              fill
            />
            <div className="relative z-20">
              <div className="mb-4 text-center text-white">
                <h4 className="font-ronnia text-[max(16px,1.2vw)]">
                  {sidebarTitle}
                </h4>
                <span>{sidebarDescription}</span>
              </div>

              <ProductsSidebar productCategories={productCategories} />
            </div>
          </div>
        </div>

        {/* Mobile bottom sheet */}
        <ProductsMobileSheet productCategories={productCategories} />
      </Container>
    </section>
  );
}
