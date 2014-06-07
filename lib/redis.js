var url = require('url')
var redis = require('redis')
var config = require('appconfig').redis

module.exports = createClient()

function createClient () {
  if (config.url) {
    var parsed = url.parse(config.url)
    config.host = parsed.hostname
    config.port = parsed.port
    config.auth_pass = parsed.auth.split(':')[1]
  }
  var client = redis.createClient(config.port, config.host, config)
  return client
}
