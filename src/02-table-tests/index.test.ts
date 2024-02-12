import { Action, simpleCalculator } from '01-simple-tests';

describe.each([
  { a: 1, b: 1, action: Action.Add, expected: 2 },
  { a: 1, b: 1, action: Action.Subtract, expected: 0 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 1, b: 1, action: 'invalid', expected: null },
  { a: 'sfsf', b: 1, action: Action.Add, expected: null },
])('simpleCalculator tests', ({ a, b, action, expected }) => {
  test(`should return ${expected} for ${action} ${a} and ${b}`, () => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toEqual(expected);
  });
});
