module.exports = {
  eleventyComputed: {
    entryType: data => data.photos ? 'photo' : 'note'
  }
};
