import prompt from "prompt";
import {
  NumberGeneratorInterface,
  DisplayInterface,
  InputInterface,
  Game
} from "./magic-number";

class RandomNumberGenerator implements NumberGeneratorInterface {
  generate(): number {
    return Math.floor(Math.random() * 100);
  }
}

class ConsoleDisplay implements DisplayInterface {
  correct(): void {
    console.log("CORRECT");
  }

  tooHigh(): void {
    console.log("TOO HIGH");
  }

  tooLow(): void {
    console.log("TOO LOW");
  }

  youLose(): void {
    console.log("YOU LOSE");
  }
}

class ConsoleInput implements InputInterface {
  constructor() {
    prompt.start();
  }
  async read(): Promise<number | undefined> {
    const { number } = await prompt.get(["number"]);
    return parseInt(number, 10);
  }
}

function main() {
  const game = new Game(
    new RandomNumberGenerator(),
    new ConsoleInput(),
    new ConsoleDisplay(),
  );
  return game.start();
}

main();
