var Twit = require('twit')
var config = require('appconfig').twitter

module.exports = createClient()

function createClient () {
  return new Twit(config)
}
