import gql from 'graphql-tag';
import {
  LIVENESS_FRAGMENT,
  FACE_FRAGMENT,
  LIVE_FACE_FRAGMENT,
} from './fragments';

export const RECOGNIZE = gql`
  mutation (
    $files: [Upload!]!
    $apiKey: String!
    $version: String
  ) {
    recognize (
      apiKey: $apiKey
      files: $files
      version: $version
    ) {
      ...face
    }
  }
  ${FACE_FRAGMENT}
`;

export const LIVENESS = gql`
  mutation (
    $files: [Upload!]!
    $apiKey: String!
    $version: String
  ) {
    liveness (
      apiKey: $apiKey
      files: $files
      version: $version
    ) {
      ...liveness
    }
  }
  ${LIVENESS_FRAGMENT}
`;

export const RECOGNIZE_LIVENESS = gql`
  mutation (
    $files: [Upload!]!
    $apiKey: String!
    $versionLive: String
    $versionFace: String
  ) {
    liveFace (
      apiKey: $apiKey
      files: $files
      versionLive: $versionLive
      versionFace: $versionFace
    ) {
      ...liveFace
    }
  }
  ${LIVE_FACE_FRAGMENT}
`;
