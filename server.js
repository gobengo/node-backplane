var Backplane = require('./Backplane')

PORT = 3000

new Backplane().listen(PORT, function() {
	console.info('Listening on port '+PORT+'…')
})