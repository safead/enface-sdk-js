import * as m from './schema/mutations';
import 'cross-fetch/polyfill';
import * as utils from './utils';
import * as constants from './constants';

export class EnfaceApi {
  constructor({
    client,
  }) {
    this.client = client;
  }

  recognize({ images }) {
    return new Promise(async (resolve, reject) => {
      try {
        images = await utils.checkImages(images, 1, constants.MIN_IMAGE_SIZE);
      } catch (error) {
        return reject(error);
      }
      const { client } = this;
      try {
        const { data: { recognize } } = await client.mutate({
          mutation: m.RECOGNIZE,
          variables: {
            apiKey: client.apiKey,
            files: utils.nameImagesByIndex(images),
          },
        });
        resolve(utils.filterObject(recognize, '__typename'));
      } catch (error) {
        reject(error);
      }
    });
  }

  liveness({ images }) {
    return new Promise(async (resolve, reject) => {
      try {
        images = await utils.checkImages(images, 3, constants.MIN_IMAGE_SIZE);
      } catch (error) {
        return reject(error);
      }
      const { client } = this;
      try {
        const { data: { liveness } } = await client.mutate({
          mutation: m.LIVENESS,
          variables: {
            apiKey: client.apiKey,
            files: utils.nameImagesByIndex(images),
          },
        });
        resolve(utils.filterObject(liveness, '__typename'));
      } catch (error) {
        reject(error);
      }
    });
  }

  recognizeLiveness({ images }) {
    return new Promise(async (resolve, reject) => {
      try {
        images = await utils.checkImages(images, 3, constants.MIN_IMAGE_SIZE);
      } catch (error) {
        return reject(error);
      }
      const { client } = this;
      try {
        const { data: { liveFace } } = await client.mutate({
          mutation: m.RECOGNIZE_LIVENESS,
          variables: {
            apiKey: client.apiKey,
            files: utils.nameImagesByIndex(images),
          },
        });
        resolve(utils.filterObject(liveFace, '__typename'));
      } catch (error) {
        reject(error);
      }
    });
  }
}
