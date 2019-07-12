import path from 'path';
import * as constants from './__mocks__/constants';
import { readFile } from './__utils__';
import { createEnfaceApi } from '../src';

/* >>>>>>>>> ADD YOUR REAL API KEY >>>>>>>>> */
const recognitionApiKey = 'YOUR_RECOGNITION_API_KEY';
const livenessApiKey = 'YOUR_LIVENESS_API_KEY';
const recognizeLivenessApiKey = 'YOUR_RECOGNIZE_LIVENESS_API_KEY';
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */

const version = 1;
const pathToMockedImage = path.resolve(__dirname, './__mocks__/image.jpg');
jest.setTimeout(30000);

describe('EnfaceApi real network tests', () => {
  let mockedFile1;
  let mockedFile2;
  let mockedFile3;

  beforeAll(async done => {
    mockedFile1 = await readFile(pathToMockedImage);
    mockedFile2 = mockedFile1;
    mockedFile3 = mockedFile1;
    done();
  });

  test('Recognition request using bad api key, expecting rejection', async () => {
    const apiLocal = createEnfaceApi({
      version,
      apiKey: constants.INVALID_KEY,
    });
    await expect(apiLocal.recognize({ images: [mockedFile1.buffer] }))
      .rejects
      .toBeInstanceOf(Object);
  });

  if (recognitionApiKey !== 'YOUR_RECOGNITION_API_KEY') {
    test('Recognition request, should succeed', async () => {
      const api = createEnfaceApi({
        version,
        apiKey: recognitionApiKey,
      });
      const result = await api.recognize({
        images: [mockedFile1],
      });
      expect(result).toHaveProperty('sessionId');
    });
  }

  if (livenessApiKey !== 'YOUR_LIVENESS_API_KEY') {
    test('Liveness request, should succeed', async () => {
      const api = createEnfaceApi({
        version,
        apiKey: livenessApiKey,
      });
      const result = await api.liveness({
        images: [mockedFile1.buffer, mockedFile2, mockedFile3],
      });
      expect(result).toHaveProperty('sessionId');
    });
  }

  if (recognizeLivenessApiKey !== 'YOUR_RECOGNIZE_LIVENESS_API_KEY') {
    test('Recognize & liveness request, should succeed', async () => {
      const api = createEnfaceApi({
        version,
        apiKey: recognizeLivenessApiKey,
      });
      const result = await api.recognizeLiveness({
        images: [mockedFile1.buffer, mockedFile2.buffer, mockedFile3.buffer],
      });
      expect(result).toHaveProperty('sessionId');
    });
  }
});
