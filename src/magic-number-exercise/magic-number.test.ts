import { expect, test } from "vitest";
import {
  Game,
  InputInterface,
  DisplayInterface,
  NumberGeneratorInterface,
} from "./magic-number";

export class SingleValueInput implements InputInterface {
  constructor(public readonly value: number) {}

  async read() {
    return this.value;
  }
}

class MultipleValueInput implements InputInterface {
  constructor(public readonly values: number[]) {}

  async read() {
    return this.values.shift();
  }
}

class LogDisplay implements DisplayInterface {
  public readonly messages: string[] = [];

  correct(): void {
    this.messages.push("CORRECT");
  }

  tooHigh(): void {
    this.messages.push("TOO HIGH");
  }

  tooLow(): void {
    this.messages.push("TOO LOW");
  }

  youLose(): void {
    this.messages.push("YOU LOSE");
  }
}

class FixedValueGenerator implements NumberGeneratorInterface {
  constructor(public readonly value: number = 50) {}
  generate(): number {
    return this.value;
  }
}

test("when right number is guessed", async () => {
  const display = new LogDisplay();
  const game = new Game(
    new FixedValueGenerator(),
    new MultipleValueInput([50]),
    display
  );
  await game.start();

  expect(display.messages[0]).toEqual("CORRECT");
});

test("test when number is bellow right number", async () => {
  const display = new LogDisplay();
  const game = new Game(
    new FixedValueGenerator(50),
    new MultipleValueInput([40]),
    display
  );
  await game.start();

  expect(display.messages[0]).toEqual("TOO LOW");
});

test("test when number is above right number", async () => {
  const display = new LogDisplay();
  const game = new Game(
    new FixedValueGenerator(50),
    new MultipleValueInput([51]),
    display
  );
  await game.start();

  expect(display.messages[0]).toEqual("TOO HIGH");
});

test("losing when no more values", async () => {
  const display = new LogDisplay();
  const game = new Game(
    new FixedValueGenerator(50),
    new MultipleValueInput([]),
    display
  );
  await game.start();

  expect(display.messages).toEqual(["YOU LOSE"]);
});

test("find if the guessing number is bellow or is the right number ", async () => {
  const display = new LogDisplay();
  const game = new Game(
    new FixedValueGenerator(50),
    new MultipleValueInput([49, 50]),
    display
  );
  await game.start();

  expect(display.messages).toEqual(["TOO LOW", "CORRECT"]);
});

test("exceeding the number of tries", async () => {
  const display = new LogDisplay();
  const game = new Game(
    new FixedValueGenerator(50),
    new MultipleValueInput([49, 51, 55, 54]),
    display,
    3
  );
  await game.start();

  expect(display.messages).toEqual(["TOO LOW", "TOO HIGH", "TOO HIGH", "YOU LOSE"]);
});
