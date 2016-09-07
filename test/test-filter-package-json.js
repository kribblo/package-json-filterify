'use strict';

var path = require('path');

var transformTools = require('browserify-transform-tools');
var test = require('tape');

var transform = require('../');

var packageJson = require('../package.json');
var content = JSON.stringify(packageJson);
var name = packageJson.name;
var version = packageJson.version;
var main = packageJson.main;

test('default transform', function (t) {
    var file = path.resolve(__dirname, '../package.json');
    var options = {
        content: content,
    };
    transformTools.runTransform(transform, file, options, function (err, transformed) {
        if (err) {
            t.fail(err);
        } else {
            t.ok(transformed.indexOf('"name"') > -1);
            t.ok(transformed.indexOf('"version"') > -1);

            t.ok(transformed.indexOf('"' + name + '"') > -1);
            t.ok(transformed.indexOf('"' + version + '"') > -1);

            t.ok(transformed.indexOf('"' + main + '"') === -1);
        }
        t.end();
    });
});

test('configured transform', function (t) {
    var file = path.resolve(__dirname, '../package.json');
    var options = {
        content: content,
        config: {
            keep: ['name', 'main']
        }
    };
    transformTools.runTransform(transform, file, options, function (err, transformed) {
        if (err) {
            t.fail(err);
        } else {
            t.ok(transformed.indexOf('"name"') > -1);
            t.ok(transformed.indexOf('"main"') > -1);

            t.ok(transformed.indexOf('"version"') === -1);

            t.ok(transformed.indexOf('"' + name + '"') > -1);
            t.ok(transformed.indexOf('"' + main + '"') > -1);

            t.ok(transformed.indexOf('"' + version + '"') === -1);
        }
        t.end();
    });
});

test('skip transform of other json', function (t) {
    var file = path.resolve(__dirname, '../not-package.json');
    var options = {
        content: content,
        config: {
            keep: ['name', 'main']
        }
    };
    transformTools.runTransform(transform, file, options, function (err, transformed) {
        if (err) {
            t.fail(err);
        } else {
            t.equals(transformed, 'undefined');
        }
        t.end();
    });
});
