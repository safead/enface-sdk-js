import { isNodeEnvironment } from './globals';
import { apiVersions } from './constants';
import { EnfaceApi } from './api.js';
import { apolloClient } from './apollo';
import * as utils from './utils';

const CreateEnfaceApi = ({
  version = apiVersions[apiVersions.length - 1],
  apiKey,
  client,
} = {}) => {
  version = +version;
  if (!apiVersions.includes(version)) {
    throw new Error(
      `You have specified a non-existent version of Enface API: ${version}.
      Available versions: ${apiVersions.join(', ')}`
    );
  }
  client = client || apolloClient(version, apiKey);
  if (!utils.isUuid(client.apiKey)) {
    throw new Error('Bad API key format');
  }
  return new EnfaceApi({ client });
};

isNodeEnvironment || (window.createEnfaceApi = CreateEnfaceApi);
export const createEnfaceApi = CreateEnfaceApi;
