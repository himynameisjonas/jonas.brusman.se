module.exports = function (type) {
  return function (collectionApi) {
    return collectionApi.getFilteredByTag("blogPost").filter(function (item) {
      return item.data.blogPostType == type;
    });
  };
};
