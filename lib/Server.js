var express = require('express')
require('express-resource')

function BackplaneServer () {
	// Force use of 'new' keyword
	if ( !(this instanceof BackplaneServer) ) return new BackplaneServer(arguments)

	var app = express.createServer()
		,	messages = []

	// /messages
	app.resource('messages', require('./resources/messages'))
	// /token
	app.resource('token', require('./resources/token'))

	// Expose the Express app's .listen method
	this.listen = function() {
		return app.listen.apply(app, arguments)
	}
	
	return this
}

module.exports = BackplaneServer