var connect = require('connect')
  , events = require('events')
  , resources = require('./resources')
  , util = require('util')
  , MessageStore = require('./MessageStore')

function Server (server, options) {
	// Force use of 'new' keyword
	if ( !(this instanceof Server) ) return new Server(arguments)
  // Inherit from EventEmitter
  events.EventEmitter.call(this)

  var self = this
    , options = options || {}
    , server = this.server = server || connect()
    , messages = options.messages || new MessageStore()

  // Set up the MessageStore listener
  if (messages.handle) self.on('message', messages.handle)

  // Set up the necessary Connect middlewares
  server
    // Parse request body (JSON/form-urlencoded)
    .use(connect.bodyParser())
    // Parse querystring
    .use(connect.query())
    // Add req.backplane as a reference back to this
    .use(function addBackplaneToReq (req, res, next) {
      req.backplane = self
      next()
    })
    // Backplane Server API Routes
    .use(connect.router(function (app) {
        app.get('/v2/messages', resources.messages.get)
      , app.post('/v2/messages', resources.messages.post)
      , app.get('/v2/message/:id', resources.messages.one.get)
    }))

  self.addDefaultListeners()

	return this
}
util.inherits(Server, events.EventEmitter)

Server.prototype.addDefaultListeners = function () {
  // LOG
  this.on('message', function (message) {
    console.log('New Message! '+message)
  })
}

Server.prototype.addBackplaneToReq = function (req, res, next) {
  req.backplane = this
  next()
}

Server.defaultOptions = {
  retentionWindow: 10*1000 // "Such threshold MUST be no less than 1 minute"
, stickyRetentionWindow: 30*1000 // "MUST be X, RECOMMENDED to be Y"
}
module.exports = Server