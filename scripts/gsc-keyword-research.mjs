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

const siteUrl = "https://www.capitalmotorcars.com/";
const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;

async function fetchSearchAnalytics(options) {
  const token = await getAccessToken();
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(options)
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GSC API Error ${res.status}: ${err}`);
  }
  return await res.json();
}

async function main() {
  const now = new Date();
  const endDate = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]; // GSC has ~3 day lag
  const startDate90 = new Date(now.getTime() - 93 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  const startDate28 = new Date(now.getTime() - 31 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  console.log(`Querying GSC API for ${siteUrl}`);
  console.log(`Date range: ${startDate90} to ${endDate}\n`);

  // 1. Overall stats
  const totalsRes = await fetchSearchAnalytics({
    startDate: startDate90,
    endDate: endDate,
    type: "web"
  });

  // 2. Query dimension (last 90 days, limit 5000)
  const queriesRes = await fetchSearchAnalytics({
    startDate: startDate90,
    endDate: endDate,
    dimensions: ["query"],
    rowLimit: 5000,
    type: "web"
  });

  // 3. Query + Page dimension
  const queryPagesRes = await fetchSearchAnalytics({
    startDate: startDate90,
    endDate: endDate,
    dimensions: ["query", "page"],
    rowLimit: 5000,
    type: "web"
  });

  // 4. Page dimension
  const pagesRes = await fetchSearchAnalytics({
    startDate: startDate90,
    endDate: endDate,
    dimensions: ["page"],
    rowLimit: 500,
    type: "web"
  });

  const allQueries = (queriesRes.rows || []).map(r => ({
    query: r.keys[0],
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: (r.ctr * 100).toFixed(2) + "%",
    ctrNum: r.ctr,
    position: r.position.toFixed(1)
  }));

  const allQueryPages = (queryPagesRes.rows || []).map(r => ({
    query: r.keys[0],
    page: r.keys[1],
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: (r.ctr * 100).toFixed(2) + "%",
    position: r.position.toFixed(1)
  }));

  console.log(`Total queries found: ${allQueries.length}`);

  // Sort by impressions
  const topByImpressions = [...allQueries].sort((a, b) => b.impressions - a.impressions).slice(0, 30);
  
  // Sort by clicks
  const topByClicks = [...allQueries].sort((a, b) => b.clicks - a.clicks).slice(0, 30);

  // Striking distance: Position between 4.0 and 20.0 with impressions >= 10
  const strikingDistance = allQueries
    .filter(q => parseFloat(q.position) >= 4.0 && parseFloat(q.position) <= 20.0 && q.impressions >= 10)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 40);

  // High commercial intent: "lease", "broker", "deals", "zero down", "special"
  const commercialQueries = allQueries
    .filter(q => /lease|broker|deal|zero down|\$0 down|special|monthly|price|cost/i.test(q.query))
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 40);

  // Question & Problem queries (e.g. why, how, what, problem, reliability, squeak, issue)
  const questionProblemQueries = allQueries
    .filter(q => /how|what|why|problem|issue|squeak|reliable|reliability|review|difference|best|worth/i.test(q.query))
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 40);

  // Save full raw data to JSON file for analysis
  fs.writeFileSync("scripts/gsc-data.json", JSON.stringify({
    dateRange: { start: startDate90, end: endDate },
    totals: totalsRes.rows,
    topByClicks,
    topByImpressions,
    strikingDistance,
    commercialQueries,
    questionProblemQueries,
    topPages: pagesRes.rows?.slice(0, 30) || [],
    allQueryPages: allQueryPages.slice(0, 100)
  }, null, 2));

  console.log("\n--- TOP 15 QUERIES BY IMPRESSIONS ---");
  console.table(topByImpressions.slice(0, 15));

  console.log("\n--- TOP 15 QUERIES BY CLICKS ---");
  console.table(topByClicks.slice(0, 15));

  console.log("\n--- TOP 15 STRIKING DISTANCE OPPORTUNITIES (Pos 4 - 20) ---");
  console.table(strikingDistance.slice(0, 15));

  console.log("\n--- TOP 15 COMMERCIAL LEASE INTENT QUERIES ---");
  console.table(commercialQueries.slice(0, 15));

  console.log("\n--- TOP 15 INFORMATIONAL / PROBLEM QUERIES ---");
  console.table(questionProblemQueries.slice(0, 15));
}

main().catch(console.error);
