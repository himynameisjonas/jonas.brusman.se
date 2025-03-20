import extractExcerpt from "./src/11ty/extract_excerpt.cjs";
import { imageUrl, lightboxLink } from "./src/11ty/image_url.cjs";
import minifyHtml from "./src/11ty/minify_html.cjs";
import pluginRss from "@11ty/eleventy-plugin-rss";
import similarPosts from "./src/11ty/similar_posts.cjs";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import trackingScript from "./src/11ty/tracking_script.cjs";
import webmentions from "./src/11ty/webmentions.cjs";
import typeCollection from "./src/11ty/type_collection.cjs";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      build: {
        rollupOptions: {
          output: {
            assetFileNames: (assetInfo) => {
              const imageExtensions = [
                ".webp",
                ".jpeg",
                ".png",
                ".svg",
                ".gif",
                ".jpg",
              ];
              if (imageExtensions.some((ext) => assetInfo.name.endsWith(ext))) {
                return `img/${assetInfo.name}`;
              }
              return "assets/css/main.[hash].css";
            },
          },
        },
      },
    },
  });
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    extensions: "html",

    cacheOptions: {
      duration: "10y",
    },
    formats: ["webp", "jpeg"],

    widths: ["auto"],
    sharpOptions: {
      animated: true,
    },

    urlPath: "/img/",
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
    },
  });

  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addPassthroughCopy("./src/site/css");
  eleventyConfig.addPassthroughCopy("./src/site/js");
  eleventyConfig.addPassthroughCopy("./public");

  eleventyConfig.addTransform("minifyHtml", minifyHtml);

  eleventyConfig.addCollection("articles", typeCollection("article"));
  eleventyConfig.addCollection("photos", typeCollection("photo"));
  eleventyConfig.addCollection("tagList", (collection) => {
    const tagsSet = new Set();
    collection.getAll().forEach((item) => {
      if (!item.data.tags) return;
      item.data.tags
        .filter((tag) => !["posts", "all", "blogPost"].includes(tag))
        .forEach((tag) => {
          tagsSet.add(tag);
        });
    });
    return Array.from(tagsSet).sort();
  });

  eleventyConfig.addFilter("booksCurrentlyReading", function (books) {
    return books.filter((book) => {
      return book.status == "reading";
    });
  });

  eleventyConfig.addFilter("similarPosts", similarPosts);
  eleventyConfig.addFilter("getPostWebmentions", function (mentions, url) {
    const data = mentions.get(`https://jonas.brusman.se${url}`);
    return Boolean(data) ? data : undefined;
  });

  eleventyConfig.addShortcode("excerpt", extractExcerpt);

  eleventyConfig.addShortcode("image_url", imageUrl);
  eleventyConfig.addPairedShortcode("lightbox_link", lightboxLink);
  eleventyConfig.addShortcode("tracking_script", trackingScript);

  eleventyConfig.addShortcode("webmentionIcon", webmentions);

  return {
    dir: {
      input: "src/site",
      includes: "_includes",
      output: "dist",
    },
  };
}
