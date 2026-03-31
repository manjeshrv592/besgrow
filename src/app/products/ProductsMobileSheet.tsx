"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ChevronUp } from "lucide-react";

interface ProductsMobileSheetProps {
  productCategories: {
    title: string;
    items: { title: string; slug: string }[];
  }[];
}

export default function ProductsMobileSheet({
  productCategories,
}: ProductsMobileSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Determine the active product slug
  const activeSlug = pathname?.split("/")?.pop() || "";

  // Find which category the active product belongs to
  const activeCategory =
    productCategories.find((cat) =>
      cat.items.some((item) => item.slug === activeSlug)
    )?.title || productCategories[0]?.title;

  const [openCategory, setOpenCategory] = useState<string | undefined>(
    activeCategory
  );

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Fixed bottom button with white background strip */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <div className="border-besgrow-green/50 relative bg-white pt-6 border-t">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-besgrow-green absolute left-1/2 top-0 z-10 flex w-[80%] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-full py-3 text-white"
          >
            <span className="font-semibold">Products</span>
            <ChevronUp
              className={`h-5 w-5 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Bottom sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transform bg-white transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "70vh" }}
      >
        {/* Sheet header */}
        <button
          onClick={() => setIsOpen(false)}
          className="bg-besgrow-green flex w-full items-center justify-center gap-2 py-3 text-white"
        >
          <span className="font-semibold">Products</span>
          <ChevronUp className="h-5 w-5 rotate-180" />
        </button>

        {/* Categories list */}
        <div className="overflow-y-auto" style={{ maxHeight: "calc(70vh - 48px)" }}>
          <Accordion
            type="single"
            collapsible
            value={openCategory}
            onValueChange={setOpenCategory}
            className="flex flex-col border-none"
          >
            {productCategories.map((category) =>
              category.items.length > 0 ? (
                <AccordionItem
                  key={category.title}
                  value={category.title}
                  className="border-b border-neutral-200"
                >
                  <AccordionTrigger className="flex items-center justify-between px-4 py-4 text-left hover:no-underline data-[state=open]:no-underline">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-6 w-1 rounded-full transition-colors ${
                          openCategory === category.title
                            ? "bg-besgrow-green"
                            : "bg-transparent"
                        }`}
                      />
                      <span
                        className={`font-semibold ${
                          openCategory === category.title
                            ? "text-neutral-900"
                            : "text-neutral-600"
                        }`}
                      >
                        {category.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex flex-col pb-2">
                      {category.items.map((item, i) => {
                        const isActive = item.slug === activeSlug;
                        return (
                          <li
                            key={i}
                            className={`px-4 py-2 pl-8 text-sm transition-colors ${
                              isActive
                                ? "bg-besgrow-green/10 text-besgrow-green font-semibold"
                                : "text-neutral-600"
                            }`}
                          >
                            {item.slug ? (
                              <Link
                                href={`/products/${item.slug}`}
                                className="block w-full no-underline!"
                                onClick={handleLinkClick}
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
                  className="flex items-center gap-3 border-b border-neutral-200 px-4 py-4"
                  onClick={() => setOpenCategory(category.title)}
                >
                  <div
                    className={`h-6 w-1 rounded-full transition-colors ${
                      openCategory === category.title
                        ? "bg-besgrow-green"
                        : "bg-transparent"
                    }`}
                  />
                  <span
                    className={`font-semibold ${
                      openCategory === category.title
                        ? "text-neutral-900"
                        : "text-neutral-600"
                    }`}
                  >
                    {category.title}
                  </span>
                </div>
              )
            )}
          </Accordion>
        </div>
      </div>
    </>
  );
}
