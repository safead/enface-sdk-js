import gql from 'graphql-tag';
import {
  LIVENESS_FRAGMENT,
  FACE_FRAGMENT,
  LIVE_FACE_FRAGMENT,
} from './fragments';

export const LIVENESS_UPDATED = gql`
  subscription livenessUpdated (
    $groupId: ID
  ) {
    livenessUpdated (
      groupId: $groupId
    ) {
      action {
        ...liveness
      }
    }
  }
  ${LIVENESS_FRAGMENT}
`;

export const RECOGNIZE_UPDATED = gql`
  subscription faceUpdated (
    $groupId: ID
  ) {
    faceUpdated (
      groupId: $groupId
    ) {
      action {
        ...face
      }
    }
  }
  ${FACE_FRAGMENT}
`;

export const REC_LIVE_UPDATED = gql`
  subscription liveFaceUpdated (
    $groupId: ID
  ) {
    liveFaceUpdated (
      groupId: $groupId
    ) {
      action {
        ...liveFace
      }
    }
  }
  ${LIVE_FACE_FRAGMENT}
`;
