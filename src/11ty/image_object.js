import Image, { generateHTML } from "@11ty/eleventy-img";

export const imageObject = async function (imagePath, imgAttributes) {
  let stats = await Image(imagePath, {
    formats: ["webp", "jpeg"],
    widths: [800, 1200, 2000, 3000, 4000],
    cacheOptions: {
      duration: "10y",
    },

    // htmlOptions:
    sharpOptions: {
      animated: true,
    },
  });

  return {
    stats,
    html: generateHTML(
      stats,
      {},
      {
        imgAttributes: Object.assign(
          {
            alt: "",
            loading: "lazy",
            decoding: "async",
          },
          imgAttributes,
        ),
        fallback: "largest",
      },
    ),
  };
};

export const lightboxLink = async function (content, stats) {
  let variant = stats.webp[stats.webp.length - 1];
  return `
      <a href="${variant.url}" data-pswp-width="${variant.width}" data-pswp-height="${variant.height}">
      ${content}
      </a>`;
};
