"use strict";

// Node.js built-ins

var crypto = require("crypto");

// this module

function AppCache() {
  this.sha1 = "";
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
  var hash;
  if (!fileContents || typeof fileContents !== "string") {
    return appCache;
  }
  entries = fileContents.split("\n");
  if (entries[0] !== AppCache.FIRST_LINE) {
    return appCache;
  }
  section = appCache.cache;
  hash = crypto.createHash("sha1");
  hash.update(fileContents);
  appCache.sha1 = hash.digest("hex");
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
