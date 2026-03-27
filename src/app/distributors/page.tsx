import { sanityFetch } from "@/sanity/live";
import { distributorsPageQuery, distributorsQuery } from "@/sanity/queries";
import DistributorsClient from "@/components/DistributorsClient";

const DistributorsPage = async () => {
  const [{ data: pageData }, { data: distributors }] = await Promise.all([
    sanityFetch({ query: distributorsPageQuery }),
    sanityFetch({ query: distributorsQuery }),
  ]);

  return (
    <DistributorsClient
      pageData={pageData}
      distributors={distributors || []}
    />
  );
};

export default DistributorsPage;
