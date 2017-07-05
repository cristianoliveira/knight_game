const path = require('path');
const SOURCE_DIR = path.resolve(__dirname, '.');
const DIST_DIR = path.resolve(__dirname, 'dist');

module.exports = {
  entry: SOURCE_DIR + '/index.js',
  output: {
    path: DIST_DIR,
    filename: 'knight_game.min.js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: SOURCE_DIR,
        loader: 'babel-loader'
      }
    ],
  },
};
