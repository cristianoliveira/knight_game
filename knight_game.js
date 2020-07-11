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

// Schedule each Game turns to appear with 1s of delay between each other
// So the 1st turns appear after 1s, the 2nd after 2s, and so on...
let tickerMultiplier = 0;
const ONE_SECOND = 1000;
const delayedOutput = stdout => msg => {
  tickerMultiplier += 1;
  setTimeout(() => stdout(msg), tickerMultiplier  *  ONE_SECOND)
}

class Game {
  constructor(knights, output) {
    this.knights = knights;
    this.output = delayedOutput(output);
    this.winner = null;
  }

  hasWinner(attacker, defender) {
    return attacker && (!defender);
  }

  run() {
    if (this.knights.length == 0) { return }

    let attacker = this.knights.shift();
    let defender = this.knights.shift();

    while(!this.hasWinner(attacker, defender)) {
      let atkDamage = attacker.hit();
      defender.receiveDamage(atkDamage);
      this.output(`👊 - Knight ${attacker.id} hit Knight ${defender.id} with ${atkDamage} damage\n
      ---
      Kinght ${defender.id} HP: ${defender.hp}/${MAX_HP}\r
      `);

      this.knights.push(attacker);

      if (defender.hasDied()) {
        this.output(`💀 - Knight ${defender.id} died !!!!!`);
        attacker = this.knights.shift();
      } else {
        attacker = defender;
      }

      defender = this.knights.shift();
    }

    this.output(`😎 - Knight ${attacker.id} win`);
    return attacker;
  }
}

exports.Knight = Knight;
exports.Game = Game;
