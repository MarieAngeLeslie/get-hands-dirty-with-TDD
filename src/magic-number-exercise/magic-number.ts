export interface InputInterface {
  read(): Promise<number | undefined>;
}

export interface DisplayInterface {
  correct(): void;
  tooHigh(): void;
  tooLow(): void;
  youLose(): void;
}

export interface NumberGeneratorInterface {
  generate(): number;
}

export class Game {
  constructor(
    private readonly generator: NumberGeneratorInterface,
    private readonly inputNumber: InputInterface,
    private readonly display: DisplayInterface,
    private readonly tries: number = 10
  ) {}

  async start() {
    const numberToGuess = this.generator.generate();
    console.log(numberToGuess);

    for (let i = 0; i < this.tries; i++) {
      const guess = await this.inputNumber.read();

      if (!guess) {
        this.display.youLose();
        return;
      }

      if (guess < numberToGuess) {
        this.display.tooLow();
      } else if (guess > numberToGuess) {
        this.display.tooHigh();
      } else {
        this.display.correct();
        return;
      }
    }

    this.display.youLose();
  }
}
