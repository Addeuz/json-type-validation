"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.andThen = exports.mapError = exports.map2 = exports.map = exports.successes = exports.withException = exports.withDefault = exports.asPromise = exports.isErr = exports.err = exports.isOk = exports.ok = void 0;
/**
 * Wraps values in an `Ok` type.
 *
 * Example: `ok(5) // => {ok: true, result: 5}`
 */
var ok = function (result) { return ({ ok: true, result: result }); };
exports.ok = ok;
/**
 * Typeguard for `Ok`.
 */
var isOk = function (r) { return r.ok === true; };
exports.isOk = isOk;
/**
 * Wraps errors in an `Err` type.
 *
 * Example: `err('on fire') // => {ok: false, error: 'on fire'}`
 */
var err = function (error) { return ({ ok: false, error: error }); };
exports.err = err;
/**
 * Typeguard for `Err`.
 */
var isErr = function (r) { return r.ok === false; };
exports.isErr = isErr;
/**
 * Create a `Promise` that either resolves with the result of `Ok` or rejects
 * with the error of `Err`.
 */
var asPromise = function (r) {
    return r.ok === true ? Promise.resolve(r.result) : Promise.reject(r.error);
};
exports.asPromise = asPromise;
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
var withDefault = function (defaultValue, r) {
    return r.ok === true ? r.result : defaultValue;
};
exports.withDefault = withDefault;
/**
 * Return the successful result, or throw an error.
 */
var withException = function (r) {
    if (r.ok === true) {
        return r.result;
    }
    else {
        throw r.error;
    }
};
exports.withException = withException;
/**
 * Given an array of `Result`s, return the successful values.
 */
var successes = function (results) {
    return results.reduce(function (acc, r) { return (r.ok === true ? acc.concat(r.result) : acc); }, []);
};
exports.successes = successes;
/**
 * Apply `f` to the result of an `Ok`, or pass the error through.
 */
var map = function (f, r) {
    return r.ok === true ? (0, exports.ok)(f(r.result)) : r;
};
exports.map = map;
/**
 * Apply `f` to the result of two `Ok`s, or pass an error through. If both
 * `Result`s are errors then the first one is returned.
 */
var map2 = function (f, ar, br) {
    return ar.ok === false ? ar :
        br.ok === false ? br :
            (0, exports.ok)(f(ar.result, br.result));
};
exports.map2 = map2;
/**
 * Apply `f` to the error of an `Err`, or pass the success through.
 */
var mapError = function (f, r) {
    return r.ok === true ? r : (0, exports.err)(f(r.error));
};
exports.mapError = mapError;
/**
 * Chain together a sequence of computations that may fail, similar to a
 * `Promise`. If the first computation fails then the error will propagate
 * through. If it succeeds, then `f` will be applied to the value, returning a
 * new `Result`.
 */
var andThen = function (f, r) {
    return r.ok === true ? f(r.result) : r;
};
exports.andThen = andThen;
//# sourceMappingURL=result.js.map