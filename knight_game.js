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

  run() {
    let attacker = this.knights.shift();

    while(!this.winner) {
      let defender = this.knights.shift();
      if (!defender) {
        this.winner = attacker;
        continue;
      }

      let atkDamage = attacker.hit();
      defender.receiveDamage(atkDamage);
      this.output(` Knight ${attacker.id}(${attacker.hp}) hit Knight ${defender.id}(${defender.hp}) for ${atkDamage}`);

      this.knights.push(attacker);

      if (defender.hasDied()) {
        this.output(`Knight ${defender.id} died !!!!!`);
        attacker = this.knights.shift();
      } else {
        attacker = defender;
      }
    }

    this.output(`Knight ${this.winner.id} win`);
    return this.winner;
  }
}

exports.Knight = Knight;
exports.Game = Game;
