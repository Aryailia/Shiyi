
export var _id = function (x: any) { return x; }
export var INFINITY = 1/0;

export var inlineSlice:
  (skip: number, till: number) =>
  (...args: any[]) => any[] =
function (skip, till) {
  return function () {
    var length = arguments.length - till;
    var count = length > skip ? length - skip : 0;
    var result = new Array(count);
    var i = skip; while (i < length) {
      result[i - skip] = arguments[i];
      ++i;
    }
    return result;
  };
}

export var _SKIP0TILL0 = inlineSlice(0, 0);
export var _SKIP1TILL0 = inlineSlice(1, 0);
export var _SKIP2TILL0 = inlineSlice(2, 0);

export function pushArray(result: any[], source: any[], targetLength: number) {
  // var source = Array.isArray(input) ? input : [input];
  var sourceLength = source.length;
  var resultIndex = result.length;

  var i = -1; while (++i < sourceLength && resultIndex < targetLength) {
    result[resultIndex++] = source[i];
  }
}

export function isIterable(value: any): boolean {
  return (
    value != null && typeof value === 'object'
    && typeof Symbol === 'function' && typeof Symbol() === 'symbol'
    && typeof value[Symbol.iterator] === 'function'
  );
}


