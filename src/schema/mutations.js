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
    $pc: String
    $npc: String
    $bcId: String
    $pa: Float
    $security: String
  ) {
    recognize (
      apiKey: $apiKey
      files: $files
      version: $version
      pc: $pc
      npc: $npc
      pa: $pa
      bcId: $bcId
      security: $security
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

export const AUTHENTICATION = gql`
  mutation (
    $files: [Upload!]!
    $project: String!
    $token: String!
    $fields: String!
  ) {
    authentication (
      files: $files
      project: $project
      token: $token
      fields: $fields
    ) {
      result
      action
      message
    }
  }
`;
