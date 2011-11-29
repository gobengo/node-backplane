function Message () {
	return this
}

/**
* @param message: An object representing a Backplane Message
* @param streamDir: Either 'downstream' (server->client) or 'upstream' (client->server, default)
* @param accessLevel: Either 'regular' or 'privileged' (default)
**/
Message.prototype.validate = function (message, streamDir, accessLevel) {
	// If passed a message, validate it, otherwise validate 'this'
	var message = message || this
	
	// Argument validation
		,	streamDir = typeof streamDir === 'string'
								? streamDir.toLowerCase()
							 ||'upstream'
		,	accessLevel = typeof accessLevel === 'string'
									? accessLevel.toLowerCase()
								 ||'privileged'
	if (typeof message !== 'object') throw new Error('Message must be an object')
	if (['upstream', 'downstream'].indexOf(streamDir) === -1) {
		throw new Error("streamDir must be either 'upstream' or 'downstream'")
	}
	if (['regular', 'privileged'].indexOf(accessLevel) === -1) {
		throw new Error("accessLevel must be either 'regular' or 'privileged'")
	}

	// Verify required fields
	var requiredFields = Message.requiredFields(streamDir, accessLevel)
	requiredFields.forEach(function(field) {
		if ( ! field in message ) throw new Error("Field '"+field+"' is required but missing")
	})

	// Verify field type values and that there are no unknown fields
	for (var field in message) {
		if message.hasOwnProperty(field) {
			if (typeof message[field] !== Message.fieldTypes[field]) {
				throw new Error("Field '"+field+"' is of type '"+(typeof message(field)) +
												"', but is required to be of type '"+Message.fieldTypes[field]+"'")
			}
			if ( ! field in requiredFields ) {
				throw new Error("Unkown field '"+field+"' in message")
			}
		}
	}

	return true;
}

Message.fieldTypes = {
	  'messageURL': 'string'
	,	'source': 'string'
	,	'type': 'string'
	,	'bus': 'string'
	,	'channel': 'string'
	,	'sticky': 'boolean'
	,	'payload': 'object'
}

Message.requiredFields = function (streamDir, accessLevel) {
	if (['upstream', 'downstream'].indexOf(streamDir) === -1) {
		throw new Error("streamDir must be either 'upstream' or 'downstream'")
	}
	if (['regular', 'privileged'].indexOf(accessLevel) === -1) {
		throw new Error("accessLevel must be either 'regular' or 'privileged'")
	}

	var regularDownstreamFields = ['messageURL', 'source', 'type', 'bus', 'channel', 'sticky']
	
	if (streamDir === 'upstream') {
		return ['bus', 'channel', 'payload', 'type']
	} else { // downstream
		if (accessLevel === 'regular') return regularDownStreamFields
		else return regularDownStreamFields.concat('payload')
	}
}

exports = Message