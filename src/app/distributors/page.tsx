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
import DistributorMap, { cityCoordinates } from "@/components/DistributorMap";
import { MapPin, X } from "lucide-react";

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

const europeDistributors = [
  {
    distributorName: "Amsterdam Office 2",
    country: "Netherlands",
    city: "Dalfsen",
    address: "De Vesting 26-A, 7722 GA",
    phone: "+31 (0)321-745748",
    email: "info@besgrow-europe.com",
    website: "www.besgrow-europe.com",
  },
  {
    distributorName: "Amsterdam Office 1",
    country: "Netherlands",
    city: "Amsterdam",
    address: "Canal Street 10, 1000 AA",
    phone: "+31 (0)20-123456",
    email: "amsterdam@besgrow-europe.com",
    website: "www.besgrow-europe.com",
  },
  {
    distributorName: "Besgrow Germany",
    country: "Germany",
    city: "Hamburg",
    address: "Hafenstraße 42, 20457",
    phone: "+49 40 123 4567",
    email: "info@besgrow-de.com",
    website: "www.besgrow-de.com",
  },
  {
    distributorName: "Besgrow France",
    country: "France",
    city: "Lyon",
    address: "Rue de la République 15, 69001",
    phone: "+33 4 72 00 1234",
    email: "info@besgrow-fr.com",
    website: "www.besgrow-fr.com",
  },
  {
    distributorName: "Besgrow Spain",
    country: "Spain",
    city: "Valencia",
    address: "Calle de Colón 28, 46004",
    phone: "+34 96 351 2345",
    email: "info@besgrow-es.com",
    website: "www.besgrow-es.com",
  },
  {
    distributorName: "Besgrow Poland",
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
    distributorName: "Besgrow China",
    country: "China",
    city: "Beijing",
    address: "Example Street 11, 2101 CB",
    phone: "+11 90 864 6792",
    email: "info.ch@example.com",
    website: "www.example.ch",
  },

  {
    distributorName: "Besgrow Argentina",
    country: "Argentina",
    city: "Buenos Aires",
    address: "Av. Corrientes 1250, C1043",
    phone: "+54 11 4321 5678",
    email: "info@besgrow-ar.com",
    website: "www.besgrow-ar.com",
  },
  {
    distributorName: "Besgrow USA",
    country: "United States of America",
    city: "Portland",
    address: "1234 NW Flanders St, OR 97209",
    phone: "+1 503 555 0123",
    email: "info@besgrow-us.com",
    website: "www.besgrow-us.com",
  },
  {
    distributorName: "Besgrow Brazil",
    country: "Brazil",
    city: "São Paulo",
    address: "Rua Augusta 1508, 01304-001",
    phone: "+55 11 3456 7890",
    email: "info@besgrow-br.com",
    website: "www.besgrow-br.com",
  },
  {
    distributorName: "Besgrow South Africa",
    country: "South Africa",
    city: "Cape Town",
    address: "12 Long Street, Cape Town 8001",
    phone: "+27 21 423 5678",
    email: "info@besgrow-za.com",
    website: "www.besgrow-za.com",
  },
  {
    distributorName: "Besgrow India",
    country: "India",
    city: "Mumbai",
    address: "Bandra Kurla Complex, 400051",
    phone: "+91 22 6789 0123",
    email: "info@besgrow-in.com",
    website: "www.besgrow-in.com",
  },

  {
    distributorName: "Besgrow Australia",
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

  type Distributor = {
    distributorName: string;
    country: string;
    city: string;
    address: string;
    phone: string;
    email: string;
    website: string;
  };

  const distributors = (region === "europe"
    ? europeDistributors
    : restOfWorldDistributors) as Distributor[];

  const [nearestDistributor, setNearestDistributor] = useState<Distributor | null>(null);
  const [findingLocation, setFindingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");

  const handleFindNearest = () => {
    setFindingLocation(true);
    setLocationError("");
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          let minDistance = Infinity;
          let closest: Distributor | null = null;
          
          const allDistributors = [...europeDistributors, ...restOfWorldDistributors];
          for (const dist of allDistributors) {
            const coords = cityCoordinates[dist.city as keyof typeof cityCoordinates];
            if (coords) {
              const [distLon, distLat] = coords;
              const distance = calculateDistance(latitude, longitude, distLat, distLon);
              if (distance < minDistance) {
                minDistance = distance;
                closest = dist as Distributor;
              }
            }
          }
          
          setFindingLocation(false);
          if (closest) {
            setNearestDistributor(closest);
            const isEurope = europeDistributors.some((d) => d.country === closest!.country);
            setRegion(isEurope ? "europe" : "world");
            setActiveCountry(closest.country);
          }
        },
        () => {
          setLocationError("Unable to access location. Please check browser permissions.");
          setFindingLocation(false);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser");
      setFindingLocation(false);
    }
  };

  const groupedDistributors = distributors.reduce(
    (acc, dist) => {
      if (!acc[dist.country]) {
        acc[dist.country] = [];
      }
      acc[dist.country].push(dist);
      return acc;
    },
    {} as Record<string, typeof distributors>,
  );

  return (
    <section className="h-screen">
      <Image
        src="/img/inner-page-compo.jpg"
        alt="Beautiful landscape with blue sky with leaves illustration"
        fill
        className="object-cover"
        priority
      />
      <Container className="relative z-20 h-full">
        <div className="flex h-full gap-24">
          <div className="flex flex-1 flex-col gap-4 pt-[12vh] pb-[6vh]">
            <div>
              <h1 className="h3">Our Distributors</h1>
              <p className="mb-4 font-semibold text-neutral-700">
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
                distributorCities={distributors.map((d) => ({
                  city: d.city,
                  country: d.country,
                }))}
                onCountryClick={(country) => setActiveCountry(country)}
              />
            </div>
            <div className="px-12 text-center text-sm text-neutral-500">
              Every distributor profile is kept accurate and up to date, powered
              directly by our content system, so you always have the latest
              information at your fingertips.
            </div>
          </div>
          <div className="relative flex basis-[27%] flex-col border-x border-neutral-300 px-4 pt-[12vh] pb-[4vh]">
            <Image
              alt="fawn image"
              className="object-cover"
              src="/img/leaves-vertical.jpg"
              fill
            />
            <div className="relative z-20 flex h-full flex-col overflow-hidden">
              {/* Toggle Pill */}
              <div className="mb-4 flex shrink-0 justify-center">
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
              <div className="mb-4 shrink-0 text-center text-[#184E14]">
                <h4 className="font-ronnia text-[max(16px,1.2vw)] font-semibold">
                  {region === "europe"
                    ? "European Locations"
                    : "Around the World Locations"}
                </h4>
                <span className="text-sm text-neutral-600">
                  Find our offices and get in touch with our local teams
                </span>
              </div>

              {/* Nearest Office Feature */}
              <div className="mb-4 shrink-0">
                {!nearestDistributor ? (
                  <button
                    onClick={handleFindNearest}
                    disabled={findingLocation}
                    className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-besgrow-green bg-neutral-50 px-4 py-2 text-sm font-semibold text-besgrow-green transition-colors hover:bg-besgrow-green hover:text-white disabled:pointer-events-none disabled:opacity-60"
                  >
                    <MapPin className="size-4" />
                    {findingLocation ? "Locating you..." : "Find my nearest office"}
                  </button>
                ) : (
                  <div className="relative rounded-2xl border border-besgrow-green/20 bg-[#f4f9f2] p-4 shadow-sm">
                    <button 
                       onClick={() => setNearestDistributor(null)}
                       className="absolute right-3 top-3 text-besgrow-green/50 transition-colors hover:text-besgrow-green"
                    >
                      <X className="size-4" />
                    </button>
                    <div className="mb-2 flex items-center gap-2">
                       <MapPin className="size-4 text-besgrow-green" />
                       <h5 className="flex-1 text-sm font-semibold text-besgrow-green">Nearest to you</h5>
                    </div>
                    <div>
                      <h6 className="font-semibold text-neutral-800">{nearestDistributor.distributorName}</h6>
                      <p className="my-0.5 text-sm text-neutral-600">{nearestDistributor.city}, {nearestDistributor.country}</p>
                      <p className="mb-3 text-xs text-neutral-500">{nearestDistributor.address}</p>
                      <div className="flex flex-col gap-1 text-xs">
                        <a href={`mailto:${nearestDistributor.email}`} className="font-medium text-blue-700 hover:underline">{nearestDistributor.email}</a>
                        <span className="font-medium text-neutral-700">{nearestDistributor.phone}</span>
                      </div>
                    </div>
                  </div>
                )}
                {locationError && <p className="mt-2 text-center text-xs font-medium text-red-500">{locationError}</p>}
              </div>

              {/* Accordion */}
              <div className="custom-scrollbar flex-1 overflow-y-auto pr-2 pb-4">
                <Accordion
                  type="single"
                  collapsible
                  value={activeCountry || ""}
                  onValueChange={(value) => setActiveCountry(value || null)}
                  className="flex flex-col gap-3 border-none"
                >
                  {Object.entries(groupedDistributors).map(
                    ([country, countryDistributors]) => (
                      <AccordionItem
                        key={country}
                        value={country}
                        className="cursor-pointer rounded-lg border-none bg-white"
                      >
                        <AccordionTrigger className="rounded-none px-4 py-3 hover:no-underline">
                          {country}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col gap-4">
                            {countryDistributors.map((dist, idx) => (
                              <div
                                key={idx}
                                className={
                                  idx > 0
                                    ? "border-t border-neutral-200 pt-3"
                                    : ""
                                }
                              >
                                <h5 className="text-besgrow-green mb-2 px-4 text-sm font-semibold">
                                  {dist.distributorName}
                                </h5>
                                <table className="w-full text-xs">
                                  <tbody className="text-neutral-700">
                                    <tr>
                                      <td className="py-1 pr-4 pl-4 text-neutral-500">
                                        City
                                      </td>
                                      <td className="py-1 font-semibold">
                                        {dist.city}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="py-1 pr-4 pl-4 text-neutral-500">
                                        Address
                                      </td>
                                      <td className="py-1 font-semibold">
                                        {dist.address}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="py-1 pr-4 pl-4 text-neutral-500">
                                        Phone
                                      </td>
                                      <td className="py-1 font-semibold">
                                        {dist.phone}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="py-1 pr-4 pl-4 text-neutral-500">
                                        Email
                                      </td>
                                      <td className="py-1 font-semibold text-blue-700">
                                        <a href={`mailto:${dist.email}`}>
                                          {dist.email}
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="py-1 pr-4 pl-4 text-neutral-500">
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
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ),
                  )}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DistributorsPage;
