var express = require('express')
var pick = require('lodash').pick
var pkg = require('./package.json')

var get_image = require('./lib/get_image')
var app = express()

module.exports = app

app.get('/', function (req, res) {
  res.json(pick(pkg, 'name', 'version', 'homepage'))
})

app.get('/image', function (req, res, next) {
  var user_id = req.param('user_id')
  var screen_name = req.param('screen_name')
  get_image(user_id, screen_name, function (e, img) {
    if (e) return next(e)
    res.writeHead(200, img.headers)
    img.pipe(res)
  })
})
