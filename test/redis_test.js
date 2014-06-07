var assert = require('assert')

describe('redis', function () {
  var redis = require('../lib/redis')

  it('should connect to database', function (done) {
    redis.ping(function (e, pong) {
      assert.equal('PONG', pong)
      done(e)
    })
  })
})
