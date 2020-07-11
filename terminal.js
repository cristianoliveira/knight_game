let Knight = require('./knight_game.js').Knight;
let Game = require('./knight_game.js').Game;

const formatEventOutput = ({ type, attacker, defender, damage }) => {
  switch (type) {

    case Game.MESSAGE_TYPES.round:
      return `👊 - Knight ${attacker.id} hit Knight ${defender.id} with ${damage} damage\n
      ---
      Kinght ${defender.id} HP: ${defender.hp}/${Knight.MAX_HP}\r `;

    case Game.MESSAGE_TYPES.dead:
      return `💀 - Knight ${defender.id} died !!!!!`

    case Game.MESSAGE_TYPES.winner:
      return `😎 - Knight ${attacker.id} win`;

    default:
      return '';

  }

}

let eventHandler = (event) => console.log(formatEventOutput(event));

let game = new Game([
  new Knight(1),
  new Knight(2),
  new Knight(3),
  new Knight(4),
  new Knight(5),
  new Knight(6)
], eventHandler);

game.run();
