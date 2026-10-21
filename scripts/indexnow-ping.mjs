import fs from 'fs';

const key = 'c4b18e7d2f9a461e89b4a1c5d7e3f890';
const host = 'www.capitalmotorcars.com';
const keyLocation = 'https://www.capitalmotorcars.com/' + key + '.txt';

const xml = fs.readFileSync('public/sitemap.xml', 'utf8');
const urls = [...xml.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)].map(m => m[1]);

console.log(`Sending all ${urls.length} URLs from sitemap.xml to IndexNow in bulk...`);

async function submitIndexNow() {
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: host,
        key: key,
        keyLocation: keyLocation,
        urlList: urls
      })
    });
    console.log(`IndexNow status: ${res.status}`);
    const text = await res.text();
    console.log(`IndexNow response: ${text || 'HTTP ' + res.status + ' OK (All ' + urls.length + ' URLs queued for indexing)'}`);
  } catch (err) {
    console.error('IndexNow submission error:', err);
  }
}

submitIndexNow();
