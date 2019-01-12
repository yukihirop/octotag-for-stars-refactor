var path = require('path')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    main: './src/main.js',
    background: './src/background.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].bundle.js'
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
  // http://eiua-memo.tumblr.com/post/172719308488/chromeextension-unsafe-eval-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E8%A7%A3%E6%B1%BA%E6%96%B9%E6%B3%95
  // devtool: 'cheap-module-source-map',
  devtool: false,
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new CopyWebpackPlugin(
      [{
        from: path.join(__dirname, 'src', 'manifest.json'),
        to: path.join(__dirname, 'dist')
      },
      {
        from: path.join(__dirname, 'src', 'images', '**/*'),
        to: path.join(__dirname, 'dist'),
        context: 'src'
      },
      {
        from: path.join(__dirname, 'src', 'css', '**/*'),
        to: path.join(__dirname, 'dist'),
        context: 'src'
      },
      {
        from: path.join(__dirname, 'src', 'webfonts', '**/*'),
        to: path.join(__dirname, 'dist'),
        context: 'src'
      }]
    ),
    new webpack.SourceMapDevToolPlugin({
      filename: 'sourcemaps/[file].map',
      fileContext: 'src'
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
