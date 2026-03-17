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

const ProductsPage = async () => {
  const [pageData, categories] = await Promise.all([
    client.fetch(productsListingPageQuery),
    client.fetch(productCategoriesQuery),
  ]);

  const sidebarTitle =
    pageData?.sidebarTitle || fallbackSidebar.sidebarTitle;
  const sidebarDescription =
    pageData?.sidebarDescription || fallbackSidebar.sidebarDescription;
  const sidebarBgSrc = pageData?.sidebarBackgroundImage
    ? urlFor(pageData.sidebarBackgroundImage).width(600).quality(75).url()
    : "/img/products-bg.jpg";

  const useSanity = categories && categories.length > 0;

  // Build category list for the sidebar accordion
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
          <div className="flex flex-1 flex-col gap-8 py-[12vh]">
            <div className="relative mb-8 flex gap-10">
              <div>
                <h1 className="h3">Products</h1>
                <p className="text-besgrow-green mb-4 font-semibold">
                  Explore our complete range of premium horticultural products.
                </p>
                <p className="text-besgrow-green">
                  Select a product from the sidebar to view its full details,
                  applications, and available grades.
                </p>
              </div>
            </div>
          </div>
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
              <Accordion
                type="single"
                collapsible
                defaultValue={productCategories[0]?.title}
                className="flex flex-col gap-3 border-none"
              >
                {productCategories.map((category) =>
                  category.items.length > 0 ? (
                    <AccordionItem
                      key={category.title}
                      value={category.title}
                      className="cursor-pointer rounded-lg border-none bg-white"
                    >
                      <AccordionTrigger className="rounded-none px-4 py-3 hover:no-underline">
                        {category.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="flex flex-col">
                          {category.items.map((item, i) => (
                            <li
                              key={i}
                              className="hover:bg-muted cursor-pointer rounded-lg px-2 py-2 text-neutral-700 transition-colors"
                            >
                              {item.slug ? (
                                <Link href={`/products/${item.slug}`}>
                                  {item.title}
                                </Link>
                              ) : (
                                item.title
                              )}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ) : (
                    <div
                      key={category.title}
                      className="text-besgrow-green cursor-pointer rounded-xl bg-white px-4 py-3 text-base font-bold"
                    >
                      {category.title}
                    </div>
                  ),
                )}
              </Accordion>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProductsPage;
