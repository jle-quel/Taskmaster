const index = require('./index')
const _process = require('./process')

module.exports = (getConfig) => {
	const config = getConfig()
	
	for (const key in config) {
		if (config[key].autostart === true) {
			for (let index = 0; index < config[key].numprocs; index++) {
				_process.launcher(getConfig, key, -1)
			}
		}
	}
}