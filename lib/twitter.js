var Twit = require('twit')
var config = require('appconfig').twitter

// twitter client

module.exports = createClient()

function createClient () {
  return new Twit(config)
}
