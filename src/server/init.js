const index = require('./index')
const _process = require('./process')

module.exports = (configData) => {
	for (const key in configData) {
		if (configData[key].autostart) {
			for (let index = 0; index < configData[key].numprocs; index++) {
				_process.launcher(configData[key], -1)
			}
		}
	}
}