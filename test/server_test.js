var supertest = require('supertest')
var server = require('../server')

describe('server', function () {
  it('should return info of the service', function (done) {
    supertest(server).get('/')
      .expect('content-type', /json/)
      .expect(200, done)
  })

  it('should fetch and return images', function (done) {
    supertest(server).get('/users/image')
      .query({ screen_name: 'aj0strow' })
      .expect('content-type', /image/)
      .expect(200, done)
  })
})
