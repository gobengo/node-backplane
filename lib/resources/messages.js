/*
GET /messages
"Get Messages" - https://sites.google.com/site/backplanespec/documentation/backplane2-0-draft5#server.api.messages.get
*/
exports.index = function (req, res) {
	res.send('Get Messages - https://sites.google.com/site/backplanespec/documentation/backplane2-0-draft5#server.api.messages.get')
}

/*
POST /messages
"Post Messages" - https://sites.google.com/site/backplanespec/documentation/backplane2-0-draft5#server.api.messages.post
*/
exports.create = function (req, res) {
	res.send('Post Messages - https://sites.google.com/site/backplanespec/documentation/backplane2-0-draft5#server.api.messages.post')
}

/*
GET /message/:id
"Get Single Message" - https://sites.google.com/site/backplanespec/documentation/backplane2-0-draft5#server.api.message.get
*/
exports.show = function (req, res) {
	res.send('Get Single Message - https://sites.google.com/site/backplanespec/documentation/backplane2-0-draft5#server.api.message.get')
}