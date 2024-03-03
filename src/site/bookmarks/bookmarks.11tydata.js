const slugify = require("slugify");

module.exports = {
  layout: "bookmark.liquid",
  tags: ["blogPost"],
  blogPostType: "bookmark",
  eleventyComputed: {
    permalink: (data) => {
      const date = new Date(data.date).toISOString().substring(0, 10);
      const slug = slugify(data.prettyUrl.replace(/[\.\/]/g, "-"), {
        lower: true,
        strict: true,
      });
      return `bookmarks/${date}-${slug}/index.html`;
    },
    prettyUrl: (data) => {
      let url = data.link;
      if (!url) {
        return "";
      }
      url = url.replace(/(^\w+:|^)\/\//, "");
      numberOfSlashes = (url.match(/\//g) || []).length;
      if (numberOfSlashes == 1) {
        url = url.replace(/\/$/, "");
      }
      return url;
    },
  },
};
