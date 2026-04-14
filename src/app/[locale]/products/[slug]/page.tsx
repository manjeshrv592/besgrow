import { notFound } from "next/navigation";
import Image from "next/image";
import { sanityFetch } from "@/sanity/live";
import { productBySlugQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import PortableText from "@/components/PortableText";
import { getLocalizedString, getLocalizedBlockContent } from "@/sanity/utils";
import type { LanguageId } from "@/sanity/schemas/languages";
import { setRequestLocale } from "next-intl/server";

interface ProductPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const lang = locale as LanguageId;

  const { data: product } = await sanityFetch({
    query: productBySlugQuery,
    params: { slug },
  });

  if (!product) {
    notFound();
  }

  const title = getLocalizedString(product.title, lang, "Product");
  const initialBody = getLocalizedBlockContent(product.initialBody, lang);
  const body = getLocalizedBlockContent(product.body, lang);
  const hasBody = body && body.length > 0;
  const productImageSrc = product.productImage
    ? urlFor(product.productImage).width(400).url()
    : null;

  return (
    <div>
      <div className="relative mb-8">
        <div className="flex-1 pt-10 lg:pt-0">
          <h1 className="fade-in h2">{title}</h1>
          {/* {product.category && (
            <p className="text-besgrow-green/60 mb-2 text-sm font-medium">
              {product.category.title}
            </p>
          )} */}
          <div className="mb-8 flex flex-col-reverse items-start gap-6 lg:flex-row lg:items-end lg:gap-8">
            {/* <div className="text-besgrow-green"> */}

            <div className="fade-in fade-delay-1 order-2 text-neutral-700 lg:order-1">
              {initialBody && (
                <PortableText value={initialBody} />
              )}
            </div>
            {productImageSrc && (
              <div className="fade-in-right fade-delay-2 order-1 mb-4 shrink-0 lg:order-2 lg:mb-6">
                <Image
                  alt={title}
                  width={676}
                  height={582}
                  className="h-auto w-48 lg:w-64"
                  src={productImageSrc}
                />
              </div>
            )}
          </div>
          {hasBody && <div className="fade-in fade-delay-3"><PortableText value={body} /></div>}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
