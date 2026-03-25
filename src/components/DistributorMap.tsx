"use client";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { useState, useEffect, useRef, useCallback } from "react";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ISO 3166-1 numeric → alpha-2 mapping for flag images
const isoNumericToAlpha2: Record<string, string> = {
  "004": "af",
  "008": "al",
  "010": "aq",
  "012": "dz",
  "016": "as",
  "020": "ad",
  "024": "ao",
  "028": "ag",
  "031": "az",
  "032": "ar",
  "036": "au",
  "040": "at",
  "044": "bs",
  "048": "bh",
  "050": "bd",
  "051": "am",
  "052": "bb",
  "056": "be",
  "060": "bm",
  "064": "bt",
  "068": "bo",
  "070": "ba",
  "072": "bw",
  "076": "br",
  "084": "bz",
  "086": "io",
  "090": "sb",
  "092": "vg",
  "096": "bn",
  "100": "bg",
  "104": "mm",
  "108": "bi",
  "112": "by",
  "116": "kh",
  "120": "cm",
  "124": "ca",
  "132": "cv",
  "136": "ky",
  "140": "cf",
  "144": "lk",
  "148": "td",
  "152": "cl",
  "156": "cn",
  "158": "tw",
  "162": "cx",
  "166": "cc",
  "170": "co",
  "174": "km",
  "175": "yt",
  "178": "cg",
  "180": "cd",
  "184": "ck",
  "188": "cr",
  "191": "hr",
  "192": "cu",
  "196": "cy",
  "203": "cz",
  "204": "bj",
  "208": "dk",
  "212": "dm",
  "214": "do",
  "218": "ec",
  "222": "sv",
  "226": "gq",
  "231": "et",
  "232": "er",
  "233": "ee",
  "234": "fo",
  "238": "fk",
  "242": "fj",
  "246": "fi",
  "250": "fr",
  "254": "gf",
  "258": "pf",
  "260": "tf",
  "262": "dj",
  "266": "ga",
  "268": "ge",
  "270": "gm",
  "275": "ps",
  "276": "de",
  "288": "gh",
  "292": "gi",
  "296": "ki",
  "300": "gr",
  "304": "gl",
  "308": "gd",
  "312": "gp",
  "316": "gu",
  "320": "gt",
  "324": "gn",
  "328": "gy",
  "332": "ht",
  "336": "va",
  "340": "hn",
  "344": "hk",
  "348": "hu",
  "352": "is",
  "356": "in",
  "360": "id",
  "364": "ir",
  "368": "iq",
  "372": "ie",
  "376": "il",
  "380": "it",
  "384": "ci",
  "388": "jm",
  "392": "jp",
  "398": "kz",
  "400": "jo",
  "404": "ke",
  "408": "kp",
  "410": "kr",
  "414": "kw",
  "417": "kg",
  "418": "la",
  "422": "lb",
  "426": "ls",
  "428": "lv",
  "430": "lr",
  "434": "ly",
  "438": "li",
  "440": "lt",
  "442": "lu",
  "446": "mo",
  "450": "mg",
  "454": "mw",
  "458": "my",
  "462": "mv",
  "466": "ml",
  "470": "mt",
  "474": "mq",
  "478": "mr",
  "480": "mu",
  "484": "mx",
  "492": "mc",
  "496": "mn",
  "498": "md",
  "499": "me",
  "500": "ms",
  "504": "ma",
  "508": "mz",
  "512": "om",
  "516": "na",
  "520": "nr",
  "524": "np",
  "528": "nl",
  "531": "cw",
  "533": "aw",
  "534": "sx",
  "540": "nc",
  "548": "vu",
  "554": "nz",
  "558": "ni",
  "562": "ne",
  "566": "ng",
  "570": "nu",
  "574": "nf",
  "578": "no",
  "580": "mp",
  "581": "um",
  "583": "fm",
  "584": "mh",
  "585": "pw",
  "586": "pk",
  "591": "pa",
  "598": "pg",
  "600": "py",
  "604": "pe",
  "608": "ph",
  "612": "pn",
  "616": "pl",
  "620": "pt",
  "624": "gw",
  "626": "tl",
  "630": "pr",
  "634": "qa",
  "638": "re",
  "642": "ro",
  "643": "ru",
  "646": "rw",
  "652": "bl",
  "654": "sh",
  "659": "kn",
  "660": "ai",
  "662": "lc",
  "663": "mf",
  "666": "pm",
  "670": "vc",
  "674": "sm",
  "678": "st",
  "682": "sa",
  "686": "sn",
  "688": "rs",
  "690": "sc",
  "694": "sl",
  "702": "sg",
  "703": "sk",
  "704": "vn",
  "705": "si",
  "706": "so",
  "710": "za",
  "716": "zw",
  "724": "es",
  "728": "ss",
  "729": "sd",
  "732": "eh",
  "740": "sr",
  "744": "sj",
  "748": "sz",
  "752": "se",
  "756": "ch",
  "760": "sy",
  "762": "tj",
  "764": "th",
  "768": "tg",
  "772": "tk",
  "776": "to",
  "780": "tt",
  "784": "ae",
  "788": "tn",
  "792": "tr",
  "795": "tm",
  "796": "tc",
  "798": "tv",
  "800": "ug",
  "804": "ua",
  "807": "mk",
  "818": "eg",
  "826": "gb",
  "831": "gg",
  "832": "je",
  "833": "im",
  "834": "tz",
  "840": "us",
  "850": "vi",
  "854": "bf",
  "858": "uy",
  "860": "uz",
  "862": "ve",
  "876": "wf",
  "882": "ws",
  "887": "ye",
  "894": "zm",
};

