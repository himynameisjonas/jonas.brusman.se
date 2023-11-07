const Image = require("@11ty/eleventy-img");

module.exports = async function (imagePath, alt, imgClass, sizes = "(max-width: 1000px) 100vw, 133vh") {
  const widths = [800, 1200, 2000, 3000, 4000];
  let stats = await Image(imagePath, {
    widths,
    cacheOptions: {
      duration: "10y",
    }
  });

  largestVariant = stats.jpeg[stats.jpeg.length - 1];

  return `<picture>
    <source
      type="image/webp"
      sizes="${sizes}"
      srcset="${stats.webp.map(entry => entry.srcset).join(", ")}" />
    <img
      srcset="${stats.jpeg.map(entry => entry.srcset).join(", ")}"
      sizes="${sizes}"
      src="${largestVariant.url}"
      alt="${alt}"
      class="${imgClass}"
      width="${largestVariant.width}"
      height="${largestVariant.height}"
      loading="lazy"
  />
  </picture>`
}
