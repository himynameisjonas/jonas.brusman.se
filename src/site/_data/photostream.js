import eleventyFetch from "@11ty/eleventy-fetch";

// The photos now live on photos.brusman.se (the photostream app). The home page
// features the newest journal (a written photo story) plus a few of the latest
// individual photos, pulled from photostream's Atom feeds at build time — so
// it's plain static HTML once built, no client JS.
//
// The latest photos are often the same shots as the newest journal, so the grid
// is deduped against the featured journal's images — nothing shows twice.
//
// Returns { journal, photos, ok }. Tiered so a build never blanks: fresh (1h
// cache) -> last cached copy -> empty (template shows a plain "moved" card).
const FEED_URL = "https://photos.brusman.se/feed.xml";
const JOURNALS_URL = "https://photos.brusman.se/journals.xml";
const GRID_COUNT = 4;

async function fetchText(url, duration) {
  return eleventyFetch(url, {
    directory: ".cache",
    duration,
    type: "text",
    fetchOptions: { headers: { Accept: "application/atom+xml, application/xml" } },
  });
}

// Self-authored feeds, so only the handful of entities the renderer emits.
function decodeText(s) {
  return s
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

// Each Atom <entry> carries CDATA-wrapped HTML content, so a small per-entry
// extraction is enough — no XML parser dependency.
function photosFrom(xml) {
  return xml
    .split("<entry>")
    .slice(1)
    .map((entry) => ({
      href: entry.match(/<link[^>]+href="([^"]+)"/)?.[1],
      date: entry.match(/<title>([^<]*)<\/title>/)?.[1]?.trim(),
      img: entry.match(/<img[^>]+src="([^"]+)"/)?.[1],
      alt: entry.match(/<img[^>]+alt="([^"]*)"/)?.[1] ?? "",
    }))
    .filter((p) => p.href && p.img);
}

function latestJournalFrom(xml) {
  const entry = xml.split("<entry>")[1];
  if (!entry) return null;
  const content = entry.match(/<content[^>]*>([\s\S]*?)<\/content>/)?.[1] ?? "";
  const imgs = [...content.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]);
  const href = entry.match(/<link[^>]+href="([^"]+)"/)?.[1];
  if (!href || imgs.length === 0) return null;
  // First non-empty paragraph = the intro prose (skip the image-only <p>s).
  const intro = [...content.matchAll(/<p>([\s\S]*?)<\/p>/g)]
    .map((m) => decodeText(m[1].replace(/<[^>]+>/g, "")).trim())
    .find((t) => t.length > 0);
  return {
    href,
    title: entry.match(/<title>([^<]*)<\/title>/)?.[1]?.trim(),
    date: entry.match(/<updated>([^<]*)<\/updated>/)?.[1]?.slice(0, 10),
    intro,
    img: imgs[0],
    alt: content.match(/<img[^>]+alt="([^"]*)"/)?.[1] ?? "",
    imgs,
  };
}

async function load(duration) {
  const [feedXml, journalXml] = await Promise.all([
    fetchText(FEED_URL, duration),
    fetchText(JOURNALS_URL, duration).catch(() => ""), // journal is a bonus, not required
  ]);
  const journal = journalXml ? latestJournalFrom(journalXml) : null;
  const used = new Set(journal?.imgs ?? []);
  const photos = photosFrom(feedXml).filter((p) => !used.has(p.img)).slice(0, GRID_COUNT);
  return { journal, photos, ok: true };
}

export default async function () {
  try {
    return await load("1h");
  } catch (fresh) {
    try {
      return { ...(await load("*")), stale: true };
    } catch {
      console.log(`photostream feeds unavailable: ${fresh.message || fresh}`);
      return { journal: null, photos: [], ok: false };
    }
  }
}
