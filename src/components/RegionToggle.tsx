"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";

export type Region = "europe" | "rest-of-the-world";

interface RegionToggleProps {
  currentRegion: Region;
  europeLabel?: string;
  worldLabel?: string;
  /** If true, clicking the toggle navigates to /distributors?region=xxx.
   *  If false, it updates the current page's search params in-place. */
  navigateToDistributors?: boolean;
  /** If true, the green pill only shows on hover (no permanent active state).
   *  Both buttons remain clickable regardless. Used on the home page. */
  hoverOnly?: boolean;
}

const RegionToggle = ({
  currentRegion,
  europeLabel = "Europe",
  worldLabel = "Rest of the world",
  navigateToDistributors = false,
  hoverOnly = false,
}: RegionToggleProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const europeRef = useRef<HTMLButtonElement>(null);
  const worldRef = useRef<HTMLButtonElement>(null);
  const [pillStyle, setPillStyle] = useState({ width: 0, left: 0, opacity: 0 });
  const [hoveredRegion, setHoveredRegion] = useState<Region | null>(null);

  useEffect(() => {
    if (hoverOnly) {
      // In hover-only mode, no permanent pill visible
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }
    const activeRef = currentRegion === "europe" ? europeRef : worldRef;
    if (activeRef.current) {
      setPillStyle({
        width: activeRef.current.offsetWidth,
        left: activeRef.current.offsetLeft,
        opacity: 1,
      });
    }
  }, [currentRegion, hoverOnly]);

  const handleHover = (region: Region) => {
    setHoveredRegion(region);
    const ref = region === "europe" ? europeRef : worldRef;
    if (ref.current) {
      setPillStyle({
        width: ref.current.offsetWidth,
        left: ref.current.offsetLeft,
        opacity: 1,
      });
    }
  };

  const handleHoverEnd = () => {
    setHoveredRegion(null);
    if (hoverOnly) {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
    } else {
      // Snap back to active region
      const activeRef = currentRegion === "europe" ? europeRef : worldRef;
      if (activeRef.current) {
        setPillStyle({
          width: activeRef.current.offsetWidth,
          left: activeRef.current.offsetLeft,
          opacity: 1,
        });
      }
    }
  };

  const handleRegionChange = (newRegion: Region) => {
    const targetPath = navigateToDistributors ? "/distributors" : pathname;
    router.push(`${targetPath}?region=${newRegion}`);
  };

  const getTextClass = (region: Region) => {
    if (hoverOnly) {
      return hoveredRegion === region ? "text-white" : "text-besgrow-green";
    }
    // The background pill shifts to the hovered item.
    // If nothing is hovered, it stays on the active item.
    const hasPill = hoveredRegion ? hoveredRegion === region : currentRegion === region;
    return hasPill ? "text-white" : "text-besgrow-green";
  };

  return (
    <div className="border-besgrow-green relative inline-flex rounded-full border-2 bg-white">
      {/* Sliding highlighter */}
      <span
        className="bg-besgrow-green absolute top-0 h-full rounded-full transition-all duration-300 ease-in-out"
        style={{
          width: pillStyle.width,
          left: pillStyle.left,
          opacity: pillStyle.opacity,
        }}
      />
      <button
        ref={europeRef}
        onClick={() => handleRegionChange("europe")}
        onMouseEnter={() => handleHover("europe")}
        onMouseLeave={handleHoverEnd}
        className={`relative z-10 cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300 ${getTextClass("europe")}`}
      >
        {europeLabel}
      </button>
      <button
        ref={worldRef}
        onClick={() => handleRegionChange("rest-of-the-world")}
        onMouseEnter={() => handleHover("rest-of-the-world")}
        onMouseLeave={handleHoverEnd}
        className={`relative z-10 cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300 ${getTextClass("rest-of-the-world")}`}
      >
        {worldLabel}
      </button>
    </div>
  );
};

export default RegionToggle;
