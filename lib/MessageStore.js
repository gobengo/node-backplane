function MessageStore () {
	this.db = []
	return this	
}

MessageStore.prototype.handle = function (message) {
	//this.db.push(message)
}

module.exports = MessageStore