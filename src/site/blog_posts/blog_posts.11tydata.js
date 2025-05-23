import { imageObject } from "../../11ty/image_object.js";

export default {
  eleventyComputed: {
    photoObjects: async (data) => {
      if (!data.photos) return [];
      let objects = await Promise.all(
        data.photos.map((photo) => {
          console.log("generating photoObject for", photo);
          return imageObject(photo);
        }),
      );
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
