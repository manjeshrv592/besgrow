"use client";

import { useState, useRef, useEffect } from "react";
import Container from "@/components/layout/Container";
import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import DistributorMap from "@/components/DistributorMap";

const europeDistributors = [
  {
    country: "Netherlands",
    city: "Dalfsen",
    address: "De Vesting 26-A, 7722 GA",
    phone: "+31 (0)321-745748",
    email: "info@besgrow-europe.com",
    website: "www.besgrow-europe.com",
  },
  {
    country: "Germany",
    city: "Hamburg",
    address: "Hafenstraße 42, 20457",
    phone: "+49 40 123 4567",
    email: "info@besgrow-de.com",
    website: "www.besgrow-de.com",
  },
  {
    country: "France",
    city: "Lyon",
    address: "Rue de la République 15, 69001",
    phone: "+33 4 72 00 1234",
    email: "info@besgrow-fr.com",
    website: "www.besgrow-fr.com",
  },
  {
    country: "Spain",
    city: "Valencia",
    address: "Calle de Colón 28, 46004",
    phone: "+34 96 351 2345",
    email: "info@besgrow-es.com",
    website: "www.besgrow-es.com",
  },
  {
    country: "Poland",
    city: "Warsaw",
    address: "ul. Marszałkowska 10, 00-001",
    phone: "+48 22 123 4567",
    email: "info@besgrow-pl.com",
    website: "www.besgrow-pl.com",
  },
];

const restOfWorldDistributors = [
  {
    country: "China",
    city: "Beijing",
    address: "Example Street 11, 2101 CB",
    phone: "+11 90 864 6792",
    email: "info.ch@example.com",
    website: "www.example.ch",
  },

  {
    country: "Argentina",
    city: "Buenos Aires",
    address: "Av. Corrientes 1250, C1043",
    phone: "+54 11 4321 5678",
    email: "info@besgrow-ar.com",
    website: "www.besgrow-ar.com",
  },
  {
    country: "United States of America",
    city: "Portland",
    address: "1234 NW Flanders St, OR 97209",
    phone: "+1 503 555 0123",
    email: "info@besgrow-us.com",
    website: "www.besgrow-us.com",
  },
  {
    country: "Brazil",
    city: "São Paulo",
    address: "Rua Augusta 1508, 01304-001",
    phone: "+55 11 3456 7890",
    email: "info@besgrow-br.com",
    website: "www.besgrow-br.com",
  },
  {
    country: "South Africa",
    city: "Cape Town",
    address: "12 Long Street, Cape Town 8001",
    phone: "+27 21 423 5678",
    email: "info@besgrow-za.com",
    website: "www.besgrow-za.com",
  },
  {
    country: "India",
    city: "Mumbai",
    address: "Bandra Kurla Complex, 400051",
    phone: "+91 22 6789 0123",
    email: "info@besgrow-in.com",
    website: "www.besgrow-in.com",
  },

  {
    country: "Australia",
    city: "Melbourne",
    address: "123 Collins Street, VIC 3000",
    phone: "+61 3 9876 5432",
    email: "info@besgrow-au.com",
    website: "www.besgrow-au.com",
  },
];

