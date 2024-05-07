const Image = require("@11ty/eleventy-img");

const shortcode = async function (imagePath, sharing) {
  try {
    let stats = await Image(imagePath, {
      formats: ["jpeg"],
      widths: [1200],
      cacheOptions: {
        duration: "10y",
      },
    });

    return stats.jpeg[0].url;
  } catch (error) {
    console.error(error);
    return "";
  }
};

module.exports = {
  shortcode,
};
