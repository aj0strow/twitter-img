var redis = require('./redis')
var key = require('./redis_key')
var fetch_url = require('./fetch_url')

// get_url gets the url from redis, but falls back to fetching the user
// profile from twitter and saving the image url
//
// cb(Error, String)

module.exports = get_url

function get_url(user_id, screen_name, cb) {
  redis.get(xkey(user_id, screen_name), function (e, url) {
    if (e) return cb(e)
    if (url) return cb(null, url)

    // id or screen_name never seen before
    fetch_url(user_id, screen_name, cb)
  })
}

function xkey(user_id, screen_name) {
  if (user_id) return key('user_id', user_id)
  return key('screen_name', screen_name)
}
