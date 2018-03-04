const index = require('./index')
const launcher = require('../process').launcher

const getSpawnOptions = (config) => ({
	'shell': true,
	'env': config.env,
	'cwd': config.workingdir
})

const getIoOptions = (config) => ({
	'stderr': config.stderr,
	'stdout': config.stdout
})

module.exports = (config) => {
	for (const key in config) {
		if (config[key].autostart) {
			const spawnOptions = getSpawnOptions(config[key])
			const ioOptions = getIoOptions(config[key])

			for (let index = 0; index < config[key].numprocs; index++) {
				launcher(config[key].cmd, spawnOptions, ioOptions)
			}
		}
	}
}