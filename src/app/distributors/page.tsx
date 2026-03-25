import { client } from "@/sanity/client";
import { distributorsPageQuery, distributorsQuery } from "@/sanity/queries";
import DistributorsClient from "@/components/DistributorsClient";

const DistributorsPage = async () => {
  const [pageData, distributors] = await Promise.all([
    client.fetch(distributorsPageQuery),
    client.fetch(distributorsQuery),
  ]);

  return (
    <DistributorsClient
      pageData={pageData}
      distributors={distributors || []}
    />
  );
};

export default DistributorsPage;
