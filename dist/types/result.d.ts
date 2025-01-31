/**
 * The result of a computation that may fail. The decoding function
 * `Decoder.run` returns a `Result`. The value of a `Result` is either `Ok` if
 * the computation succeeded, or `Err` if there was some failure in the
 * process.
 */
export declare type Result<V, E> = Ok<V> | Err<E>;
/**
 * The success type variant for `Result`. Denotes that a result value was
 * computed with no errors.
 */
export interface Ok<V> {
    ok: true;
    result: V;
}
/**
 * The error type variant for `Result`. Denotes that some error occurred before
 * the result was computed.
 */
export interface Err<E> {
    ok: false;
    error: E;
}
/**
 * Wraps values in an `Ok` type.
 *
 * Example: `ok(5) // => {ok: true, result: 5}`
 */
export declare const ok: <V>(result: V) => Ok<V>;
/**
 * Typeguard for `Ok`.
 */
export declare const isOk: <V>(r: Result<V, any>) => r is Ok<V>;
/**
 * Wraps errors in an `Err` type.
 *
 * Example: `err('on fire') // => {ok: false, error: 'on fire'}`
 */
export declare const err: <E>(error: E) => Err<E>;
/**
 * Typeguard for `Err`.
 */
export declare const isErr: <E>(r: Result<any, E>) => r is Err<E>;
/**
 * Create a `Promise` that either resolves with the result of `Ok` or rejects
 * with the error of `Err`.
 */
export declare const asPromise: <V>(r: Result<V, any>) => Promise<V>;
/**
 * Unwraps a `Result` and returns either the result of an `Ok`, or
 * `defaultValue`.
 *
 * Example:
 * ```
 * Result.withDefault(5, number().run(json))
 * ```
 *
 * It would be nice if `Decoder` had an instance method that mirrored this
 * function. Such a method would look something like this:
 * ```
 * class Decoder<A> {
 *   runWithDefault = (defaultValue: A, json: any): A =>
 *     Result.withDefault(defaultValue, this.run(json));
 * }
 *
 * number().runWithDefault(5, json)
 * ```
 * Unfortunately, the type of `defaultValue: A` on the method causes issues
 * with type inference on  the `object` decoder in some situations. While these
 * inference issues can be solved by providing the optional type argument for
 * `object`s, the extra trouble and confusion doesn't seem worth it.
 */
export declare const withDefault: <V>(defaultValue: V, r: Result<V, any>) => V;
/**
 * Return the successful result, or throw an error.
 */
export declare const withException: <V>(r: Result<V, any>) => V;
/**
 * Given an array of `Result`s, return the successful values.
 */
export declare const successes: <A>(results: Result<A, any>[]) => A[];
/**
 * Apply `f` to the result of an `Ok`, or pass the error through.
 */
export declare const map: <A, B, E>(f: (value: A) => B, r: Result<A, E>) => Result<B, E>;
/**
 * Apply `f` to the result of two `Ok`s, or pass an error through. If both
 * `Result`s are errors then the first one is returned.
 */
export declare const map2: <A, B, C, E>(f: (av: A, bv: B) => C, ar: Result<A, E>, br: Result<B, E>) => Result<C, E>;
/**
 * Apply `f` to the error of an `Err`, or pass the success through.
 */
export declare const mapError: <V, A, B>(f: (error: A) => B, r: Result<V, A>) => Result<V, B>;
/**
 * Chain together a sequence of computations that may fail, similar to a
 * `Promise`. If the first computation fails then the error will propagate
 * through. If it succeeds, then `f` will be applied to the value, returning a
 * new `Result`.
 */
export declare const andThen: <A, B, E>(f: (value: A) => Result<B, E>, r: Result<A, E>) => Result<B, E>;
