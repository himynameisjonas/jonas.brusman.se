module.exports = {
  eleventyComputed: {
    blogPostType: (data) => (data.photos ? "photo" : "article"),
    mastodonPost: (data) => {
      return data.syndications?.find((syndication) =>
        syndication.includes("tacocat.space"),
      );
    },
  },
};
