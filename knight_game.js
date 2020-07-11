const MAX_HP = 100;

class Knight {
  constructor(id) {
    this.id = id;
    this.hp = MAX_HP;
  }

  receiveDamage(damage) {
    this.hp -= damage;
  }

  hasDied() {
    return this.hp <= 0;
  }

  hit() {
    let min = Math.ceil(1);
    let max = Math.floor(6);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

Knight.MAX_HP = MAX_HP;

// Schedule each turn to appear with 1s of delay between each other
// So the 1st turns appear after 1s, the 2nd after 2s, and so on...
let tickerMultiplier = 0;
const ONE_SECOND = 1000;
const copyEvent = obj => JSON.parse(JSON.stringify(obj)); // avoid reference issues
const delayEvent = dispatcher => event => {
  tickerMultiplier += 1;
  const copiedEvent = copyEvent(event);
  setTimeout(() => dispatcher(copiedEvent), tickerMultiplier  *  ONE_SECOND)
}


const MESSAGE_TYPES = {
  round: 'round',
  dead: 'dead',
  winner: 'winner'
}

class Game {
  constructor(knights, dispatcher) {
    this.round = 0;
    this.knights = knights;
    this.dispatcher = delayEvent(dispatcher);
    this.winner = null;
  }

  hasWinner(attacker, defender) {
    return attacker && (!defender);
  }

  run() {
    if (this.knights.length == 0) { return }

    let attacker = this.knights.shift();
    let defender = this.knights.shift();
    this.round += 1;
    while(!this.hasWinner(attacker, defender)) {
      let damage = attacker.hit();
      defender.receiveDamage(damage);
      this.dispatcher({
        type: MESSAGE_TYPES.round,
        attacker,
        defender,
        damage,
        round: this.round
      });

      this.knights.push(attacker);

      if (defender.hasDied()) {
        this.dispatcher({ type: MESSAGE_TYPES.dead, defender })
        attacker = this.knights.shift();
      } else {
        attacker = defender;
      }

      defender = this.knights.shift();
    }

    this.dispatcher({ type: MESSAGE_TYPES.winner, attacker })
    this.round += 1;
    return attacker;
  }
}

Game.MESSAGE_TYPES = MESSAGE_TYPES;

exports.Knight = Knight;
exports.Game = Game;
