const fs = require("fs");
const slugify = require("slugify");
require("dotenv").config();

async function fetchBookmarks() {
  let page = 0;
  const perPage = 50;
  let bookmarks = [];
  let items = await fetchPage(page, perPage);
  bookmarks = bookmarks.concat(items);
  while (items.length === perPage) {
    page++;
    items = await fetchPage(page, perPage);
    bookmarks = bookmarks.concat(items);
  }
  console.log(`Fetched ${bookmarks.length} bookmarks`);
  return bookmarks;
}

async function fetchPage(page, perPage) {
  console.log(`Fetching page ${page}`);
  const collectionId = process.env.RAINDROP_COLLECTION_ID;
  const token = process.env.RAINDROP_TOKEN;
  const url = `https://api.raindrop.io/rest/v1/raindrops/${collectionId}?perpage=${perPage}&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(url, options)
    .then((response) => response.json())
    .then((data) => data.items)
    .catch((error) => console.error(error));
}

function permalink(bookmark, prettyUrl) {
  const date = new Date(bookmark.created).toISOString().substring(0, 10);
  const slug = slugify(prettyUrl.replace(/[\.\/]/g, "-"), {
    lower: true,
    strict: true,
  });
  return `/bookmarks/${date}-${slug}/`;
}

function prettyUrl(bookmark) {
  let url = bookmark.link;
  url = url.replace(/(^\w+:|^)\/\//, "");
  numberOfSlashes = (url.match(/\//g) || []).length;
  if (numberOfSlashes == 1) {
    url = url.replace(/\/$/, "");
  }
  return url;
}

async function fetchAndSave() {
  const bookmarks = await fetchBookmarks();
  fs.writeFileSync(
    `./src/site/_data/bookmarks.json`,
    JSON.stringify(
      bookmarks.map((b) => {
        const prettyBookmarkUrl = prettyUrl(b);
        return {
          title: b.title,
          link: b.link,
          excerpt: b.excerpt,
          tags: b.tags,
          date: b.created,
          content: b.note,
          prettyUrl: prettyUrl(b),
          permalink: permalink(b, prettyBookmarkUrl),
        };
      }),
      null,
      2,
    ),
  );
}

fetchAndSave();
