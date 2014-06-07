var assert = require('assert')
var get_image = require('../lib/get_image')

describe('get_image', function () {
  var IMAGE_RE = /^image\//

  it('should be an image stream', function (done) {
    get_image(null, 'aj0strow', function (e, img) {
      assert(IMAGE_RE.test(img && img.headers['content-type']))
      done(e)
    })
  })
})
