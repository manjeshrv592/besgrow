import Container from "@/components/layout/Container";
import Image from "next/image";
import { sanityFetch } from "@/sanity/live";
import { aboutPageQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

// Fallback content
const fallback = {
  title: "About Us",
  subtitle:
    "Besgrow is recognized globally as a leader in premium substrates for orchid cultivation—trusted by hobby growers and professional horticulturists alike. Our reputation is built on quality, consistency, and a deep understanding of plant performance.",
  description:
    "Innovation drives everything we do. We continuously invest in research and development, exploring the power of micro-organisms and biostimulants to create smarter, more effective solutions. By anticipating market trends and listening closely to our customers, we deliver products that don't just perform—they elevate growing results.",
  sidebarTitle: "Our Locations",
  sidebarDescription: "Find our Offices",
  googleMapsUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2505003.343214702!2d2.6408539569325526!3d52.18355887908633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609c3db87e4bb%3A0xb3a175ceffbd0a9f!2sNetherlands!5e0!3m2!1sen!2sin!4v1773103016499!5m2!1sen!2sin",
};

const AboutUsPage = async () => {
  const { data } = await sanityFetch({ query: aboutPageQuery });

  const title = data?.title || fallback.title;
  const leadText = data?.leadText || fallback.subtitle;
  const contentText = data?.contentText || fallback.description;
  const sidebarTitle = data?.sidebarTitle || fallback.sidebarTitle;
  const sidebarDescription =
    data?.sidebarDescription || fallback.sidebarDescription;
  const googleMapsUrl = data?.googleMapsUrl || fallback.googleMapsUrl;
  const bgSrc = data?.backgroundImage
    ? urlFor(data.backgroundImage).width(1920).quality(75).url()
    : "/img/inner-page-compo.jpg";
  const sidebarBgSrc = data?.sidebarBackgroundImage
    ? urlFor(data.sidebarBackgroundImage).width(600).quality(75).url()
    : "/img/leaves-vertical.jpg";
  const mainImageSrc = data?.mainImage
    ? urlFor(data.mainImage).width(800).quality(75).url()
    : null;

  return (
    <section className="relative lg:h-screen pt-10 lg:pt-0">
      <Image
        src={bgSrc}
        alt="Beautiful landscape with blue sky with leaves illustration"
        fill
        className="object-cover"
        priority
      />

      <Container className="relative z-20 h-full">
        <div className="flex flex-col lg:h-full lg:flex-row lg:gap-24">
          <div className="flex flex-col gap-8 px-4 py-8 lg:flex-1 lg:px-0 lg:py-[12vh]">
            <div>
              <h1 className="h3">{title}</h1>
              <p className=" mb-4 font-semibold">
                {leadText}
              </p>
              <p className="">{contentText}</p>
            </div>
            {mainImageSrc && (
              <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:flex-1">
                <Image
                  src={mainImageSrc}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
          <div className="relative flex flex-col justify-end py-8 lg:border lg:border-y-neutral-300 lg:py-[12vh] lg:basis-[27%]">
            <Image
              alt="fawn image"
              className="hidden object-cover lg:block"
              src={sidebarBgSrc}
              fill
            />
            <div className="relative z-20">
              <div className="mb-4 text-center">
                <h4 className="font-ronnia text-besgrow-green text-[max(16px,1.2vw)]">
                  {sidebarTitle}
                </h4>
                <span className="text-besgrow-green">{sidebarDescription}</span>
              </div>
              <div className="h-[50vh] lg:h-[60vh]">
                <iframe
                  src={googleMapsUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutUsPage;
