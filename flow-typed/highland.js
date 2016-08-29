// @flow

import type {Writable} from 'stream';

declare module highland {
  declare type argsToVoid = (...rest:mixed[]) => void;
  declare type nilT = { __nil: true };
  declare type errorWrapT = {
    __HighlandStreamError__: true,
    error: Error
  };
  declare type IdFn<T> = (xs:T) => any;
  declare type TransformFn<X,Y> = (xs:X) => Y;
  declare type pushFn<T> = (err:?Error, val:?(nilT | T)) => void;
  declare type generatorFn<T> = (push:pushFn<T>, next:() => void) => void;
  declare interface emitterT {
    on(event: string, listener: argsToVoid): emitterT;
  }
  declare class HighlandStream<T> {
    _destructors:Function[];
    constructor<Type>(_: void): HighlandStream<Type>;
    constructor<Type>(_: null): HighlandStream<Type>;
    constructor<Type>(name:string, emitter:(...rest:any[]) => Type):HighlandStream<Type>;
    constructor<Type>(xs:Array<Type> | generatorFn<Type> | Promise<Type>):HighlandStream<Type>;
    collect():HighlandStream<T[]>;
    write(x:errorWrapT | T):boolean;
    merge():T;
    onDestroy():HighlandStream<T>;
    destroy():void;
    tap<T>(fn:IdFn<T>):HighlandStream<T>;
    map<R>(fn:TransformFn<T, R>):HighlandStream<R>;
    filter(fn:(x:T) => mixed):HighlandStream<T>;
    flatten<R>():HighlandStreamT<R>;
    flatMap<R>(fn:(x:T) => HighlandStream<R>):HighlandStream<R>;
    group<R>(x:string):HighlandStream<R>;
    consume(fn:(err:Error, x:T, push:pushFn<T>, next:Function) => void):HighlandStream<T>;
    pipe(dest:Writable):Writable;
    each(fn:(x:T) => any):HighlandStream<nilT>;
    errors(fn:(err:Error, push:pushFn<T>) => any):HighlandStream<T>;
    through<R>(fn:(s:HighlandStream<T>) => HighlandStream<R>):HighlandStream<R>;
    zip<R>(ys:HighlandStream<R>|Array<R>):HighlandStream<R>;
    pluck<R>(prop:string):HighlandStream<R>;
    pull(fn:(err:Error, x:T) => void):void;
    ratelimit(num:number, ms:number):HighlandStream<T>;
    scan<R>(fn:(memo:R, next:T) => R, memo:R):HighlandStream<R>;
    emit(event: string, ...args:Array<any>): boolean;
    on(event: string, listener: Function): HighlandStream<T>;
    once(event: string, listener: Function): HighlandStream<T>;
  }
  declare type HighlandStreamT<T> = HighlandStream<T>;
  declare module.exports: {
    <Type>(_:void):HighlandStream<Type>;
    <Type>(_:null):HighlandStream<Type>;
    <Type>(xs:generatorFn<Type>):HighlandStream<Type>;
    <Type>(xs:Array<Type> | Promise<Type>):HighlandStream<Type>;
    <Type>(name:string, emitter:emitterT):HighlandStream<Type>;
    wrapCallback:<Type> (fn:(arg:any, cb:(err:?Error, v:Type) => any) => any) => () => HighlandStream<Type>;
    nil:nilT;
  }
}
