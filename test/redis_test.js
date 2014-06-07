var assert = require('assert')
var redis = require('../lib/redis')

describe('redis', function () {
  it('should connect to database', function (done) {
    redis.ping(function (e, pong) {
      assert.equal('PONG', pong)
      done(e)
    })
  })
})
