const Image = require("@11ty/eleventy-img");


const url = async function (path, {width}) {

  let stats = await Image(path, {
    widths: [width],
  });

  return stats.jpeg[0].url;
}

const shortcode = async function (imagePath, sharing) {
    return url(imagePath,
      {
        width: 1200,
      },
    );

}

module.exports = {
  url,
  shortcode
}
