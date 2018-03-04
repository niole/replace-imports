import uncontrollable from 'uncontrollable';

export default (propHandlerHash, methods) => Component =>
  uncontrollable(Component, propHandlerHash, methods);
