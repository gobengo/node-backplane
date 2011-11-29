var express = require('express')
require('express-resource')

function Backplane () {
	// Force use of 'new' keyword
	if ( !(this instanceof Backplane) ) return new Backplane(arguments)

	var app = express.createServer()

	// /messages
	app.resource('message', require('./resources/messages'))
	// /token
	app.resource('token', require('./resources/token'))

	return app
}

module.exports = Backplane