type MapCenter = {
  coordinates: [number, number];
  zoom: number;
};

export const cityCoordinates: Record<string, [number, number]> = {
  Dalfsen: [6.2625, 52.5025],
  Amsterdam: [4.9041, 52.3676],
  Hamburg: [9.9937, 53.5511],
  Lyon: [4.8357, 45.764],
  Valencia: [-0.3763, 39.4699],
  Warsaw: [21.0122, 52.2297],
  Beijing: [116.4074, 39.9042],
  "Buenos Aires": [-58.3816, -34.6037],
  Portland: [-122.6587, 45.5231],
  "São Paulo": [-46.6333, -23.5505],
  "Cape Town": [18.4232, -33.9249],
  Mumbai: [72.8777, 19.076],
  Melbourne: [144.9631, -37.8136],
};

const regionDefaults: Record<string, MapCenter> = {
  europe: { coordinates: [10, 52], zoom: 3.5 },
  world: { coordinates: [20, 10], zoom: 1 },
};

// ISO 3166-1 numeric codes for each country
const countryCoordinates: Record<
  string,
  { iso: string; coordinates: [number, number]; zoom: number }
> = {
  Netherlands: { iso: "528", coordinates: [5.3, 52.1], zoom: 12 },
  Germany: { iso: "276", coordinates: [10.4, 51.2], zoom: 5 },
  France: { iso: "250", coordinates: [2.2, 46.6], zoom: 5 },
  Spain: { iso: "724", coordinates: [-3.7, 40.4], zoom: 4 },
  Poland: { iso: "616", coordinates: [19.1, 51.9], zoom: 5 },
  China: { iso: "156", coordinates: [104.2, 35.9], zoom: 2.5 },
  Japan: { iso: "392", coordinates: [138.3, 36.2], zoom: 4 },
  "New Zealand": { iso: "554", coordinates: [174.9, -40.9], zoom: 4 },
  Argentina: { iso: "032", coordinates: [-63.6, -38.4], zoom: 2.5 },
  "United States of America": {
    iso: "840",
    coordinates: [-95.7, 37.1],
    zoom: 2.5,
  },
  Brazil: { iso: "076", coordinates: [-51.9, -14.2], zoom: 2 },
  "South Africa": { iso: "710", coordinates: [22.9, -30.6], zoom: 3 },
  India: { iso: "356", coordinates: [78.9, 20.6], zoom: 3 },
  "South Korea": { iso: "410", coordinates: [127.8, 35.9], zoom: 5 },
  Australia: { iso: "036", coordinates: [133.8, -25.3], zoom: 2.5 },
};

interface DistributorMapProps {
  region: "europe" | "world";
  activeCountry: string | null;
  highlightedCountries: string[];
  distributorCities?: { city: string; country: string }[];
  onCountryClick?: (country: string) => void;
  countryCoordinatesMap?: Record<string, { iso: string; coordinates: [number, number]; zoom: number }>;
  cityCoordinatesMap?: Record<string, [number, number]>;
}

