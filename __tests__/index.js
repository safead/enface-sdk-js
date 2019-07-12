import { createEnfaceApi } from '../src';
import { apiVersions } from '../src/constants';
import { EnfaceApi } from '../src/api';
import * as constants from './__mocks__/constants';

const nonExistedVersion = 999;

describe('createEnfaceApi test', () => {

  test('should throw a non existed version error', () => {
    const call = () => {
      createEnfaceApi({
        apiKey: constants.API_KEY,
        version: nonExistedVersion,
      });
    };
    expect(call).toThrow(
      new Error(
        `You have specified a non-existent version of Enface API: ${nonExistedVersion}.
      Available versions: ${apiVersions.join(', ')}`
      )
    );
  });

  test('should throw a bad API key format error', () => {
    const call = () => {
      createEnfaceApi({
        apiKey: constants.BAD_KEY,
        version: apiVersions[apiVersions.length - 1],
      });
    };
    expect(call).toThrow(new Error('Bad API key format'));
  });

  test('should successfully create an EnfaceApi instance', () => {
    const enfaceApi = createEnfaceApi({
      apiKey: constants.API_KEY,
      version: apiVersions[apiVersions.length - 1],
    });
    expect(enfaceApi).toBeInstanceOf(EnfaceApi);
  });
});

describe('EnfaceApi test', () => {
  const api = createEnfaceApi({
    apiKey: constants.API_KEY,
  });

  describe('Images preparation', () => {
    test('trying to make request with bad images format, expecting error', async () => {
      await expect(api.recognize(''))
        .rejects
        .toEqual(new Error('images array of length 1 required'));
    });

    test('trying to make request with empty images array, expecting error', async () => {
      await expect(api.recognize({ images: [] }))
        .rejects
        .toEqual(new Error('images array of length 1 required'));
    });

    test('trying to make request with bad images count, expecting error', async () => {
      await expect(api.recognize({ images: ['', ''] }))
        .rejects
        .toEqual(new Error('images array of length 1 required'));
    });

    test('trying to make request with bad images, expecting error', async () => {
      await expect(api.recognize({ images: [''] }))
        .rejects
        .toEqual(new Error('Bad image [0] format'));
    });

    test('trying to make request with small images, expecting error', async () => {
      await expect(api.recognize({ images: [(new Uint8Array([1]))] }))
        .rejects
        .toEqual(new Error('image [0] is too small'));
    });
  });
});
