import { notFound } from "next/navigation";
import Image from "next/image";
import { client } from "@/sanity/client";
import { productBySlugQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import PortableText from "@/components/PortableText";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params;
  const product = await client.fetch(productBySlugQuery, { slug });

  if (!product) {
    notFound();
  }

  const hasBody = product.body && product.body.length > 0;
  const productImageSrc = product.productImage
    ? urlFor(product.productImage).width(400).url()
    : null;

  return (
    <div>
      <div className="relative mb-8 flex gap-10">
        <div className="flex-1">
          <h1 className="h2">{product.title}</h1>
          {/* {product.category && (
            <p className="text-besgrow-green/60 mb-2 text-sm font-medium">
              {product.category.title}
            </p>
          )} */}
          <div className="mb-8 flex items-end gap-8">
            <div className="text-besgrow-green">
              <p className="mb-3 font-semibold">
                Besgrow produces a wide range of premium quality Spagmoss
                products from New Zealand Sphagnum moss.
              </p>
              <p className="mb-3">
                Renowned for its long robust strands, Spagmoss provides
                outstanding natural hydration for propagation, landscaping and
                decorative applications. Besgrow Spagmoss is available in many
                different grades, as well as specialized products to suit
                specific requirements.
              </p>
              <p className="mb-3 font-semibold">Applications</p>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-3">
                  <span>
                    01. For propagation, especially the cultivation of various
                    orchid species
                  </span>
                  <span>02. As a decorative enhancement</span>{" "}
                  <span>03. By carnivorous plant growers</span>
                </div>
                <div className="flex flex-col gap-3">
                  <span>
                    02. As an additive to increase water holding in other
                    substrates
                  </span>
                  <span>
                    04. In the floristry industry 06. For reptile bedding
                  </span>
                </div>
              </div>
            </div>
            {productImageSrc && (
              <div className="mb-6 shrink-0">
                <Image
                  alt={product.title}
                  width={676}
                  height={582}
                  className="h-auto w-64"
                  src={productImageSrc}
                />
              </div>
            )}
          </div>
          {hasBody && <PortableText value={product.body} />}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
