"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const curry_1 = require("../src/base/curry");
const utils_1 = require("../src/base/utils");
console.log('curry', curry_1.curry(bcde)('a', 'b', 'c'));
console.log('curry', curry_1.curry(bcde)('a', 'b')('c'));
console.log('curry', curry_1.curry(bcde)('a')('b', 'c'));
console.log('curry', curry_1.curry(bcde)('a')('b')('c'));
// Test with one value curried
console.log('curry', curry_1.curry(bcde, 3, 'a')('b', 'c'));
console.log('curry', curry_1.curry(bcde, 3, 'a')('b')('c'));
console.log('curry', curry_1.curry(bcde, 3, 'a')('b', 'c'));
// Test various wierd configurations
console.log('curry', curry_1.curry(() => { console.log('hello'); return 'done'; })()); // No arguements
console.log('curry', curry_1.curry(bcde, 3, 'a', 'b')('c'));
console.log('curry', curry_1.curry(bcde, 3, 'a', 'b', 'c', 'd')()); // Too many arguments
console.log('curry', curry_1.curry(bcde, 3, 'a', 'b', 'c')()); // Should have to call once even if no arguments
console.log('examplary', curry_1.curry(alskdfklajsdf, 3)('a')('b')('c')); // Test differing parameter requiremenst
console.log('examplary', curry_1.curry(something, 4)('a')('b')('c')('d', 'e')); // Test differing parameter requiremenst
// // This won't work too well
// function alskdfklajsdf(a: any, b: any) {
//   return function (c: any) {
//     console.log(a,b,c);
//     return 'alskdfklajsdf';
//   }
// }
function alskdfklajsdf(a, b, ...args) {
    return curry_1._dispatch(1, args, function (c) {
        console.log(a, b, c);
        return 'alskdfklajsdf';
    });
}
function something(a, b, c, ...d) {
    console.log(a, b, c, d);
    return 'something';
}
function bcde(a, b, c) {
    console.log(a, b, c);
    return 'done';
}
// console.log('bleh', asdf('a', 'b', 'c'));
// // console.log('bleh', asdf('a'));
// // console.log('bleh', asdf('a', 'b'));
// console.log('bleh', asdf('a', 'b')('c'));
// console.log('bleh', asdf('a')('b','c'));
// console.log('bleh', asdf('a')('b')('c'));
// Testing how the output should look like when a user call curry on something
// 
function asdf() {
    var args = utils_1._SKIP0TILL0.apply(void 0, arguments);
    return curry_1._dispatch(2, args, bcdef);
    function bcdef() {
        var args2 = utils_1._SKIP0TILL0.apply(void 0, arguments);
        return curry_1._dispatch(3, args2, cdef);
        function cdef(a, b, c) {
            console.log(a, b, c);
            return 'done';
        }
        ;
    }
    ;
}
// console.log('bleh', asdf2('a', 'b', 'c'));
// // console.log('bleh', asdf2('a'));
// // console.log('bleh', asdf2('a', 'b'));
// console.log('bleh', asdf2('a', 'b')('c'));
// console.log('bleh', asdf2('a')('b','c'));
// console.log('bleh', asdf2('a')('b')('c'));
// For when writing tuples functions myself, I'll probably follow this pattern
function asdf2(a) {
    var args = utils_1._SKIP1TILL0.apply(void 0, arguments);
    return curry_1._dispatch(1, args, bcdef2);
    function bcdef2(b) {
        var args2 = utils_1._SKIP1TILL0.apply(void 0, arguments);
        return curry_1._dispatch(1, args2, cdef2);
        function cdef2(c) {
            console.log(a, b, c);
            return 'done';
        }
        ;
    }
    ;
}
