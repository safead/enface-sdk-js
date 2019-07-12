import { createMockClient } from 'mock-apollo-client';
import * as m from '../../src/schema/mutations';
import * as constants from './constants';

const mockClient = createMockClient();

export const getMockedResult = (type, apiKey, version) => {
  const { result } = constants.GRAPHQL_MOCK[type][apiKey];
  return result[`v${version}`] || result;
};

mockClient.setRequestHandler(
  m.RECOGNIZE,
  vars => {
    const result = getMockedResult('recognition', vars.apiKey, vars.version);
    return result instanceof Error ? Promise.reject(result) : Promise.resolve(result);
  }
);

export const apolloClient = mockClient;
