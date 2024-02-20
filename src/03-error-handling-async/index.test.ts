import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect(resolveValue(5)).resolves.toEqual(5);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMsg = 'error message';

    expect(() => throwError(errorMsg)).toThrowError(new Error(errorMsg));
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowError(new Error('Oops!'));
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(new MyAwesomeError());
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(() => rejectCustomError()).rejects.toBeInstanceOf(MyAwesomeError);
  });
});
