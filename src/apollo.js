import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from './upload-link';
import { apiEndpoints } from './constants';

export const apolloClient = (version, apiKey) => {
  const uploadLink = createUploadLink({
    uri: apiEndpoints[`v${version}`].https,
  });
  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
    },
  });
  client.apiKey = apiKey;
  return client;
};
