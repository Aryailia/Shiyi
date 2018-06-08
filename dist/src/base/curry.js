"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @todo add this to _bind
 * @todo test {this} for _bind
 */
const utils_1 = require("./utils");
function _bind(fn, args) {
    return ((args.length === 0) // if i refactor this to fix the {this} binding, then will have to conditional
        ? fn // since no arguments specified, this actually does nothing
        : function () {
            var postArgs = utils_1._SKIP0TILL0.apply(void 0, arguments);
            return fn.apply(void 0, args.concat(postArgs));
        });
}
exports._bind = _bind;
function _dispatch(minParameterCount, args, fn) {
    return ((args.length >= minParameterCount)
        ? fn.apply(void 0, args)
        : _bind(fn, args));
}
exports._dispatch = _dispatch;
function _curryLoop(fn, argCount, index, boundedArgs) {
    return (index <= 1 // Only have to wrap
        ? _bind(fn, boundedArgs)
        : _curryLoop(function () {
            var postArgs = utils_1._SKIP0TILL0.apply(void 0, arguments);
            return _dispatch(argCount, postArgs, fn);
        }, argCount, --index, boundedArgs));
}
// export var curry:
//   (
//     fn: Function,
//     argCount: number,
//   ) => Function = 
function curry(fn, argCount = fn.length, ...placeholder // Hopefully this will be optimised out
) {
    return _curryLoop(fn, argCount, argCount, utils_1._SKIP2TILL0.apply(void 0, arguments));
}
exports.curry = curry;
