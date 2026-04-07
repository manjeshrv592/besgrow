import Container from "@/components/layout/Container";
import { sanityFetch } from "@/sanity/live";
import { cookiePageQuery } from "@/sanity/queries";
import { getLocalizedString } from "@/sanity/utils";
import type { LanguageId } from "@/sanity/schemas/languages";
import { setRequestLocale } from "next-intl/server";
import PortableText from "@/components/PortableText";

interface CookiePageProps {
  params: Promise<{ locale: string }>;
}

const fallback = {
  title: "Cookie Settings",
};

export default async function CookiePage({ params }: CookiePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale as LanguageId;

  const { data } = await sanityFetch({ query: cookiePageQuery });

  const title = getLocalizedString(data?.title, lang, fallback.title);
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
