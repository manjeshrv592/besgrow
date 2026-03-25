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
import { MapPin, X } from "lucide-react";
import { urlFor } from "@/sanity/image";

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Types for Sanity data
export type SanityDistributor = {
  _id: string;
  distributorName: string;
  city: string;
  cityCoordinates?: { lng: number; lat: number };
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  country: {
    _id: string;
    name: string;
    code: string;
    isoNumeric?: string;
    region: "europe" | "restOfWorld";
    mapCoordinates?: { lng: number; lat: number };
    mapZoom?: number;
  };
};

export type SanityDistributorsPage = {
  backgroundImage?: any;
  sidebarBackgroundImage?: any;
  title?: string;
  description?: string;
  bottomNote?: string;
  europeTabLabel?: string;
  worldTabLabel?: string;
  europeSidebarHeading?: string;
  worldSidebarHeading?: string;
  sidebarSubtext?: string;
};

// Build lookup maps from Sanity country data
function buildCountryCoordinates(distributors: SanityDistributor[]) {
  const coords: Record<string, { iso: string; coordinates: [number, number]; zoom: number }> = {};
  for (const dist of distributors) {
    const c = dist.country;
    if (c && c.mapCoordinates && !coords[c.name]) {
      coords[c.name] = {
        iso: c.isoNumeric || "",
        coordinates: [c.mapCoordinates.lng, c.mapCoordinates.lat],
        zoom: c.mapZoom || 4,
      };
    }
  }
  return coords;
}

function buildCityCoordinates(distributors: SanityDistributor[]) {
  const coords: Record<string, [number, number]> = {};
  for (const dist of distributors) {
    if (dist.cityCoordinates && !coords[dist.city]) {
      coords[dist.city] = [dist.cityCoordinates.lng, dist.cityCoordinates.lat];
    }
  }
  return coords;
}

interface DistributorsClientProps {
  pageData: SanityDistributorsPage | null;
  distributors: SanityDistributor[];
}

