var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // https://blog.mrym.tv/archives/296
      { test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, use: "file-loader" },
      // https://github.com/webpack-contrib/sass-loader/issues/344#issuecomment-367148933
      {
        test: /\.css|scss$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }]
      }
    ]
  },
  performance: {
    hints: 'error',
    maxEntrypointSize: 2000000,
    maxAssetSize: 2000000
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
}

// http://vue-loader.vuejs.org/en/workflow/production.html
if (process.env.NODE_ENV === 'production'){
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
