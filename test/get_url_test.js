var assert = require('assert')
var get_url = require('../lib/get_url')

describe('get_url', function () {
  var IMAGE_RE = /^http.*(png|jpg|jpeg|gif)$/

  it('should work with user_id', function (done) {
    get_url('604447335', null, function (e, image_url) {
      assert(IMAGE_RE.test(image_url))
      done(e)
    })
  })

  it('should work with screen_name', function (done) {
    get_url(null, 'aj0strow', function (e, image_url) {
      assert(IMAGE_RE.test(image_url))
      done(e)
    })
  })
})
