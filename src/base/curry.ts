/**
 * @todo add this to _bind
 * @todo test {this} for _bind
 */
import {inlineSlice, _SKIP0TILL0, _SKIP2TILL0}  from './utils';


export function _bind(fn: Function, args: any[]): Function {
  return ((args.length === 0) // if i refactor this to fix the {this} binding, then will have to conditional
    ? fn // since no arguments specified, this actually does nothing
    : function () {
      var postArgs = _SKIP0TILL0.apply(void 0, arguments);
      return fn.apply(void 0, args.concat(postArgs));
    }
  );
}

export function _dispatch(
  minParameterCount: number,
  args: any[],
  fn: Function
): any {
  return((args.length >= minParameterCount)
    ? fn.apply(void 0, args)
    : _bind(fn, args)
  );
}

function _curryLoop(
  fn: Function,
  argCount: number,
  index: number,
  boundedArgs: any[]
): Function {
  return (index <= 1 // Only have to wrap
    ? _bind(fn, boundedArgs)
    : _curryLoop(function () {
      var postArgs = _SKIP0TILL0.apply(void 0, arguments);
      return _dispatch(argCount, postArgs, fn);
    }, argCount, --index, boundedArgs)
  );
}

// export var curry:
//   (
//     fn: Function,
//     argCount: number,
//   ) => Function = 
export function curry(
  fn: Function,
  argCount: number = fn.length,
  ...placeholder: any[] // Hopefully this will be optimised out
): Function {
  return _curryLoop(
    fn, argCount, argCount,
    _SKIP2TILL0.apply(void 0, arguments)
  );
}