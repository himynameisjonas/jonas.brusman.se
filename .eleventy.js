const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { JSDOM } = require('jsdom');
const striptags = require("striptags");

const imageUrl = function (path, {width, height, resize}) {
  params = [`nf_resize=${resize || 'fit'}`]
  if (width) {
    params.push(`w=${width}`)
  }
  if (height) {
    params.push(`h=${height}`)
  }
  if (process.env.IMAGE_HOST) {
    return `${process.env.IMAGE_HOST}${path}?${params.join('&amp;')}`

  } else {
    return `${path}?${params.join('&amp;')}`
  }
};

const processImage = async img => {
  const internal = /^\/images\/.*/i;
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
  let content = fallbacks.filter(Boolean)[0]
  if(content) {
    excerpt = striptags(content)
      .replace(/^\\s+|\\s+$|\\s+(?=\\s)/g, "")
      .replace(/\s+/g, " ")
      .trim()
    return excerpt;
  }
}



module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPassthroughCopy("./src/site/images");
  eleventyConfig.addPassthroughCopy("./src/site/css");

  eleventyConfig.addTransform('imagehost', addImageHosts);

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

  eleventyConfig.addShortcode("dump", function () {
    console.log('hejhej',arguments)
  })
  eleventyConfig.addShortcode("responsive_image", function (imagePath) {
    const widths = [500, 1000, 2000, 3000, 4000];

    return `<picture class="m-2"><img
    class="max-h-screen"
    alt=""
    src="${imageUrl(imagePath, { width: widths[0] })}"
    sizes="(max-width: 1000px) 99vw, 150vh"
    srcset="${widths
      .map(
        (width) =>
          `${imageUrl(imagePath,
            { width },
          )} ${width}w`
      )
      .join(", ")}"
    /></picture>`;
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
