const imageUrl = require("./image_url")

module.exports = function (imagePath, alt, imgClass) {
  const widths = [500, 1000, 2000, 3000, 4000];

  return `<picture class="m-2"><img
  class="${imgClass}"
  alt="${alt}"
  src="${imageUrl.url(imagePath, { width: widths[0] })}"
  sizes="(max-width: 1000px) 100vw, 133vh"
  srcset="${widths
    .map(
      (width) =>
        `${imageUrl.url(imagePath,
          { width },
        )} ${width}w`
    )
    .join(", ")}"
  /></picture>`;
}
