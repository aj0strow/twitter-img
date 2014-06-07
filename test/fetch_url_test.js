var assert = require('assert')
var fetch_url = require('../lib/fetch_url')

describe('fetch_url', function () {
  var IMAGE_RE = /^http.*(png|jpg|jpeg|gif)$/

  it('should work with user_id', function (done) {
    fetch_url('604447335', null, function (e, image_url) {
      assert(IMAGE_RE.test(image_url))
      done(e)
    })
  })

  it('should work with screen_name', function (done) {
    fetch_url(null, 'aj0strow', function (e, image_url) {
      assert(IMAGE_RE.test(image_url))
      done(e)
    })
  })
})
