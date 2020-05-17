var ImageKit = require("imagekit");

var imagekit = new ImageKit({
  urlEndpoint: "https://ik.imagekit.io/ajpslbffpp/",
  publicKey: "public_rxF82vxrVjynTcVH8mQ4AdnILV0=",
  privateKey: "public_rxF82vxrVjynTcVH8mQ4AdnILV0=",
});

const imagekitUrl = function (path, transformation = []) {
  return imagekit.url({
    path,
    transformation,
  });
};

module.exports = function (eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("./src/site/css");

  eleventyConfig.addShortcode("image_url", function (imagePath) {
    return imagekitUrl(imagePath, [
      {
        aspectRatio: "3-2",
        width: 500,
      },
    ]);
  });

  eleventyConfig.addShortcode("responsive_image", function (imagePath) {
    const widths = [500, 1000, 2000, 3000, 4000];

    return `<picture><img
    alt=""
    src="${imagekitUrl(imagePath, [{ width: widths[0], crop: "at-max" }])}"
    sizes="(max-width: 1000px) 99vw, 150vh"
    srcset="${widths
      .map(
        (width) =>
          `${imagekitUrl(imagePath, [
            { width: width, crop: "at-max" },
          ])} ${width}w`
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
