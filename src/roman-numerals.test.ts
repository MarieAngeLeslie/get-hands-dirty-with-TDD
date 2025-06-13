import { expect, test } from "vitest";

const romanMap: { [key: string]: number } = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

function romanNumeral(roman_numerals: string) {
  if (roman_numerals.length > 1) {
    if (
      romanMap[roman_numerals[1]] < romanMap[roman_numerals[0]] ||
      romanMap[roman_numerals[1]] === romanMap[roman_numerals[0]]
    ) {
      let sum_roman_numbers: number = 0;
      for (let i = 0; i < roman_numerals.length; i++) {
        sum_roman_numbers += romanMap[roman_numerals[i]];
      }
      return sum_roman_numbers;
    }
    return romanMap[roman_numerals[1]] - romanMap[roman_numerals[0]];
  }
  return romanMap[roman_numerals];
}

test("roman numeral of I should be 1", () => {
  expect(romanNumeral("I")).toBe(1);
});

test("roman numeral of V should be 5", () => {
  expect(romanNumeral("V")).toBe(5);
});

test("roman numeral of X should be 10", () => {
  expect(romanNumeral("X")).toBe(10);
});

test("roman numeral of L should be 50", () => {
  expect(romanNumeral("L")).toBe(50);
});

test("roman numeral of C should be 100", () => {
  expect(romanNumeral("C")).toBe(100);
});

test("roman numeral of D should be 500", () => {
  expect(romanNumeral("D")).toBe(500);
});

test("roman numeral of M should be 1000", () => {
  expect(romanNumeral("M")).toBe(1000);
});

test("should add values, if a smaller number symbol is placed after a larger number symbole ", () => {
  expect(romanNumeral("VI")).toBe(6);
});

test("should add values, if a smaller number symbol is placed after a larger number symbole ", () => {
  expect(romanNumeral("XV")).toBe(15);
});

test("should add values, if a smaller number symbol is placed after a larger number symbole ", () => {
  expect(romanNumeral("VIII")).toBe(8);
});

test("should subtract the smaller value from the larger values, if a smaller number symbol is placed before a larger number symbole ", () => {
  expect(romanNumeral("IV")).toBe(4);
});

test("should subtract the smaller value from the larger values, if a smaller number symbol is placed before a larger number symbole ", () => {
  expect(romanNumeral("VX")).toBe(5);
});

test("should add values, if a symbol is repeated N times ", () => {
  expect(romanNumeral("XX")).toBe(20);
});

//--------------

/*  CASE THAT CAN BE CHECKED AFTER
test("XXIX", () => {
  expect(romanNumeral("XXIX")).toBe(29);
});

test("XLVII ", () => {
  expect(romanNumeral("XLVII")).toBe(47);
});
*/
