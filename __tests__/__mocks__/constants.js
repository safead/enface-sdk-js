export const API_KEY = '00000000-1111-2222-3333-444444444444';
export const INVALID_KEY = '00000000-0000-0000-0000-000000000000';
export const BAD_KEY = '00000000-0000-0000-0000-00000000000x';

export const GRAPHQL_MOCK = {
  recognition: {
    [BAD_KEY]: {
      result: new Error(`GraphQL error: Access violation [Wrong key ${BAD_KEY}]`),
    },
    [API_KEY]: {
      result: {
        v1: {
          data: { goFace: { __typename: 'FaceAction', createdAt: '2019-07-04T09:54:47.397Z', id: '520' } },
        },
      },
    },
  },
};
