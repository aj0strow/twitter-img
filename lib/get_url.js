var redis = require('./redis')
var key = require('./redis_key')
var fetch_url = require('./fetch_url')

module.exports = get_url

function get_url(id, screen_name, cb) {
  redis.get(xkey(id, screen_name), function (e, url) {
    if (e) return cb(e)
    if (url) return cb(null, url)

    // id or screen_name never seen before
    fetch_url(id, screen_name, cb)
  })
}

function xkey(id, screen_name) {
  if (id) return key('id', id)
  return key('screen_name', screen_name)
}
