import { Action, simpleCalculator } from '01-simple-tests';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({
      a: 1,
      b: 1,
      action: Action.Add,
    });

    expect(result).toEqual(2);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({
      a: 1,
      b: 1,
      action: Action.Subtract,
    });

    expect(result).toEqual(0);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 2,
      action: Action.Multiply,
    });

    expect(result).toEqual(4);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 2,
      action: Action.Divide,
    });

    expect(result).toEqual(1);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 3,
      b: 2,
      action: Action.Exponentiate,
    });

    expect(result).toEqual(9);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({
      a: 1,
      b: 1,
      action: 'invalid',
    });

    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: 'sfsf',
      b: 1,
      action: Action.Add,
    });

    expect(result).toBeNull();
  });
});
