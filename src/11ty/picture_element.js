const Image = require("@11ty/eleventy-img");

module.exports = async function (imagePath, alt, imgClass) {
  const widths = [500, 1200, 2000, 3000, 4000];
  let stats = await Image(imagePath, {
    widths
  });

  largestVariant = stats.jpeg[stats.jpeg.length - 1];

  return `<img
  class="${imgClass}"
  alt="${alt}"
  src="${largestVariant.url}"
  width="${largestVariant.width}"
  height="${largestVariant.height}"
  sizes="(max-width: 1000px) 100vw, 133vh"
  srcset="${stats.jpeg.map(entry => entry.srcset).join(", ")}"
  />`;
}
