"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/navigation";
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
import DistributorsMobileSheet from "@/components/DistributorsMobileSheet";
import RegionToggle from "@/components/RegionToggle";
import type { Region } from "@/components/RegionToggle";
import type { LanguageId } from "@/sanity/schemas/languages";

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
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

// Types for Sanity data (new embedded structure)
export type SanityDistributorEntry = {
  _key: string;
  distributorName: string;
  city: string;
  coordinates?: { lat: number; lng: number };
  googleMapsLink?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
};

export type SanityCountryWithDistributors = {
  _id: string;
  name: string;
  code: string;
  isoNumeric?: string;
  isEurope: boolean;
  serviceAvailable: boolean;
  distributors?: SanityDistributorEntry[];
};

type InternationalizedValue = {
  _key?: string;
  language?: string;
  value: string;
};

export type SanityDistributorsPage = {
  backgroundImage?: any;
  sidebarBackgroundImage?: any;
  title?: InternationalizedValue[];
  description?: InternationalizedValue[];
  bottomNote?: InternationalizedValue[];
  europeTabLabel?: InternationalizedValue[];
  worldTabLabel?: InternationalizedValue[];
  europeSidebarHeading?: InternationalizedValue[];
  worldSidebarHeading?: InternationalizedValue[];
  sidebarSubtext?: InternationalizedValue[];
};

function getLocalizedValue(
  field: InternationalizedValue[] | undefined,
  locale: LanguageId,
  fallback: string = "",
): string {
  if (!field || !Array.isArray(field)) return fallback;
  const localized = field.find(
    (item) => item._key === locale || item.language === locale,
  );
  if (localized?.value) return localized.value;
  const english = field.find(
    (item) => item._key === "en" || item.language === "en",
  );
  return english?.value || fallback;
}

// Build lookup maps from Sanity country data
// This ensures all countries with serviceAvailable have their ISO code for map highlighting
function buildCountryCoordinates(countries: SanityCountryWithDistributors[]) {
  const coords: Record<
    string,
    { iso: string; coordinates: [number, number]; zoom: number }
  > = {};
  for (const country of countries) {
    if (!coords[country.name] && country.isoNumeric) {
      // Get first distributor's coordinates as country center, or use default
      const firstDistWithCoords = country.distributors?.find(
        (d) => d.coordinates,
      );
      const defaultCoords: [number, number] = firstDistWithCoords?.coordinates
        ? [
            firstDistWithCoords.coordinates.lng,
            firstDistWithCoords.coordinates.lat,
          ]
        : [0, 0]; // Fallback - map will still highlight the country

      coords[country.name] = {
        iso: country.isoNumeric,
        coordinates: defaultCoords,
        zoom: 6,
      };
    }
  }
  return coords;
}

function buildCityCoordinates(countries: SanityCountryWithDistributors[]) {
  const coords: Record<string, [number, number]> = {};
  for (const country of countries) {
    for (const dist of country.distributors || []) {
      if (dist.coordinates && !coords[dist.city]) {
        coords[dist.city] = [dist.coordinates.lng, dist.coordinates.lat];
      }
    }
  }
  return coords;
}

interface DistributorsClientProps {
  pageData: SanityDistributorsPage | null;
  countries: SanityCountryWithDistributors[];
  locale: LanguageId;
}

