var http = require('http')
var parse = require('url').parse

var get_url = require('./get_url')
var fetch_url = require('./fetch_url')

// get_image requests the image, but if it 404s then resets the 
// url and requests the image again
//
// cb(Error, http.ServerResponse)

module.exports = get_image

function get_image(id, screen_name, cb) {
  get_url(id, screen_name, function (e, image_url) {
    if (e) return cb(e)
    get(image_url, function (e, res) {
      if (!e) return cb(null, res)

      // image url incorrect, fetch new image
      fetch_image(id, screen_name, cb)
    })
  })
}

function fetch_image (id, screen_name, cb) {
  fetch_url(id, screen_name, function (e, image_url) {
    if (e) return cb(e)
    get(image_url, cb)
  })
}

// wraps http.get to pass in a string url, and callbacks an
// error if the status code is not 200

function get (image_url, cb) {
  var options = parse(image_url)
  http.get(options, function (res) {
    if (res.statusCode == 200) return cb(null, res)

    var error = new Error('Bad image url.')
    error.statusCode = res.statusCode
    cb(error)
  })
}
