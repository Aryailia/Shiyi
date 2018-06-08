"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// var Either = {
//   of: function (value: any) { return Right<any>(value); }
// }
function Left(value) {
    var prototype = {};
    prototype.map = function (fn) {
        return prototype; // noop
    };
    // prototype.leftMap = function (fn) {
    //   value = fn(value);
    //   return prototype;
    // };
    prototype.chain = function (fn) {
        return prototype; // noop
    };
    prototype.fold = function (leftFn, _) {
        return leftFn(value);
    };
    prototype.isLeft = true;
    prototype.isRight = false;
    return prototype;
}
exports.Left = Left;
function Right(value) {
    var prototype = {};
    prototype.map = function (fn) {
        value = fn(value);
        return prototype;
    };
    // prototype.leftMap = function (fn) {
    //   return prototype;
    // };
    prototype.chain = function (fn) {
        return fn(value);
    };
    prototype.fold = function (_, rightFn) {
        return rightFn(value);
    };
    prototype.isLeft = false;
    prototype.isRight = true;
    return prototype;
}
exports.Right = Right;
