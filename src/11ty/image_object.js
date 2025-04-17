import Image, { generateHTML } from "@11ty/eleventy-img";

export const imageObject = async function (imagePath, imgAttributes) {
  let stats = await Image(imagePath, {
    formats: ["webp", "jpeg"],
    widths: [800, 1200, 2000, 3000, 4000],
    cacheOptions: {
      duration: "10y",
    },

    sharpOptions: {
      animated: true,
    },
  });

  return {
    stats,
  };
};

export const imageHtml = async function (
  stats,
  variant,
  alt = "",
  loading = "lazy",
) {
  let imgAttributes = {
    alt: alt,
    loading,
    decoding: "async",
  };
  let fallback = "largest";

  switch (variant) {
    case "blog_post":
      imgAttributes.class =
        "u-photo ml-0 block max-h-screen w-auto bg-transparent object-contain pb-4 lg:pb-6";
      imgAttributes.sizes = "(max-width: 1000px) 100vw, 133vh";
      imgAttributes.loading = "eager";
      break;
    case "list_photos_post_large":
      imgAttributes.class =
        "absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105";
      imgAttributes.sizes = "(max-width: 640px) calc(100vw - 32px), 436px";
      break;
    case "list_photos_post_small":
      imgAttributes.class =
        "absolute inset-0 h-full w-full bg-gray-500 object-cover transition-transform duration-700 ease-out group-hover:scale-105";
      imgAttributes.sizes =
        "(min-width: 1700px) 103px, (min-width: 1040px) 140px, (min-width: 780px) calc(1.67vw + 102px), (min-width: 640px) 187px, calc(33.44vw - 16px)";

      break;
  }

  return generateHTML(
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
      fallback,
    },
  );
};

export const lightboxLink = async function (content, stats) {
  let variant = stats.webp[stats.webp.length - 1];
  return `
      <a href="${variant.url}" data-pswp-width="${variant.width}" data-pswp-height="${variant.height}">
      ${content}
      </a>`;
};
