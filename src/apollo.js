import ws from 'isomorphic-ws';
import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloLink, split } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from './upload-link';
import { apiEndpoints } from './constants';

export const apolloClient = (version, apiKey) => {
  const uploadLink = createUploadLink({
    uri: apiEndpoints[`v${version}`].https,
  });
  const wsLink = new WebSocketLink({
    uri: apiEndpoints[`v${version}`].wss,
    options: {
      connectionParams: () => ({
        apiKey,
      }),
      lazy: true,
    },
    webSocketImpl: ws,
  });
  const terminatingLink = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    uploadLink
  );
  const client = new ApolloClient({
    link: ApolloLink.from([terminatingLink]),
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
  client.wsLink = wsLink;
  return client;
};
