module.exports = {
  eleventyComputed: {
    blogPostType: (data) => (data.photos ? "photo" : "note"),
  },
};
