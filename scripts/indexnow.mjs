/*
  Tells IndexNow search engines (Bing, Yandex, Seznam, Naver) that pages are
  new or changed, so they crawl them now instead of whenever they get round
  to it. Bing's index is what ChatGPT search draws on.

  Run after a deploy has finished:      npm run indexnow
  See what would be sent, send nothing: npm run indexnow -- --dry
  Send only some pages:                 npm run indexnow -- /blog/some-post

  Google does not use IndexNow. For Google, add the site in Search Console,
  submit the sitemap, and use URL Inspection > Request indexing per page.
*/
const HOST = "boobesh.com";
const KEY = "a6dd9101a801d293810c947819b8cf09";
const args = process.argv.slice(2);
const dry = args.includes("--dry");
const only = args.filter((a) => a.startsWith("/"));

async function urls() {
  if (only.length) return only.map((p) => `https://${HOST}${p}`);
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  if (!res.ok) throw new Error(`could not read the live sitemap (${res.status})`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const urlList = await urls();
console.log(`${urlList.length} url(s):`);
urlList.forEach((u) => console.log("  " + u));
if (dry) process.exit(0);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
});
// 200 and 202 both mean accepted. 403 means the key file is not live yet.
console.log(`IndexNow replied ${res.status} ${res.statusText}`);
process.exit(res.status === 200 || res.status === 202 ? 0 : 1);
