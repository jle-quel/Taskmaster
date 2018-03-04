'use strict'

const jsonfile = require('jsonfile')

const parser = (file, callback) => {
	jsonfile.readFile(process.argv[2], (err, configData) => {
		if (err) {
			logger.error('Bad config file')
			process.exit(1)
		}
		callback(configData)
	})
}

module.exports = {
	parser
}