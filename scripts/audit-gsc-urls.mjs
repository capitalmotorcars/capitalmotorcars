import fs from "fs";
import os from "os";
import path from "path";

const credsPath = path.join(os.homedir(), ".config/gsc/credentials.json");
const creds = JSON.parse(fs.readFileSync(credsPath, "utf8"));

async function getAccessToken() {
  if (creds.expires_at && creds.expires_at > Date.now() + 60000 && creds.access_token) {
    return creds.access_token;
  }
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: creds.client_id,
      client_secret: creds.client_secret,
      refresh_token: creds.refresh_token,
      grant_type: "refresh_token"
    })
  });
  const tokenData = await res.json();
  creds.access_token = tokenData.access_token;
  creds.expires_at = Date.now() + (tokenData.expires_in * 1000);
  creds.updated_at = new Date().toISOString();
  fs.writeFileSync(credsPath, JSON.stringify(creds, null, 2));
  return creds.access_token;
}

const auditUrls = [
  // 1. Core pages
  "https://www.capitalmotorcars.com/",
  "https://www.capitalmotorcars.com/about",
  "https://www.capitalmotorcars.com/contact",
  "https://www.capitalmotorcars.com/brands",
  "https://www.capitalmotorcars.com/services",
  "https://www.capitalmotorcars.com/trade-in",
  "https://www.capitalmotorcars.com/credit-application",
  "https://www.capitalmotorcars.com/car-lease-deals-new-jersey",
  "https://www.capitalmotorcars.com/lease-calculator",
  "https://www.capitalmotorcars.com/quiz",

  // 2. Services
  "https://www.capitalmotorcars.com/services/detailing",
  "https://www.capitalmotorcars.com/services/wheel-repair",
  "https://www.capitalmotorcars.com/services/early-lease-exit",
  "https://www.capitalmotorcars.com/services/lease-transfer",

  // 3. Local county / city
  "https://www.capitalmotorcars.com/car-leasing-new-jersey",
  "https://www.capitalmotorcars.com/car-leasing-bergen-county-nj",
  "https://www.capitalmotorcars.com/car-leasing-jersey-city-nj",
  "https://www.capitalmotorcars.com/car-leasing-hoboken-nj",
  "https://www.capitalmotorcars.com/car-leasing-paramus-nj",
  "https://www.capitalmotorcars.com/car-leasing-springfield-nj",
  "https://www.capitalmotorcars.com/car-leasing-edgewater-nj",

  // 4. Brands & Brand Local
  "https://www.capitalmotorcars.com/brand/bmw",
  "https://www.capitalmotorcars.com/brand/mercedes-benz",
  "https://www.capitalmotorcars.com/brand/audi",
  "https://www.capitalmotorcars.com/brand/porsche",
  "https://www.capitalmotorcars.com/brand/toyota",
  "https://www.capitalmotorcars.com/bmw-lease-deals-jersey-city",
  "https://www.capitalmotorcars.com/audi-lease-deals-paramus",
  "https://www.capitalmotorcars.com/lexus-lease-deals-marlton",

  // 5. Blogs
  "https://www.capitalmotorcars.com/toyota-prius-reliability",
  "https://www.capitalmotorcars.com/best-hybrid-suvs-lease",
  "https://www.capitalmotorcars.com/what-does-a-zero-down-lease-really-mean",
  "https://www.capitalmotorcars.com/mazda-cx-30-reliability",
  "https://www.capitalmotorcars.com/are-fiats-good-cars",
  "https://www.capitalmotorcars.com/wheel-squeaks-when-driving",
  "https://www.capitalmotorcars.com/audi-a3-reliability-guide",
  "https://www.capitalmotorcars.com/car-key-not-working-in-ignition",
  "https://www.capitalmotorcars.com/are-jaguars-good-cars",

  // 6. Vehicles
  "https://www.capitalmotorcars.com/vehicles/acura-integra",
  "https://www.capitalmotorcars.com/vehicles/bmw-x5",
  "https://www.capitalmotorcars.com/vehicles/luxury"
];

async function run() {
  const token = await getAccessToken();
  console.log(`Auditing ${auditUrls.length} key URLs from repository in Google Search Console...\n`);

  const summary = {};
  const issues = [];

  for (let i = 0; i < auditUrls.length; i++) {
    const url = auditUrls[i];
    const pathName = url.replace("https://www.capitalmotorcars.com", "");
    try {
      const res = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inspectionUrl: url,
          siteUrl: "https://www.capitalmotorcars.com/"
        }),
        signal: AbortSignal.timeout(8000)
      });

      if (!res.ok) {
        console.log(`[${i+1}/${auditUrls.length}] ❌ ${pathName} -> HTTP ${res.status}`);
        continue;
      }

      const data = await res.json();
      const r = data.inspectionResult?.indexStatusResult || {};
      const verdict = r.verdict || "UNKNOWN";
      const state = r.coverageState || "Unknown State";
      const crawl = r.lastCrawlTime ? r.lastCrawlTime.slice(0, 10) : "Never";

      summary[state] = (summary[state] || 0) + 1;

      const icon = verdict === "PASS" ? "✅" : (state.includes("indexed") ? "⚠️" : "ℹ️");
      console.log(`[${i+1}/${auditUrls.length}] ${icon} ${verdict.padEnd(7)} | ${state.padEnd(35)} | Crawl: ${crawl} | ${pathName}`);

      if (verdict !== "PASS") {
        issues.push({
          url: pathName,
          verdict,
          state,
          crawl,
          googleCanonical: r.googleCanonical,
          userCanonical: r.userCanonical
        });
      }
    } catch (e) {
      console.log(`[${i+1}/${auditUrls.length}] ⚠️ Error inspecting ${pathName}: ${e.message}`);
    }
  }

  console.log("\n==============================");
  console.log("AUDIT COVERAGE BREAKDOWN:");
  console.table(summary);

  if (issues.length > 0) {
    console.log("\nURLS WITH NON-PASS STATUS IN GSC:");
    issues.forEach(iss => {
      console.log(`- ${iss.url}: [${iss.verdict}] ${iss.state} (Last Crawl: ${iss.crawl})`);
      if (iss.googleCanonical && iss.googleCanonical !== iss.userCanonical) {
        console.log(`  Canonical Mismatch: Google=${iss.googleCanonical} vs User=${iss.userCanonical}`);
      }
    });
  } else {
    console.log("\n✅ All tested repository URLs are PASS (Submitted and indexed)!");
  }
}

run();
