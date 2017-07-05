let Knight = require('./knight_game.js').Knight;
let Game = require('./knight_game.js').Game;

let game = new Game([
  new Knight(1),
  new Knight(2),
  new Knight(3)
], console.log);

game.run();
