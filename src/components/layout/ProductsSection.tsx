"use client";

import React, { useState, useCallback, useMemo } from "react";
import Container from "./Container";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

// ─── Fallback data (used when Sanity has no categories) ───
const fallbackProducts = [
  {
    id: "1",
    title: "Sphagnum Moss",
    description:
      "Naturally harvested Sphagnum Moss sourced from the pristine wetlands of New Zealand, Argentina, and Chile. Renowned for its exceptional water retention and anti-bacterial properties, our Sphagnum Moss provides the ideal growing medium for orchids, carnivorous plants, and a wide range of horticultural applications.",
    image: "/img/products/product-1.png",
    bg: "/img/products/product-1-bg.jpg",
  },
  {
    id: "2",
    title: "Orchid Bark",
    description:
      "Premium-grade Orchid Bark carefully selected from sustainably managed forests. Available in Portuguese Pine Bark varieties, our bark provides excellent drainage and aeration for orchids and other epiphytic plants. Each batch is screened and graded to ensure consistent quality and optimal root health.",
    image: "/img/products/product-2.png",
    bg: "/img/products/product-2-bg.jpg",
  },
  {
    id: "3",
    title: "Kelpak",
    description:
      "Kelpak is a natural seaweed concentrate derived from the kelp Ecklonia maxima, harvested along the pristine South African coastline. This powerful biostimulant promotes vigorous root development, enhances nutrient uptake, and strengthens plant resilience against environmental stress.",
    image: "/img/products/product-3.png",
    bg: "/img/products/product-3-bg.jpg",
  },
  {
    id: "4",
    title: "Fernwood",
    description:
      "Sustainably sourced Tree Fern Fibre ideal for orchids and reptile habitats. Fernwood provides excellent moisture retention while maintaining superior airflow around delicate root systems. Its naturally fibrous structure creates the perfect microenvironment for healthy plant growth and terrarium setups.",
    image: "/img/products/product-4.png",
    bg: "/img/products/product-4-bg.jpg",
  },
  {
    id: "5",
    title: "Bulk Items",
    description:
      "A comprehensive range of bulk horticultural supplies including Wooden Stakes, Aluminium Edging, Peat Free Fibres, Miscanthus and Decor Bark. These versatile products cater to professional growers, landscapers and garden centres looking for reliable, high-quality materials at scale.",
    image: "/img/products/product-5.png",
    bg: "/img/products/product-5-bg.jpg",
  },
  {
    id: "6",
    title: "Other",
    description:
      "Explore our extended product line featuring Orchid Pots, Tree Fern Pots, Perlite, Vermiculite, Pine Bark and Seramis. Each product is rigorously tested to meet the highest standards of quality, giving growers and enthusiasts trustworthy solutions for every planting need.",
    image: "/img/products/product-6.png",
    bg: "/img/products/product-6-bg.jpg",
  },
];

const fallbackGridItems = [
  {
    title: "Sphagnum Moss",
    items: ["New Zealand Sphagnum", "Argentinian Sphagnum Moss", "Chilean Sphagnum Moss"],
  },
  {
    title: "Orchid Bark",
    items: ["Orchid Bark", "Portuguese Pine Bark"],
  },
  {
    title: "Kelpak",
    items: [],
  },
  {
    title: "Fernwood",
    items: ["Tree Fernfiber Orchids", "Tree Fernfiber Reptiles"],
  },
  {
    title: "Bulk Items",
    items: ["Wooden Stakes", "Alu Edging", "Peat Free Fibres", "Miscanthus", "Decor Bark"],
  },
  {
    title: "Other",
    items: ["Orchid Pots", "Tree Fern Pots", "Perlite", "Vermiculite", "Pine Bark", "Seramis"],
  },
];

// ─── Types ───
interface SanityImage {
  asset: { _ref: string };
}

interface SanityProduct {
  _id: string;
  title: string;
  slug: { current: string };
  productImage?: SanityImage;
}

interface SanityCategory {
  _id: string;
  title: string;
  slug: { current: string };
  summary?: string;
  coverImage?: SanityImage;
  image?: SanityImage;
  products?: SanityProduct[];
}

interface ProductsSectionProps {
  categories?: SanityCategory[] | null;
}