const DistributorMap = ({
  region,
  activeCountry,
  highlightedCountries,
  distributorCities = [],
  onCountryClick,
  countryCoordinatesMap,
  cityCoordinatesMap,
}: DistributorMapProps) => {
  // Merge prop maps with hardcoded fallbacks
  const resolvedCountryCoords = countryCoordinatesMap || countryCoordinates;
  const resolvedCityCoords = cityCoordinatesMap || cityCoordinates;
  const [mapCenter, setMapCenter] = useState<MapCenter>(regionDefaults[region]);
  // Track whether the current move is programmatic (accordion/region click)
  // so we only apply the smooth transition for those, not manual drag/zoom
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const animationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    name: string;
    available: boolean;
    alpha2: string;
  } | null>(null);

  useEffect(() => {
    // Programmatic zoom — enable animation
    setShouldAnimate(true);

    if (activeCountry && resolvedCountryCoords[activeCountry]) {
      const { coordinates, zoom } = resolvedCountryCoords[activeCountry];
      setMapCenter({ coordinates, zoom });
    } else {
      setMapCenter(regionDefaults[region]);
    }

    // Disable animation after transition completes so manual drag is instant
    if (animationTimeout.current) clearTimeout(animationTimeout.current);
    animationTimeout.current = setTimeout(() => {
      setShouldAnimate(false);
    }, 650);

    return () => {
      if (animationTimeout.current) clearTimeout(animationTimeout.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCountry, region, resolvedCountryCoords]);

  // Build ISO → country name lookup for click handling
  const isoToCountry: Record<string, string> = {};
  const highlightedISOs: string[] = [];
  for (const c of highlightedCountries) {
    const iso = resolvedCountryCoords[c]?.iso;
    if (iso) {
      highlightedISOs.push(iso);
      isoToCountry[iso] = c;
    }
  }

  // Get active ISO code
  const activeISO = activeCountry
    ? resolvedCountryCoords[activeCountry]?.iso
    : null;

  const handleMoveEnd = useCallback(
    ({
      coordinates,
      zoom,
    }: {
      coordinates: [number, number];
      zoom: number;
    }) => {
      setMapCenter({ coordinates, zoom });
    },
    [],
  );

  // Handle trackpad pinch-to-zoom (ctrlKey + wheel) manually
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        // Pinch-in = positive deltaY (zoom out), pinch-out = negative deltaY (zoom in)
        const zoomFactor = 1 - e.deltaY * 0.01;
        setMapCenter((prev) => ({
          ...prev,
          zoom: Math.min(20, Math.max(1, prev.zoom * zoomFactor)),
        }));
      }
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
      style={{ touchAction: "none" }}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 150,
        }}
        className="h-full w-full"
      >
        <ZoomableGroup
          center={mapCenter.coordinates}
          zoom={mapCenter.zoom}
          onMoveEnd={handleMoveEnd}
          style={
            shouldAnimate
              ? { transition: "transform 600ms ease-in-out" }
              : undefined
          }
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const geoId = geo.id;
                const isActive = geoId === activeISO;
                const isHighlighted = highlightedISOs.includes(geoId);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={
                      isActive
                        ? "#59C134"
                        : isHighlighted
                          ? "#99D536"
                          : "oklch(55.6% 0 0)"
                    }
                    stroke="#fff"
                    strokeWidth={0.3}
                    onClick={() => {
                      if (
                        isHighlighted &&
                        isoToCountry[geoId] &&
                        onCountryClick
                      ) {
                        onCountryClick(isoToCountry[geoId]);
                      }
                    }}
                    onMouseEnter={(e) => {
                      const name =
                        isoToCountry[geoId] || geo.properties.name || "Unknown";
                      const alpha2 = isoNumericToAlpha2[geoId] || "";
                      setTooltip({
                        x: e.clientX,
                        y: e.clientY,
                        name,
                        available: isHighlighted,
                        alpha2,
                      });
                    }}
                    onMouseMove={(e) => {
                      setTooltip((prev) =>
                        prev ? { ...prev, x: e.clientX, y: e.clientY } : null,
                      );
                    }}
                    onMouseLeave={() => setTooltip(null)}
                    style={{
                      default: {
                        outline: "none",
                        cursor: isHighlighted ? "pointer" : "default",
                      },
                      hover: {
                        outline: "none",
                        fill: isHighlighted ? "#B9E571" : "oklch(43.9% 0 0)",
                        cursor: isHighlighted ? "pointer" : "default",
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
          {distributorCities.map((loc, idx) => {
            const coords = resolvedCityCoords[loc.city];
            if (!coords) return null;

            return (
              <Marker key={`city-${loc.city}-${idx}`} coordinates={coords}>
                <g style={{ pointerEvents: "none" }} transform={`scale(${1 / mapCenter.zoom})`}>
                  <path
                    d="M0,0 C0,0 12,-15 12,-24 A12,12 0 1,0 -12,-24 C-12,-15 0,0 0,0 Z"
                    fill="#6a7b8c"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                  <circle cx="0" cy="-24" r="4.5" fill="#FFFFFF" />
                </g>
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>
      {tooltip && (
        <div
          className="pointer-events-none fixed z-50 rounded-sm bg-white p-1 shadow-lg"
          style={{
            left: tooltip.x,
            top: tooltip.y - 80,
            transform: "translateX(-50%)",
          }}
        >
          <div className="flex flex-col text-center">
            {tooltip.alpha2 && (
              <div className="mx-auto mb-1 size-6 shrink-0 overflow-hidden rounded-full border border-neutral-200 text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/img/map-flags/${tooltip.alpha2}.svg`}
                  alt={tooltip.name}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div>
              <p className="text-xs font-semibold text-neutral-800">
                {tooltip.name}
              </p>
              <p
                className={`text-[10px] font-medium ${
                  tooltip.available ? "text-green-600" : "text-neutral-400"
                }`}
              >
                {tooltip.available
                  ? "✓ Service Available"
                  : "✗ Service Not Available"}
              </p>
            </div>
          </div>
          {/* Triangle arrow */}
          <span
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2"
            style={{
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid white",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DistributorMap;
