module.exports = {
  base:'./',
  experiments: {
    topLevelAwait: true
  },
  test: /\.(js|mjs|jsx|ts|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        plugins: ['@babel/plugin-syntax-top-level-await'],
      }
    }
  // https: true
  // build: {
  //   target: "es2019",
  //   brotliSize: false,
  //   chunkSizeWarningLimit: 2000
  //  }
}
