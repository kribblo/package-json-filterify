'use strict';

var path = require('path');

var transformTools = require('browserify-transform-tools');

var options = {includeExtensions: ['.json']};
function packageJsonFilterify(content, transformOptions, done) {
    var file = transformOptions.file;

    var basename = path.basename(file);
    if (basename !== 'package.json') {
        return done(null, content);
    }

    var config = transformOptions.config || {};
    var keep = config.keep || ['name', 'version'];

    var packageJson = JSON.parse(content);
    var filtered = {};

    for (var i = 0; i < keep.length; i++) {
        var key = keep[i];
        filtered[key] = packageJson[key];
    }

    done(null, JSON.stringify(filtered));
}

module.exports = transformTools.makeStringTransform('package-json-filterify', options, packageJsonFilterify);

