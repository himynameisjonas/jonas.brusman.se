const extractExcerpt = require("./src/11ty/extract_excerpt");
const imageUrl = require("./src/11ty/image_url");
const minifyHtml = require("./src/11ty/minify_html");
const pictureElement = require("./src/11ty/picture_element");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const similarPosts = require("./src/11ty/similar_posts");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const trackingScript = require("./src/11ty/tracking_script");
const typeCollection = require("./src/11ty/type_collection");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addPassthroughCopy("./src/site/css");
  eleventyConfig.addPassthroughCopy("./img");
  eleventyConfig.addPassthroughCopy("./src/site/js");
  eleventyConfig.addPassthroughCopy({ "./src/site/misc": "./" });
  eleventyConfig.addPassthroughCopy("./_redirects");

  eleventyConfig.addTransform("minifyHtml", minifyHtml);

  eleventyConfig.addCollection("notes", typeCollection("note"));
  eleventyConfig.addCollection("photos", typeCollection("photo"));
  eleventyConfig.addCollection("bookmarks", typeCollection("bookmark"));

  eleventyConfig.addFilter("similarPosts", similarPosts);

  eleventyConfig.addShortcode("excerpt", extractExcerpt);
  eleventyConfig.addShortcode("image_url", imageUrl.shortcode);
  eleventyConfig.addShortcode("picture_element", pictureElement);
  eleventyConfig.addShortcode("tracking_script", trackingScript);

  return {
    dir: {
      input: "src/site",
      includes: "_includes",
      output: "dist",
    },
  };
};
