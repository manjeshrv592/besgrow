/**
 * Migration script to remove deprecated fields from all country documents.
 * Removes: region, mapCoordinates, mapZoom
 *
 * Usage:
 *   SANITY_TOKEN=<your-write-token> node scripts/migrateCountries.mjs
 *
 * Get a write token from: https://www.sanity.io/manage → API → Tokens
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Read .env manually
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
  console.error("  SANITY_TOKEN=sk... node scripts/migrateCountries.mjs");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-03-17",
  useCdn: false,
});

async function main() {
  console.log(`Migrating countries in project ${projectId} / dataset ${dataset}...`);
  console.log("Removing deprecated fields: region, mapCoordinates, mapZoom\n");

  // Fetch all country documents
  const countries = await client.fetch('*[_type == "country"]{ _id, name, region, mapCoordinates, mapZoom }');
  
  console.log(`Found ${countries.length} country documents.\n`);

  let updatedCount = 0;
  const transaction = client.transaction();

  for (const country of countries) {
    const hasRegion = country.region !== undefined;
    const hasMapCoordinates = country.mapCoordinates !== undefined;
    const hasMapZoom = country.mapZoom !== undefined;

    if (hasRegion || hasMapCoordinates || hasMapZoom) {
      const fieldsToRemove = [];
      if (hasRegion) fieldsToRemove.push("region");
      if (hasMapCoordinates) fieldsToRemove.push("mapCoordinates");
      if (hasMapZoom) fieldsToRemove.push("mapZoom");

      console.log(`  ${country.name}: removing [${fieldsToRemove.join(", ")}]`);

      // Use unset to remove the fields
      transaction.patch(country._id, (patch) => 
        patch.unset(["region", "mapCoordinates", "mapZoom"])
      );
      updatedCount++;
    }
  }

  if (updatedCount === 0) {
    console.log("\n✓ No countries needed migration. All clean!");
    return;
  }

  console.log(`\nCommitting changes for ${updatedCount} countries...`);
  const result = await transaction.commit();
  console.log(`✓ Migration complete! Transaction ID: ${result.transactionId}`);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
