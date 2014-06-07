var package_name = require('../package.json').name
var toArray = require('lodash').toArray

// namespaced by package name
var namespace = [ package_name ]

module.exports = key

function key () {
  return namespace.concat(toArray(arguments)).join('.')
}
