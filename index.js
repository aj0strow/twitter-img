var morgan = require('morgan')
var server = require('./server')

server.use(morgan())
server.listen(process.env.PORT || 8000)

if (process.env.NODE_ENV != 'production') {
  require('memwatch').on('leak', function (info) {
    console.error(info)
  })
}
