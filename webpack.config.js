const path = require('path');

module.exports = {
  entry: {
    register: './betting/js/main_register.jsx',
    upcoming: './betting/js/main_upcoming.jsx',
    live: './betting/js/main_live.jsx',
    results: './betting/js/main_results.jsx'
  },
  output: {
    path: path.join(__dirname, '/betting/static/js/'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        // Test for js or jsx files
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          // Convert ES6 syntax to ES5 for browser compatibility
          presets: ['es2015', 'react'],
        },
      },
      { 
        test: /\.css$/, 
        loader: 'style-loader!css-loader' 
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
