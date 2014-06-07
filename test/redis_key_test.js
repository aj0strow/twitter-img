var assert = require('assert')
var key = require('../lib/redis_key')

describe('redis_key', function () {
  it('should namespace the key', function () {
    var str = key('screen_name', 'aj0strow')
    assert.equal('twitter-img.screen_name.aj0strow', str)
  })
})