const DistributorsClient = ({
  pageData,
  countries,
  locale,
}: DistributorsClientProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Read region from URL search params, default to "europe"
  const regionParam = searchParams.get("region");
  const region: Region =
    regionParam === "rest-of-the-world" ? "rest-of-the-world" : "europe";
  // Map to internal "europe" | "world" for filtering
  const isEuropeRegion = region === "europe";

  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  const setRegion = (newRegion: Region) => {
    router.push(`${pathname}?region=${newRegion}`);
  };

  // Separate countries by region
  const europeCountries = countries.filter((c) => c.isEurope);
  const restOfWorldCountries = countries.filter((c) => !c.isEurope);

  const currentCountries = isEuropeRegion
    ? europeCountries
    : restOfWorldCountries;

  // Build coordinate lookup maps from Sanity data
  const countryCoordinates = buildCountryCoordinates(countries);
  const cityCoordinates = buildCityCoordinates(countries);

  useEffect(() => {
    if (isEuropeRegion) {
      setActiveCountry(europeCountries[0]?.name ?? null);
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
    coordinates?: { lat: number; lng: number };
  };

  // Flatten distributors from current countries
  const flatDistributors: FlatDistributor[] = currentCountries.flatMap(
    (country) =>
      (country.distributors || []).map((d) => ({
        distributorName: d.distributorName,
        countryName: country.name,
        city: d.city,
        address: d.address || "",
        phone: d.phone || "",
        email: d.email || "",
        website: d.website || "",
        coordinates: d.coordinates,
      })),
  );

  const [nearestDistributor, setNearestDistributor] =
    useState<FlatDistributor | null>(null);
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

          // Flatten all distributors from all countries
          const allFlat = countries.flatMap((country) =>
            (country.distributors || []).map((d) => ({
              flat: {
                distributorName: d.distributorName,
                countryName: country.name,
                city: d.city,
                address: d.address || "",
                phone: d.phone || "",
                email: d.email || "",
                website: d.website || "",
                coordinates: d.coordinates,
              },
              coords: d.coordinates,
              isEurope: country.isEurope,
            })),
          );

          for (const item of allFlat) {
            if (item.coords) {
              const distance = calculateDistance(
                latitude,
                longitude,
                item.coords.lat,
                item.coords.lng,
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
            setRegion(closestIsEurope ? "europe" : "rest-of-the-world");
            setActiveCountry(closest.countryName);
          }
        },
        () => {
          setLocationError(
            "Unable to access location. Please check browser permissions.",
          );
          setFindingLocation(false);
        },
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

  // Page-level fallbacks with localization
  const title = getLocalizedValue(pageData?.title, locale, "Our Distributors");
  const description = getLocalizedValue(
    pageData?.description,
    locale,
    "Our global distributor network brings Besgrow expertise closer to you. From Europe to every corner of the world, our trusted partners ensure local access to our products.",
  );
  const bottomNote = getLocalizedValue(
    pageData?.bottomNote,
    locale,
    "Every distributor profile is kept accurate and up to date, powered directly by our content system, so you always have the latest information at your fingertips.",
  );
  const europeTabLabel = getLocalizedValue(
    pageData?.europeTabLabel,
    locale,
    "Europe",
  );
  const worldTabLabel = getLocalizedValue(
    pageData?.worldTabLabel,
    locale,
    "Rest of the world",
  );
  const europeSidebarHeading = getLocalizedValue(
    pageData?.europeSidebarHeading,
    locale,
    "European Locations",
  );
  const worldSidebarHeading = getLocalizedValue(
    pageData?.worldSidebarHeading,
    locale,
    "Around the World Locations",
  );
  const sidebarSubtext = getLocalizedValue(
    pageData?.sidebarSubtext,
    locale,
    "Find our offices and get in touch with our local teams",
  );

  const bgSrc = pageData?.backgroundImage
    ? urlFor(pageData.backgroundImage).width(1920).quality(50).url()
    : "/img/inner-page-compo.jpg";
  const sidebarBgSrc = pageData?.sidebarBackgroundImage
    ? urlFor(pageData.sidebarBackgroundImage).width(800).url()
    : "/img/leaves-vertical.jpg";

  return (
    <section className="relative pt-10 lg:pt-0 min-h-screen overflow-x-clip lg:h-screen">
      <Image
        src={bgSrc}
        alt="Beautiful landscape with blue sky with leaves illustration"
        fill
        className="object-cover"
        priority
      />
      <Container className="relative z-20 h-full">
        <div className="flex h-full flex-col lg:flex-row lg:gap-24">
          <div className="flex flex-1 flex-col gap-4 px-4 py-8 pb-24 lg:px-0 lg:pt-[12vh] lg:pb-[6vh]">
            <div className="fade-in">
              <h1 className="h3">{title}</h1>
              <p className="mb-4 font-semibold text-neutral-700">
                {description}
              </p>
            </div>
            <div className="fade-in fade-delay-1 relative h-[50vh] overflow-hidden bg-transparent lg:h-auto lg:flex-1">
              <DistributorMap
                region={isEuropeRegion ? "europe" : "world"}
                activeCountry={activeCountry}
                highlightedCountries={currentCountries.map((c) => c.name)}
                distributorCities={currentCountries.flatMap((country) =>
                  (country.distributors || [])
                    .filter((d) => d.coordinates)
                    .map((d) => ({
                      city: d.city,
                      country: country.name,
                    })),
                )}
                onCountryClick={(country) => {
                  setActiveCountry(country);
                  // Auto-open mobile sheet when a country is clicked on the map
                  setMobileSheetOpen(true);
                }}
                countryCoordinatesMap={countryCoordinates}
                cityCoordinatesMap={cityCoordinates}
              />
            </div>
            <div className="animate-fade-up animate-delay-2 hidden px-12 text-center text-sm text-neutral-500 lg:block">
              {bottomNote}
            </div>
          </div>
          {/* Desktop Sidebar - hidden on mobile */}
          <div className="relative hidden basis-[30%] flex-col border-x border-neutral-300 px-4 pt-[12vh] pb-[4vh] lg:flex">
            <Image
              alt="fawn image"
              className="object-cover"
              src={sidebarBgSrc}
              fill
            />
            <div className="fade-in-right relative z-20 flex h-full flex-col overflow-hidden">
              {/* Toggle Pill */}
              <div className="mb-4 flex shrink-0 justify-center">
                <RegionToggle
                  currentRegion={region}
                  europeLabel={europeTabLabel}
                  worldLabel={worldTabLabel}
                />
              </div>

              {/* Heading */}
              <div className="mb-4 shrink-0 text-center text-[#184E14]">
                <h4 className="font-ronnia text-[max(16px,1.2vw)] font-semibold">
                  {isEuropeRegion ? europeSidebarHeading : worldSidebarHeading}
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
                    className="border-besgrow-green text-besgrow-green hover:bg-besgrow-green flex w-full items-center justify-center gap-2 rounded-full border-2 bg-neutral-50 px-4 py-2 text-sm font-semibold transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-60"
                  >
                    <MapPin className="size-4" />
                    {findingLocation
                      ? "Locating you..."
                      : "Find my nearest office"}
                  </button>
                ) : (
                  <div className="border-besgrow-green/20 relative rounded-2xl border bg-[#f4f9f2] p-4 shadow-sm">
                    <button
                      onClick={() => setNearestDistributor(null)}
                      className="text-besgrow-green/50 hover:text-besgrow-green absolute top-3 right-3 transition-colors"
                    >
                      <X className="size-4" />
                    </button>
                    <div className="mb-2 flex items-center gap-2">
                      <MapPin className="text-besgrow-green size-4" />
                      <h5 className="text-besgrow-green flex-1 text-sm font-semibold">
                        Nearest to you
                      </h5>
                    </div>
                    <div>
                      <h6 className="font-semibold text-neutral-800">
                        {nearestDistributor.distributorName}
                      </h6>
                      <p className="my-0.5 text-sm text-neutral-600">
                        {nearestDistributor.city},{" "}
                        {nearestDistributor.countryName}
                      </p>
                      <p className="mb-3 text-xs text-neutral-500">
                        {nearestDistributor.address}
                      </p>
                      <div className="flex flex-col gap-1 text-xs">
                        <a
                          href={`mailto:${nearestDistributor.email}`}
                          className="font-medium text-blue-700 hover:underline"
                        >
                          {nearestDistributor.email}
                        </a>
                        <span className="font-medium text-neutral-700">
                          {nearestDistributor.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {locationError && (
                  <p className="mt-2 text-center text-xs font-medium text-red-500">
                    {locationError}
                  </p>
                )}
              </div>

              {/* Accordion */}
              <div className="custom-scrollbar flex-1 overflow-y-auto pb-4 [font-size:clamp(0.75rem,0.85vw,0.875rem)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&_[data-slot=accordion-trigger]]:![font-size:clamp(0.85rem,0.95vw,1rem)] [&_[data-slot=accordion-content]]:![font-size:inherit]">
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
                                <h5 className="text-besgrow-green mb-2 px-4 font-semibold">
                                  {dist.distributorName}
                                </h5>
                                <table className="w-full">
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
                                          href={
                                            dist.website?.startsWith("http")
                                              ? dist.website
                                              : `https://${dist.website}`
                                          }
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

        {/* Mobile Bottom Sheet */}
        <DistributorsMobileSheet
          region={isEuropeRegion ? "europe" : "world"}
          setRegion={(r) =>
            setRegion(r === "europe" ? "europe" : "rest-of-the-world")
          }
          activeCountry={activeCountry}
          setActiveCountry={setActiveCountry}
          groupedDistributors={groupedDistributors}
          europeTabLabel={europeTabLabel}
          worldTabLabel={worldTabLabel}
          europeSidebarHeading={europeSidebarHeading}
          worldSidebarHeading={worldSidebarHeading}
          sidebarSubtext={sidebarSubtext}
          nearestDistributor={nearestDistributor}
          setNearestDistributor={setNearestDistributor}
          findingLocation={findingLocation}
          locationError={locationError}
          handleFindNearest={handleFindNearest}
          isOpen={mobileSheetOpen}
          setIsOpen={setMobileSheetOpen}
        />
      </Container>
    </section>
  );
};

export default DistributorsClient;
