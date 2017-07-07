class Knight {
  constructor(id) {
    this.id = id;
    this.hp = 100;
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

class Game {
  constructor(knights, output) {
    this.knights = knights;
    this.output = output;
    this.winner = null;
  }

  hasWinner(attacker, defender) {
    return attacker && (!defender);
  }

  run() {
    let attacker = this.knights.shift();
    let defender = this.knights.shift();

    while(!this.hasWinner(attacker, defender)) {

      let atkDamage = attacker.hit();
      defender.receiveDamage(atkDamage);
      this.output(`👊 - Knight ${attacker.id} hit Knight ${defender.id} for ${atkDamage}`);

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
