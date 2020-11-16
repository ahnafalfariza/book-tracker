module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.html', './src/**/*.js'],
  theme: {
    extend: {
      colors: {
        'primary-color': '#AD88FF',
        'dark-primary-900': '#1A181E',
        'dark-primary-800': '#1E1B25',
        'dark-primary-700': '#231F2C',
        'dark-primary-600': '#282333',
        'dark-primary-500': '#2B2538',
      },
    },
  },
  variants: {},
  plugins: [],
}
