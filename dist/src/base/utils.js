"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._id = function (x) { return x; };
exports.INFINITY = 1 / 0;
exports.inlineSlice = function (skip, till) {
    return function () {
        var length = arguments.length - till;
        var count = length > skip ? length - skip : 0;
        var result = new Array(count);
        var i = skip;
        while (i < length) {
            result[i - skip] = arguments[i];
            ++i;
        }
        return result;
    };
};
exports._SKIP0TILL0 = exports.inlineSlice(0, 0);
exports._SKIP1TILL0 = exports.inlineSlice(1, 0);
exports._SKIP2TILL0 = exports.inlineSlice(2, 0);
function pushArray(result, source, targetLength) {
    // var source = Array.isArray(input) ? input : [input];
    var sourceLength = source.length;
    var resultIndex = result.length;
    var i = -1;
    while (++i < sourceLength && resultIndex < targetLength) {
        result[resultIndex++] = source[i];
    }
}
exports.pushArray = pushArray;
function isIterable(value) {
    return (value != null && typeof value === 'object'
        && typeof Symbol === 'function' && typeof Symbol() === 'symbol'
        && typeof value[Symbol.iterator] === 'function');
}
exports.isIterable = isIterable;