const DistributorsPage = () => {
  const [region, setRegion] = useState<"europe" | "world">("europe");
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const europeRef = useRef<HTMLButtonElement>(null);
  const worldRef = useRef<HTMLButtonElement>(null);
  const [pillStyle, setPillStyle] = useState({ width: 0, left: 0 });

  useEffect(() => {
    const activeRef = region === "europe" ? europeRef : worldRef;
    if (activeRef.current) {
      setPillStyle({
        width: activeRef.current.offsetWidth,
        left: activeRef.current.offsetLeft,
      });
    }
    if (region === "europe") {
      setActiveCountry(europeDistributors[0]?.country ?? null);
    } else {
      setActiveCountry(null);
    }
  }, [region]);

  const distributors =
    region === "europe" ? europeDistributors : restOfWorldDistributors;

  return (
    <section className="h-screen">
      <Image
        src="/img/beautiful-landscape-with-blue-sky.jpg"
        alt="Beautiful landscape with blue sky"
        fill
        quality={75}
        className="object-cover"
        priority
      />
      <Image
        src="/img/growscape.png"
        alt="Branches illustrations"
        height={500}
        width={2000}
        quality={75}
        className="absolute bottom-0 h-[600px] w-full object-cover object-top"
        priority
      />
      <Container className="relative z-20 h-full">
        <div className="flex h-full gap-24">
          <div className="flex flex-1 flex-col gap-4 pt-[12vh] pb-[6vh]">
            <div>
              <h1 className="h3">Our Distributors</h1>
              <p className="text-besgrow-green mb-4 font-semibold">
                Our global distributor network brings Besgrow expertise closer
                to you. From Europe to every corner of the world, our trusted
                partners ensure local access to our products.
              </p>
            </div>
            <div className="relative flex-1 overflow-hidden bg-transparent">
              <DistributorMap
                region={region}
                activeCountry={activeCountry}
                highlightedCountries={distributors.map((d) => d.country)}
                onCountryClick={(country) => setActiveCountry(country)}
              />
            </div>
            <div className="text-besgrow-green px-12 text-center text-sm">
              Every distributor profile is kept accurate and up to date, powered
              directly by our content system, so you always have the latest
              information at your fingertips.
            </div>
          </div>
          <div className="relative flex basis-[27%] flex-col border-x border-neutral-300 px-4 py-[12vh]">
            <Image
              alt="fawn image"
              className="object-cover"
              src="/img/leaves-vertical.jpg"
              fill
            />
            <div className="relative z-20">
              {/* Toggle Pill */}
              <div className="mb-4 flex justify-center">
                <div className="border-besgrow-green relative inline-flex rounded-full border-2 bg-white">
                  {/* Sliding highlighter */}
                  <span
                    className="bg-besgrow-green absolute top-0 h-full rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: pillStyle.width, left: pillStyle.left }}
                  />
                  <button
                    ref={europeRef}
                    onClick={() => setRegion("europe")}
                    className={`relative z-10 cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
                      region === "europe" ? "text-white" : "text-besgrow-green"
                    }`}
                  >
                    Europe
                  </button>
                  <button
                    ref={worldRef}
                    onClick={() => setRegion("world")}
                    className={`relative z-10 cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
                      region === "world" ? "text-white" : "text-besgrow-green"
                    }`}
                  >
                    Rest of the world
                  </button>
                </div>
              </div>

              {/* Heading */}
              <div className="mb-4 text-center text-[#184E14]">
                <h4 className="font-ronnia text-[max(16px,1.2vw)] font-semibold">
                  {region === "europe"
                    ? "European Locations"
                    : "Around the World Locations"}
                </h4>
                <span className="text-sm text-neutral-600">
                  Find our offices and get in touch with our local teams
                </span>
              </div>

              {/* Accordion */}
              <Accordion
                type="single"
                collapsible
                value={activeCountry ?? undefined}
                onValueChange={(value) => setActiveCountry(value || null)}
                className="flex flex-col gap-3 border-none"
              >
                {distributors.map((dist) => (
                  <AccordionItem
                    key={dist.country}
                    value={dist.country}
                    className="cursor-pointer rounded-lg border-none bg-white"
                  >
                    <AccordionTrigger className="rounded-none px-4 py-3 hover:no-underline">
                      {dist.country}
                    </AccordionTrigger>
                    <AccordionContent>
                      <table className="w-full text-sm">
                        <tbody className="text-neutral-700">
                          <tr>
                            <td className="py-1 pr-4 text-neutral-500">City</td>
                            <td className="py-1 font-semibold">{dist.city}</td>
                          </tr>
                          <tr>
                            <td className="py-1 pr-4 text-neutral-500">
                              Address
                            </td>
                            <td className="py-1 font-semibold">
                              {dist.address}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-1 pr-4 text-neutral-500">
                              Phone
                            </td>
                            <td className="py-1 font-semibold">{dist.phone}</td>
                          </tr>
                          <tr>
                            <td className="py-1 pr-4 text-neutral-500">
                              Email
                            </td>
                            <td className="py-1 font-semibold text-blue-700">
                              <a href={`mailto:${dist.email}`}>{dist.email}</a>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-1 pr-4 text-neutral-500">
                              Website
                            </td>
                            <td className="py-1 font-semibold text-blue-700">
                              <a
                                href={`https://${dist.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {dist.website}
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DistributorsPage;
