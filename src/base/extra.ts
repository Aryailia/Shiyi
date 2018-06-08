import {_SKIP0TILL0, _SKIP1TILL0, inlineSlice} from './utils';
import {curry, _dispatch} from './curry';

export {curry};

export function pipe(source: [any]): (...args: any[]) => any[] {
  return function () {
    return flow.apply(null, arguments).apply(null, source);
  }
}

export function flow(...placeholder: Function[]): (...args: any[]) => any[] {
  var fList: any[] = _SKIP0TILL0.apply(null, arguments);
  return function (): any[] {
    var source: any[] = _SKIP0TILL0.apply(null, arguments);
    var length = fList.length;
    var queue = fList;

    var index = -1; while (++index < length) { // func + arg pairs
      source = queue[index].apply(null, source);
    }
    return source;
  };
}

export function unmonad(fn: Function) {
  var args = _SKIP1TILL0.apply(null, arguments);
  return(_dispatch(1, args, function () {
    var source = _SKIP0TILL0.apply(null, arguments);
    return fn.apply(source, args);
  }));
}

export function deepCopy() {
}