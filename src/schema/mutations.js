import gql from 'graphql-tag';

export const RECOGNIZE = gql`
  mutation (
    $files: [Upload!]!
    $apiKey: String!
    $version: String
  ) {
    goFace (
      apiKey: $apiKey
      files: $files
      version: $version
    ) {
      sessionId
      createdAt
    }
  }
`;

export const LIVENESS = gql`
  mutation (
    $files: [Upload!]!
    $apiKey: String!
    $version: String
  ) {
    goLiveness (
      apiKey: $apiKey
      files: $files
      version: $version
    ) {
      sessionId
      createdAt
    }
  }
`;

export const RECOGNIZE_LIVENESS = gql`
  mutation (
    $files: [Upload!]!
    $apiKey: String!
    $versionLive: String
    $versionFace: String
  ) {
    goLiveFace (
      apiKey: $apiKey
      files: $files
      versionLive: $versionLive
      versionFace: $versionFace
    ) {
      sessionId
      createdAt
    }
  }
`;
