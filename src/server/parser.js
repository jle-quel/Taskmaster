'use strict'

const parseData = {}

const getOptions = (obj) => {
	return {
		shell: true,
		cwd: obj.workingdir,
		env: obj.env
	}
}

const parser = (configData, callback) => {
	for (const key in configData) {
		parseData[configData[key].cmd] = {
			opt: getOptions(configData[key])
		}
		// parseData[configDa]
		// const options = getOptions(configData[key])
	}
	console.log(parseData)	
}

module.exports = {
	parser
}