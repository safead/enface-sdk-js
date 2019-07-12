import * as m from './schema/mutations';
import * as s from './schema/subscriptions';
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
    images,
    groupId,
  }) {
    return new Promise(async (resolve, reject) => {
      try {
        images = await utils.checkImages(images, 1, constants.MIN_IMAGE_SIZE);
      } catch (error) {
        return reject(error);
      }
      let actionId;
      const { client } = this;
      client.subscribe({
        query: s.RECOGNIZE_UPDATED,
        variables: {
          groupId,
        },
      }).subscribe({
        next(data) {
          const { data: { faceUpdated: { action } } } = data;
          if (actionId !== action.sessionId) return;
          client.wsLink.subscriptionClient.close();
          resolve(utils.filterObject(action, '__typename'));
        },
        error(error) {
          client.wsLink.subscriptionClient.close();
          reject(error);
        },
      });
      try {
        const { data: { goFace: { sessionId } } } = await client.mutate({
          mutation: m.RECOGNIZE,
          variables: {
            apiKey: client.apiKey,
            files: utils.nameImagesByIndex(images),
          },
        });
        actionId = sessionId;
        console.log(`new enface recognition task id ${sessionId}`);
      } catch (error) {
        reject(error);
      }
    });
  }

  liveness({
    images,
    groupId,
  }) {
    return new Promise(async (resolve, reject) => {
      try {
        images = await utils.checkImages(images, 3, constants.MIN_IMAGE_SIZE);
      } catch (error) {
        return reject(error);
      }
      let actionId;
      const { client } = this;
      client.subscribe({
        query: s.LIVENESS_UPDATED,
        variables: {
          groupId,
        },
      }).subscribe({
        next(data) {
          const { data: { livenessUpdated: { action } } } = data;
          if (actionId !== action.sessionId) return;
          client.wsLink.subscriptionClient.close();
          resolve(utils.filterObject(action, '__typename'));
        },
        error(error) {
          client.wsLink.subscriptionClient.close();
          reject(error);
        },
      });
      try {
        const { data: { goLiveness: { sessionId } } } = await client.mutate({
          mutation: m.LIVENESS,
          variables: {
            apiKey: client.apiKey,
            files: utils.nameImagesByIndex(images),
          },
        });
        actionId = sessionId;
        console.log(`new enface liveness task id ${sessionId}`);
      } catch (error) {
        reject(error);
      }
    });
  }

  recognizeLiveness({
    images,
    groupId,
  }) {
    return new Promise(async (resolve, reject) => {
      try {
        images = await utils.checkImages(images, 3, constants.MIN_IMAGE_SIZE);
      } catch (error) {
        return reject(error);
      }
      let actionId;
      const { client } = this;
      client.subscribe({
        query: s.REC_LIVE_UPDATED,
        variables: {
          groupId,
        },
      }).subscribe({
        next(data) {
          const { data: { liveFaceUpdated: { action } } } = data;
          if (actionId !== action.sessionId) return;
          client.wsLink.subscriptionClient.close();
          resolve(utils.filterObject(action, '__typename'));
        },
        error(error) {
          client.wsLink.subscriptionClient.close();
          reject(error);
        },
      });
      try {
        const { data: { goLiveFace: { sessionId } } } = await client.mutate({
          mutation: m.RECOGNIZE_LIVENESS,
          variables: {
            apiKey: client.apiKey,
            files: utils.nameImagesByIndex(images),
          },
        });
        actionId = sessionId;
        console.log(`new enface recognition & liveness task id ${sessionId}`);
      } catch (error) {
        reject(error);
      }
    });
  }
}
