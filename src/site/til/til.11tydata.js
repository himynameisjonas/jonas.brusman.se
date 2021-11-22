module.exports = {
  eleventyComputed: {
    permalink: function(data){
      return `til/${ this.slug(data.tags[1]) }/${ data.page.fileSlug }/index.html`
    },
  }
};
