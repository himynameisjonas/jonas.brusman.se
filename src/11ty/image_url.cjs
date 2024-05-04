const Image = require("@11ty/eleventy-img");

const shortcode = async function (imagePath, sharing) {
  let stats = await Image(imagePath, {
    formats: ["jpeg"],
    widths: [1200],
    cacheOptions: {
      duration: "10y",
    },
  });

  return stats.jpeg[0].url;
};

module.exports = {
  shortcode,
};
