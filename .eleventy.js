const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { JSDOM } = require('jsdom');
const striptags = require("striptags");
const minify = require("html-minifier").minify;

const internal = /^\/images\/.*/i;

const imageUrl = function (path, {width, height, resize}) {
  params = [`nf_resize=${resize || 'fit'}`]
  if (width) {
    params.push(`w=${width}`)
  }
  if (height) {
    params.push(`h=${height}`)
  }
  process.env.IMAGE_HOST = "https://jonas-images.brusman.se"
  if (process.env.IMAGE_HOST) {
    return `${process.env.IMAGE_HOST}${path}?${params.join('&amp;')}`

  } else {
    return `${path}?${params.join('&amp;')}`
  }
};

const lqip = require('lqip-modern');
const shorthash = require("short-hash");
const {AssetCache} = require("@11ty/eleventy-cache-assets");
const getLqip = async function (url) {
  let asset = new AssetCache(`lqip-${shorthash(url)}`);
  if(asset.isCacheValid("2y")) {
    return asset.getCachedValue()
  }
  if (internal.test(url)) {
    url = `./src/site${url}`
  }
  let result = await lqip(url)
  await asset.save(result.metadata, "json");

  return result.metadata
};

const processImage = async img => {
  const srcsetRegex = /\/images\//gi
  const src = img.getAttribute('src');
  const srcset = img.getAttribute('srcset');

  if (internal.test(src)) {
    img.setAttribute('src', `${process.env.IMAGE_HOST}${src}`);
  }

  if (internal.test(srcset)) {
    img.setAttribute('srcset', srcset.replace(srcsetRegex, `${process.env.IMAGE_HOST}/images/`));
  }

  return img
}

const addImageHosts = async (rawContent, outputPath) => {
  let selector = 'img'
  let content = rawContent;
  if (process.env.IMAGE_HOST && outputPath.endsWith('.html')) {

    const dom = new JSDOM(content);
    const images = [...dom.window.document.querySelectorAll(selector)];

    if (images.length > 0) {
      await Promise.all(images.map(i => processImage(i)));
      content = dom.serialize();
    }
  }

  return content;
};


function extractExcerpt(fallbacks) {
  let content = fallbacks.filter((s)=>
     s && typeof s === 'string' && s.trim() !== ""
  )[0]
  if(content) {
    excerpt = striptags(content)
    .replace(/^\\s+|\\s+$|\\s+(?=\\s)/g, "")
    .replace(/\s+/g, " ")
    .trim()
    return excerpt;
    }
}

const minifyHtml = (rawContent, outputPath) => {
  let content = rawContent;
  if (outputPath && outputPath.endsWith(".html")) {
    content = minify(content, {
      removeAttributeQuotes: true,
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      removeComments: true,
      sortClassName: true,
      sortAttributes: true,
      html5: true,
      decodeEntities: true,
      removeOptionalTags: true,
    });
  }
  return content;
};



module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPassthroughCopy("./src/site/images");
  eleventyConfig.addPassthroughCopy("./src/site/css");
  eleventyConfig.addPassthroughCopy("./src/site/js");

  eleventyConfig.addTransform('imagehost', addImageHosts);
  eleventyConfig.addTransform('minifyHtml', minifyHtml);


  eleventyConfig.addShortcode("excerpt", (...fallbacks) => extractExcerpt(fallbacks));

  eleventyConfig.addShortcode("image_url", function (imagePath, sharing) {
    if (sharing) {
      return imageUrl(imagePath,
        {
          resize: "smartcrop",
          width: 1200,
          height: 630
        },
      );

    } else {
      return imageUrl(imagePath,
        {
          resize: "smartcrop",
          width: 500,
          height: 333
        },
      );
    }
  });

  eleventyConfig.addShortcode("tracking_script", function () {
    if(process.env.NETLIFY) {
      return '<script data-goatcounter="https://brusman_se.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>'
    }
  });

  eleventyConfig.addShortcode("picture_element", async function (imagePath, alt) {
    const widths = [1000, 2000, 3000, 4000];
    const {originalWidth, originalHeight, dataURIBase64} = await getLqip(imagePath)
    console.log('hej', {originalWidth, originalHeight, dataURIBase64})

    return `<picture class="m-2 overflow-hidden"><img
    class="lazyload blur-up max-h-screen object-contain"
    alt="${alt}"
    width="${originalWidth}"
    height="${originalHeight}"
    src="${dataURIBase64}"
    data-sizes="(max-width: 1000px) 99vw, 150vh"
    data-srcset="${widths
      .map(
        (width) =>
          `${imageUrl(imagePath,
            { width },
          )} ${width}w`
      )
      .join(", ")}"
    /></picture>`;
  });

  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addCollection("photos", function(collectionApi) {
    return collectionApi.getFilteredByTag("entries").filter(function(item) {
      return "photos" in item.data;
    });
  });

  eleventyConfig.addCollection("notes", function(collectionApi) {
    return collectionApi.getFilteredByTag("entries").filter(function(item) {
      return !("photos" in item.data);
    });
  });


  return {
    dir: {
      input: "src/site",
      includes: "_includes",
      output: "dist",
    },
    passthroughFileCopy: true,
  };
};
