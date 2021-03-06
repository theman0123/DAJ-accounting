import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const LAUNCHCOMMAND = process.env.npm_lifecycle_event

const isProduction = LAUNCHCOMMAND === 'production'
process.env.BABEL_ENV = LAUNCHCOMMAND

const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'public'),
}

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: PATHS.src + '/index.html',
  filename: 'index.html',
  inject: 'body'
})


const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
})

const base = {
  entry: [
    PATHS.src,
  ],
  output: {
    path: PATHS.build,
    filename: "index_bundle.js"
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      {test: /\.css$/, loader: 'style-loader!css-loader?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]'},
      {test: /\.(png|jpg|gif)$/, loader: 'file-loader', options: {}}
    ],
  },
  resolve: {
    modules: [
      path.resolve(__dirname, './src'),
      'node_modules',
    ]
  }
}

const developmentConfig = {
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    contentBase: PATHS.build,
    hot:true,
    inline:true,
    progress:true,
    historyApiFallback: true,
    port: 3000,
  },
  plugins: [HTMLWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()]
}

const productionConfig = {
  devtool: 'cheap-module-source-map',
  plugins: [HTMLWebpackPluginConfig, productionPlugin]
}

export default Object.assign({}, base, 
  isProduction === true ? productionConfig: developmentConfig)
