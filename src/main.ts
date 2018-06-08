// chunk
// curry
// pipe
// compose
// deepCopy
// flatMap
// flatten
// matches
// memoize
// prop
// sort
// tail
// get
// debounce

import {
  map, sieve, fold, chunk, flatMap, reverseMap, sort, foldMap
} from './base/tuple';
import {flow}  from './base/extra';
import {_bind} from './base/curry';
import {typedSeq} from './base/step';
import {INFINITY, _id} from './base/utils';

interface Lazy {
  map(fn: (a: any) => any): Lazy;
  sieve(fn: (a: any) => boolean): Lazy;
  flatMap(fn: (a: any) => any): Lazy;
  uniq(): Lazy;
  uniq<U>(fn: (a: U) => U): Lazy;
  // To do
  foldMap(fn: (a: any, b: any) => any, c: any): Lazy;
  //zip(fn: (a: any, b: any) => any, c: any): Lazy;
  
  // The ones that require reference to the length or entire array at runtime
  chain(fn: (value: any) => any[]): Lazy;
  chunk(chunkSize: number): Lazy;
  fold<U>(fn: (accumulator: U, element: any) => U, seed: U): Lazy;
  reverseMap(): Lazy;
  reverseMap(fn: (a: any) => any): Lazy;
  sort(fn?: (a: any, b: any) => number): Lazy;

  // Update the interior value wrapped
  seq(): Lazy;
  seq(num: number): Lazy;
  take(): any[];
  take(num: number): any[];
}

export function Shiyi(value: any): Lazy {
  // var value = wrap.apply(null, input);
  var _funcQueue: ((...args: any[]) => any[])[] = [];
  var _prototype = <Lazy>{};
  var _processValues = typedSeq(_funcQueue, value);

  _prototype.map = function (fn) {
    _funcQueue[_funcQueue.length] = map(fn);
    return _prototype;
  };

  _prototype.sieve = function (fn) {
    _funcQueue[_funcQueue.length] = sieve(fn);
    return _prototype;
  };

  _prototype.flatMap = function (fn) {
    _funcQueue[_funcQueue.length] = flatMap(fn);
    return _prototype;
  };

  _prototype.uniq = function (fn = _id) {
    var uniqueValues = new Set();
    _funcQueue[_funcQueue.length] = sieve(function (element) {
      var transformedElement = fn(element);
      var hasValue = uniqueValues.has(transformedElement);
      uniqueValues.add(transformedElement);
      return !hasValue;
    });
    return _prototype;
  };

  _prototype.foldMap = function (fn, seed) {
    _funcQueue[_funcQueue.length] = foldMap(fn)(seed);
    return _prototype;
  }

  // Doesn't rebuild prototype
  _prototype.chain = function (fn) {
    value = fn.apply(null, _prototype.take());
    return _prototype;
  }

  _prototype.fold = function (fn, seed) {
    _prototype.chain(fold(fn)(seed));
    return _prototype;
  };
  _prototype.chunk = function (chunkSize) {
    _prototype.chain(chunk(chunkSize));
    return _prototype;
  };

  _prototype.reverseMap = function (fn = _id) {
    _prototype.chain(reverseMap(fn))
    return _prototype;
  };

  _prototype.sort = function (fn?) {
    _prototype.chain(sort(fn));
    return _prototype;
  }


  _prototype.seq = function (num: number = INFINITY) {
    value = _processValues(flow.apply(null, _funcQueue), value, INFINITY);
    _funcQueue = [];
    return _prototype;
  };

  _prototype.take = function (num: number = INFINITY) {
    _prototype.seq(num);
    return value;
  };
  return _prototype;
}


console.log(Shiyi([1,2,3,4,5,6,7])
  .chunk(3)
  // .flatMap(_id)
  .take()
);


console.log(Shiyi([1,2,3,4,5,6,7])
  .map(x => x + 1)
  // .sieve(x => x % 2 === 0)
  // .map(x => x + 1)
  // .foldMap((acc, x) => { return [acc+x, acc+x]; }, 1)
  // .sieve(x => x % 3 !== 0)
  .take()
);

console.log(Shiyi([-4,-3,-2,-1,0,1,2,3])
  .map(x => x + 1)
  // .foldMap((acc, x) => [acc+x, acc+x], 1)
  .uniq()
  .reverseMap()
  .take()
);


console.log(Shiyi([-4,-3,-2,-1,0,1,2,3,8,8,0,4])
  .map(x => x + 1)
  .uniq()
  .map(x => x - 1)
  .chunk(3)
  .take()
);

// console.log('chunk', wrapper([-4,-3,-2,-1,0,1,2,3])
//   .map(x => x + 1)
//   .uniq()
//   .chunk(3)
//   .takeAll()
// );

var a = require('./base/tuple');