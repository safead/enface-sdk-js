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

export const AUTH_BLOCKCHAIN = gql`
  mutation (
    $alias: String!
    $security: String!
    $project: String!
    $token: String!
    $fields: String!
  ) {
    authBlockchain (
      alias: $alias
      security: $security
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

export const PAYMENT = gql`
  mutation (
    $alias: String!
    $security: String!
    $projectId: String!
    $productId: String!
    $txId: String!
  ) {
    payment (
      alias: $alias
      security: $security
      projectId: $projectId
      productId: $productId
      txId: $txId
    ) {
      result
      action
      message
    }
  }
`;

export const RECOGNIZE_WALLET_USER = gql`
  mutation (
    $files: [Upload!]!
    $apiKey: String!
    $alias: String!
    $security: String!
  ) {
    recognizeWalletUser (
      apiKey: $apiKey
      files: $files
      alias: $alias
      security: $security
    ) {
      result
      action
      message
    }
  }
`;
