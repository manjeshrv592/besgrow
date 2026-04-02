/**
 * Fix: Clear broken/empty aboutBody items on production homePage.
 *
 * The production dataset has 3 empty i18n array items with no `language`
 * and no `value` — these are leftover v4 shells that block publishing.
 * This script removes them so the Studio can create fresh v5 entries.
 *
 * Usage:  node scripts/migrateHomePageI18nV5.mjs
 *         node scripts/migrateHomePageI18nV5.mjs --dataset production
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Parse --dataset flag ────────────────────────────────────────────────────
const args = process.argv.slice(2);
const datasetFlagIdx = args.indexOf("--dataset");
const datasetArg = datasetFlagIdx !== -1 ? args[datasetFlagIdx + 1] : null;

// ── Read .env ───────────────────────────────────────────────────────────────
const envPath = resolve(__dirname, "..", ".env");
const envVars = {};
try {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    envVars[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim();
  }
} catch {
  console.warn("Could not read .env file.");
}

const projectId = envVars.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = datasetArg ?? envVars.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_TOKEN ?? envVars.SANITY_TOKEN;

if (!projectId) { console.error("❌  Missing NEXT_PUBLIC_SANITY_PROJECT_ID"); process.exit(1); }
if (!token)     { console.error("❌  Missing SANITY_TOKEN"); process.exit(1); }

const client = createClient({ projectId, dataset, token, apiVersion: "2026-03-17", useCdn: false });

async function fixDoc(id) {
  console.log(`\n  Fetching ${id}...`);
  const doc = await client.getDocument(id);

  if (!doc) {
    console.log(`  → Not found, skipping.`);
    return;
  }

  const arr = doc.aboutBody;
  if (!Array.isArray(arr) || arr.length === 0) {
    console.log(`  → aboutBody empty/missing, skipping.`);
    return;
  }

  console.log(`  aboutBody has ${arr.length} item(s):`);
  arr.forEach((item, i) => console.log(`    [${i}] ${JSON.stringify(item)}`));

  // Check if items are broken (no language field)
  const brokenItems = arr.filter(item => !item.language);
  if (brokenItems.length === 0) {
    console.log(`  → All items have language field, already v5. Skipping.`);
    return;
  }

  console.log(`  → Found ${brokenItems.length} item(s) without language field.`);

  // Check if any have actual content worth saving
  const hasContent = brokenItems.some(item => item.value && (
    typeof item.value === "string" ? item.value.length > 0 :
    Array.isArray(item.value) ? item.value.length > 0 : false
  ));

  if (hasContent) {
    console.log(`  ⚠️  Some broken items have content! Manual review needed.`);
    return;
  }

  // All broken items are empty — safe to remove them
  console.log(`  → All broken items are empty. Clearing aboutBody...`);
  await client.patch(id).unset(["aboutBody"]).commit();
  console.log(`  ✅  Cleared aboutBody on ${id}.`);
}

async function main() {
  console.log(`\n🔧  Fixing homePage.aboutBody`);
  console.log(`    Project : ${projectId}`);
  console.log(`    Dataset : ${dataset}`);

  await fixDoc("homePage");
  await fixDoc("drafts.homePage");

  console.log("\n✓  Done! You can now re-enter the About body content in the Studio.\n");
}

main()
  .then(() => process.exit(0))
  .catch((err) => { console.error("\n❌  Failed:", err.message ?? err); process.exit(1); });
