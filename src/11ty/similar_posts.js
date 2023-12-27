const getSimilarTags = function(tagsA, tagsB) {
  if(!tagsA || !tagsB) { return [] }
  return tagsA.filter(Set.prototype.has, new Set(tagsB)).length;
}

module.exports = function(collection, path, tags){
  return collection.filter((post) => {
    return getSimilarTags(post.data.tags, tags) >= 2 && post.data.page.inputPath !== path;
  }).sort((a,b) => {
    const similarTagsDiff = getSimilarTags(b.data.tags, tags) - getSimilarTags(a.data.tags, tags);
    if (similarTagsDiff === 0) {
      return new Date(b.data.date) - new Date(a.data.date);
    }
    return similarTagsDiff;
  });
};
