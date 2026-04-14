import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LayoutShell from "@/components/layout/LayoutShell";
import ScrollFadeObserver from "@/components/ScrollFadeObserver";
import Image from "next/image";
import Container from "@/components/layout/Container";
import { sanityFetch, SanityLive } from "@/sanity/live";
import { preFooterQuery, productCategoriesQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { getLocalizedText } from "@/sanity/utils";
import type { LanguageId } from "@/sanity/schemas/languages";

// Fallback data
const preFooterFallback = {
  text: "Besgrow is a young and dynamic company, specialized in the production of high quality growing and landscaping substrates from sustainable, renewable resources",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const [{ data: preFooterData }, { data: categories }] = await Promise.all([
    sanityFetch({ query: preFooterQuery }),
    sanityFetch({ query: productCategoriesQuery }),
  ]);

  const firstCategory: any = categories?.[0];
  const firstProductSlug = firstCategory?.products?.[0]?.slug?.current;
  const productsHref = firstProductSlug
    ? `/products/${firstProductSlug}`
    : `/products`;

  // Pre-footer values
  const lang = locale as LanguageId;
  const preFooterText = getLocalizedText(preFooterData?.text, lang, preFooterFallback.text);
  const preFooterBgSrc = preFooterData?.backgroundImage
    ? urlFor(preFooterData.backgroundImage).width(1920).quality(75).url()
    : "/img/fallen-leaves.jpg";

  return (
    <>
      <NextIntlClientProvider locale={locale}>
        <LayoutShell
          header={<Header productsHref={productsHref} locale={locale as Locale} />}
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
                  <div className="fade-in relative z-10 mx-auto max-w-[50vw] text-center text-white">
                    {preFooterText}
                  </div>
                </Container>
              </section>
              <Footer />
            </>
          }
        >
          <ScrollFadeObserver />
          {children}
        </LayoutShell>
      </NextIntlClientProvider>
      <SanityLive />
    </>
  );
}
