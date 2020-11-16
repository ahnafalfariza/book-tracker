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
        'dark-primary-900': '#1E1B25',
        'dark-primary-800': '#25202E',
        'dark-primary-700': '#2B2538',
        'dark-primary-600': '#312A41',
        'dark-primary-500': '#372E4B',
        'dark-primary-400': '#3D3354',
        'dark-primary-300': '#44385E',
        'dark-primary-200': '#4A3C67',
        'dark-primary-100': '#504171',
      },
    },
  },
  variants: {},
  plugins: [],
}
