const csp = {
	'default-src': ["'self'"],
	'connect-src': [
		"'self'",
		'https://www.google-analytics.com',
		'ws://localhost:8080',
	],
	'font-src': ["'self'", 'data:'],
	'img-src': ["'self'", 'https://www.google-analytics.com'],
	'object-src': ["'none'"],
	'script-src': [
		"'self'",
		"'unsafe-eval'",
		"'unsafe-inline'",
		'https://www.google-analytics.com',
	],
	'style-src': ["'self'", "'unsafe-inline'"],
}

module.exports = Object.keys(csp)
	.reduce((prev, key) => `${prev}${key} ${csp[key].join(' ')}; `, '')
	.trim()
