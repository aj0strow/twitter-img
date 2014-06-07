var assert = require('assert')
var twitter = require('../lib/twitter')

describe('twitter', function () {
  it('should fetch profile information', function (done) {
    var params = { user_id: '604447335' }
    twitter.get('/users/show', params, function (e, json) {
      assert.equal('aj0strow', json.screen_name)
      assert(json.profile_image_url)
      assert(json.profile_image_url_https)
      done(e)
    })
  })
})
