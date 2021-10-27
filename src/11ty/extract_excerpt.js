const striptags = require("striptags");

module.exports = function (...fallbacks) {
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
