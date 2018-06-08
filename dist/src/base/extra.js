"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const curry_1 = require("./curry");
exports.curry = curry_1.curry;
function pipe(source) {
    return function () {
        return flow.apply(null, arguments).apply(null, source);
    };
}
exports.pipe = pipe;
function flow(...placeholder) {
    var fList = utils_1._SKIP0TILL0.apply(null, arguments);
    return function () {
        var source = utils_1._SKIP0TILL0.apply(null, arguments);
        var length = fList.length;
        var queue = fList;
        var index = -1;
        while (++index < length) { // func + arg pairs
            source = queue[index].apply(null, source);
        }
        return source;
    };
}
exports.flow = flow;
function unmonad(fn) {
    var args = utils_1._SKIP1TILL0.apply(null, arguments);
    return (curry_1._dispatch(1, args, function () {
        var source = utils_1._SKIP0TILL0.apply(null, arguments);
        return fn.apply(source, args);
    }));
}
exports.unmonad = unmonad;
function deepCopy() {
}
exports.deepCopy = deepCopy;
