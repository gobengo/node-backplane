var messages = [];

/*
GET /messages
"Get Messages" - https://sites.google.com/site/backplanespec/documentation/backplane2-0-draft5#server.api.messages.get
*/
exports.get = function (req, res) {
	//res.write('Get Messages - https://sites.google.com/site/backplanespec/documentation/backplane2-0-draft5#server.api.messages.get')
  res.writeHead(200, {'Content-Type': 'text/html', 'transfer-encoding': 'chunked'});
	res.write(writeLong(3000))

  req.backplane.on('message', function(message) {
  	res.write('<p>'+message+'</p>')
  })
	/*res.end(function () {
		res.writeHead(200, {'Content-Type': 'text/plain', 'Transfer-Encoding': 'chunked'});
	  res.write('Start')
		req.backplane.on('message', function(message) {
			res.write('Messages: \n'+req.backplane.messages)
		})
	})*/
	//res.end()
}

/*
POST /messages
"Post Messages" - https://sites.google.com/site/backplanespec/documentation/backplane2-0-draft5#server.api.messages.post
*/
exports.post = function (req, res) {
	var BP = req.backplane
		,	message = '';

	req.on('data', function(chunk) {
		message += String(chunk);
	})
	
	req.on('end', function() {
		BP.emit('message', message)
		req.writeHead(202) // "Accepted"
		res.end(message)
	})
}

/*
GET /message/:id
"Get Single Message" - https://sites.google.com/site/backplanespec/documentation/backplane2-0-draft5#server.api.message.get
*/
exports.one = {}
exports.one.get = function (req, res) {
	res.write('Get Single Message - https://sites.google.com/site/backplanespec/documentation/backplane2-0-draft5#server.api.message.get')
	res.end()
}





function writeLong(na) {
	// Long shit
  return ((function mul8 (str, num) {
		var	i = Math.ceil(Math.log(num) / Math.LN2),
			res = str;
		do {
			res += res;
		} while (0 < --i);
		return res.slice(0, str.length * num);
	})(' ', na))
}