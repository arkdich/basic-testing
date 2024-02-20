import {
  InsufficientFundsError,
  SynchronizationFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 1000;
  let account = getBankAccount(initialBalance);

  beforeEach(() => {
    account = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(2000)).toThrowError(
      new InsufficientFundsError(initialBalance),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const accountB = getBankAccount(initialBalance);

    expect(() => account.transfer(2000, accountB)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(2000, account)).toThrow();
  });

  test('should deposit money', () => {
    expect(account.deposit(500).getBalance()).toEqual(1500);
  });

  test('should withdraw money', () => {
    expect(account.deposit(500).getBalance()).toEqual(1500);
  });

  test('should transfer money', () => {
    const accountB = getBankAccount(initialBalance);

    account.transfer(500, accountB).getBalance();

    expect(account.getBalance()).toEqual(500);
    expect(accountB.getBalance()).toEqual(1500);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.resetModules();
    jest.mock('lodash', () => ({
      random: () => 1,
    }));

    const module = await import('./index');
    const account = module.getBankAccount(1000);

    const result = await account.fetchBalance();

    expect(typeof result).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const accountBalance = 100;

    jest.resetModules();
    jest
      .spyOn(account, 'fetchBalance')
      .mockReturnValue(new Promise((resolve) => resolve(accountBalance)));

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(accountBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.resetModules();
    jest
      .spyOn(account, 'fetchBalance')
      .mockReturnValue(new Promise((resolve) => resolve(null)));

    expect(() => account.synchronizeBalance()).rejects.toBeInstanceOf(
      SynchronizationFailedError,
    );
  });
});
