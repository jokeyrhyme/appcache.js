"use strict";

function AppCache() {
  this.cache = [];
  this.network = [];
  this.fallback = [];
}

AppCache.COMMENT = "#";

AppCache.FIRST_LINE = "CACHE MANIFEST";

AppCache.SECTIONS = ["CACHE", "FALLBACK", "NETWORK"];

/**
 * @param {String} fileContents the AppCache manifest file's contents
 * @returns {AppCache} the parsed result
 */
AppCache.parse = function (fileContents) {
  var appCache = new AppCache();
  var entries;
  var section;
  if (!fileContents || typeof fileContents !== "string") {
    return appCache;
  }
  entries = fileContents.split("\n");
  if (entries[0] !== AppCache.FIRST_LINE) {
    return appCache;
  }
  entries.forEach(function (line) {
    var entry = line.trim();
    var sectionName;
    if (!entry || entry[0] === AppCache.COMMENT || entry === AppCache.FIRST_LINE) {
      return;
    }
    sectionName = entry.replace(/:$/, "");
    if (AppCache.SECTIONS.indexOf(sectionName) !== -1) {
      section = appCache[sectionName.toLowerCase()];
      return;
    }
    section.push(entry);
  });
  return appCache;
};

module.exports = AppCache;
