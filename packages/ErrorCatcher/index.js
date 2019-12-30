import TestType from '../TestType';

const ErrorCatcherPrototype = Object.create(null);

/**
 * @param {Function} handler 需要包装的函数
 * @param {String[]} types 类型列表
 * @return {Function}
 */
ErrorCatcherPrototype.matchParamsType = function(handler, types) {
  return function(...args) {
    const error = !TestType.isMatchTypes(types, args);
    if (error) {
      const targetTypes = args.map(param => TestType.getType(param));
      throw new TypeError(
        `arguments should be ${types}, but now get ${targetTypes}`
      );
    }
    return handler(...args);
  };
};

Object.freeze(ErrorCatcherPrototype);
export default Object.create(ErrorCatcherPrototype);
