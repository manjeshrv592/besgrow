import Container from "@/components/layout/Container";
import IconButton from "@/components/ui/IconButton";
import Image from "next/image";
import { CiMail } from "react-icons/ci";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const productCategories = [
  {
    title: "Sphagnum Moss",
    items: [
      "New Zealand Spagmoss",
      "Argentinian Sphagnum Moss",
      "Chilean Sphagnum Moss",
    ],
  },
  {
    title: "Orchid Bark",
    items: ["Premium Orchid Bark", "Fine Grade Bark", "Coarse Grade Bark"],
  },

  {
    title: "Fernwood",
    items: ["Fernwood Tree Fern Fibre", "Fernwood Chunks", "Fernwood Panels"],
  },
  {
    title: "Grand Akad Ama",
    items: ["Akadama Fine", "Akadama Medium", "Akadama Coarse"],
  },
  {
    title: "Bulk Items",
    items: ["Bulk Sphagnum Moss", "Bulk Orchid Bark", "Bulk Perlite"],
  },
  {
    title: "Other",
    items: ["Perlite", "Charcoal", "Coconut Husk Chips", "Pumice"],
  },
];

const ProductsPage = () => {
  return (
    <section className="relative">
      <Image
        src="/img/beautiful-landscape-with-blue-sky.jpg"
        alt="Beautiful landscape with blue sky"
        fill
        quality={50}
        className="object-cover"
        priority
      />
      <Image
        src="/img/growscape.png"
        alt="Branches illustrations"
        fill
        quality={50}
        className="absolute bottom-0 object-contain object-bottom"
        priority
      />
      <Container className="relative z-20 h-full">
        <div className="flex h-full gap-24">
          <div className="flex flex-1 flex-col gap-8 py-[12vh]">
            <div className="relative mb-8 flex gap-10">
              <div>
                <h1 className="h3">New Zealand Spagmoss</h1>
                <p className="text-besgrow-green mb-4 font-semibold">
                  Besgrow produces a wide range of premium quality Spagmoss
                  products from New Zealand Sphagnum moss.
                </p>
                <p className="text-besgrow-green mb-8">
                  Renowned for its long robust strands, Spagmoss provides
                  outstanding natural hydration for propagation, landscaping and
                  decorative applications. Besgrow Spagmoss is available in many
                  different grades, as well as specialized products to suit
                  specific requirements.
                </p>
                <h4 className="text-besgrow-green mb-2 text-[max(16px,1.2vw)] font-bold">
                  Applications
                </h4>
                <div className="text-besgrow-green mb-8 grid grid-cols-2 gap-4">
                  <div className="flex gap-2">
                    <span className="text-besgrow-green/50">01</span>
                    <p>
                      For propagation, especially the cultivation of various
                      orchid species
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-besgrow-green/50">02</span>
                    <p>
                      As an additive to increase water holding in other
                      substrates
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-besgrow-green/50">03</span>
                    <p>As a decorative enhancement</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-besgrow-green/50">04</span>
                    <p>In the floristry industry</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-besgrow-green/50">05</span>
                    <p>By carnivorous plant growers</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-besgrow-green/50">06</span>
                    <p>For reptile bedding</p>
                  </div>
                </div>
              </div>
              <div className="absolute right-0 bottom-0">
                <Image
                  alt="product image"
                  width={676}
                  height={582}
                  className="h-auto w-42 translate-y-12"
                  src={"/img/circle-flower.png"}
                />
              </div>
            </div>
            <div>
              <h4 className="h6">Our Collections</h4>
              <h4 className="text-besgrow-green text-[max(16px,1.2vw)] font-bold">
                Blended Grade
              </h4>
              <div className="text-besgrow-green grid grid-cols-2 gap-8">
                <div>
                  <p>Spagmoss Blended - Compressed 3 Kg.</p>
                  <div className="my-8">
                    <IconButton
                      className="text-center"
                      type="submit"
                      icon={
                        <CiMail
                          className="translate-y-0.5 text-white"
                          strokeWidth={1}
                        />
                      }
                    >
                      Download Brochure
                    </IconButton>
                  </div>
                  <h4 className="text-besgrow-green text-[max(16px,1.2vw)] font-bold">
                    Premier Grade
                  </h4>
                  <ul>
                    <li>Spagmoss Premier Strand - 100 Gr.</li>
                    <li>Spagmoss Premier - Compressed 150 Gr.</li>
                    <li>Spagmoss Premier - Compressed 500 Gr.</li>
                    <li>Spagmoss Premier - Compressed 1 Kg.</li>
                  </ul>
                </div>
                <div>
                  <div className="mb-2">
                    <h4 className="text-besgrow-green text-[max(16px,1.2vw)] font-bold">
                      Classic Grade
                    </h4>
                    <ul>
                      <li>Spagmoss Classic - Super Compressed 100 Gr.</li>
                      <li>Spagmoss Classic - Compressed 150 Gr.</li>
                      <li>Spagmoss Classic - Compressed 500 Gr.</li>
                      <li>Spagmoss Classic - Compressed 1 Kg.</li>
                      <li>Spagmoss Classic - Super Compressed 3 Kg.</li>
                      <li>Spagmoss Classic - Compressed 5 Kg.</li>
                    </ul>
                  </div>
                  <div className="mb-2">
                    <h4 className="text-besgrow-green text-[max(16px,1.2vw)] font-bold">
                      Supreme Grade
                    </h4>
                    <ul>
                      <li>Spagmoss Supreme - Compressed 1 Kg.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-besgrow-green text-[max(16px,1.2vw)] font-bold">
                      Ultimate Grade
                    </h4>
                    <ul>
                      <li>Spagmoss Ultimate - Compressed 1 Kg.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex basis-[27%] flex-col border-x border-neutral-300 px-4 py-[12vh]">
            <Image
              alt="fawn image"
              className="object-cover"
              src="/img/products-bg.jpg"
              fill
            />
            <div className="relative z-20">
              <div className="mb-4 text-center text-white">
                <h4 className="font-ronnia text-[max(16px,1.2vw)]">
                  Product Catalog
                </h4>
                <span className="">
                  Browse our premium selection of horticultural products
                </span>
              </div>
              <Accordion
                type="single"
                collapsible
                defaultValue="Sphagnum Moss"
                className="flex flex-col gap-3 border-none"
              >
                {productCategories.map((category) =>
                  category.items.length > 0 ? (
                    <AccordionItem
                      key={category.title}
                      value={category.title}
                      className="cursor-pointer rounded-lg border-none bg-white"
                    >
                      <AccordionTrigger className="rounded-none px-4 py-3 hover:no-underline">
                        {category.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="flex flex-col">
                          {category.items.map((item, i) => (
                            <li
                              key={i}
                              className="hover:bg-muted cursor-pointer rounded-lg px-2 py-2 text-neutral-700 transition-colors"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ) : (
                    <div
                      key={category.title}
                      className="text-besgrow-green cursor-pointer rounded-xl bg-white px-4 py-3 text-base font-bold"
                    >
                      {category.title}
                    </div>
                  ),
                )}
              </Accordion>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProductsPage;
