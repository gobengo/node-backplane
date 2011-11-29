var express = require('express')

require('express-resource')

function Backplane () {
	// Force use of 'new' keyword
	if ( !(this instanceof Backplane) ) return new Backplane(arguments)

	var app = express.createServer()

	app.resource('messages', require('./resources/messages'))

	return app
}

module.exports = Backplane