import Container from "@/components/layout/Container";
import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Link from "next/link";
import { client } from "@/sanity/client";
import {
  productsListingPageQuery,
  productCategoriesQuery,
} from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

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
interface SanityProduct {
  _id: string;
  title: string;
  slug: { current: string };
}

interface SanityCategory {
  _id: string;
  title: string;
  slug: { current: string };
  products?: SanityProduct[];
}

import ProductsSidebar from "./ProductsSidebar";

export default async function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pageData, categories] = await Promise.all([
    client.fetch(productsListingPageQuery),
    client.fetch(productCategoriesQuery),
  ]);

  const sidebarTitle = pageData?.sidebarTitle || fallbackSidebar.sidebarTitle;
  const sidebarDescription =
    pageData?.sidebarDescription || fallbackSidebar.sidebarDescription;
  const sidebarBgSrc = pageData?.sidebarBackgroundImage
    ? urlFor(pageData.sidebarBackgroundImage).width(600).quality(75).url()
    : "/img/products-bg.jpg";

  const useSanity = categories && categories.length > 0;

  const productCategories = useSanity
    ? (categories as SanityCategory[]).map((cat) => ({
        title: cat.title,
        items: (cat.products || []).map((p) => ({
          title: p.title,
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
        <div className="flex h-full gap-24">
          {/* Main content area — rendered by page.tsx or [slug]/page.tsx */}
          <div className="flex flex-1 flex-col gap-8 py-[12vh]">{children}</div>

          {/* Shared Sidebar */}
          <div className="relative flex basis-[27%] flex-col border-x border-neutral-300 px-4 py-[12vh]">
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
      </Container>
    </section>
  );
}
