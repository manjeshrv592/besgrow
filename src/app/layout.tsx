import { Nokora, Figtree } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LayoutShell from "@/components/layout/LayoutShell";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Container from "@/components/layout/Container";
import { sanityFetch, SanityLive } from "@/sanity/live";
import { preFooterQuery, productCategoriesQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const nokora = Nokora({
  subsets: ["latin"],
  weight: ["100", "300", "400", "600", "700", "900"],
  display: "swap",
  variable: "--font-nokora",
});

const ronnia = localFont({
  src: [
    {
      path: "../../public/fonts/RonniaBold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ronnia",
});

// Fallback data
const preFooterFallback = {
  text: "Besgrow is a young and dynamic company, specialized in the production of high quality growing and landscaping substrates from sustainable, renewable resources",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [{ data: preFooterData }, { data: categories }] = await Promise.all([
    sanityFetch({ query: preFooterQuery }),
    sanityFetch({ query: productCategoriesQuery }),
  ]);

  const firstCategory: any = categories?.[0];
  const firstProductSlug = firstCategory?.products?.[0]?.slug?.current;
  const productsHref = firstProductSlug
    ? `/products/${firstProductSlug}`
    : "/products";

  // Pre-footer values
  const preFooterText = preFooterData?.text || preFooterFallback.text;
  const preFooterBgSrc = preFooterData?.backgroundImage
    ? urlFor(preFooterData.backgroundImage).width(1920).quality(75).url()
    : "/img/fallen-leaves.jpg";

  return (
    <html lang="en" className={cn("font-sans", figtree.variable)}>
      <body className={`${nokora.variable} text-neutral-700 antialiased`}>
        <LayoutShell
          header={<Header productsHref={productsHref} />}
          footer={
            <>
              <section className="relative py-[15vw] lg:py-[6vw]">
                <Image
                  src={preFooterBgSrc}
                  alt="Fallen leaves"
                  fill
                  className="object-cover brightness-50"
                />
                <Container>
                  <div className="relative z-10 mx-auto max-w-[50vw] text-center text-white">
                    {preFooterText}
                  </div>
                </Container>
              </section>
              <Footer />
            </>
          }
        >
          {children}
        </LayoutShell>
        <SanityLive />
      </body>
    </html>
  );
}
