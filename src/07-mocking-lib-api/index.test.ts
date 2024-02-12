import axios from 'axios';

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn((path) => ({ data: path })),
  })),
}));

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const baseURL = 'mock-url';

    axios.create({
      baseURL,
    });

    expect(axios.create).toBeCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
  });

  test('should return response data', async () => {
    // Write your test here
  });
});
