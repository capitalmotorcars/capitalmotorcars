import fs from "fs";
import path from "path";

const key = "c4b18e7d2f9a461e89b4a1c5d7e3f890";
const host = "www.capitalmotorcars.com";
const keyLocation = `https://${host}/${key}.txt`;

// Extract all URLs from public/sitemap.xml
const sitemapContent = fs.readFileSync("public/sitemap.xml", "utf8");
const locMatches = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)];
const urls = locMatches.map(m => m[1]);

console.log(`Found ${urls.length} URLs in sitemap to submit via IndexNow...`);

async function submitIndexNow() {
  const payload = {
    host,
    key,
    keyLocation,
    urlList: urls
  };

  const endpoints = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow"
  ];

  for (const endpoint of endpoints) {
    console.log(`Submitting to ${endpoint}...`);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(payload)
      });

      console.log(`Response status: ${res.status} ${res.statusText}`);
      if (res.status === 200 || res.status === 202) {
        console.log(`✅ Successfully submitted ${urls.length} URLs to ${endpoint}!`);
      } else {
        const body = await res.text();
        console.log(`Notice/Response from ${endpoint}:`, body);
      }
    } catch (err) {
      console.error(`Error connecting to ${endpoint}:`, err.message);
    }
  }
}

submitIndexNow();
