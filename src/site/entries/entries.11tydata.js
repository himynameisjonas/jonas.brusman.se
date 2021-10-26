const internal = /^\/images\/.*/i;
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
  let result = await lqip(url, {resize: 1001})
  await asset.save(result.metadata, "json");

  return result.metadata
};

module.exports = {
  eleventyComputed: {
    entryType: data => data.photos ? 'photo' : 'note',
    photosWithMetadata: async data => {
      if(data.photos) {
        return await Promise.all(data.photos.map(async (path) => {
            let lqip = await getLqip(path)
            console.log('hej', lqip)
            return Object.assign({path}, lqip)
        }));
      }
    }
  }
};
