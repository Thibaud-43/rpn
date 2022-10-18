// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import evaluate from ".";

expect.extend(matchers);

test("That's a test!", () => {
  expect(evaluate([1, 1, "+"])).toEqual(2);
});

test("That's a test!", () => {
  expect(evaluate([1, 2, "+"])).toEqual(3);
});

test("That's a test!", () => {
  expect(evaluate([1, 1, "-"])).toEqual(0);
});
test("That's a test!", () => {
  expect(evaluate([1, 2, "/"])).toEqual(0.5);
});

test("That's a test!", () => {
  expect(evaluate([1, 2, "*"])).toEqual(2);
});

test("That's a test!", () => {
  expect(evaluate([1, 1, "+", 1, "+"])).toEqual(3);
});

test("That's a test!", () => {
  expect(evaluate([1, "+"])).toEqual("Two operands need to evaluate operation");
});
test("That's a test!", () => {
  expect(evaluate([1, 1, "+", "+"])).toEqual("Two operands need to evaluate operation");
});
test("That's a test!", () => {
  expect(evaluate([1, "+", 1, "+"])).toEqual("Two operands need to evaluate operation");
});

test("That's a test!", () => {
  expect(evaluate([1, 1, "+", "+", 1, "+"])).toEqual("Two operands need to evaluate operation");
});
