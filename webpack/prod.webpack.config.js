const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    bundle: ['./app/app.js']
  },
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: 'zeebe-modeler.js',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.bpmn$/,
        use: 'raw-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'es2015'],
          plugins: ['transform-class-properties']
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'assets/**', to: 'vendor/bpmn-js', context: 'node_modules/bpmn-js/dist/' },
      { from: '**/*.css', context: 'app/' }
    ])
  ]
};
