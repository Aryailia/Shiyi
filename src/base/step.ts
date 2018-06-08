import {Left, Right, Either} from './either';
import {map, flatMap} from './tuple';
import {flow} from './extra';
import {_id, isIterable, pushArray, INFINITY} from './utils';

type processor = (
  fn: (...a: any[]) => any,
  value: any,
  length: number
) => any[];

var _wrap = function (x: any) { return [x]; };

var _wrapArray = map(_wrap);
var _processArray: processor = function(fn, source, length) {
  var result: any[] = [];
  var sourceLength = source.length;
  var sourceIndex = -1; while (++sourceIndex < sourceLength) {
    pushArray(result, fn.apply(null, _wrap(source[sourceIndex])), length);
    if (result.length >= length) break;
  }
  return result;
};

var _processIterable: processor = function(fn, source, length) {
  var result: any[] = [];
  for (var entry of source) {
    pushArray(result, fn.apply(null, _wrap(entry)), length);
    if (result.length >= length) break;
  }
  return result;
};
// var _processArray = _processIterable;

var _processObj: processor = function(fn, value, length) {
  return flatMap(fn).apply(null, _wrap(value));
};

export function typedSeq<T>(funcQueue: any[], value: any) {
  var type = typeof value;
  var process: processor;
  if (Array.isArray(value)) {
    process = _processArray;
  } else if (isIterable(value)) {
    process = _processIterable;
  } else {
    process = _processObj;
  }
  return process;
}