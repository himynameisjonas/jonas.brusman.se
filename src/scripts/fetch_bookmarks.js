const fs = require("fs");
const YAML = require("yaml");

async function fetchBookmarks() {
  const collectionId = "40993303";
  const token = "b0e554ff-80ad-42eb-a06f-6c840479e9b1";
  const url = `https://api.raindrop.io/rest/v1/raindrops/${collectionId}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(url, options)
    .then((response) => response.json())
    .then((data) => data.items)
    .catch((error) => console.error(error));
}

async function createPost(bookmark) {
  const date = new Date(bookmark.created).toISOString().substring(0, 10);
  const permalink = [date, bookmark._id].filter(Boolean).join("-");
  const body = bookmark.note;
  const yaml = YAML.stringify({
    title: bookmark.title,
    date,
    linkTags: bookmark.tags,
    link: bookmark.link,
    excerpt: bookmark.excerpt,
  });
  const content = `---\n${yaml}---\n\n${body}`;

  fs.writeFileSync(`./src/site/bookmarks/${permalink}.md`, content);
}

async function main() {
  const bookmarks = await fetchBookmarks();
  console.log(bookmarks);
  bookmarks.forEach((link) => {
    createPost(link);
  });
}

main();
