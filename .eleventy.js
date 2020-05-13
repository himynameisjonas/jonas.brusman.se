const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addShortcode("responsiveImage", async function (src, alt) {
    let options = {
      widths: [500, 1000, 2000, 3000, 4000],
      outputDir: "_site/img",
      formats: ["jpeg"],
    };
    let stats = await Image(src, options);
    let lowestSrc = stats.jpeg[0];
    let sizes = "100vw";

    if (alt === undefined) {
      throw new Error(`Missing \`alt\` on responsiveImage from: ${src}`);
    }

    return `<picture>
        ${Object.values(stats)
          .map((imageFormat) => {
            return `  <source type="image/${
              imageFormat[0].format
            }" srcset="${imageFormat
              .map((entry) => `${entry.url} ${entry.width}w`)
              .join(", ")}" sizes="${sizes}">`;
          })
          .join("\n")}
  <img
    alt="${alt}"
    src="${lowestSrc.url}"
</picture>`;
  });
};
