const merge = require('deepmerge')
const defaultConfig = require('./default')

const config = {}

;['development', 'production'].forEach((env) => {
	// eslint-disable-next-line
	config[env] = merge(defaultConfig, require(`./${env}`))
})

module.exports = config
