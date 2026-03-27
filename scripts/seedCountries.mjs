/**
 * Seed script to create all 249 country documents in Sanity.
 *
 * Usage:
 *   SANITY_TOKEN=<your-write-token> node scripts/seedCountries.mjs
 *
 * The script reads project config from .env and requires a Sanity
 * write-token passed via SANITY_TOKEN environment variable.
 *
 * Get a write token from: https://www.sanity.io/manage → API → Tokens
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Read .env manually (no dotenv dependency needed)
const envPath = resolve(__dirname, "..", ".env");
const envVars = {};
try {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    envVars[key] = val;
  }
} catch {
  console.error("Could not read .env file");
}

const projectId = envVars.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = envVars.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_TOKEN || envVars.SANITY_TOKEN;

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env");
  process.exit(1);
}
if (!token) {
  console.error("Missing SANITY_TOKEN env var. Pass it like:");
  console.error("  SANITY_TOKEN=sk... node scripts/seedCountries.mjs");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-03-17",
  useCdn: false,
});

// ISO alpha-2 → country name + ISO numeric code
// Covers all 249 flag files in public/img/map-flags/
const countries = [
  { code: "AD", name: "Andorra", iso: "020" },
  { code: "AE", name: "United Arab Emirates", iso: "784" },
  { code: "AF", name: "Afghanistan", iso: "004" },
  { code: "AG", name: "Antigua and Barbuda", iso: "028" },
  { code: "AI", name: "Anguilla", iso: "660" },
  { code: "AL", name: "Albania", iso: "008" },
  { code: "AM", name: "Armenia", iso: "051" },
  { code: "AO", name: "Angola", iso: "024" },
  { code: "AQ", name: "Antarctica", iso: "010" },
  { code: "AR", name: "Argentina", iso: "032" },
  { code: "AS", name: "American Samoa", iso: "016" },
  { code: "AT", name: "Austria", iso: "040" },
  { code: "AU", name: "Australia", iso: "036" },
  { code: "AW", name: "Aruba", iso: "533" },
  { code: "AX", name: "Åland Islands", iso: "" },
  { code: "AZ", name: "Azerbaijan", iso: "031" },
  { code: "BA", name: "Bosnia and Herzegovina", iso: "070" },
  { code: "BB", name: "Barbados", iso: "052" },
  { code: "BD", name: "Bangladesh", iso: "050" },
  { code: "BE", name: "Belgium", iso: "056" },
  { code: "BF", name: "Burkina Faso", iso: "854" },
  { code: "BG", name: "Bulgaria", iso: "100" },
  { code: "BH", name: "Bahrain", iso: "048" },
  { code: "BI", name: "Burundi", iso: "108" },
  { code: "BJ", name: "Benin", iso: "204" },
  { code: "BL", name: "Saint Barthélemy", iso: "652" },
  { code: "BM", name: "Bermuda", iso: "060" },
  { code: "BN", name: "Brunei", iso: "096" },
  { code: "BO", name: "Bolivia", iso: "068" },
  { code: "BQ", name: "Caribbean Netherlands", iso: "" },
  { code: "BR", name: "Brazil", iso: "076" },
  { code: "BS", name: "Bahamas", iso: "044" },
  { code: "BT", name: "Bhutan", iso: "064" },
  { code: "BV", name: "Bouvet Island", iso: "" },
  { code: "BW", name: "Botswana", iso: "072" },
  { code: "BY", name: "Belarus", iso: "112" },
  { code: "BZ", name: "Belize", iso: "084" },
  { code: "CA", name: "Canada", iso: "124" },
  { code: "CC", name: "Cocos (Keeling) Islands", iso: "166" },
  { code: "CD", name: "DR Congo", iso: "180" },
  { code: "CF", name: "Central African Republic", iso: "140" },
  { code: "CG", name: "Republic of the Congo", iso: "178" },
  { code: "CH", name: "Switzerland", iso: "756" },
  { code: "CI", name: "Ivory Coast", iso: "384" },
  { code: "CK", name: "Cook Islands", iso: "184" },
  { code: "CL", name: "Chile", iso: "152" },
  { code: "CM", name: "Cameroon", iso: "120" },
  { code: "CN", name: "China", iso: "156" },
  { code: "CO", name: "Colombia", iso: "170" },
  { code: "CR", name: "Costa Rica", iso: "188" },
  { code: "CU", name: "Cuba", iso: "192" },
  { code: "CV", name: "Cape Verde", iso: "132" },
  { code: "CW", name: "Curaçao", iso: "531" },
  { code: "CX", name: "Christmas Island", iso: "162" },
  { code: "CY", name: "Cyprus", iso: "196" },
  { code: "CZ", name: "Czech Republic", iso: "203" },
  { code: "DE", name: "Germany", iso: "276" },
  { code: "DJ", name: "Djibouti", iso: "262" },
  { code: "DK", name: "Denmark", iso: "208" },
  { code: "DM", name: "Dominica", iso: "212" },
  { code: "DO", name: "Dominican Republic", iso: "214" },
  { code: "DZ", name: "Algeria", iso: "012" },
  { code: "EC", name: "Ecuador", iso: "218" },
  { code: "EE", name: "Estonia", iso: "233" },
  { code: "EG", name: "Egypt", iso: "818" },
  { code: "EH", name: "Western Sahara", iso: "732" },
  { code: "ER", name: "Eritrea", iso: "232" },
  { code: "ES", name: "Spain", iso: "724" },
  { code: "ET", name: "Ethiopia", iso: "231" },
  { code: "FI", name: "Finland", iso: "246" },
  { code: "FJ", name: "Fiji", iso: "242" },
  { code: "FK", name: "Falkland Islands", iso: "238" },
  { code: "FM", name: "Micronesia", iso: "583" },
  { code: "FO", name: "Faroe Islands", iso: "234" },
  { code: "FR", name: "France", iso: "250" },
  { code: "GA", name: "Gabon", iso: "266" },
  { code: "GB", name: "United Kingdom", iso: "826" },
  { code: "GD", name: "Grenada", iso: "308" },
  { code: "GE", name: "Georgia", iso: "268" },
  { code: "GF", name: "French Guiana", iso: "254" },
  { code: "GG", name: "Guernsey", iso: "831" },
  { code: "GH", name: "Ghana", iso: "288" },
  { code: "GI", name: "Gibraltar", iso: "292" },
  { code: "GL", name: "Greenland", iso: "304" },
  { code: "GM", name: "Gambia", iso: "270" },
  { code: "GN", name: "Guinea", iso: "324" },
  { code: "GP", name: "Guadeloupe", iso: "312" },
  { code: "GQ", name: "Equatorial Guinea", iso: "226" },
  { code: "GR", name: "Greece", iso: "300" },
  { code: "GT", name: "Guatemala", iso: "320" },
  { code: "GU", name: "Guam", iso: "316" },
  { code: "GW", name: "Guinea-Bissau", iso: "624" },
  { code: "GY", name: "Guyana", iso: "328" },
  { code: "HK", name: "Hong Kong", iso: "344" },
  { code: "HN", name: "Honduras", iso: "340" },
  { code: "HR", name: "Croatia", iso: "191" },
  { code: "HT", name: "Haiti", iso: "332" },
  { code: "HU", name: "Hungary", iso: "348" },
  { code: "ID", name: "Indonesia", iso: "360" },
  { code: "IE", name: "Ireland", iso: "372" },
  { code: "IL", name: "Israel", iso: "376" },
  { code: "IM", name: "Isle of Man", iso: "833" },
  { code: "IN", name: "India", iso: "356" },
  { code: "IO", name: "British Indian Ocean Territory", iso: "086" },
  { code: "IQ", name: "Iraq", iso: "368" },
  { code: "IR", name: "Iran", iso: "364" },
  { code: "IS", name: "Iceland", iso: "352" },
  { code: "IT", name: "Italy", iso: "380" },
  { code: "JE", name: "Jersey", iso: "832" },
  { code: "JM", name: "Jamaica", iso: "388" },
  { code: "JO", name: "Jordan", iso: "400" },
  { code: "JP", name: "Japan", iso: "392" },
  { code: "KE", name: "Kenya", iso: "404" },
  { code: "KG", name: "Kyrgyzstan", iso: "417" },
  { code: "KH", name: "Cambodia", iso: "116" },
  { code: "KI", name: "Kiribati", iso: "296" },
  { code: "KM", name: "Comoros", iso: "174" },
  { code: "KN", name: "Saint Kitts and Nevis", iso: "659" },
  { code: "KP", name: "North Korea", iso: "408" },
  { code: "KR", name: "South Korea", iso: "410" },
  { code: "KW", name: "Kuwait", iso: "414" },
  { code: "KY", name: "Cayman Islands", iso: "136" },
  { code: "KZ", name: "Kazakhstan", iso: "398" },
  { code: "LA", name: "Laos", iso: "418" },
  { code: "LB", name: "Lebanon", iso: "422" },
  { code: "LC", name: "Saint Lucia", iso: "662" },
  { code: "LI", name: "Liechtenstein", iso: "438" },
  { code: "LK", name: "Sri Lanka", iso: "144" },
  { code: "LR", name: "Liberia", iso: "430" },
  { code: "LS", name: "Lesotho", iso: "426" },
  { code: "LT", name: "Lithuania", iso: "440" },
  { code: "LU", name: "Luxembourg", iso: "442" },
  { code: "LV", name: "Latvia", iso: "428" },
  { code: "LY", name: "Libya", iso: "434" },
  { code: "MA", name: "Morocco", iso: "504" },
  { code: "MC", name: "Monaco", iso: "492" },
  { code: "MD", name: "Moldova", iso: "498" },
  { code: "ME", name: "Montenegro", iso: "499" },
  { code: "MF", name: "Saint Martin", iso: "663" },
  { code: "MG", name: "Madagascar", iso: "450" },
  { code: "MH", name: "Marshall Islands", iso: "584" },
  { code: "MK", name: "North Macedonia", iso: "807" },
  { code: "ML", name: "Mali", iso: "466" },
  { code: "MM", name: "Myanmar", iso: "104" },
  { code: "MN", name: "Mongolia", iso: "496" },
  { code: "MO", name: "Macau", iso: "446" },
  { code: "MP", name: "Northern Mariana Islands", iso: "580" },
  { code: "MQ", name: "Martinique", iso: "474" },
  { code: "MR", name: "Mauritania", iso: "478" },
  { code: "MS", name: "Montserrat", iso: "500" },
  { code: "MT", name: "Malta", iso: "470" },
  { code: "MU", name: "Mauritius", iso: "480" },
  { code: "MV", name: "Maldives", iso: "462" },
  { code: "MW", name: "Malawi", iso: "454" },
  { code: "MX", name: "Mexico", iso: "484" },
  { code: "MY", name: "Malaysia", iso: "458" },
  { code: "MZ", name: "Mozambique", iso: "508" },
  { code: "NA", name: "Namibia", iso: "516" },
  { code: "NC", name: "New Caledonia", iso: "540" },
  { code: "NE", name: "Niger", iso: "562" },
  { code: "NF", name: "Norfolk Island", iso: "574" },
  { code: "NG", name: "Nigeria", iso: "566" },
  { code: "NI", name: "Nicaragua", iso: "558" },
  { code: "NL", name: "Netherlands", iso: "528" },
  { code: "NO", name: "Norway", iso: "578" },
  { code: "NP", name: "Nepal", iso: "524" },
  { code: "NR", name: "Nauru", iso: "520" },
  { code: "NU", name: "Niue", iso: "570" },
  { code: "NZ", name: "New Zealand", iso: "554" },
  { code: "OM", name: "Oman", iso: "512" },
  { code: "PA", name: "Panama", iso: "591" },
  { code: "PE", name: "Peru", iso: "604" },
  { code: "PF", name: "French Polynesia", iso: "258" },
  { code: "PG", name: "Papua New Guinea", iso: "598" },
  { code: "PH", name: "Philippines", iso: "608" },
  { code: "PK", name: "Pakistan", iso: "586" },
  { code: "PL", name: "Poland", iso: "616" },
  { code: "PM", name: "Saint Pierre and Miquelon", iso: "666" },
  { code: "PN", name: "Pitcairn Islands", iso: "612" },
  { code: "PR", name: "Puerto Rico", iso: "630" },
  { code: "PS", name: "Palestine", iso: "275" },
  { code: "PT", name: "Portugal", iso: "620" },
  { code: "PW", name: "Palau", iso: "585" },
  { code: "PY", name: "Paraguay", iso: "600" },
  { code: "QA", name: "Qatar", iso: "634" },
  { code: "RE", name: "Réunion", iso: "638" },
  { code: "RO", name: "Romania", iso: "642" },
  { code: "RS", name: "Serbia", iso: "688" },
  { code: "RU", name: "Russia", iso: "643" },
  { code: "RW", name: "Rwanda", iso: "646" },
  { code: "SA", name: "Saudi Arabia", iso: "682" },
  { code: "SB", name: "Solomon Islands", iso: "090" },
  { code: "SC", name: "Seychelles", iso: "690" },
  { code: "SD", name: "Sudan", iso: "729" },
  { code: "SE", name: "Sweden", iso: "752" },
  { code: "SG", name: "Singapore", iso: "702" },
  { code: "SH", name: "Saint Helena", iso: "654" },
  { code: "SI", name: "Slovenia", iso: "705" },
  { code: "SJ", name: "Svalbard and Jan Mayen", iso: "744" },
  { code: "SK", name: "Slovakia", iso: "703" },
  { code: "SL", name: "Sierra Leone", iso: "694" },
  { code: "SM", name: "San Marino", iso: "674" },
  { code: "SN", name: "Senegal", iso: "686" },
  { code: "SO", name: "Somalia", iso: "706" },
  { code: "SR", name: "Suriname", iso: "740" },
  { code: "SS", name: "South Sudan", iso: "728" },
  { code: "ST", name: "São Tomé and Príncipe", iso: "678" },
  { code: "SV", name: "El Salvador", iso: "222" },
  { code: "SX", name: "Sint Maarten", iso: "534" },
  { code: "SY", name: "Syria", iso: "760" },
  { code: "SZ", name: "Eswatini", iso: "748" },
  { code: "TC", name: "Turks and Caicos Islands", iso: "796" },
  { code: "TD", name: "Chad", iso: "148" },
  { code: "TF", name: "French Southern Territories", iso: "260" },
  { code: "TG", name: "Togo", iso: "768" },
  { code: "TH", name: "Thailand", iso: "764" },
  { code: "TJ", name: "Tajikistan", iso: "762" },
  { code: "TK", name: "Tokelau", iso: "772" },
  { code: "TL", name: "Timor-Leste", iso: "626" },
  { code: "TM", name: "Turkmenistan", iso: "795" },
  { code: "TN", name: "Tunisia", iso: "788" },
  { code: "TO", name: "Tonga", iso: "776" },
  { code: "TR", name: "Turkey", iso: "792" },
  { code: "TT", name: "Trinidad and Tobago", iso: "780" },
  { code: "TV", name: "Tuvalu", iso: "798" },
  { code: "TW", name: "Taiwan", iso: "158" },
  { code: "TZ", name: "Tanzania", iso: "834" },
  { code: "UA", name: "Ukraine", iso: "804" },
  { code: "UG", name: "Uganda", iso: "800" },
  { code: "UM", name: "U.S. Minor Outlying Islands", iso: "581" },
  { code: "US", name: "United States of America", iso: "840" },
  { code: "UY", name: "Uruguay", iso: "858" },
  { code: "UZ", name: "Uzbekistan", iso: "860" },
  { code: "VA", name: "Vatican City", iso: "336" },
  { code: "VC", name: "Saint Vincent and the Grenadines", iso: "670" },
  { code: "VE", name: "Venezuela", iso: "862" },
  { code: "VG", name: "British Virgin Islands", iso: "092" },
  { code: "VI", name: "U.S. Virgin Islands", iso: "850" },
  { code: "VN", name: "Vietnam", iso: "704" },
  { code: "VU", name: "Vanuatu", iso: "548" },
  { code: "WF", name: "Wallis and Futuna", iso: "876" },
  { code: "WS", name: "Samoa", iso: "882" },
  { code: "YE", name: "Yemen", iso: "887" },
  { code: "YT", name: "Mayotte", iso: "175" },
  { code: "ZA", name: "South Africa", iso: "710" },
  { code: "ZM", name: "Zambia", iso: "894" },
  { code: "ZW", name: "Zimbabwe", iso: "716" },
];

// European countries (set region = "europe" for these)
const europeCountryCodes = new Set([
  "AD", "AL", "AT", "AX", "BA", "BE", "BG", "BY", "CH", "CY", "CZ",
  "DE", "DK", "EE", "ES", "FI", "FO", "FR", "GB", "GG", "GI", "GR",
  "HR", "HU", "IE", "IM", "IS", "IT", "JE", "LI", "LT", "LU", "LV",
  "MC", "MD", "ME", "MK", "MT", "NL", "NO", "PL", "PT", "RO", "RS",
  "RU", "SE", "SI", "SJ", "SK", "SM", "UA", "VA",
]);

async function main() {
  console.log(`Seeding countries to project ${projectId} / dataset ${dataset}...`);

  const transaction = client.transaction();

  for (const c of countries) {
    const region = europeCountryCodes.has(c.code) ? "europe" : "restOfWorld";
    const doc = {
      _id: `country-${c.code.toLowerCase()}`,
      _type: "country",
      name: c.name,
      code: c.code,
      isoNumeric: c.iso || undefined,
      region,
    };
    // createIfNotExists prevents duplicates on re-run
    transaction.createIfNotExists(doc);
  }

  const result = await transaction.commit();
  console.log(`✓ Seeded ${countries.length} countries. Transaction ID: ${result.transactionId}`);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
