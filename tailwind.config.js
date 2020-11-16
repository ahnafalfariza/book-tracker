module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.html', './src/**/*.js'],
  theme: {
    extend: {
      colors: {
        'primary-color': '#4F00FF',
        'dark-primary-900': '#18161D',
        'dark-primary-800': '#1C1924',
        'dark-primary-700': '#201B2B',
        'dark-primary-600': '#241D32',
        'dark-primary-500': '#261F36',
      },
    },
  },
  variants: {},
  plugins: [],
}
