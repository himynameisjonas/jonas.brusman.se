const { JSDOM } = require('jsdom');

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

module.exports = async (rawContent, outputPath) => {
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
