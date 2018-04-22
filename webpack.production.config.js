const webpack = require('webpack');
var DIST        = __dirname + '/dist';
var FILE = 'ghReleaseInfo';

module.exports = {
  // entry: {
  //   index: ['babel-polyfill', './src/index.js']
  //   // ghReleaseInfo: ['babel-polyfill', './src/'+FILE]
  // },
  output: {
    library: FILE,
    libraryTarget: 'umd',
    path: DIST,
    filename: FILE+'.min.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  cache: true
};