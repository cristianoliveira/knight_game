let Knight = require('./knight_game.js').Knight;
let Game = require('./knight_game.js').Game;

let stdout = console.log;

let game = new Game([
  new Knight(1),
  new Knight(2),
  new Knight(3),
  new Knight(4),
  new Knight(5),
  new Knight(6)
], stdout);

game.run();
