"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Office } from "@/data/offices";
import { getOfficesByCountry } from "@/data/offices";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

interface OfficeSidebarProps {
  selectedOffice: Office | null;
  onSelectOffice: (office: Office) => void;
  nearestOffice: Office | null;
  onShowNearest: () => void;
  isLocating: boolean;
}

function OfficeCard({
  office,
  isSelected,
  onClick,
}: {
  office: Office;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`rounded-lg p-4 transition-all duration-200 ${
        isSelected
          ? "bg-primary/5 ring-1 ring-primary/20"
          : "hover:bg-muted/50"
      }`}
    >
      <button
        onClick={onClick}
        className="text-left w-full group cursor-pointer"
        type="button"
      >
        <h3
          className={`font-semibold text-sm mb-3 transition-colors ${
            isSelected
              ? "text-green-700"
              : "text-green-600 group-hover:text-green-700"
          }`}
        >
          {office.name}
        </h3>
      </button>

      <div className="space-y-2 text-sm">
        <div className="flex gap-3">
          <span className="text-muted-foreground min-w-[70px] font-medium">City</span>
          <span className="text-foreground">{office.city}</span>
        </div>
        <div className="flex gap-3">
          <span className="text-muted-foreground min-w-[70px] font-medium">Address</span>
          <span className="text-foreground">{office.address}</span>
        </div>
        <div className="flex gap-3">
          <span className="text-muted-foreground min-w-[70px] font-medium">Phone</span>
          <span className="text-foreground">{office.phone}</span>
        </div>
        <div className="flex gap-3">
          <span className="text-muted-foreground min-w-[70px] font-medium">Email</span>
          <a
            href={`mailto:${office.email}`}
            className="text-blue-600 hover:text-blue-800 underline underline-offset-2 break-all"
          >
            {office.email}
          </a>
        </div>
        <div className="flex gap-3">
          <span className="text-muted-foreground min-w-[70px] font-medium">Website</span>
          <a
            href={`https://${office.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline underline-offset-2"
          >
            {office.website}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function OfficeSidebar({
  selectedOffice,
  onSelectOffice,
  nearestOffice,
  onShowNearest,
  isLocating,
}: OfficeSidebarProps) {
  const officesByCountry = getOfficesByCountry();
  const countries = Object.keys(officesByCountry).sort();

  const [openItem, setOpenItem] = React.useState<string | undefined>(undefined);

  // Automatically open the accordion for the selected office's country and scroll to it
  React.useEffect(() => {
    if (selectedOffice) {
      setOpenItem(selectedOffice.country);
      
      // Delay slightly to allow the accordion to open before scrolling
      setTimeout(() => {
        const element = document.getElementById(`accordion-country-${selectedOffice.country}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [selectedOffice]);

  return (
    <div className="flex flex-col h-full">
      {/* Nearest Office Banner */}
      <div className="p-4 border-b bg-linear-to-r from-green-50 to-emerald-50">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-4 w-4 text-green-600" />
          <span className="text-xs font-semibold uppercase tracking-wider text-green-700">
            Nearest Office
          </span>
        </div>
        {isLocating ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-3 w-3 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
            <span>Detecting your location…</span>
          </div>
        ) : nearestOffice ? (
          <div>
            <p className="text-sm font-medium text-foreground">
              {nearestOffice.name}
            </p>
            <p className="text-xs text-muted-foreground mb-2">
              {nearestOffice.city}, {nearestOffice.country}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={onShowNearest}
                className="text-xs font-medium text-green-700 hover:text-green-900 underline underline-offset-2 transition-colors cursor-pointer"
                type="button"
              >
                Show on map →
              </button>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${nearestOffice.lat},${nearestOffice.lng}&travelmode=driving`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors cursor-pointer"
              >
                Drive to office →
              </a>
            </div>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">
            Allow location access to find the nearest office.
          </p>
        )}
      </div>

      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Our Offices
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          {Object.values(officesByCountry).flat().length} offices across{" "}
          {countries.length} countries
        </p>
      </div>

      {/* Accordion List */}
      <div className="flex-1 overflow-y-auto p-4 scroll-smooth">
        <Accordion 
          type="single" 
          collapsible
          className="w-full"
          value={openItem}
          onValueChange={setOpenItem}
        >
          {countries.map((country) => (
            <AccordionItem key={country} value={country} id={`accordion-country-${country}`}>
              <AccordionTrigger className="text-base font-semibold px-2 hover:no-underline">
                <div className="flex items-center gap-2">
                  <span>{country}</span>
                  <span className="text-xs font-normal text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                    {officesByCountry[country].length}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 px-1">
                  {officesByCountry[country].map((office, idx) => (
                    <React.Fragment key={office.id}>
                      {idx > 0 && <div className="border-t mx-2" />}
                      <OfficeCard
                        office={office}
                        isSelected={selectedOffice?.id === office.id}
                        onClick={() => onSelectOffice(office)}
                      />
                    </React.Fragment>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
