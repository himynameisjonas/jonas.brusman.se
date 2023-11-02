const Image = require("@11ty/eleventy-img");

const shortcode = async function (imagePath, sharing) {
  let stats = await Image(imagePath, {
    widths: [1200],
  });

  return stats.jpeg[0].url;

}

module.exports = {
  shortcode
}
