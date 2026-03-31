import Image from "next/image";
import Container from "@/components/layout/Container";
import { CiMail } from "react-icons/ci";
import IconButton from "@/components/ui/IconButton";
import ProductsSection from "@/components/layout/ProductsSection";
import PortableText from "@/components/PortableText";
import { sanityFetch } from "@/sanity/live";
import { homePageQuery, productCategoriesQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import {
  getLocalizedString,
  getLocalizedText,
  getLocalizedBlockContent,
} from "@/sanity/utils";
import type { LanguageId } from "@/sanity/schemas/languages";
import { setRequestLocale } from "next-intl/server";

// Fallback data
const fallback = {
  heroTitle: "besgrow",
  heroDescription:
    "Besgrow is a young and dynamic company, specialized in the production of high quality growing and landscaping substrates from sustainable, renewable resources",
  heroBackgroundImage: null,
  heroImage: null,
  aboutTitle: "About Besgrow",
  aboutBody: null,
  aboutBackgroundImage: null,
  aboutImage: null,
  partnersTitle: "Find Our Partners Around the World",
  partnersDescription:
    "Our global distributor network brings Besgrow expertise closer to you. From Europe to every corner of the world, our trusted partners ensure local access to our products, knowledge, and support.",
  europeHeading: "Explore Europe at a glance",
  europeDescription:
    "An interactive map highlights our strong European presence—pinpointing distributor locations country by country. Select a location to instantly view full distributor details, including contact information and website access.",
  worldHeading: "Beyond Europe, our reach continues",
  worldDescription:
    "Discover distributors across the Rest of the World through an intuitive global view or an organized country-wise listing—making it easy to connect, wherever you are.",
};

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

const HomePage = async ({ params }: HomePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale as LanguageId;

  const [{ data }, { data: categories }] = await Promise.all([
    sanityFetch({ query: homePageQuery }),
    sanityFetch({ query: productCategoriesQuery }),
  ]);

  const heroTitle = getLocalizedString(
    data?.heroTitle,
    lang,
    fallback.heroTitle,
  );
  const heroDescription = getLocalizedText(
    data?.heroDescription,
    lang,
    fallback.heroDescription,
  );
  const heroBgSrc = data?.heroBackgroundImage
    ? urlFor(data.heroBackgroundImage).width(1920).quality(50).url()
    : "/img/beautiful-landscape-with-blue-sky.jpg";
  const heroImgSrc = data?.heroImage
    ? urlFor(data.heroImage).width(1000).url()
    : "/img/flowers-wrapping-tree-trunk.png";

  // About section
  const aboutBgSrc = data?.aboutBackgroundImage
    ? urlFor(data.aboutBackgroundImage).width(1920).quality(75).url()
    : "/img/about-comp.jpg";
  const aboutImgSrc = data?.aboutImage
    ? urlFor(data.aboutImage).width(800).url()
    : "/img/white-blue-orchid.png";
  const aboutTitle = getLocalizedString(
    data?.aboutTitle,
    lang,
    fallback.aboutTitle,
  );
  const aboutBody = getLocalizedBlockContent(data?.aboutBody, lang);

  // Partners preview section
  const partnersTitle = getLocalizedString(
    data?.partnersTitle,
    lang,
    fallback.partnersTitle,
  );
  const partnersDescription = getLocalizedText(
    data?.partnersDescription,
    lang,
    fallback.partnersDescription,
  );
  const europeHeading = getLocalizedString(
    data?.europeHeading,
    lang,
    fallback.europeHeading,
  );
  const europeDescription = getLocalizedText(
    data?.europeDescription,
    lang,
    fallback.europeDescription,
  );
  const worldHeading = getLocalizedString(
    data?.worldHeading,
    lang,
    fallback.worldHeading,
  );
  const worldDescription = getLocalizedText(
    data?.worldDescription,
    lang,
    fallback.worldDescription,
  );

  return (
    <>
      <section className="relative h-screen">
        <Image
          src={heroBgSrc}
          alt="Beautiful landscape with blue sky"
          fill
          quality={50}
          className="object-cover"
          priority
        />
        <div className="relative z-10 h-full">
          <Container
            className="h-full"
            alignment={{ default: "center", lg: "right" }}
          >
            <div className="grid h-full lg:grid-cols-2 xl:grid-cols-[4fr_3fr]">
              <div className="relative z-10 flex flex-col items-center justify-center text-center lg:items-start lg:text-left">
                <h1 className="h1 after:align-center after:border-besgrow-green relative mb-[1.5vw] flex items-start after:absolute after:top-[50px] after:right-[-30px] after:flex after:size-6 after:justify-center after:rounded-full after:border after:text-[10px] after:leading-[225%] after:content-['TM'] lg:mb-0">
                  {heroTitle}
                </h1>

                <p className="pb-[1.5vw]">{heroDescription}</p>
                <IconButton
                  href="/contact-us"
                  icon={
                    <CiMail
                      className="translate-y-0.5 lg:translate-none lg:text-white"
                      strokeWidth={1}
                    />
                  }
                >
                  Contact Us
                </IconButton>
              </div>
              <div className="absolute inset-0 opacity-30 lg:relative lg:opacity-100">
                <Image
                  src={heroImgSrc}
                  alt="Flowers wrapping tree trunk"
                  fill
                  className="object-cover object-left"
                  priority
                />
              </div>
            </div>
          </Container>
        </div>
      </section>
      <ProductsSection categories={categories} locale={lang} />
      <section className="relative overflow-hidden bg-white">
        <div className="absolute z-10 flex size-full flex-col justify-between bg-white">
          <Image
            fill
            src={aboutBgSrc}
            alt="Texture background"
            quality={75}
            className="object-cover"
          />
        </div>
        <div className="relative z-20">
          <Container
            className="py-[15vw] lg:py-[3vw]"
            alignment={{ default: "center", lg: "left" }}
          >
            <div className="flex flex-col gap-[5vw] lg:flex-row lg:items-center">
              <div>
                <Image
                  className="h-auto w-[40vw] -translate-x-3 lg:translate-none"
                  src={aboutImgSrc}
                  alt="White blue orchid"
                  width={1394}
                  height={1916}
                />
              </div>
              <div>
                <h2 className="h4 mb-[1vw]">{aboutTitle}</h2>
                {aboutBody ? (
                  <PortableText value={aboutBody} />
                ) : (
                  <>
                    <p className="mb-[1vw]">
                      Besgrow is recognized globally as a leader in premium
                      substrates for orchid cultivation—trusted by hobby growers
                      and professional horticulturists alike. Our reputation is
                      built on quality, consistency, and a deep understanding of
                      plant performance.
                    </p>
                    <p className="mb-[1vw]">
                      Innovation drives everything we do. We continuously invest
                      in research and development, exploring the power of
                      micro-organisms and biostimulants to create smarter, more
                      effective solutions. By anticipating market trends and
                      listening closely to our customers, we deliver products
                      that don&apos;t just perform—they elevate growing results.
                    </p>
                    <p>Curious to learn more?</p>
                  </>
                )}
              </div>
            </div>
          </Container>
          <Container className="py-[15vw] lg:py-[3vw]">
            <div className="mb-[5vw] lg:text-center">
              <h2 className="h4 mb-[1vw]">{partnersTitle}</h2>
              <p className="mx-auto lg:max-w-[50vw]">{partnersDescription}</p>
            </div>
            <div className="lg:grid lg:grid-cols-2 lg:gap-[6vw] lg:px-[10vw]">
              <div className="lg:text-center">
                <h2 className="h6 mb-[1vw]">{europeHeading}</h2>
                <p>{europeDescription}</p>
              </div>
              <div className="lg:text-center">
                <h2 className="h6 mb-[1vw]">{worldHeading}</h2>
                <p>{worldDescription}</p>
              </div>
            </div>
          </Container>
          <Image
            className="absolute right-[-40px] bottom-0 h-[30vh] w-auto lg:right-0 lg:h-[40vh]"
            src="/img/white-orchid.png"
            alt="White blue orchid"
            width={815}
            height={1222}
          />
        </div>
      </section>
    </>
  );
};

export default HomePage;
