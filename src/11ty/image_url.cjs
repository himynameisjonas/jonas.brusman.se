const Image = require("@11ty/eleventy-img");

const imageUrl = async function (imagePath, sharing) {
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

const lightboxLink = async function (content, imagePath) {
  try {
    let stats = await Image(imagePath, {
      formats: ["jpeg"],
      widths: [3000],
      cacheOptions: {
        duration: "10y",
      },
    });
    return `
      <a href="${stats.jpeg[0].url}" data-pswp-width="${stats.jpeg[0].width}" data-pswp-height="${stats.jpeg[0].height}">
      ${content}
      </a>`;
  } catch (error) {
    console.error(error);
    return {};
  }
};

module.exports = {
  imageUrl,
  lightboxLink,
};
