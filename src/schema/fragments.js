import gql from 'graphql-tag';

export const RESULT = gql`
  fragment result on Result {
    success
    confidence
    error
    score
  }
`;

export const LIVENESS_FRAGMENT = gql`
  fragment liveness on Liveness {
    sessionId
    time
    createdAt
    result {
      ...result
    }
  }
  ${RESULT}
`;

export const FACE_FRAGMENT = gql`
  fragment face on FaceAction {
    sessionId
    time
    createdAt
    actionCode
    person {
      id
      imageURL
      thumb50x50
      thumb200x200
    }
    result {
      ...result
    }
  }
  ${RESULT}
`;

export const LIVE_FACE_FRAGMENT = gql`
  fragment liveFace on LiveFaceAction {
      sessionId
      timeFace
      timeLive
      createdAt
      person {
        id
        imageURL
        thumb50x50
        thumb200x200
      }
      resultFace {
        ...result
      }
      resultLive {
        ...result
      }
  }
  ${RESULT}
`;
