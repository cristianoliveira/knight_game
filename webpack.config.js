const path = require('path');
const SOURCE_DIR = path.resolve(__dirname, '.');

module.exports = {
  entry: SOURCE_DIR + '/index.js',
  output: {
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
