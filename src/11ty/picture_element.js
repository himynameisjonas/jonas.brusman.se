const Image = require("@11ty/eleventy-img");

module.exports = async function (imagePath, alt, imgClass) {
  const widths = [500, 1000, 2000, 3000, 4000];
  let stats = await Image(imagePath, {
    widths
  });

  return `<img
  class="${imgClass}"
  alt="${alt}"
  src="${stats.jpeg[0].url}"
  sizes="(max-width: 1000px) 100vw, 133vh"
  srcset="${stats.jpeg.map(entry => entry.srcset).join(", ")}"
  />`;
}
