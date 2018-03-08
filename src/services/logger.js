'use strict'

const fs = require('fs')

const FILEPATH = './taskmaster.log'

const getDate = () => {
	const event = new Date(Date.now());
	return event.toUTCString()
}

const write = (data) => {
	return new Promise((resolve, reject) => {
		fs.write(FILEPATH, getDate(), (err) => {
			if (err) reject(err)
		})
				
		fs.writeFile(FILEPATH, data + "\n", (err) => {
			if (err) reject(err)
		})
		resolve()
	})
}

module.exports = {
	write
}