// Helper to build Sanity image URL (client-side, simple approach)
function sanityImageUrl(image: SanityImage, width: number = 800): string {
  const ref = image.asset._ref;
  // Convert ref like "image-abc123-800x600-jpg" to URL
  const [, id, dimensions, format] = ref.split("-");
  return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}-${dimensions}.${format}?w=${width}`;
}

const ProductsSection = ({ categories }: ProductsSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const useSanity = categories && categories.length > 0;

  // Build slide data from Sanity categories or fallback
  const products = useMemo(() => {
    if (useSanity) {
      return categories.map((cat, i) => ({
        id: cat._id,
        title: cat.title,
        description: cat.summary || "",
        image: cat.image ? sanityImageUrl(cat.image, 500) : `/img/products/product-${i + 1}.png`,
        bg: cat.coverImage
          ? sanityImageUrl(cat.coverImage, 1920)
          : `/img/products/product-${i + 1}-bg.jpg`,
      }));
    }
    return fallbackProducts;
  }, [useSanity, categories]);

  // Build grid data from Sanity categories (with their products) or fallback
  const gridItems = useMemo(() => {
    if (useSanity) {
      return categories.map((cat) => ({
        title: cat.title,
        items: (cat.products || []).map((p) => ({
          title: p.title,
          slug: p.slug?.current || "",
        })),
      }));
    }
    return fallbackGridItems.map((g) => ({
      title: g.title,
      items: g.items.map((item) => ({ title: item, slug: "" })),
    }));
  }, [useSanity, categories]);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  const handleGridClick = useCallback(
    (index: number) => {
      if (swiperInstance) {
        swiperInstance.slideToLoop(index);
      }
    },
    [swiperInstance]
  );

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background images with fade */}
      {products.map((product, index) => (
        <div
          key={product.id}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: activeIndex === index ? 1 : 0 }}
        >
          <Image
            fill
            src={product.bg}
            alt={`${product.title} background`}
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.9) 100%)",
        }}
      />

      <div className="relative z-20 flex h-full flex-col">
        <Container className="flex h-full flex-col justify-between py-[12vh]">
          {/* Header */}
          <div className="text-right text-white">
            <div className="text-xs uppercase">Products</div>
            <div className="font-bold">Explore Our Products</div>
          </div>

          {/* Product slider area */}
          <div className="relative">
            {/* Left arrow */}
            <button
              className="product-prev absolute top-1/2 left-0 z-30 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/25"
              aria-label="Previous product"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Right arrow */}
            <button
              className="product-next absolute top-1/2 right-0 z-30 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/25"
              aria-label="Next product"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <Swiper
              modules={[Autoplay, Navigation]}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              navigation={{
                prevEl: ".product-prev",
                nextEl: ".product-next",
              }}
              loop
              speed={700}
              onSwiper={setSwiperInstance}
              onSlideChange={handleSlideChange}
              className="px-[10vw]"
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="flex items-center gap-12 px-[5vw]">
                    <div className="flex-1 text-right">
                      <h3 className="h5 font-bold text-[#61EE4E]!">
                        {product.title}
                      </h3>
                      <p className="text-white">{product.description}</p>
                    </div>
                    <div className="relative aspect-square basis-[250px] shrink-0">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Static grid with active highlighting */}
          <div className="grid grid-cols-6 gap-8 text-right text-white">
            {gridItems.map((item, index) => (
              <div
                key={item.title}
                className="cursor-pointer"
                onClick={() => handleGridClick(index)}
              >
                <h4
                  className={`mb-2 font-semibold transition-colors duration-300 ${
                    activeIndex === index
                      ? "text-[#61EE4E]"
                      : "text-white"
                  }`}
                >
                  {item.title}
                </h4>
                {item.items.length > 0 && (
                  <ul className="text-neutral-400">
                    {item.items.map((subItem) => (
                      <li key={subItem.title}>
                        {subItem.slug ? (
                          <Link
                            href={`/products/${subItem.slug}`}
                            className="transition-colors hover:text-white"
                          >
                            {subItem.title}
                          </Link>
                        ) : (
                          subItem.title
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
};

export default ProductsSection;