const DistributorsClient = ({ pageData, distributors }: DistributorsClientProps) => {
  const [region, setRegion] = useState<"europe" | "world">("europe");
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const europeRef = useRef<HTMLButtonElement>(null);
  const worldRef = useRef<HTMLButtonElement>(null);
  const [pillStyle, setPillStyle] = useState({ width: 0, left: 0 });

  // Separate distributors by region
  const europeDistributors = distributors.filter(
    (d) => d.country?.region === "europe"
  );
  const restOfWorldDistributors = distributors.filter(
    (d) => d.country?.region === "restOfWorld"
  );

  const currentDistributors = region === "europe" ? europeDistributors : restOfWorldDistributors;

  // Build coordinate lookup maps from Sanity data
  const countryCoordinates = buildCountryCoordinates(distributors);
  const cityCoordinates = buildCityCoordinates(distributors);

  useEffect(() => {
    const activeRef = region === "europe" ? europeRef : worldRef;
    if (activeRef.current) {
      setPillStyle({
        width: activeRef.current.offsetWidth,
        left: activeRef.current.offsetLeft,
      });
    }
    if (region === "europe") {
      setActiveCountry(europeDistributors[0]?.country?.name ?? null);
    } else {
      setActiveCountry(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region]);

  type FlatDistributor = {
    distributorName: string;
    countryName: string;
    city: string;
    address: string;
    phone: string;
    email: string;
    website: string;
  };

  const flatDistributors: FlatDistributor[] = currentDistributors.map((d) => ({
    distributorName: d.distributorName,
    countryName: d.country?.name || "",
    city: d.city,
    address: d.address || "",
    phone: d.phone || "",
    email: d.email || "",
    website: d.website || "",
  }));

  const [nearestDistributor, setNearestDistributor] = useState<FlatDistributor | null>(null);
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
          let closest: FlatDistributor | null = null;
          let closestIsEurope = false;

          const allFlat = distributors.map((d) => ({
            flat: {
              distributorName: d.distributorName,
              countryName: d.country?.name || "",
              city: d.city,
              address: d.address || "",
              phone: d.phone || "",
              email: d.email || "",
              website: d.website || "",
            },
            coords: d.cityCoordinates,
            isEurope: d.country?.region === "europe",
          }));

          for (const item of allFlat) {
            if (item.coords) {
              const distance = calculateDistance(
                latitude,
                longitude,
                item.coords.lat,
                item.coords.lng
              );
              if (distance < minDistance) {
                minDistance = distance;
                closest = item.flat;
                closestIsEurope = item.isEurope;
              }
            }
          }

          setFindingLocation(false);
          if (closest) {
            setNearestDistributor(closest);
            setRegion(closestIsEurope ? "europe" : "world");
            setActiveCountry(closest.countryName);
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

  const groupedDistributors = flatDistributors.reduce(
    (acc, dist) => {
      if (!acc[dist.countryName]) {
        acc[dist.countryName] = [];
      }
      acc[dist.countryName].push(dist);
      return acc;
    },
    {} as Record<string, FlatDistributor[]>,
  );

  // Page-level fallbacks
  const title = pageData?.title || "Our Distributors";
  const description =
    pageData?.description ||
    "Our global distributor network brings Besgrow expertise closer to you. From Europe to every corner of the world, our trusted partners ensure local access to our products.";
  const bottomNote =
    pageData?.bottomNote ||
    "Every distributor profile is kept accurate and up to date, powered directly by our content system, so you always have the latest information at your fingertips.";
  const europeTabLabel = pageData?.europeTabLabel || "Europe";
  const worldTabLabel = pageData?.worldTabLabel || "Rest of the world";
  const europeSidebarHeading = pageData?.europeSidebarHeading || "European Locations";
  const worldSidebarHeading = pageData?.worldSidebarHeading || "Around the World Locations";
  const sidebarSubtext =
    pageData?.sidebarSubtext || "Find our offices and get in touch with our local teams";

  const bgSrc = pageData?.backgroundImage
    ? urlFor(pageData.backgroundImage).width(1920).quality(50).url()
    : "/img/inner-page-compo.jpg";
  const sidebarBgSrc = pageData?.sidebarBackgroundImage
    ? urlFor(pageData.sidebarBackgroundImage).width(800).url()
    : "/img/leaves-vertical.jpg";

  return (
    <section className="h-screen">
      <Image
        src={bgSrc}
        alt="Beautiful landscape with blue sky with leaves illustration"
        fill
        className="object-cover"
        priority
      />
      <Container className="relative z-20 h-full">
        <div className="flex h-full gap-24">
          <div className="flex flex-1 flex-col gap-4 pt-[12vh] pb-[6vh]">
            <div>
              <h1 className="h3">{title}</h1>
              <p className="mb-4 font-semibold text-neutral-700">
                {description}
              </p>
            </div>
            <div className="relative flex-1 overflow-hidden bg-transparent">
              <DistributorMap
                region={region}
                activeCountry={activeCountry}
                highlightedCountries={currentDistributors.map((d) => d.country?.name).filter(Boolean)}
                distributorCities={currentDistributors
                  .filter((d) => d.cityCoordinates)
                  .map((d) => ({
                    city: d.city,
                    country: d.country?.name || "",
                  }))}
                onCountryClick={(country) => setActiveCountry(country)}
                countryCoordinatesMap={countryCoordinates}
                cityCoordinatesMap={cityCoordinates}
              />
            </div>
            <div className="px-12 text-center text-sm text-neutral-500">
              {bottomNote}
            </div>
          </div>
          <div className="relative flex basis-[27%] flex-col border-x border-neutral-300 px-4 pt-[12vh] pb-[4vh]">
            <Image
              alt="fawn image"
              className="object-cover"
              src={sidebarBgSrc}
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
                    {europeTabLabel}
                  </button>
                  <button
                    ref={worldRef}
                    onClick={() => setRegion("world")}
                    className={`relative z-10 cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
                      region === "world" ? "text-white" : "text-besgrow-green"
                    }`}
                  >
                    {worldTabLabel}
                  </button>
                </div>
              </div>

              {/* Heading */}
              <div className="mb-4 shrink-0 text-center text-[#184E14]">
                <h4 className="font-ronnia text-[max(16px,1.2vw)] font-semibold">
                  {region === "europe"
                    ? europeSidebarHeading
                    : worldSidebarHeading}
                </h4>
                <span className="text-sm text-neutral-600">
                  {sidebarSubtext}
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
                      <p className="my-0.5 text-sm text-neutral-600">{nearestDistributor.city}, {nearestDistributor.countryName}</p>
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
                                          href={dist.website?.startsWith("http") ? dist.website : `https://${dist.website}`}
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

export default DistributorsClient;
