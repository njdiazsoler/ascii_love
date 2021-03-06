module.exports = {
  entry: [ '@babel/polyfill','whatwg-fetch', './client/App.js'],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      },
    ],
  },
}