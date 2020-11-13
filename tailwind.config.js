module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	purge: ['./src/**/*.html', './src/**/*.js'],
	theme: {
		extend: {
			colors: {
				'primary-color': '#F52D3A',
			},
		},
	},
	variants: {},
	plugins: [],
}
