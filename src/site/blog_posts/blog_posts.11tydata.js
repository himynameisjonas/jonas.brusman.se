import { imageObject } from "../../11ty/image_object.js";

export default {
  eleventyComputed: {
    photoObjects: (data) => {
      if (!data.photos) return [];
      let objects = data.photos.map((photo) => {
        console.log("generating photoObject for", photo);
        return imageObject(photo, {
          alt: data.title,
          class:
            "u-photo ml-0 block max-h-screen w-auto bg-transparent object-contain pb-4 lg:pb-6",
        });
      });
      return objects;
    },
    blogPostType: (data) => (data.photos ? "photo" : "article"),
    mastodonPost: (data) => {
      return data.syndications?.find((syndication) =>
        syndication.includes("tacocat.space"),
      );
    },
    blueskyPost: (data) => {
      return data.syndications?.find((syndication) =>
        syndication.includes("bsky.app"),
      );
    },
  },
};
