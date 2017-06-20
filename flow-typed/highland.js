// @flow

declare module highland {
  declare type argsToVoid = (...rest: mixed[]) => void;
  declare type nilT = { __nil: true };
  declare type errorWrapT = {
    __HighlandStreamError__: true,
    error: Error
  };
  declare type Fn1<A, B> = (a: A, ...rest: empty[]) => B;
  declare type IdFn<T> = (xs: T) => any;
  declare type TransformFn<X, Y> = (xs: X) => Y;
  declare type pushFn<T> = (err: ?Error, val: ?(nilT | T)) => void;
  declare type generatorFn<T> = (push: pushFn<T>, next: () => void) => void;
  declare interface emitterT {
    on(event: string, listener: argsToVoid): emitterT
  }
  declare class HighlandStream<T> {
    _destructors: Function[],
    constructor<Type>(_: void): HighlandStream<Type>,
    constructor<Type>(_: null): HighlandStream<Type>,
    constructor<Type>(
      name: string,
      emitter: (...rest: any[]) => Type
    ): HighlandStream<Type>,
    constructor<Type>(
      xs: Array<Type> | generatorFn<Type> | Promise<Type>
    ): HighlandStream<Type>,
    collect(): HighlandStream<T[]>,
    write(x: errorWrapT | T): boolean,
    merge(): T,
    onDestroy(Function): HighlandStream<T>,
    destroy(): void,
    tap(fn: IdFn<T>): HighlandStream<T>,
    map<R>(fn: TransformFn<T, R>): HighlandStream<R>,
    filter(fn: (x: any) => boolean): HighlandStream<T>,
    flatten<R>(): HighlandStream<R>,
    sequence<R>(): HighlandStream<R>,
    parallel<R>(number): HighlandStream<R>,
    flatMap<R>(fn: (x: T) => HighlandStream<R> | R[]): HighlandStream<R>,
    group<R>(x: string): HighlandStream<{| [key: string]: Array<R> |}>,
    consume<R>(
      fn: (err: Error, x: T, push: pushFn<R>, next: Function) => void
    ): HighlandStream<R>,
    pipe(dest: stream$Writable): stream$Writable,
    each(fn: (x: T) => any): HighlandStream<nilT>,
    toArray(fn: (xs: T[]) => any): void,
    errors(fn: (err: Error, push: pushFn<T>) => any): HighlandStream<T>,
    stopOnError(fn: (err: Error) => any): HighlandStream<T>,
    through<R>(
      fn: (s: HighlandStream<T>) => HighlandStream<R>
    ): HighlandStream<R>,
    through<R>(stream$Duplex): HighlandStream<R>,
    zip<R>(ys: HighlandStream<R> | Array<R>): HighlandStream<[T, R]>,
    uniqBy(fn: (T, T) => boolean): HighlandStream<T>,
    pick<R>(string[]): HighlandStream<R>,
    pluck<R>(prop: string): HighlandStream<R>,
    pull(fn: (err: Error, x: T) => void): void,
    ratelimit(num: number, ms: number): HighlandStream<T>,
    reduce1<R>(fn: (T, T) => R): HighlandStream<R>,
    scan<R>(fn: (memo: R, next: T) => R, memo: R): HighlandStream<R>,
    split(): HighlandStream<T>,
    emit(event: string, ...args: Array<any>): boolean,
    on(event: string, listener: Function): HighlandStream<T>,
    once(event: string, listener: Function): HighlandStream<T>,
    observe(): HighlandStream<T>,
    otherwise(HighlandStream<T> | (() => T[])): HighlandStream<T>,
    fork(): HighlandStream<T>,
    invoke(string, any[]): HighlandStreamT<T>,
    end(): void,
    done(cb: ?Function): void
  }
  declare type HighlandStreamT<T> = HighlandStream<T>;
  declare module.exports: {
    <Type>(_: void): HighlandStream<Type>,
    <Type>(_: null): HighlandStream<Type>,
    <Type>(xs: generatorFn<Type>): HighlandStream<Type>,
    <Type>(xs: Array<Type> | Promise<Type>): HighlandStream<Type>,
    <Type>(name: string, emitter: emitterT): HighlandStream<Type>,
    <Type>(
      stream: $Subtype<stream$Readable>,
      cb?: ($Subtype<stream$Readable>, Function) => Function
    ): HighlandStream<Type>,
    map<A, B>(
      fn: Fn1<A, B>,
      ...rest: void[]
    ): Fn1<HighlandStream<A>, HighlandStream<B>>,
    filter<A>(
      fn: Fn1<A, boolean>,
      ...rest: void[]
    ): Fn1<HighlandStream<A>, HighlandStream<A>>,
    tap<A>(
      fn: Fn1<A, any>,
      ...rest: void[]
    ): Fn1<HighlandStream<A>, HighlandStream<A>>,
    isStream(x: HighlandStream<any>): boolean,
    wrapCallback: <Type>(
      fn: (arg: any, cb: (err: ?Error, v: Type) => any) => any
    ) => (...args: any[]) => HighlandStream<Type>,
    nil: nilT
  };
}
