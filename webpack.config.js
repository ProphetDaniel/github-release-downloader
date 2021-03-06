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
    filename: FILE+'.js'
  },
  devtool: 'source-map',
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