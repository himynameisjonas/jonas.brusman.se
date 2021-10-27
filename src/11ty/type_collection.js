module.exports = function (type) {
  return function(collectionApi) {
    return collectionApi.getFilteredByTag("entries").filter(function(item) {
      return item.data.entryType == type
    });
  }
};
