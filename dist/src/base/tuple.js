"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const curry_1 = require("./curry");
// @ts-ignore 
// export function map<T,U>(fn: (a: T) => U, ...b: T[]): U[];
function map(fn) {
    return curry_1._dispatch(1, utils_1._SKIP1TILL0.apply(void 0, arguments), function () {
        var length = arguments.length;
        var target = new Array(length);
        var index = -1;
        while (++index < length) {
            target[index] = fn(arguments[index]);
        }
        return target;
    });
}
exports.map = map;
// @ts-ignore 
// export function sieve<T>(fn: (a: T) => boolean, ...b: T[]): T[];
function sieve(fn) {
    return curry_1._dispatch(1, utils_1._SKIP1TILL0.apply(void 0, arguments), function () {
        var length = arguments.length;
        var result = [];
        var resultIndex = -1;
        var sourceIndex = -1;
        while (++sourceIndex < length) {
            if (fn(arguments[sourceIndex])) {
                result[++resultIndex] = arguments[sourceIndex];
            }
        }
        return result;
    });
}
exports.sieve = sieve;
function flatMap(fn) {
    return function () {
        var length = arguments.length;
        var result = new Array(length);
        var innerIndex, innerLength, temp;
        var resultIndex = -1;
        var sourceIndex = -1;
        while (++sourceIndex < length) {
            temp = fn(arguments[sourceIndex]);
            if (Array.isArray(temp)) {
                innerLength = temp.length;
                innerIndex = -1;
                while (++innerIndex < innerLength) {
                    result[++resultIndex] = temp[innerIndex];
                }
            }
            else {
                result[++resultIndex] = temp;
            }
        }
        return result;
    };
}
exports.flatMap = flatMap;
exports.fold = function (fn) {
    return (curry_1._dispatch(1, utils_1._SKIP1TILL0.apply(void 0, arguments), function (accumulator) {
        return curry_1._dispatch(1, utils_1._SKIP1TILL0.apply(void 0, arguments), function () {
            var length = arguments.length;
            var index = -1;
            while (++index < length) {
                accumulator = fn(accumulator, arguments[index], index);
            }
            return [accumulator];
        });
    }));
};
exports.foldMap = function (fn) {
    return (curry_1._dispatch(1, utils_1._SKIP1TILL0.apply(void 0, arguments), function (accumulator) {
        return map(function (element) {
            var result = fn(accumulator, element);
            accumulator = result[0];
            return result[1];
        });
    }));
};
function scan(fn) {
    return function (seed) {
        return exports.foldMap(function (previous, current) {
            return [current, fn(previous, current)];
        })(seed);
    };
}
exports.scan = scan;
function unique(fn) {
    return function () {
        return Array.from.apply(void 0, exports.fold(function (uniqueValues, element) {
            return uniqueValues.add(element);
        })(new Set())
            .apply(void 0, arguments));
    };
}
exports.unique = unique;
;
function chunk(chunkSize) {
    return function () {
        var sourcedex = -1;
        var chunkdex = -1;
        var output = exports.fold(function (accumulator, element) {
            var lastChunk = ((++sourcedex % chunkSize) === 0)
                ? []
                : accumulator[chunkdex];
            if (lastChunk.length === 0) {
                accumulator[++chunkdex] = lastChunk;
            }
            lastChunk[lastChunk.length] = element;
            return accumulator;
        })(new Array(Math.ceil(arguments.length / chunkSize))).apply(void 0, arguments)[0];
        return output;
    };
}
exports.chunk = chunk;
;
function reverseMap(fn = utils_1._id) {
    return (curry_1._dispatch(1, utils_1._SKIP1TILL0.apply(void 0, arguments), function () {
        var length = arguments.length;
        var result = new Array(length);
        var index = -1;
        while (++index < length) {
            result[index] = fn(arguments[length - index - 1]);
        }
        return result;
    }));
}
exports.reverseMap = reverseMap;
function sort(compareFn) {
    return (curry_1._dispatch(1, utils_1._SKIP1TILL0.apply(void 0, arguments), function () {
        var source = utils_1._SKIP0TILL0.apply(void 0, arguments);
        return source.sort(compareFn);
    }));
}
exports.sort = sort;
function zip(arrayList) {
    return (curry_1._dispatch(1, utils_1._SKIP1TILL0.apply(void 0, arguments), function () {
        var length = arguments.length;
        var sublength = arrayList.length + 1;
        return exports.fold(function (result, element, index) {
            var zipped = new Array(sublength);
            zipped[0] = element;
            result[index] = exports.fold(function (subArray, element, subIndex) {
                subArray[subIndex + 1] = element[index];
                return subArray;
            })(zipped).apply(void 0, arrayList)[0];
            return result;
        })(new Array(length)).apply(void 0, arguments)[0];
    }));
}
exports.zip = zip;
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
