"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decoder = exports.isDecoderError = void 0;
var Result = require("./result");
// import isEqual from "lodash/isEqual"
function isEqual(a, b) {
    if (a === b) {
        return true;
    }
    if (a === null && b === null) {
        return true;
    }
    if (typeof (a) !== typeof (b)) {
        return false;
    }
    if (typeof (a) === 'object') {
        // Array
        if (Array.isArray(a)) {
            if (!Array.isArray(b)) {
                return false;
            }
            if (a.length !== b.length) {
                return false;
            }
            for (var i = 0; i < a.length; i++) {
                if (!isEqual(a[i], b[i])) {
                    return false;
                }
            }
            return true;
        }
        // Hash table
        var keys = Object.keys(a);
        if (keys.length !== Object.keys(b).length) {
            return false;
        }
        for (var i = 0; i < keys.length; i++) {
            if (!b.hasOwnProperty(keys[i])) {
                return false;
            }
            if (!isEqual(a[keys[i]], b[keys[i]])) {
                return false;
            }
        }
        return true;
    }
}
/**
 * Type guard for `DecoderError`. One use case of the type guard is in the
 * `catch` of a promise. Typescript types the error argument of `catch` as
 * `any`, so when dealing with a decoder as a promise you may need to
 * distinguish between a `DecoderError` and an error string.
 */
var isDecoderError = function (a) {
    return a.kind === 'DecoderError' && typeof a.at === 'string' && typeof a.message === 'string';
};
exports.isDecoderError = isDecoderError;
/*
 * Helpers
 */
var isJsonArray = function (json) { return Array.isArray(json); };
var isJsonObject = function (json) {
    return typeof json === 'object' && json !== null && !isJsonArray(json);
};
var typeString = function (json) {
    switch (typeof json) {
        case 'string':
            return 'a string';
        case 'number':
            return 'a number';
        case 'boolean':
            return 'a boolean';
        case 'undefined':
            return 'undefined';
        case 'object':
            if (json instanceof Array) {
                return 'an array';
            }
            else if (json === null) {
                return 'null';
            }
            else {
                return 'an object';
            }
        default:
            return JSON.stringify(json);
    }
};
var expectedGot = function (expected, got) {
    return "expected " + expected + ", got " + typeString(got);
};
var printPath = function (paths) {
    return paths.map(function (path) { return (typeof path === 'string' ? "." + path : "[" + path + "]"); }).join('');
};
var prependAt = function (newAt, _a) {
    var at = _a.at, rest = __rest(_a, ["at"]);
    return (__assign({ at: newAt + (at || '') }, rest));
};
/**
 * Decoders transform json objects with unknown structure into known and
 * verified forms. You can create objects of type `Decoder<A>` with either the
 * primitive decoder functions, such as `boolean()` and `string()`, or by
 * applying higher-order decoders to the primitives, such as `array(boolean())`
 * or `dict(string())`.
 *
 * Each of the decoder functions are available both as a static method on
 * `Decoder` and as a function alias -- for example the string decoder is
 * defined at `Decoder.string()`, but is also aliased to `string()`. Using the
 * function aliases exported with the library is recommended.
 *
 * `Decoder` exposes a number of 'run' methods, which all decode json in the
 * same way, but communicate success and failure in different ways. The `map`
 * and `andThen` methods modify decoders without having to call a 'run' method.
 *
 * Alternatively, the main decoder `run()` method returns an object of type
 * `Result<A, DecoderError>`. This library provides a number of helper
 * functions for dealing with the `Result` type, so you can do all the same
 * things with a `Result` as with the decoder methods.
 */
