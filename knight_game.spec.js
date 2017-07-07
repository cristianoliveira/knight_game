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
  let mockStdout = jest.fn;

  it("has a winner", () => {
    let cheater = new Knight(1);
    cheater.hasDied = () => false;

    let game = new Game([ new Knight(2), cheater, new Knight(3) ], mockStdout);
    let winner = game.run();

    expect(winner).toBe(cheater);
  })

  it("has a winner if there is no oponent", () => {
    let foreverAlone = new Knight(1);

    let game = new Game([ foreverAlone ], mockStdout);
    let winner = game.run();

    expect(winner).toBe(foreverAlone);
  })

  it("has no winner when there is no knights", () => {
    let game = new Game([], mockStdout);

    let winner = game.run();

    expect(winner).toBe(undefined);
  })
});

