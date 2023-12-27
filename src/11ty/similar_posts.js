function getSimilarTags(postTags, targetTags, tagFrequency) {
  if (postTags === undefined || targetTags === undefined) {
    return 0;
  }
  let score = 0;
  for (let tag of postTags) {
    if (targetTags.includes(tag) && tag !== "programming") {
      score += 1 / tagFrequency[tag];
    }
  }
  return score;
}


module.exports = function(collection, path, tags){
  const tagFrequency = {};
  collection.forEach(function(item) {
    if( "tags" in item.data ) {
      item.data.tags.forEach(function(tag) {
        if(tag in tagFrequency) {
          tagFrequency[tag]++;
        } else {
          tagFrequency[tag] = 1;
        }
      });
    }
  });

  return collection.filter((post) => {
    return getSimilarTags(post.data.tags, tags, tagFrequency) > 0 && post.data.page.inputPath !== path;
  }).sort((a,b) => {
    const similarTagsDiff = getSimilarTags(b.data.tags, tags, tagFrequency) - getSimilarTags(a.data.tags, tags, tagFrequency);
    if (similarTagsDiff === 0) {
      return new Date(b.data.date) - new Date(a.data.date);
    }
    return similarTagsDiff;
  });
};
