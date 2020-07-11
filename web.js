let Knight = require('./knight_game.js').Knight;
let Game = require('./knight_game.js').Game;

const formatEventOutput = ({ type, attacker, defender, damage }) => {
  switch (type) {

    case Game.MESSAGE_TYPES.round:
      return `👊 - Knight ${attacker.id} hit Knight ${defender.id} with ${damage} damage
      Kinght ${defender.id} HP: ${defender.hp}/${Knight.MAX_HP}
      `;

    case Game.MESSAGE_TYPES.dead:
      return `💀 - Knight ${defender.id} died !!!!!`

    case Game.MESSAGE_TYPES.winner:
      return `😎 - Knight ${attacker.id} win`;

    default:
      return 'error';

  }

}

function stdout(event) {
  let content = document.getElementById("content")
  let p = document.createElement("p");
  p.appendChild(document.createTextNode(formatEventOutput(event)));
  content.appendChild(p);
  console.log('content: ', content.innerHTML);
}

let game = new Game([
  new Knight(1),
  new Knight(2),
  new Knight(3),
  new Knight(4),
  new Knight(5),
  new Knight(6)
], stdout);

game.run()
