"use client";

import { useEffect, useRef } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ChevronUp, MapPin, X } from "lucide-react";

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

interface DistributorsMobileSheetProps {
  region: "europe" | "world";
  setRegion: (region: "europe" | "world") => void;
  activeCountry: string | null;
  setActiveCountry: (country: string | null) => void;
  groupedDistributors: Record<string, FlatDistributor[]>;
  europeTabLabel: string;
  worldTabLabel: string;
  europeSidebarHeading: string;
  worldSidebarHeading: string;
  sidebarSubtext: string;
  nearestDistributor: FlatDistributor | null;
  setNearestDistributor: (dist: FlatDistributor | null) => void;
  findingLocation: boolean;
  locationError: string;
  handleFindNearest: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function DistributorsMobileSheet({
  region,
  setRegion,
  activeCountry,
  setActiveCountry,
  groupedDistributors,
  europeTabLabel,
  worldTabLabel,
  europeSidebarHeading,
  worldSidebarHeading,
  sidebarSubtext,
  nearestDistributor,
  setNearestDistributor,
  findingLocation,
  locationError,
  handleFindNearest,
  isOpen,
  setIsOpen,
}: DistributorsMobileSheetProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleCountryClick = (country: string) => {
    setActiveCountry(country === activeCountry ? null : country);
  };

  // Auto-scroll to the active accordion item when the sheet opens or activeCountry changes
  useEffect(() => {
    if (isOpen && activeCountry && scrollContainerRef.current) {
      // Small delay to allow the accordion to expand and sheet to animate
      const timer = setTimeout(() => {
        const accordionItem = scrollContainerRef.current?.querySelector(
          `[data-country="${CSS.escape(activeCountry)}"]`
        );
        if (accordionItem) {
          accordionItem.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen, activeCountry]);

  return (
    <>
      {/* Fixed bottom button */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <div className="border-besgrow-green/50 relative bg-white pt-6 border-t">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-besgrow-green absolute left-1/2 top-0 z-10 flex w-[80%] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-full py-3 text-white"
          >
            <MapPin className="h-4 w-4" />
            <span className="font-semibold">Distributors</span>
            <ChevronUp
              className={`h-5 w-5 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Bottom sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transform bg-white transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "80vh" }}
      >
        {/* Sheet header */}
        <button
          onClick={() => setIsOpen(false)}
          className="bg-besgrow-green flex w-full items-center justify-center gap-2 py-3 text-white"
        >
          <MapPin className="h-4 w-4" />
          <span className="font-semibold">Distributors</span>
          <ChevronUp className="h-5 w-5 rotate-180" />
        </button>

        {/* Content */}
        <div ref={scrollContainerRef} className="overflow-y-auto p-4" style={{ maxHeight: "calc(80vh - 48px)" }}>
          {/* Toggle Pill */}
          <div className="mb-4 flex justify-center">
            <div className="border-besgrow-green relative inline-flex rounded-full border-2 bg-white">
              <button
                onClick={() => setRegion("europe")}
                className={`relative z-10 cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
                  region === "europe" ? "bg-besgrow-green text-white" : "text-besgrow-green"
                }`}
              >
                {europeTabLabel}
              </button>
              <button
                onClick={() => setRegion("world")}
                className={`relative z-10 cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
                  region === "world" ? "bg-besgrow-green text-white" : "text-besgrow-green"
                }`}
              >
                {worldTabLabel}
              </button>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-4 text-center text-[#184E14]">
            <h4 className="font-ronnia text-base font-semibold">
              {region === "europe" ? europeSidebarHeading : worldSidebarHeading}
            </h4>
            <span className="text-sm text-neutral-600">{sidebarSubtext}</span>
          </div>

          {/* Nearest Office Feature */}
          <div className="mb-4">
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
                  <h5 className="flex-1 text-sm font-semibold text-besgrow-green">
                    Nearest to you
                  </h5>
                </div>
                <div>
                  <h6 className="font-semibold text-neutral-800">
                    {nearestDistributor.distributorName}
                  </h6>
                  <p className="my-0.5 text-sm text-neutral-600">
                    {nearestDistributor.city}, {nearestDistributor.countryName}
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
          <Accordion
            type="single"
            collapsible
            value={activeCountry || ""}
            onValueChange={(value) => handleCountryClick(value)}
            className="flex flex-col gap-2 border-none"
          >
            {Object.entries(groupedDistributors).map(
              ([country, countryDistributors]) => (
                <AccordionItem
                  key={country}
                  value={country}
                  data-country={country}
                  className="cursor-pointer rounded-lg border border-neutral-200 bg-white"
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
                            idx > 0 ? "border-t border-neutral-200 pt-3" : ""
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
                                <td className="py-1 font-semibold">{dist.city}</td>
                              </tr>
                              <tr>
                                <td className="py-1 pr-4 pl-4 text-neutral-500">
                                  Address
                                </td>
                                <td className="py-1 font-semibold">{dist.address}</td>
                              </tr>
                              <tr>
                                <td className="py-1 pr-4 pl-4 text-neutral-500">
                                  Phone
                                </td>
                                <td className="py-1 font-semibold">{dist.phone}</td>
                              </tr>
                              <tr>
                                <td className="py-1 pr-4 pl-4 text-neutral-500">
                                  Email
                                </td>
                                <td className="py-1 font-semibold text-blue-700">
                                  <a href={`mailto:${dist.email}`}>{dist.email}</a>
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
              )
            )}
          </Accordion>
        </div>
      </div>
    </>
  );
}
