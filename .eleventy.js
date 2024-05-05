import extractExcerpt from "./src/11ty/extract_excerpt.cjs";
import imageUrl from "./src/11ty/image_url.cjs";
import minifyHtml from "./src/11ty/minify_html.cjs";
import pluginRss from "@11ty/eleventy-plugin-rss";
import similarPosts from "./src/11ty/similar_posts.cjs";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import trackingScript from "./src/11ty/tracking_script.cjs";
import typeCollection from "./src/11ty/type_collection.cjs";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyVitePlugin);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    extensions: "html",

    cacheOptions: {
      duration: "10y",
    },
    formats: ["webp", "jpeg"],

    widths: ["auto"],

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

  eleventyConfig.addFilter("similarPosts", similarPosts);

  eleventyConfig.addShortcode("excerpt", extractExcerpt);
  eleventyConfig.addShortcode("image_url", imageUrl.shortcode);
  eleventyConfig.addShortcode("tracking_script", trackingScript);

  return {
    dir: {
      input: "src/site",
      includes: "_includes",
      output: "dist",
    },
  };
}
