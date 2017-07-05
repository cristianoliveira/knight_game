let Knight = require('./knight_game.js').Knight;
let Game = require('./knight_game.js').Game;

describe("Knight", () => {
  it("starts with 100 hp", () => {
    let k = new Knight();

    expect(k.hp).toBe(100);
  })

  it("substract hp when get hit", () => {
    let k = new Knight();

    k.receiveDamage(5)

    expect(k.hp).toBe(95);
  })

  it("dies when reach 0 hp", () => {
    let k = new Knight();

    k.receiveDamage(100)

    expect(k.hasDied()).toBe(true);
  })

  it("dies when reach less than 0", () => {
    let k = new Knight();

    k.receiveDamage(1000);

    expect(k.hasDied()).toBe(true);
  })
});

describe("Game", () => {
  it("has a winner", () => {
    let mockStdout = jest.fn;
    let cheater = new Knight(1);
    cheater.hasDied = () => false;

    let game = new Game([ new Knight(2), cheater, new Knight(3) ], mockStdout);
    let winner = game.run();

    expect(winner).toBe(cheater);
  })
});

