import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
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
} catch {}

const client = createClient({
  projectId: envVars.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  token: process.env.SANITY_TOKEN ?? envVars.SANITY_TOKEN,
  apiVersion: "2026-03-17",
  useCdn: false,
});

const docs = await client.fetch(
  `*[_type == "homePage" || (_id in path("drafts.**") && _type == "homePage")]{ _id, aboutBody }`,
  {},
  { perspective: "raw" }
);

for (const doc of docs) {
  console.log(`\n=== ${doc._id} ===`);
  console.log(JSON.stringify(doc.aboutBody, null, 2));
}