var Decoder = /** @class */ (function () {
    /**
     * The Decoder class constructor is kept private to separate the internal
     * `decode` function from the external `run` function. The distinction
     * between the two functions is that `decode` returns a
     * `Partial<DecoderError>` on failure, which contains an unfinished error
     * report. When `run` is called on a decoder, the relevant series of `decode`
     * calls is made, and then on failure the resulting `Partial<DecoderError>`
     * is turned into a `DecoderError` by filling in the missing information.
     *
     * While hiding the constructor may seem restrictive, leveraging the
     * provided decoder combinators and helper functions such as
     * `andThen` and `map` should be enough to build specialized decoders as
     * needed.
     */
    function Decoder(decode) {
        var _this = this;
        this.decode = decode;
        /**
         * Run the decoder and return a `Result` with either the decoded value or a
         * `DecoderError` containing the json input, the location of the error, and
         * the error message.
         *
         * Examples:
         * ```
         * number().run(12)
         * // => {ok: true, result: 12}
         *
         * string().run(9001)
         * // =>
         * // {
         * //   ok: false,
         * //   error: {
         * //     kind: 'DecoderError',
         * //     input: 9001,
         * //     at: 'input',
         * //     message: 'expected a string, got 9001'
         * //   }
         * // }
         * ```
         */
        this.run = function (json) {
            return Result.mapError(function (error) { return ({
                kind: 'DecoderError',
                input: json,
                at: 'input' + (error.at || ''),
                message: error.message || ''
            }); }, _this.decode(json));
        };
        /**
         * Run the decoder as a `Promise`.
         */
        this.runPromise = function (json) { return Result.asPromise(_this.run(json)); };
        /**
         * Run the decoder and return the value on success, or throw an exception
         * with a formatted error string.
         */
        this.runWithException = function (json) { return Result.withException(_this.run(json)); };
        /**
         * Construct a new decoder that applies a transformation to the decoded
         * result. If the decoder succeeds then `f` will be applied to the value. If
         * it fails the error will propagated through.
         *
         * Example:
         * ```
         * number().map(x => x * 5).run(10)
         * // => {ok: true, result: 50}
         * ```
         */
        this.map = function (f) {
            return new Decoder(function (json) { return Result.map(f, _this.decode(json)); });
        };
        /**
         * Chain together a sequence of decoders. The first decoder will run, and
         * then the function will determine what decoder to run second. If the result
         * of the first decoder succeeds then `f` will be applied to the decoded
         * value. If it fails the error will propagate through.
         *
         * This is a very powerful method -- it can act as both the `map` and `where`
         * methods, can improve error messages for edge cases, and can be used to
         * make a decoder for custom types.
         *
         * Example of adding an error message:
         * ```
         * const versionDecoder = valueAt(['version'], number());
         * const infoDecoder3 = object({a: boolean()});
         *
         * const decoder = versionDecoder.andThen(version => {
         *   switch (version) {
         *     case 3:
         *       return infoDecoder3;
         *     default:
         *       return fail(`Unable to decode info, version ${version} is not supported.`);
         *   }
         * });
         *
         * decoder.run({version: 3, a: true})
         * // => {ok: true, result: {a: true}}
         *
         * decoder.run({version: 5, x: 'abc'})
         * // =>
         * // {
         * //   ok: false,
         * //   error: {... message: 'Unable to decode info, version 5 is not supported.'}
         * // }
         * ```
         *
         * Example of decoding a custom type:
         * ```
         * // nominal type for arrays with a length of at least one
         * type NonEmptyArray<T> = T[] & { __nonEmptyArrayBrand__: void };
         *
         * const nonEmptyArrayDecoder = <T>(values: Decoder<T>): Decoder<NonEmptyArray<T>> =>
         *   array(values).andThen(arr =>
         *     arr.length > 0
         *       ? succeed(createNonEmptyArray(arr))
         *       : fail(`expected a non-empty array, got an empty array`)
         *   );
         * ```
         */
        this.andThen = function (f) {
            return new Decoder(function (json) {
                return Result.andThen(function (value) { return f(value).decode(json); }, _this.decode(json));
            });
        };
        /**
         * Add constraints to a decoder _without_ changing the resulting type. The
         * `test` argument is a predicate function which returns true for valid
         * inputs. When `test` fails on an input, the decoder fails with the given
         * `errorMessage`.
         *
         * ```
         * const chars = (length: number): Decoder<string> =>
         *   string().where(
         *     (s: string) => s.length === length,
         *     `expected a string of length ${length}`
         *   );
         *
         * chars(5).run('12345')
         * // => {ok: true, result: '12345'}
         *
         * chars(2).run('HELLO')
         * // => {ok: false, error: {... message: 'expected a string of length 2'}}
         *
         * chars(12).run(true)
         * // => {ok: false, error: {... message: 'expected a string, got a boolean'}}
         * ```
         */
        this.where = function (test, errorMessage) {
            return _this.andThen(function (value) { return (test(value) ? Decoder.succeed(value) : Decoder.fail(errorMessage)); });
        };
    }
    /**
     * Decoder primitive that validates strings, and fails on all other input.
     */
    Decoder.string = function () {
        return new Decoder(function (json) {
            return typeof json === 'string'
                ? Result.ok(json)
                : Result.err({ message: expectedGot('a string', json) });
        });
    };
    /**
     * Decoder primitive that validates numbers, and fails on all other input.
     */
    Decoder.number = function () {
        return new Decoder(function (json) {
            return typeof json === 'number'
                ? Result.ok(json)
                : Result.err({ message: expectedGot('a number', json) });
        });
    };
    /**
     * Decoder primitive that validates booleans, and fails on all other input.
     */
    Decoder.boolean = function () {
        return new Decoder(function (json) {
            return typeof json === 'boolean'
                ? Result.ok(json)
                : Result.err({ message: expectedGot('a boolean', json) });
        });
    };
    Decoder.constant = function (value) {
        return new Decoder(function (json) {
            return isEqual(json, value)
                ? Result.ok(value)
                : Result.err({ message: "expected " + JSON.stringify(value) + ", got " + JSON.stringify(json) });
        });
    };
    Decoder.object = function (decoders) {
        return new Decoder(function (json) {
            if (isJsonObject(json) && decoders) {
                var obj = {};
                for (var key in decoders) {
                    if (decoders.hasOwnProperty(key)) {
                        var r = decoders[key].decode(json[key]);
                        if (r.ok === true) {
                            // tslint:disable-next-line:strict-type-predicates
                            if (r.result !== undefined) {
                                obj[key] = r.result;
                            }
                        }
                        else if (json[key] === undefined) {
                            return Result.err({ message: "the key '" + key + "' is required but was not present" });
                        }
                        else {
                            return Result.err(prependAt("." + key, r.error));
                        }
                    }
                }
                return Result.ok(obj);
            }
            else if (isJsonObject(json)) {
                return Result.ok(json);
            }
            else {
                return Result.err({ message: expectedGot('an object', json) });
            }
        });
    };
    Decoder.array = function (decoder) {
        return new Decoder(function (json) {
            if (isJsonArray(json) && decoder) {
                var decodeValue_1 = function (v, i) {
                    return Result.mapError(function (err) { return prependAt("[" + i + "]", err); }, decoder.decode(v));
                };
                return json.reduce(function (acc, v, i) {
                    return Result.map2(function (arr, result) { return __spreadArray(__spreadArray([], arr, true), [result], false); }, acc, decodeValue_1(v, i));
                }, Result.ok([]));
            }
            else if (isJsonArray(json)) {
                return Result.ok(json);
            }
            else {
                return Result.err({ message: expectedGot('an array', json) });
            }
        });
    };
    Decoder.tuple = function (decoders) {
        return new Decoder(function (json) {
            if (isJsonArray(json)) {
                if (json.length !== decoders.length) {
                    return Result.err({
                        message: "expected a tuple of length " + decoders.length + ", got one of length " + json.length
                    });
                }
                var result = [];
                for (var i = 0; i < decoders.length; i++) {
                    var nth = decoders[i].decode(json[i]);
                    if (nth.ok) {
                        result[i] = nth.result;
                    }
                    else {
                        return Result.err(prependAt("[" + i + "]", nth.error));
                    }
                }
                return Result.ok(result);
            }
            else {
                return Result.err({ message: expectedGot("a tuple of length " + decoders.length, json) });
            }
        });
    };
    Decoder.union = function (ad, bd) {
        var decoders = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            decoders[_i - 2] = arguments[_i];
        }
        return Decoder.oneOf.apply(Decoder, __spreadArray([ad, bd], decoders, false));
    };
    Decoder.intersection = function (ad, bd) {
        var ds = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            ds[_i - 2] = arguments[_i];
        }
        return new Decoder(function (json) {
            return __spreadArray([ad, bd], ds, true).reduce(function (acc, decoder) { return Result.map2(Object.assign, acc, decoder.decode(json)); }, Result.ok({}));
        });
    };
    /**
     * Escape hatch to bypass validation. Always succeeds and types the result as
     * `any`. Useful for defining decoders incrementally, particularly for
     * complex objects.
     *
     * Example:
     * ```
     * interface User {
     *   name: string;
     *   complexUserData: ComplexType;
     * }
     *
     * const userDecoder: Decoder<User> = object({
     *   name: string(),
     *   complexUserData: anyJson()
     * });
     * ```
     */
    Decoder.anyJson = function () { return new Decoder(function (json) { return Result.ok(json); }); };
    /**
     * Decoder identity function which always succeeds and types the result as
     * `unknown`.
     */
    Decoder.unknownJson = function () {
        return new Decoder(function (json) { return Result.ok(json); });
    };
    /**
     * Decoder for json objects where the keys are unknown strings, but the values
     * should all be of the same type.
     *
     * Example:
     * ```
     * dict(number()).run({chocolate: 12, vanilla: 10, mint: 37});
     * // => {ok: true, result: {chocolate: 12, vanilla: 10, mint: 37}}
     * ```
     */
    Decoder.dict = function (decoder) {
        return new Decoder(function (json) {
            if (isJsonObject(json)) {
                var obj = {};
                for (var key in json) {
                    if (json.hasOwnProperty(key)) {
                        var r = decoder.decode(json[key]);
                        if (r.ok === true) {
                            obj[key] = r.result;
                        }
                        else {
                            return Result.err(prependAt("." + key, r.error));
                        }
                    }
                }
                return Result.ok(obj);
            }
            else {
                return Result.err({ message: expectedGot('an object', json) });
            }
        });
    };
    /**
     * Decoder for values that may be `undefined`. This is primarily helpful for
     * decoding interfaces with optional fields.
     *
     * Example:
     * ```
     * interface User {
     *   id: number;
     *   isOwner?: boolean;
     * }
     *
     * const decoder: Decoder<User> = object({
     *   id: number(),
     *   isOwner: optional(boolean())
     * });
     * ```
     */
    Decoder.optional = function (decoder) {
        return new Decoder(function (json) { return (json === undefined ? Result.ok(undefined) : decoder.decode(json)); });
    };
    /**
     * Decoder that attempts to run each decoder in `decoders` and either succeeds
     * with the first successful decoder, or fails after all decoders have failed.
     *
     * Note that `oneOf` expects the decoders to all have the same return type,
     * while `union` creates a decoder for the union type of all the input
     * decoders.
     *
     * Examples:
     * ```
     * oneOf(string(), number().map(String))
     * oneOf(constant('start'), constant('stop'), succeed('unknown'))
     * ```
     */
    Decoder.oneOf = function () {
        var decoders = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            decoders[_i] = arguments[_i];
        }
        return new Decoder(function (json) {
            var errors = [];
            for (var i = 0; i < decoders.length; i++) {
                var r = decoders[i].decode(json);
                if (r.ok === true) {
                    return r;
                }
                else {
                    errors[i] = r.error;
                }
            }
            var errorsList = errors
                .map(function (error) { return "at error" + (error.at || '') + ": " + error.message; })
                .join('", "');
            return Result.err({
                message: "expected a value matching one of the decoders, got the errors [\"" + errorsList + "\"]"
            });
        });
    };
    /**
     * Decoder that always succeeds with either the decoded value, or a fallback
     * default value.
     */
    Decoder.withDefault = function (defaultValue, decoder) {
        return new Decoder(function (json) {
            return Result.ok(Result.withDefault(defaultValue, decoder.decode(json)));
        });
    };
    /**
     * Decoder that pulls a specific field out of a json structure, instead of
     * decoding and returning the full structure. The `paths` array describes the
     * object keys and array indices to traverse, so that values can be pulled out
     * of a nested structure.
     *
     * Example:
     * ```
     * const decoder = valueAt(['a', 'b', 0], string());
     *
     * decoder.run({a: {b: ['surprise!']}})
     * // => {ok: true, result: 'surprise!'}
     *
     * decoder.run({a: {x: 'cats'}})
     * // => {ok: false, error: {... at: 'input.a.b[0]' message: 'path does not exist'}}
     * ```
     *
     * Note that the `decoder` is ran on the value found at the last key in the
     * path, even if the last key is not found. This allows the `optional`
     * decoder to succeed when appropriate.
     * ```
     * const optionalDecoder = valueAt(['a', 'b', 'c'], optional(string()));
     *
     * optionalDecoder.run({a: {b: {c: 'surprise!'}}})
     * // => {ok: true, result: 'surprise!'}
     *
     * optionalDecoder.run({a: {b: 'cats'}})
     * // => {ok: false, error: {... at: 'input.a.b.c' message: 'expected an object, got "cats"'}
     *
     * optionalDecoder.run({a: {b: {z: 1}}})
     * // => {ok: true, result: undefined}
     * ```
     */
    Decoder.valueAt = function (paths, decoder) {
        return new Decoder(function (json) {
            var jsonAtPath = json;
            for (var i = 0; i < paths.length; i++) {
                if (jsonAtPath === undefined) {
                    return Result.err({
                        at: printPath(paths.slice(0, i + 1)),
                        message: 'path does not exist'
                    });
                }
                else if (typeof paths[i] === 'string' && !isJsonObject(jsonAtPath)) {
                    return Result.err({
                        at: printPath(paths.slice(0, i + 1)),
                        message: expectedGot('an object', jsonAtPath)
                    });
                }
                else if (typeof paths[i] === 'number' && !isJsonArray(jsonAtPath)) {
                    return Result.err({
                        at: printPath(paths.slice(0, i + 1)),
                        message: expectedGot('an array', jsonAtPath)
                    });
                }
                else {
                    jsonAtPath = jsonAtPath[paths[i]];
                }
            }
            return Result.mapError(function (error) {
                return jsonAtPath === undefined
                    ? { at: printPath(paths), message: 'path does not exist' }
                    : prependAt(printPath(paths), error);
            }, decoder.decode(jsonAtPath));
        });
    };
    /**
     * Decoder that ignores the input json and always succeeds with `fixedValue`.
     */
    Decoder.succeed = function (fixedValue) {
        return new Decoder(function (json) { return Result.ok(fixedValue); });
    };
    /**
     * Decoder that ignores the input json and always fails with `errorMessage`.
     */
    Decoder.fail = function (errorMessage) {
        return new Decoder(function (json) { return Result.err({ message: errorMessage }); });
    };
    /**
     * Decoder that allows for validating recursive data structures. Unlike with
     * functions, decoders assigned to variables can't reference themselves
     * before they are fully defined. We can avoid prematurely referencing the
     * decoder by wrapping it in a function that won't be called until use, at
     * which point the decoder has been defined.
     *
     * Example:
     * ```
     * interface Comment {
     *   msg: string;
     *   replies: Comment[];
     * }
     *
     * const decoder: Decoder<Comment> = object({
     *   msg: string(),
     *   replies: lazy(() => array(decoder))
     * });
     * ```
     */
    Decoder.lazy = function (mkDecoder) {
        return new Decoder(function (json) { return mkDecoder().decode(json); });
    };
    return Decoder;
}());
exports.Decoder = Decoder;
//# sourceMappingURL=decoder.js.map