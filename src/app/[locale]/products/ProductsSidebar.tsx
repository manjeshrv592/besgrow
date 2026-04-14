"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface ProductsSidebarProps {
  productCategories: {
    title: string;
    items: { title: string; slug: string }[];
  }[];
}

export default function ProductsSidebar({
  productCategories,
}: ProductsSidebarProps) {
  const pathname = usePathname();

  // Determine the active product slug
  const activeSlug = pathname?.split("/")?.pop() || "";

  // Find which category the active product belongs to
  const activeCategory =
    productCategories.find((cat) =>
      cat.items.some((item) => item.slug === activeSlug),
    )?.title || productCategories[0]?.title;

  const [openCategory, setOpenCategory] = useState<string | undefined>(
    activeCategory,
  );

  // Sync open category when path changes
  useEffect(() => {
    if (activeCategory) {
      setOpenCategory(activeCategory);
    }
  }, [activeCategory]);

  return (
    <Accordion
      type="single"
      collapsible
      value={openCategory}
      onValueChange={setOpenCategory}
      className="flex flex-col gap-3 border-none"
    >
      {productCategories.map((category) =>
        category.items.length > 0 ? (
          <AccordionItem
            key={category.title}
            value={category.title}
            className="cursor-pointer rounded-lg border-none bg-white"
          >
            <AccordionTrigger className="text-besgrow-green rounded-none px-4 py-3 font-semibold hover:no-underline data-[state=open]:no-underline">
              {category.title}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col pb-2">
                {category.items.map((item, i) => {
                  const isActive = item.slug === activeSlug;
                  return (
                    <li
                      key={i}
                      className={`mx-2 cursor-pointer rounded-lg px-2 py-1.5 transition-colors ${
                        isActive
                          ? "bg-besgrow-green/10 text-besgrow-green font-semibold"
                          : "hover:bg-muted text-neutral-600"
                      }`}
                    >
                      {item.slug ? (
                        <Link
                          href={`/products/${item.slug}`}
                          className="block w-full no-underline!"
                        >
                          {item.title}
                        </Link>
                      ) : (
                        item.title
                      )}
                    </li>
                  );
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ) : (
          <div
            key={category.title}
            onClick={() => setOpenCategory(category.title)}
            className={`cursor-pointer rounded-lg px-4 py-3 font-semibold transition-colors ${
              category.title === openCategory
                ? "bg-besgrow-green text-white"
                : "text-besgrow-green bg-white"
            }`}
          >
            {category.title}
          </div>
        ),
      )}
    </Accordion>
  );
}
