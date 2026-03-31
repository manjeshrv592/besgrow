import { sanityFetch } from "@/sanity/live";
import { distributorsPageQuery, countriesWithDistributorsQuery } from "@/sanity/queries";
import DistributorsClient from "@/components/DistributorsClient";
import type { LanguageId } from "@/sanity/schemas/languages";
import { setRequestLocale } from "next-intl/server";

interface DistributorsPageProps {
  params: Promise<{ locale: string }>;
}

const DistributorsPage = async ({ params }: DistributorsPageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale as LanguageId;

  const [{ data: pageData }, { data: countries }] = await Promise.all([
    sanityFetch({ query: distributorsPageQuery }),
    sanityFetch({ query: countriesWithDistributorsQuery }),
  ]);

  return (
    <DistributorsClient
      pageData={pageData}
      countries={countries || []}
      locale={lang}
    />
  );
};

export default DistributorsPage;
