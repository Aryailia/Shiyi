"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const tuple_1 = require("./base/tuple");
const extra_1 = require("./base/extra");
const step_1 = require("./base/step");
const utils_1 = require("./base/utils");
function Shiyi(value) {
    // var value = wrap.apply(null, input);
    var _funcQueue = [];
    var _prototype = {};
    var _processValues = step_1.typedSeq(_funcQueue, value);
    _prototype.map = function (fn) {
        _funcQueue[_funcQueue.length] = tuple_1.map(fn);
        return _prototype;
    };
    _prototype.sieve = function (fn) {
        _funcQueue[_funcQueue.length] = tuple_1.sieve(fn);
        return _prototype;
    };
    _prototype.flatMap = function (fn) {
        _funcQueue[_funcQueue.length] = tuple_1.flatMap(fn);
        return _prototype;
    };
    _prototype.uniq = function (fn = utils_1._id) {
        var uniqueValues = new Set();
        _funcQueue[_funcQueue.length] = tuple_1.sieve(function (element) {
            var transformedElement = fn(element);
            var hasValue = uniqueValues.has(transformedElement);
            uniqueValues.add(transformedElement);
            return !hasValue;
        });
        return _prototype;
    };
    _prototype.foldMap = function (fn, seed) {
        _funcQueue[_funcQueue.length] = tuple_1.foldMap(fn)(seed);
        return _prototype;
    };
    // Doesn't rebuild prototype
    _prototype.chain = function (fn) {
        value = fn.apply(null, _prototype.take());
        return _prototype;
    };
    _prototype.fold = function (fn, seed) {
        _prototype.chain(tuple_1.fold(fn)(seed));
        return _prototype;
    };
    _prototype.chunk = function (chunkSize) {
        _prototype.chain(tuple_1.chunk(chunkSize));
        return _prototype;
    };
    _prototype.reverseMap = function (fn = utils_1._id) {
        _prototype.chain(tuple_1.reverseMap(fn));
        return _prototype;
    };
    _prototype.sort = function (fn) {
        _prototype.chain(tuple_1.sort(fn));
        return _prototype;
    };
    _prototype.seq = function (num = utils_1.INFINITY) {
        value = _processValues(extra_1.flow.apply(null, _funcQueue), value, utils_1.INFINITY);
        _funcQueue = [];
        return _prototype;
    };
    _prototype.take = function (num = utils_1.INFINITY) {
        _prototype.seq(num);
        return value;
    };
    return _prototype;
}
exports.Shiyi = Shiyi;
console.log(Shiyi([1, 2, 3, 4, 5, 6, 7])
    .chunk(3)
    // .flatMap(_id)
    .take());
console.log(Shiyi([1, 2, 3, 4, 5, 6, 7])
    .map(x => x + 1)
    // .sieve(x => x % 2 === 0)
    // .map(x => x + 1)
    // .foldMap((acc, x) => { return [acc+x, acc+x]; }, 1)
    // .sieve(x => x % 3 !== 0)
    .take());
console.log(Shiyi([-4, -3, -2, -1, 0, 1, 2, 3])
    .map(x => x + 1)
    // .foldMap((acc, x) => [acc+x, acc+x], 1)
    .uniq()
    .reverseMap()
    .take());
console.log(Shiyi([-4, -3, -2, -1, 0, 1, 2, 3, 8, 8, 0, 4])
    .map(x => x + 1)
    .uniq()
    .map(x => x - 1)
    .chunk(3)
    .take());
// console.log('chunk', wrapper([-4,-3,-2,-1,0,1,2,3])
//   .map(x => x + 1)
//   .uniq()
//   .chunk(3)
//   .takeAll()
// );
var a = require('./base/tuple');
