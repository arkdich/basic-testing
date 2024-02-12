import { doStuffByInterval, doStuffByTimeout } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');

    const timeout = 1000;
    const callBack = jest.fn();

    doStuffByTimeout(callBack, timeout);
    jest.advanceTimersByTime(timeout);

    expect(setTimeout).toBeCalledWith(callBack, timeout);
  });

  test('should call callback only after timeout', () => {
    const timeout = 3000;
    const callBack = jest.fn();

    doStuffByTimeout(callBack, timeout);
    expect(callBack).toBeCalledTimes(0);

    jest.advanceTimersByTime(timeout);

    expect(callBack).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const interval = 1000;
    const callBack = jest.fn();

    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callBack, interval);

    expect(setInterval).toBeCalledWith(callBack, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const interval = 1000;
    const callBack = jest.fn();

    jest.spyOn(global, 'setInterval');
    setInterval(callBack, interval);

    jest.advanceTimersByTime(interval);
    jest.advanceTimersByTime(interval);
    jest.advanceTimersByTime(interval);

    expect(callBack).toBeCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.resetModules();
    jest.mock('fs', () => ({
      existsSync: jest.fn(() => false),
    }));

    jest.mock('path', () => ({
      join: jest.fn(),
    }));

    const { readFileAsynchronously } = await import('./index');
    const { join } = await import('path');

    const filePath = 'text_path.txt';
    await readFileAsynchronously(filePath);

    expect(join).toBeCalledWith(__dirname, filePath);
  });

  test('should return null if file does not exist', async () => {
    jest.resetModules();
    jest.mock('fs', () => ({
      existsSync: jest.fn(() => false),
    }));

    const filePath = 'text_path.txt';
    const { readFileAsynchronously } = await import('./index');

    const result = await readFileAsynchronously(filePath);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent =
      'Yo yo yo. 148-3 to the 3 to the 6 to the 9, representing the ABQ, what up?!';

    jest.resetModules();
    jest.mock('fs', () => ({
      existsSync: jest.fn(() => true),
    }));

    jest.mock('fs/promises', () => ({
      readFile: jest.fn(() => fileContent),
    }));

    const filePath = 'text_path.txt';
    const { readFileAsynchronously } = await import('./index');

    const result = await readFileAsynchronously(filePath);

    expect(result).toEqual(fileContent);
  });
});
