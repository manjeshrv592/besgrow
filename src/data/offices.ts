export interface Office {
  id: string;
  name: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  lat: number;
  lng: number;
}

export const offices: Office[] = [
  // Netherlands
  {
    id: "nl-amsterdam-1",
    name: "Amsterdam Office 1",
    country: "Netherlands",
    city: "Amsterdam",
    address: "Canal Street 10, 1000 AA",
    phone: "+31 (0)20-123456",
    email: "amsterdam@besgrow-europe.com",
    website: "www.besgrow-europe.com",
    lat: 52.3676,
    lng: 4.9041,
  },
  {
    id: "nl-dalfsen-2",
    name: "Amsterdam Office 2",
    country: "Netherlands",
    city: "Dalfsen",
    address: "De Vesting 26-A, 7722 GA",
    phone: "+31 (0)321-745748",
    email: "info@besgrow-europe.com",
    website: "www.besgrow-europe.com",
    lat: 52.5072,
    lng: 6.2558,
  },

  // United States
  {
    id: "us-new-york",
    name: "New York Office",
    country: "United States",
    city: "New York",
    address: "350 Fifth Avenue, Suite 4500, NY 10118",
    phone: "+1 (212) 555-0142",
    email: "newyork@globaloffices.com",
    website: "www.globaloffices.com",
    lat: 40.7484,
    lng: -73.9857,
  },
  {
    id: "us-san-francisco",
    name: "San Francisco Office",
    country: "United States",
    city: "San Francisco",
    address: "101 Market Street, Suite 900, CA 94105",
    phone: "+1 (415) 555-0198",
    email: "sf@globaloffices.com",
    website: "www.globaloffices.com",
    lat: 37.7937,
    lng: -122.3965,
  },
  {
    id: "us-chicago",
    name: "Chicago Office",
    country: "United States",
    city: "Chicago",
    address: "233 S Wacker Drive, Suite 2100, IL 60606",
    phone: "+1 (312) 555-0176",
    email: "chicago@globaloffices.com",
    website: "www.globaloffices.com",
    lat: 41.8789,
    lng: -87.6359,
  },

  // United Kingdom
  {
    id: "uk-london",
    name: "London Office",
    country: "United Kingdom",
    city: "London",
    address: "1 Canada Square, Canary Wharf, E14 5AB",
    phone: "+44 (0)20 7946 0958",
    email: "london@globaloffices.com",
    website: "www.globaloffices.co.uk",
    lat: 51.5049,
    lng: -0.0197,
  },
  {
    id: "uk-manchester",
    name: "Manchester Office",
    country: "United Kingdom",
    city: "Manchester",
    address: "Spinningfields, 1 Hardman Street, M3 3EB",
    phone: "+44 (0)161 555 0234",
    email: "manchester@globaloffices.com",
    website: "www.globaloffices.co.uk",
    lat: 53.4808,
    lng: -2.2426,
  },

  // Germany
  {
    id: "de-berlin",
    name: "Berlin Office",
    country: "Germany",
    city: "Berlin",
    address: "Friedrichstraße 68, 10117 Berlin",
    phone: "+49 (0)30 555 01234",
    email: "berlin@globaloffices.de",
    website: "www.globaloffices.de",
    lat: 52.5163,
    lng: 13.3879,
  },
  {
    id: "de-munich",
    name: "Munich Office",
    country: "Germany",
    city: "Munich",
    address: "Marienplatz 8, 80331 München",
    phone: "+49 (0)89 555 05678",
    email: "munich@globaloffices.de",
    website: "www.globaloffices.de",
    lat: 48.1374,
    lng: 11.5755,
  },

  // India
  {
    id: "in-mumbai",
    name: "Mumbai Office",
    country: "India",
    city: "Mumbai",
    address: "Bandra Kurla Complex, Block G, 400051",
    phone: "+91 22 5555 0100",
    email: "mumbai@globaloffices.in",
    website: "www.globaloffices.in",
    lat: 19.0596,
    lng: 72.8656,
  },
  {
    id: "in-bangalore",
    name: "Bangalore Office",
    country: "India",
    city: "Bangalore",
    address: "Embassy Tech Village, Outer Ring Road, 560103",
    phone: "+91 80 5555 0200",
    email: "bangalore@globaloffices.in",
    website: "www.globaloffices.in",
    lat: 12.9352,
    lng: 77.6245,
  },

  // Australia
  {
    id: "au-sydney",
    name: "Sydney Office",
    country: "Australia",
    city: "Sydney",
    address: "200 George Street, NSW 2000",
    phone: "+61 2 5555 0300",
    email: "sydney@globaloffices.com.au",
    website: "www.globaloffices.com.au",
    lat: -33.8614,
    lng: 151.2099,
  },
  {
    id: "au-melbourne",
    name: "Melbourne Office",
    country: "Australia",
    city: "Melbourne",
    address: "525 Collins Street, VIC 3000",
    phone: "+61 3 5555 0400",
    email: "melbourne@globaloffices.com.au",
    website: "www.globaloffices.com.au",
    lat: -37.8186,
    lng: 144.9561,
  },

  // Japan
  {
    id: "jp-tokyo",
    name: "Tokyo Office",
    country: "Japan",
    city: "Tokyo",
    address: "Marunouchi 1-6-5, Chiyoda-ku, 100-0005",
    phone: "+81 3 5555 0500",
    email: "tokyo@globaloffices.jp",
    website: "www.globaloffices.jp",
    lat: 35.6824,
    lng: 139.7649,
  },

  // UAE
  {
    id: "ae-dubai",
    name: "Dubai Office",
    country: "United Arab Emirates",
    city: "Dubai",
    address: "DIFC, Gate Building, Level 15, PO Box 506688",
    phone: "+971 4 555 0600",
    email: "dubai@globaloffices.ae",
    website: "www.globaloffices.ae",
    lat: 25.2138,
    lng: 55.2797,
  },

  // Canada
  {
    id: "ca-toronto",
    name: "Toronto Office",
    country: "Canada",
    city: "Toronto",
    address: "100 King Street West, Suite 5700, ON M5X 1C7",
    phone: "+1 (416) 555-0700",
    email: "toronto@globaloffices.ca",
    website: "www.globaloffices.ca",
    lat: 43.6487,
    lng: -79.3817,
  },
  {
    id: "ca-vancouver",
    name: "Vancouver Office",
    country: "Canada",
    city: "Vancouver",
    address: "745 Thurlow Street, Suite 2400, BC V6E 0C5",
    phone: "+1 (604) 555-0800",
    email: "vancouver@globaloffices.ca",
    website: "www.globaloffices.ca",
    lat: 49.2846,
    lng: -123.1196,
  },

  // Singapore
  {
    id: "sg-singapore",
    name: "Singapore Office",
    country: "Singapore",
    city: "Singapore",
    address: "1 Raffles Place, Tower 2, Level 30, 048616",
    phone: "+65 5555 0900",
    email: "singapore@globaloffices.sg",
    website: "www.globaloffices.sg",
    lat: 1.2839,
    lng: 103.8515,
  },

  // Brazil
  {
    id: "br-sao-paulo",
    name: "São Paulo Office",
    country: "Brazil",
    city: "São Paulo",
    address: "Av. Paulista 1374, Bela Vista, 01310-100",
    phone: "+55 11 5555-1000",
    email: "saopaulo@globaloffices.com.br",
    website: "www.globaloffices.com.br",
    lat: -23.5613,
    lng: -46.6558,
  },
];

/** Group offices by country */
export function getOfficesByCountry(): Record<string, Office[]> {
  return offices.reduce(
    (acc, office) => {
      if (!acc[office.country]) {
        acc[office.country] = [];
      }
      acc[office.country].push(office);
      return acc;
    },
    {} as Record<string, Office[]>
  );
}

/** Haversine distance in km between two lat/lng points */
export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/** Find the nearest office to a given lat/lng */
export function findNearestOffice(
  lat: number,
  lng: number
): Office {
  let nearest = offices[0];
  let minDistance = Infinity;

  for (const office of offices) {
    const distance = haversineDistance(lat, lng, office.lat, office.lng);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = office;
    }
  }

  return nearest;
}
