import fs from "fs";
import os from "os";
import path from "path";

const credsPath = path.join(os.homedir(), ".config/gsc/credentials.json");

if (!fs.existsSync(credsPath)) {
  console.error("GSC credentials not found at:", credsPath);
  process.exit(1);
}

const creds = JSON.parse(fs.readFileSync(credsPath, "utf8"));

async function getAccessToken() {
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
  if (!tokenData.access_token) {
    throw new Error("Failed to refresh token: " + JSON.stringify(tokenData));
  }
  return tokenData.access_token;
}

async function submitSitemap() {
  const token = await getAccessToken();
  const siteUrl = encodeURIComponent("https://www.capitalmotorcars.com/");
  const feedpath = encodeURIComponent("https://www.capitalmotorcars.com/sitemap.xml");

  console.log("Submitting sitemap to Google Search Console...");
  const putRes = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${siteUrl}/sitemaps/${feedpath}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` }
  });

  if (putRes.status === 204 || putRes.status === 200) {
    console.log("✅ Sitemap successfully submitted to Google Search Console!");
  } else {
    const errorText = await putRes.text();
    console.error(`Failed to submit sitemap (HTTP ${putRes.status}):`, errorText);
  }

  console.log("\nFetching current sitemap status in GSC...");
  const getRes = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${siteUrl}/sitemaps/${feedpath}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await getRes.json();
  console.log(JSON.stringify(data, null, 2));
}

submitSitemap().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
