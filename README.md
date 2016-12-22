# appcache.js [![npm module](https://img.shields.io/npm/v/@jokeyrhyme/appcache.svg)](https://www.npmjs.com/package/@jokeyrhyme/appcache) [![AppVeyor Status](https://img.shields.io/appveyor/ci/jokeyrhyme/appcache-js/master.svg)](https://ci.appveyor.com/project/jokeyrhyme/appcache-js) [![Travis CI Status](https://travis-ci.org/jokeyrhyme/appcache.js.svg?branch=master)](https://travis-ci.org/jokeyrhyme/appcache.js)

parse and manipulate AppCache manifests


## What is this?

This module exports an `AppCache` constructor, and a parser function so that
your JavaScript code can understand and manipulate the string contents of an
[AppCache Manifest](http://www.w3.org/TR/offline-webapps/#offline).


## Supported Environments

This is module is not designed to work in web browsers as-is, due to the use of
the CommonJS module pattern, and Node.js' `crypto` built-in.

You should be able to use this in Node.js as-is, or in web browsers with a
CommonJS-compatible bundler like WebPack or Browserify.


## API

### `AppCache`

- @constructor

### `AppCache#sha1`

- @type {`String`} a handy SHA1 hash, populated by `AppCache.parse()`

Having a hash is useful for comparing AppCache manifests files.

### `AppCache#cache`

- @type {`String[]`} the CACHE entries, populated by `AppCache.parse()`

### `AppCache#fallback`

- @type {`String[]`} the FALLBACK entries, populated by `AppCache.parse()`

### `AppCache#network`

- @type {`String[]`} the NETWORK entries, populated by `AppCache.parse()`

### `AppCache.parse(contents)`

- @param {`String`} the AppCache manifest file's contents
- @returns {`AppCache`} the parsed result


## Usage

```javascript
var AppCache = require('@jokeyrhyme/appcache');

var appCache = AppCache.parse(/* string downloaded from an AppCache URL */);

console.log(appCache.cache);
// [ ... ] Array of URL Strings from all CACHE sections of the AppCache manifest
```
