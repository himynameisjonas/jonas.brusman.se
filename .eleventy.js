const imageUrl = function (path, {width, height, resize}) {
  params = [`nf_resize=${resize || 'fit'}`]
  if (width) {
    params.push(`w=${width}`)
  }
  if (height) {
    params.push(`h=${height}`)
  }
  return `${path}?${params.join('&')}`
};

module.exports = function (eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPassthroughCopy("./src/site/images");
  eleventyConfig.addPassthroughCopy("./src/site/css");

  eleventyConfig.addShortcode("image_url", function (imagePath) {
    return imageUrl(imagePath,
      {
        resize: "smartcrop",
        width: 500,
        height: 333
      },
    );
  });

  eleventyConfig.addShortcode("responsive_image", function (imagePath) {
    const widths = [500, 1000, 2000, 3000, 4000];

    return `<picture class="m-2"><img
    class="max-h-screen"
    alt=""
    src="${imageUrl(imagePath, { width: widths[0] })}"
    sizes="(max-width: 1000px) 99vw, 150vh"
    srcset="${widths
      .map(
        (width) =>
          `${imageUrl(imagePath,
            { width },
          )} ${width}w`
      )
      .join(", ")}"
    /></picture>`;
  });

  return {
    dir: {
      input: "src/site",
      includes: "_includes",
      output: "dist",
    },
    passthroughFileCopy: true,
  };
};
