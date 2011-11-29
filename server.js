var Backplane = require('Backplane')
	,	connect = require('connect')

var server = connect(
				connect.logger()
			,	connect.methodOverride()
		)
	,	BP = new Backplane(server)

setInterval(function() {
  function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
  }
  BP.emit('message', randomString(26))
}, 1000)

var PORT = 3000
BP.server.listen(PORT, function() {
	console.info('Listening on port '+PORT+'…')
})

