"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lazy = exports.fail = exports.succeed = exports.valueAt = exports.withDefault = exports.intersection = exports.union = exports.oneOf = exports.optional = exports.dict = exports.tuple = exports.array = exports.object = exports.constant = exports.unknownJson = exports.anyJson = exports.boolean = exports.number = exports.string = void 0;
var decoder_1 = require("./decoder");
/* tslint:disable:variable-name */
/** See `Decoder.string` */
exports.string = decoder_1.Decoder.string;
/** See `Decoder.number` */
exports.number = decoder_1.Decoder.number;
/** See `Decoder.boolean` */
exports.boolean = decoder_1.Decoder.boolean;
/** See `Decoder.anyJson` */
exports.anyJson = decoder_1.Decoder.anyJson;
/** See `Decoder.unknownJson` */
exports.unknownJson = decoder_1.Decoder.unknownJson;
/** See `Decoder.constant` */
exports.constant = decoder_1.Decoder.constant;
/** See `Decoder.object` */
exports.object = decoder_1.Decoder.object;
/** See `Decoder.array` */
exports.array = decoder_1.Decoder.array;
/** See `Decoder.tuple` */
exports.tuple = decoder_1.Decoder.tuple;
/** See `Decoder.dict` */
exports.dict = decoder_1.Decoder.dict;
/** See `Decoder.optional` */
exports.optional = decoder_1.Decoder.optional;
/** See `Decoder.oneOf` */
exports.oneOf = decoder_1.Decoder.oneOf;
/** See `Decoder.union` */
exports.union = decoder_1.Decoder.union;
/** See `Decoder.intersection` */
exports.intersection = decoder_1.Decoder.intersection;
/** See `Decoder.withDefault` */
exports.withDefault = decoder_1.Decoder.withDefault;
/** See `Decoder.valueAt` */
exports.valueAt = decoder_1.Decoder.valueAt;
/** See `Decoder.succeed` */
exports.succeed = decoder_1.Decoder.succeed;
/** See `Decoder.fail` */
exports.fail = decoder_1.Decoder.fail;
/** See `Decoder.lazy` */
exports.lazy = decoder_1.Decoder.lazy;
//# sourceMappingURL=combinators.js.map