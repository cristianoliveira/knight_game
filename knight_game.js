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
  constructor(knights, stdout) {
    this.knights = knights;
    this.stdout = stdout;
    this.winner = null;
  }

  run() {
    let attacker = this.knights.shift();

    while(!this.winner) {
      let defencer = this.knights.shift();
      if (!defencer) {
        this.winner = attacker;
        continue;
      }

      let atkDamage = attacker.hit();
      defencer.receiveDamage(atkDamage);
      this.stdout(` Knight ${attacker.id}(${attacker.hp}) hit Knight ${defencer.id}(${defencer.hp}) for ${atkDamage}`);

      this.knights.push(attacker);

      if (defencer.hasDied()) {
        this.stdout(`Knight ${defencer.id} died !!!!!`);
        defencer = null;
        attacker = this.knights.shift();
      } else {
        attacker = defencer;
      }
    }

    console.log(`Knight ${this.winner.id} win`);
    return this.winner;
  }
}

exports.Knight = Knight;
exports.Game = Game;
