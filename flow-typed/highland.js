// @flow

import type {Writable} from 'stream';


declare module highland {
  declare type nilT = {};
  declare type IdFn<T> = (xs:T) => any;
  declare type TransformFn<X,Y> = (xs:X) => Y;
  declare type pushFn<T> = (err:?Error, val:?T) => void;
  declare type generatorFn<T> = (push:pushFn<T>, next:() => void) => void;
  declare class HighlandStream<T> {
    _destructors:Function[];
    constructor<Type>(_: void): HighlandStream<Type>;
    constructor<Type>(_: null): HighlandStream<Type>;
    constructor<Type>(name:string, emitter:(...rest:any[]) => Type):HighlandStream<Type>;
    constructor<Type>(xs:Array<Type> | generatorFn<Type> | Promise<Type>):HighlandStream<Type>;
    write(x:T):boolean;
    destroy():void;
    tap<T>(fn:IdFn<T>):HighlandStream<T>;
    map<R>(fn:TransformFn<T, R>):HighlandStream<R>;
    filter(fn:(x:T) => mixed):HighlandStream<T>;
    consume(fn:(err:Error, x:T, push:pushFn<T>, next:Function) => void):HighlandStream<T>;
    pipe(dest:Writable):Writable;
    each(fn:(x:T) => any):HighlandStream<nilT>;
    errors(fn:(err:Error, push:pushFn<T>) => any):HighlandStream<T>;
    through<R>(fn:(s:HighlandStream<T>) => HighlandStream<R>):HighlandStream<R>;
    zip<R>(ys:HighlandStream<R>|Array<R>):HighlandStream<R>;
    pluck(prop:string):HighlandStream<Object>;
    ratelimit(num:number, ms:number):HighlandStream<T>;
    scan<R>(memo:R, fn:(memo:R, next:T) => R):HighlandStream<R>;
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
    <Type>(name:string, emitter:Function):HighlandStream<Type>;
    nil:nilT;
  }
}
