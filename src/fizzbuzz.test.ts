import { expect, test } from "vitest";

class FizzBuzz {
  of(number: number) {
    let result: string = "";

    if (number % 3 === 0) {
      result += "Fizz";
    }

    if (number % 5 === 0) {
      result += "Buzz";
    }

    if (!result) {
      result += number.toString();
    }

    return result;
  }
  generate(to: number) {
    let result: string = "";
    for (let i = 1; i <= to; i++) {
      result += this.of(i);
    }
    return result;
  }
}

function fizzbuzz(number: number) {
  return new FizzBuzz().of(number);
}

test("fizzbuzz of 1 should be 1", () => {
  expect(fizzbuzz(1)).toBe("1");
});

test("fizzbuzz of 2 should be 2", () => {
  expect(fizzbuzz(2)).toBe("2");
});

test("fizzbuzz of 3 should be Fizz", () => {
  expect(fizzbuzz(3)).toBe("Fizz");
});

test("fizzbuzz of 9 should be Fizz", () => {
  expect(fizzbuzz(9)).toBe("Fizz");
});

test("fizzbuzz of 5 should be Buzz", () => {
  expect(fizzbuzz(5)).toBe("Buzz");
});

test("fizzbuzz of 25 should be Buzz", () => {
  expect(fizzbuzz(25)).toBe("Buzz");
});

test("fizzbuzz of 15 should be FizzBuzz", () => {
  expect(fizzbuzz(15)).toBe("FizzBuzz");
});

test("fizzbuzz of 30 should be FizzBuzz", () => {
  expect(fizzbuzz(30)).toBe("FizzBuzz");
});

test("fizzbuzz from 1 to 15 should be 12Fizz4BuzzFizz78FizzBuzz11Fizz1314FizzBuzz", () => {
  expect(new FizzBuzz().generate(15)).toBe(
    "12Fizz4BuzzFizz78FizzBuzz11Fizz1314FizzBuzz"
  );
});
