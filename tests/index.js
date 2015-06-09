'use strict';

// Node.js built-ins

var fs = require('fs');
var path = require('path');

// 3rd-party modules

var test = require('tape');

// our modules

var AppCache = require('..');

// this module

require('tape-chai');

test('AppCache', function (t) {
  t.isFunction(AppCache);
  t.end();
});

test('AppCache.parse', function (t) {
  t.isFunction(AppCache.parse);
  t.end();
});

test('new AppCache()', function (t) {
  var appCache;
  t.doesNotThrow(function () {
    appCache = new AppCache();
  });
  t.isArray(appCache.cache);
  t.isArray(appCache.fallback);
  t.isArray(appCache.network);
  t.end();
});

test('AppCache.parse("")', function (t) {
  var appCache;
  t.doesNotThrow(function () {
    appCache = AppCache.parse('');
  });
  t.isArray(appCache.cache);
  t.isArray(appCache.fallback);
  t.isArray(appCache.network);
  t.end();
});

test('AppCache.parse( >>html5rocks.appcache<< )', function (t) {
  var expected = require('./fixtures/html5rocks.json');
  fs.readFile(path.join(__dirname, 'fixtures', 'html5rocks.appcache'), {
    encoding: 'utf8'
  }, function (err, contents) {
    var appCache;
    t.error(err);
    t.isString(contents);
    appCache = AppCache.parse(contents);
    t.deepEqual(appCache, expected);
    t.end();
  });
});

test('AppCache.parse( >>splitsections.appcache<< )', function (t) {
  var expected = require('./fixtures/splitsections.json');
  fs.readFile(path.join(__dirname, 'fixtures', 'splitsections.appcache'), {
    encoding: 'utf8'
  }, function (err, contents) {
    var appCache;
    t.error(err);
    t.isString(contents);
    appCache = AppCache.parse(contents);
    t.deepEqual(appCache, expected);
    t.end();
  });
});

test('AppCache.parse( >>everytimezone.appcache<< )', function (t) {
  var expected = require('./fixtures/everytimezone.json');
  fs.readFile(path.join(__dirname, 'fixtures', 'everytimezone.appcache'), {
    encoding: 'utf8'
  }, function (err, contents) {
    var appCache;
    t.error(err);
    t.isString(contents);
    appCache = AppCache.parse(contents);
    t.deepEqual(appCache, expected);
    t.end();
  });
});
