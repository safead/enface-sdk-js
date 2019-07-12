export const isNodeEnvironment = (
  typeof process === 'object'
  && typeof process.versions === 'object'
  && typeof process.versions.node !== 'undefined'
);
