"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tuple_1 = require("./tuple");
const utils_1 = require("./utils");
var _wrap = function (x) { return [x]; };
var _wrapArray = tuple_1.map(_wrap);
var _processArray = function (fn, source, length) {
    var result = [];
    var sourceLength = source.length;
    var sourceIndex = -1;
    while (++sourceIndex < sourceLength) {
        utils_1.pushArray(result, fn.apply(null, _wrap(source[sourceIndex])), length);
        if (result.length >= length)
            break;
    }
    return result;
};
var _processIterable = function (fn, source, length) {
    var result = [];
    for (var entry of source) {
        utils_1.pushArray(result, fn.apply(null, _wrap(entry)), length);
        if (result.length >= length)
            break;
    }
    return result;
};
// var _processArray = _processIterable;
var _processObj = function (fn, value, length) {
    return tuple_1.flatMap(fn).apply(null, _wrap(value));
};
function typedSeq(funcQueue, value) {
    var type = typeof value;
    var process;
    if (Array.isArray(value)) {
        process = _processArray;
    }
    else if (utils_1.isIterable(value)) {
        process = _processIterable;
    }
    else {
        process = _processObj;
    }
    return process;
}
exports.typedSeq = typedSeq;
