import FormData from 'form-data';

const { ApolloLink, Observable } = require('apollo-link');
const {
  selectURI,
  selectHttpOptionsAndBody,
  fallbackHttpConfig,
  serializeFetchParameter,
  createSignalIfSupported,
  parseAndCheckHttpResponse,
} = require('apollo-link-http-common');
const { customExtractFiles } = require('./extract-files-custom');

export const createUploadLink = ({
  uri: fetchUri = '/graphql',
  fetch: linkFetch = fetch,
  fetchOptions,
  credentials,
  headers,
  includeExtensions,
} = {}) => {
  const linkConfig = {
    http: { includeExtensions },
    options: fetchOptions,
    credentials,
    headers,
  };

  return new ApolloLink(operation => {
    const uri = selectURI(operation, fetchUri);
    const context = operation.getContext();
    const {
      // From Apollo Client config.
      clientAwareness: { name, version } = {},
      headers,
    } = context;
    const contextConfig = {
      http: context.http,
      options: context.fetchOptions,
      credentials: context.credentials,
      headers: {
        // Client awareness headers are context overridable.
        ...(name && { 'apollographql-client-name': name }),
        ...(version && { 'apollographql-client-version': version }),
        ...headers,
      },
    };
    const { options, body } = selectHttpOptionsAndBody(
      operation,
      fallbackHttpConfig,
      linkConfig,
      contextConfig
    );
    const { clone, files } = customExtractFiles(body);
    const payload = serializeFetchParameter(clone, 'Payload');
    if (files.size) {
      delete options.headers['content-type'];
      const form = new FormData();
      form.append('operations', payload);
      const map = {};
      let i = 0;
      files.forEach(paths => {
        map[++i] = paths;
      });
      form.append('map', JSON.stringify(map));
      i = 0;
      files.forEach((paths, file) => {
        if (file instanceof ArrayBuffer) {
          form.append(++i, Buffer.from(file), file.name);
        } else {
          form.append(++i, file, file.name);
        }
      });
      options.body = form;
    } else options.body = payload;

    return new Observable(observer => {
      // Allow aborting fetch, if supported.
      const { controller, signal } = createSignalIfSupported();
      if (controller) options.signal = signal;

      linkFetch(uri, options)
        .then(response => {
          // Forward the response on the context.
          operation.setContext({ response });
          return response;
        })
        .then(parseAndCheckHttpResponse(operation))
        .then(result => {
          observer.next(result);
          observer.complete();
        })
        .catch(error => {
          if (error.name === 'AbortError')
          // Fetch was aborted.
          { return; }

          if (error.result && error.result.errors && error.result.data)
          // There is a GraphQL result to forward.
          { observer.next(error.result); }

          observer.error(error);
        });

      // Cleanup function.
      return () => {
        // Abort fetch.
        if (controller) controller.abort();
      };
    });
  });
};
