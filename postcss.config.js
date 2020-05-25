module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-simple-vars'),
    require('autoprefixer'),
    require('cssnano')({
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
      }],
    }),
  ],
}
