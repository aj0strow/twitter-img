var redis = require('./redis')
var twitter = require('./twitter')

var key = require('./redis_key')

module.exports = fetch_url

// id or screen_name requred
function fetch_url(id, screen_name, cb) {
  get_user(id, screen_name, function (e, json) {
    if (e) return cb(e)
    save_url(json, cb)
  })
}

function get_user(id, screen_name, cb) {
  var params = {}
  if (id) {
    params.user_id = +id
  } else {
    params.screen_name = screen_name
  }
  twitter.get('/users/show', params, cb)
}

function save_url(json, cb) {
  var url = json.profile_image_url
  redis.multi()
    .set(key('user_id', json.id_str), url)
    .set(key('screen_name', json.screen_name), url)
  .exec(function (e) {
    if (e) return cb(e)
    cb(null, url)
  })
}
