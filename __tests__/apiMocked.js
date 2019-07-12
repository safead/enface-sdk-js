import path from 'path';
import * as constants from './__mocks__/constants';
import { readFile } from './__utils__';
import { createEnfaceApi } from '../src';
import { apolloClient, getMockedResult } from './__mocks__/mockedClient';

const pathToMockedImage = path.resolve(__dirname, './__mocks__/vvp_similar.jpg');
const version = 1;

describe('EnfaceApi mocked tests', () => {
  let mockedFile1;
  let mockedFile2;
  let mockedFile3;

  apolloClient.apiKey = constants.API_KEY;
  const api = new createEnfaceApi({
    client: apolloClient,
  });

  beforeAll(async done => {
    mockedFile1 = await readFile(pathToMockedImage);
    mockedFile2 = mockedFile1;
    mockedFile3 = mockedFile1;
    done();
  });

  test('Recognition request using bad api key, expecting rejection', async () => {
    apolloClient.apiKey = constants.BAD_KEY;
    const apiLocal = new createEnfaceApi({
      client: apolloClient,
    });
    await expect(apiLocal.recognize({ images: [mockedFile1.buffer] }))
      .rejects
      .toEqual(new Error(`Network error: GraphQL error: Access violation [Wrong key ${constants.BAD_KEY}]`));
  });

  test('Recognition request, should succeed', async () => {
    // console.log('getMockedResult', getMockedResult('recognition', constants.API_KEY, version));
    // await expect(api.recognize({ images: [mockedFile1.buffer] })
    //   .resolves
    //   .toEqual(getMockedResult('recognition', constants.API_KEY, version));
  });
});
