var package_name = require('../package.json').name
var toArray = require('lodash').toArray

// namespaced by package name
var namespace = [ package_name ]

// redis_key ensures the schema is namespaced and has consistent
// delimiters for keys

module.exports = redis_key

function redis_key () {
  return namespace.concat(toArray(arguments)).join('.')
}
