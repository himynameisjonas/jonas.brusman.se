module.exports = function (eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPassthroughCopy("images");

  eleventyConfig.addShortcode("imagekit", function (imagePath) {
    const widths = [500, 1000, 2000, 3000, 4000];
    let url = `https://ik.imagekit.io/ajpslbffpp${imagePath}`;

    return `<picture><img
    alt=""
    src="${url}?tr=w-${widths[0]},c-at_max"
    sizes="(max-width: 1000px) 99vw, 150vh"
    srcset="${widths
      .map((width) => `${url}?tr=w-${width},c-at_max ${width}w`)
      .join(", ")}"
    /></picture>`;
  });
};
