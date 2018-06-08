import {_SKIP0TILL0, _SKIP1TILL0, inlineSlice, _id} from './utils';
import {_dispatch} from './curry';

// @ts-ignore 
// export function map<T,U>(fn: (a: T) => U, ...b: T[]): U[];
export function map<T,U>(fn: (a: T) => U): (...b: T[]) => U[] {
  return _dispatch(1, _SKIP1TILL0.apply(void 0, arguments), function () {
    var length = arguments.length;
    var target = new Array(length);

    var index: number = -1; while (++index < length) {
      target[index] = fn(arguments[index]);
    }
    return target;
  });
}

// @ts-ignore 
// export function sieve<T>(fn: (a: T) => boolean, ...b: T[]): T[];
export function sieve<T>(fn: (a: T) => boolean): (...b: T[]) => T[] {
  return _dispatch(1, _SKIP1TILL0.apply(void 0, arguments), function () {
    var length: number = arguments.length;

    var result: any[] = [];
    var resultIndex: number = -1;
    var sourceIndex: number = -1; while (++sourceIndex < length) {
      if (fn(arguments[sourceIndex])) {
        result[++resultIndex] = arguments[sourceIndex];
      }
    }
    return result;
  });
}

export function flatMap<T, U>(fn: (a: T) => U): (...args: T[]) => U[] {
  return function () {
    var length = arguments.length;
    var result = new Array(length);

    var innerIndex, innerLength, temp;
    var resultIndex = -1;
    var sourceIndex = -1; while (++sourceIndex < length) {
      temp = fn(arguments[sourceIndex]);
      if (Array.isArray(temp)) {
        innerLength = temp.length;
        innerIndex = -1; while (++innerIndex < innerLength) {
          result[++resultIndex] = temp[innerIndex];
        }
      } else {
        result[++resultIndex] = temp;
      }
    }
    return result;
  };
}

export var fold: <T, U>
  (fn: (accumulator: T, element: U, index: number) => T) =>
  (seed: T) =>
  (...data: U[]) => [T] =
function <T, U>(fn: (a: T, e: U, i: number) => T) {
  return(_dispatch(1, _SKIP1TILL0.apply(void 0, arguments), 
    function (accumulator: T) {
      return _dispatch(1, _SKIP1TILL0.apply(void 0, arguments), function () {
        var length = arguments.length;
        var index: number = -1; while (++index < length) {
          accumulator = fn(accumulator, arguments[index], index);
        }
        return [accumulator];
      });
    })
  );
}

export var foldMap: <T, U, V>
  (fn: (accumulator: T, element: U) => [T, V]) =>
  (seed: T) =>
  (...data: U[]) => V[] =
function <T,U,V>(fn: (a: T, e: U) => [T, V]) {
  return(_dispatch(1, _SKIP1TILL0.apply(void 0, arguments),
    function (accumulator: T) {
      return map(function (element: U): V {
        var result = fn(accumulator, element);
        accumulator = result[0];
        return result[1];
      });
    })
  );
}


export function scan<T>(fn: (previous: T, current: T) => T) {
  return function (seed: T): (...data: T[]) => T[] {
    return foldMap(function (previous: T, current: T) {
      return [current, fn(previous, current)]
    })(seed);
  };
}

export function unique<T>(fn: (a: any) => T): (...args: any[]) => any[] {
  return function () {
    return Array.from.apply(void 0, fold(
      function (uniqueValues: Set<T>, element: T) {
        return uniqueValues.add(element);
      })
      (new Set())
      .apply(void 0, arguments)
    );
  }
};

export function chunk<T>(chunkSize: number): (...args: T[]) => T[][] {
  return function () {
    var sourcedex = -1;
    var chunkdex = -1;
    var output = fold(
      function (accumulator: T[][], element: T) {
        var lastChunk: T[] = ((++sourcedex % chunkSize) === 0)
          ? []
          : accumulator[chunkdex];
        if (lastChunk.length === 0) {
          accumulator[++chunkdex] = lastChunk;
        }
        lastChunk[lastChunk.length] = element;
        return accumulator;
      })(new Array(Math.ceil(arguments.length / chunkSize))
    ).apply(void 0, arguments)[0];
    return output;
  };
};

export function reverseMap<T, U>(fn: (a: T) => U = _id): (...b: T[]) => U[] {
  return(_dispatch(1, _SKIP1TILL0.apply(void 0, arguments), function () {
    var length = arguments.length;
    var result = new Array(length);
    var index = -1; while (++index < length) {
      result[index] = fn(arguments[length - index - 1]);
    }
    return result;
  }));
}

export function sort<T>(compareFn?: (a: T, b: T) => number) {
  return(_dispatch(1, _SKIP1TILL0.apply(void 0, arguments), function () {
    var source: any[] = _SKIP0TILL0.apply(void 0, arguments);
    return source.sort(compareFn);
  }));
}


export function zip(arrayList: any[][]): (...b: any[]) => any[][] {
  return(_dispatch(1, _SKIP1TILL0.apply(void 0, arguments), function () {
    var length = arguments.length;
    var sublength = arrayList.length + 1;
    
    return fold(function (result: any[][], element, index) {
      var zipped: any[] = new Array(sublength);
      zipped[0] = element;
      result[index] = fold(function (subArray: any[], element: any[], subIndex) {
        subArray[subIndex + 1] = element[index];
        return subArray;
      })(zipped).apply(void 0, arrayList)[0];
      return result;
    })(new Array(length)).apply(void 0, arguments)[0];
  }));
}

// console.log(flatMap(x=>x)(1,2,3,[4,5,6, []], [], []));

// console.log(chunk(3)(1,2,3,4,5,6,7,8,9,0,10,11));

// console.log(foldMap<number[], number, string>(
//   (acc,x)=>[[acc[0]+x], acc[0].toString()])([0])(1,3,5,7,9,11,13))
// );
// console.log(scan(
//   (prev,curr)=>prev+curr)
//   (0)
//   (1,3,5,7,9,11,13)
// );