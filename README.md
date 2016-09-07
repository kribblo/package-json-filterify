# package-json-filterify

Browserify transform to filter package.json when it is required, so as to not include all of it in the final bundle.
 
By default, keeps `"name"` and `"version"` fields, but this can be configured.

    npm install --save-dev package-json-filterify

```javascript
var packageJson = require('./package.json');
console.log(packageJson.name, packageJson.version);
````

## Usage

### Command line

    browserify -t package-json-filterify input.js > output.js

### browserify field

```json
{
  "browserify": {
    "transform": [
      "package-json-filterify"
    ]
  }
}
```

## Configuration

Configure what fields to keep:

### package.json

```json
{
    "package-json-filterify": {"keep": ["name", "version", "main"]}
}
```

### browserify field

```json
{
  "browserify": {
    "transform": [
      ["package-json-filterify", {"keep": ["name", "version", "main"]}]
    ]
  }
}
```

## See also

* [package-json-versionify](https://github.com/nolanlawson/package-json-versionify)
