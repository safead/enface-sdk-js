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

  recognize({
    images, pc, npc, bcId, pa, security,
  }) {
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
            pc,
            npc,
            bcId,
            pa,
            security,
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

  authenticate({
    images, project, token, fields,
  }) {
    return new Promise(async (resolve, reject) => {
      try {
        images = await utils.checkImages(images, 1, constants.MIN_IMAGE_SIZE);
      } catch (error) {
        return reject(error);
      }
      const { client } = this;
      try {
        const authResult = await client.mutate({
          mutation: m.AUTHENTICATION,
          variables: {
            files: utils.nameImagesByIndex(images),
            project,
            token,
            fields,
          },
        });
        resolve(utils.filterObject(authResult, '__typename'));
      } catch (error) {
        reject(error);
      }
    });
  }

  authBlockchain({
    alias, project, token, fields, security,
  }) {
    return new Promise(async (resolve, reject) => {
      const { client } = this;
      try {
        const authResult = await client.mutate({
          mutation: m.AUTH_BLOCKCHAIN,
          variables: {
            alias,
            security,
            project,
            token,
            fields,
          },
        });
        resolve(utils.filterObject(authResult, '__typename'));
      } catch (error) {
        reject(error);
      }
    });
  }

  payment({
    alias, projectId, productId, txId, security,
  }) {
    return new Promise(async (resolve, reject) => {
      const { client } = this;
      try {
        const authResult = await client.mutate({
          mutation: m.PAYMENT,
          variables: {
            alias,
            security,
            projectId,
            productId,
            txId,
          },
        });
        resolve(utils.filterObject(authResult, '__typename'));
      } catch (error) {
        reject(error);
      }
    });
  }

  recognizeWalletUser({
    images, alias, security,
  }) {
    return new Promise(async (resolve, reject) => {
      try {
        images = await utils.checkImages(images, 1, constants.MIN_IMAGE_SIZE);
      } catch (error) {
        return reject(error);
      }
      const { client } = this;
      try {
        const authResult = await client.mutate({
          mutation: m.RECOGNIZE_WALLET_USER,
          variables: {
            files: utils.nameImagesByIndex(images),
            apiKey: client.apiKey,
            alias,
            security,
          },
        });
        resolve(utils.filterObject(authResult, '__typename'));
      } catch (error) {
        reject(error);
      }
    });
  }
}
