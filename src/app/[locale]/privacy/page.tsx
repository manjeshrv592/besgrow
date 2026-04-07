import Container from "@/components/layout/Container";
import { sanityFetch } from "@/sanity/live";
import { privacyPageQuery } from "@/sanity/queries";
import { getLocalizedString, getLocalizedText } from "@/sanity/utils";
import type { LanguageId } from "@/sanity/schemas/languages";
import { setRequestLocale } from "next-intl/server";
import PortableText from "@/components/PortableText";

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

const fallback = {
  title: "Privacy Policy",
};

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale as LanguageId;

  const { data } = await sanityFetch({ query: privacyPageQuery });

  const title = getLocalizedString(data?.title, lang, fallback.title);
  // getLocalizedText handles blocks as well if appropriately passed through PortableText, 
  // actually block arrays are slightly different. 
  // Let's make sure we parse the localized block array correctly.
  const content = data?.content?.find((c: any) => c.language === lang)?.value || [];

  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="mx-auto max-w-4xl">
          <h1 className="h2 mb-8">{title}</h1>
          <div className="prose prose-lg prose-green max-w-none">
            {content.length > 0 ? (
              <PortableText value={content} />
            ) : (
              <p>Content is currently being updated.</p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
