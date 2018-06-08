export interface Either<T> {
  map(f: (a: T) => T): Either<T>;
  // chain(f: PureSSof<Either<T>>): Either<T>;
  chain<U>(f: (a: T) => U): U;
  fold(left: (a: T) => T, right: (a: T) => T): T;
  isLeft: boolean;
  isRight: boolean;
}

// var Either = {
//   of: function (value: any) { return Right<any>(value); }
// }

export function Left<T>(value: T): Either<T> {
  var prototype = <Either<T>>{};
  prototype.map = function (fn) {
    return prototype; // noop
  };
  // prototype.leftMap = function (fn) {
  //   value = fn(value);
  //   return prototype;
  // };
  prototype.chain = function (fn): any {
    return prototype; // noop
  };
  prototype.fold = function (leftFn, _) {
    return leftFn(value);
  };
  prototype.isLeft = true;
  prototype.isRight = false;
  return prototype;
}

export function Right<T>(value: T): Either<T> {
  var prototype = <Either<T>>{};
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