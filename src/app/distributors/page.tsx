import { sanityFetch } from "@/sanity/live";
import { distributorsPageQuery, countriesWithDistributorsQuery } from "@/sanity/queries";
import DistributorsClient from "@/components/DistributorsClient";

const DistributorsPage = async () => {
  const [{ data: pageData }, { data: countries }] = await Promise.all([
    sanityFetch({ query: distributorsPageQuery }),
    sanityFetch({ query: countriesWithDistributorsQuery }),
  ]);

  return (
    <DistributorsClient
      pageData={pageData}
      countries={countries || []}
    />
  );
};

export default DistributorsPage;
