import { isNodeEnvironment } from './globals';
import { apiVersions, apiEndpoints } from './constants';
import { EnfaceApi } from './api.js';
import { apolloClient } from './apollo';
import * as utils from './utils';

const CreateEnfaceApi = ({
  version = apiVersions[apiVersions.length - 1],
  apiKey,
  url,
  client,
} = {}) => {
  if (!utils.isUuid(apiKey)) {
    throw new Error('Bad API key format');
  }
  if (!url) {
    version = +version;
    if (!apiVersions.includes(version)) {
      throw new Error(
        `You have specified a non-existent version of Enface API: ${version}.
      Available versions: ${apiVersions.join(', ')}`
      );
    }
    url = apiEndpoints[`v${version}`].https;
  }
  client = client || apolloClient(url, apiKey);
  return new EnfaceApi({ client });
};

isNodeEnvironment || (window.createEnfaceApi = CreateEnfaceApi);
export const createEnfaceApi = CreateEnfaceApi;
