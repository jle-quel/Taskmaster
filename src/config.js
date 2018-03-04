module.exports = {
	PORT: 8000,
	HOST: '127.0.0.1',
	GET_CONFIG: () => {
		const data = {}
		return (config) => {
			if (config) {
				for (const key in config) {
					for (const value in config[key]) {
						if (!data[key]) data[key] = config[key]
						data[key][value] = config[key][value]
					}
				}
			}
			return data
		}
	}
}