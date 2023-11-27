// FILEPATH: /home/thehoney/github/localization-framework/sdk/lib/TranslationBackend.test.js
const fetchMock = require('fetch-mock');
const Backend = require('../lib/TranslationBackend');
const FetchError = require('../lib/FetchError');

describe('Backend', () => {
  let backend;

  beforeEach(() => {
    backend = new Backend();
    backend.init(
      {
        backendConnector: {
          language: 'en',
          read: jest.fn(),
          loaded: jest.fn(),
        },
        languageUtils: {
          toResolveHierarchy: jest.fn((lng) => [lng]),
        },
        logger: {
          warn: jest.fn(),
          log: jest.fn(),
        },
      },
      { projectId: 'test', reloadInterval: false },
      { preload: ['en'], ns: ['namespace'] }
    );
  });

  afterEach(() => {
    fetchMock.restore();
  });

  test('read() should call callback with translations when fetch is successful', async () => {
    const mockResponse = { translations: { namespace: { key: 'value' } } };
    fetchMock.getOnce('*', mockResponse);

    const callback = jest.fn();
    backend.read('en', 'namespace', callback);

    await new Promise((resolve) => setImmediate(resolve));

    expect(callback).toHaveBeenCalledWith(
      null,
      mockResponse.translations.namespace
    );
  });

  test('read() should call callback with error when fetch fails', async () => {
    fetchMock.getOnce('*', 500);

    const callback = jest.fn();
    backend.read('en', 'namespace', callback);

    await new Promise((resolve) => setImmediate(resolve));

    expect(callback).toHaveBeenCalledWith(expect.any(FetchError), null);
  });

  test('reload() should call backendConnector.read() for each language and namespace', () => {
    backend.reload();

    expect(backend.services.backendConnector.read).toHaveBeenCalledTimes(1);
    expect(backend.services.backendConnector.read).toHaveBeenCalledWith(
      'en',
      'namespace',
      'read',
      null,
      null,
      expect.any(Function)
    );
  });
});
