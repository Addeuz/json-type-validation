[@mojotech/json-type-validation](../README.md) / [Exports](../modules.md) / Decoder

# Class: Decoder<A\>

Decoders transform json objects with unknown structure into known and
verified forms. You can create objects of type `Decoder<A>` with either the
primitive decoder functions, such as `boolean()` and `string()`, or by
applying higher-order decoders to the primitives, such as `array(boolean())`
or `dict(string())`.

Each of the decoder functions are available both as a static method on
`Decoder` and as a function alias -- for example the string decoder is
defined at `Decoder.string()`, but is also aliased to `string()`. Using the
function aliases exported with the library is recommended.

`Decoder` exposes a number of 'run' methods, which all decode json in the
same way, but communicate success and failure in different ways. The `map`
and `andThen` methods modify decoders without having to call a 'run' method.

Alternatively, the main decoder `run()` method returns an object of type
`Result<A, DecoderError>`. This library provides a number of helper
functions for dealing with the `Result` type, so you can do all the same
things with a `Result` as with the decoder methods.

## Type parameters

| Name |
| :------ |
| `A` |

## Table of contents

### Constructors

- [constructor](Decoder.md#constructor)

### Methods

- [andThen](Decoder.md#andthen)
- [map](Decoder.md#map)
- [run](Decoder.md#run)
- [runPromise](Decoder.md#runpromise)
- [runWithException](Decoder.md#runwithexception)
- [where](Decoder.md#where)
- [anyJson](Decoder.md#anyjson)
- [array](Decoder.md#array)
- [boolean](Decoder.md#boolean)
- [constant](Decoder.md#constant)
- [dict](Decoder.md#dict)
- [fail](Decoder.md#fail)
- [intersection](Decoder.md#intersection)
- [lazy](Decoder.md#lazy)
- [number](Decoder.md#number)
- [object](Decoder.md#object)
- [oneOf](Decoder.md#oneof)
- [optional](Decoder.md#optional)
- [string](Decoder.md#string)
- [succeed](Decoder.md#succeed)
- [tuple](Decoder.md#tuple)
- [union](Decoder.md#union)
- [unknownJson](Decoder.md#unknownjson)
- [valueAt](Decoder.md#valueat)
- [withDefault](Decoder.md#withdefault)

## Constructors

### constructor

• `Private` **new Decoder**<`A`\>(`decode`)

The Decoder class constructor is kept private to separate the internal
`decode` function from the external `run` function. The distinction
between the two functions is that `decode` returns a
`Partial<DecoderError>` on failure, which contains an unfinished error
report. When `run` is called on a decoder, the relevant series of `decode`
calls is made, and then on failure the resulting `Partial<DecoderError>`
is turned into a `DecoderError` by filling in the missing information.

While hiding the constructor may seem restrictive, leveraging the
provided decoder combinators and helper functions such as
`andThen` and `map` should be enough to build specialized decoders as
needed.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `decode` | (`json`: `unknown`) => `DecodeResult`<`A`\> |

#### Defined in

[decoder.ts:181](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L181)

## Methods

### andThen

▸ **andThen**<`B`\>(`f`): [`Decoder`](Decoder.md)<`B`\>

Chain together a sequence of decoders. The first decoder will run, and
then the function will determine what decoder to run second. If the result
of the first decoder succeeds then `f` will be applied to the decoded
value. If it fails the error will propagate through.

This is a very powerful method -- it can act as both the `map` and `where`
methods, can improve error messages for edge cases, and can be used to
make a decoder for custom types.

Example of adding an error message:
```
const versionDecoder = valueAt(['version'], number());
const infoDecoder3 = object({a: boolean()});

const decoder = versionDecoder.andThen(version => {
  switch (version) {
    case 3:
      return infoDecoder3;
    default:
      return fail(`Unable to decode info, version ${version} is not supported.`);
  }
});

decoder.run({version: 3, a: true})
// => {ok: true, result: {a: true}}

decoder.run({version: 5, x: 'abc'})
// =>
// {
//   ok: false,
//   error: {... message: 'Unable to decode info, version 5 is not supported.'}
// }
```

Example of decoding a custom type:
```
// nominal type for arrays with a length of at least one
type NonEmptyArray<T> = T[] & { __nonEmptyArrayBrand__: void };

const nonEmptyArrayDecoder = <T>(values: Decoder<T>): Decoder<NonEmptyArray<T>> =>
  array(values).andThen(arr =>
    arr.length > 0
      ? succeed(createNonEmptyArray(arr))
      : fail(`expected a non-empty array, got an empty array`)
  );
```

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`value`: `A`) => [`Decoder`](Decoder.md)<`B`\> |

#### Returns

[`Decoder`](Decoder.md)<`B`\>

#### Defined in

[decoder.ts:798](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L798)

___

### map

▸ **map**<`B`\>(`f`): [`Decoder`](Decoder.md)<`B`\>

Construct a new decoder that applies a transformation to the decoded
result. If the decoder succeeds then `f` will be applied to the value. If
it fails the error will propagated through.

Example:
```
number().map(x => x * 5).run(10)
// => {ok: true, result: 50}
```

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`value`: `A`) => `B` |

#### Returns

[`Decoder`](Decoder.md)<`B`\>

#### Defined in

[decoder.ts:747](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L747)

___

### run

▸ **run**(`json`): `RunResult`<`A`\>

Run the decoder and return a `Result` with either the decoded value or a
`DecoderError` containing the json input, the location of the error, and
the error message.

Examples:
```
number().run(12)
// => {ok: true, result: 12}

string().run(9001)
// =>
// {
//   ok: false,
//   error: {
//     kind: 'DecoderError',
//     input: 9001,
//     at: 'input',
//     message: 'expected a string, got 9001'
//   }
// }
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `unknown` |

#### Returns

`RunResult`<`A`\>

#### Defined in

[decoder.ts:714](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L714)

___

### runPromise

▸ **runPromise**(`json`): `Promise`<`A`\>

Run the decoder as a `Promise`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `unknown` |

#### Returns

`Promise`<`A`\>

#### Defined in

[decoder.ts:728](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L728)

___

### runWithException

▸ **runWithException**(`json`): `A`

Run the decoder and return the value on success, or throw an exception
with a formatted error string.

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `unknown` |

#### Returns

`A`

#### Defined in

[decoder.ts:734](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L734)

___

### where

▸ **where**(`test`, `errorMessage`): [`Decoder`](Decoder.md)<`A`\>

Add constraints to a decoder _without_ changing the resulting type. The
`test` argument is a predicate function which returns true for valid
inputs. When `test` fails on an input, the decoder fails with the given
`errorMessage`.

```
const chars = (length: number): Decoder<string> =>
  string().where(
    (s: string) => s.length === length,
    `expected a string of length ${length}`
  );

chars(5).run('12345')
// => {ok: true, result: '12345'}

chars(2).run('HELLO')
// => {ok: false, error: {... message: 'expected a string of length 2'}}

chars(12).run(true)
// => {ok: false, error: {... message: 'expected a string, got a boolean'}}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `test` | (`value`: `A`) => `boolean` |
| `errorMessage` | `string` |

#### Returns

[`Decoder`](Decoder.md)<`A`\>

#### Defined in

[decoder.ts:826](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L826)

___

### anyJson

▸ `Static` **anyJson**(): [`Decoder`](Decoder.md)<`any`\>

Escape hatch to bypass validation. Always succeeds and types the result as
`any`. Useful for defining decoders incrementally, particularly for
complex objects.

Example:
```
interface User {
  name: string;
  complexUserData: ComplexType;
}

const userDecoder: Decoder<User> = object({
  name: string(),
  complexUserData: anyJson()
});
```

#### Returns

[`Decoder`](Decoder.md)<`any`\>

#### Defined in

[decoder.ts:237](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L237)

___

### array

▸ `Static` **array**(): [`Decoder`](Decoder.md)<`unknown`[]\>

Decoder for json arrays. Runs `decoder` on each array element, and succeeds
if all elements are successfully decoded. If no `decoder` argument is
provided then the outer array part of the json is validated but not the
contents, typing the result as `unknown[]`.

To decode a single value that is inside of an array see `valueAt`.

Examples:
```
array(number()).run([1, 2, 3])
// => {ok: true, result: [1, 2, 3]}

array(array(boolean())).run([[true], [], [true, false, false]])
// => {ok: true, result: [[true], [], [true, false, false]]}

const validNumbersDecoder = array()
  .map((arr: unknown[]) => arr.map(number().run))
  .map(Result.successes)

validNumbersDecoder.run([1, true, 2, 3, 'five', 4, []])
// {ok: true, result: [1, 2, 3, 4]}

validNumbersDecoder.run([false, 'hi', {}])
// {ok: true, result: []}

validNumbersDecoder.run(false)
// {ok: false, error: {..., message: "expected an array, got a boolean"}}
```

#### Returns

[`Decoder`](Decoder.md)<`unknown`[]\>

#### Defined in

[decoder.ts:370](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L370)

▸ `Static` **array**<`A`\>(`decoder`): [`Decoder`](Decoder.md)<`A`[]\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `decoder` | [`Decoder`](Decoder.md)<`A`\> |

#### Returns

[`Decoder`](Decoder.md)<`A`[]\>

#### Defined in

[decoder.ts:371](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L371)

___

### boolean

▸ `Static` **boolean**(): [`Decoder`](Decoder.md)<`boolean`\>

Decoder primitive that validates booleans, and fails on all other input.

#### Returns

[`Decoder`](Decoder.md)<`boolean`\>

#### Defined in

[decoder.ts:210](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L210)

___

### constant

▸ `Static` **constant**<`T`\>(`value`): [`Decoder`](Decoder.md)<`T`\>

Decoder primitive that only matches on exact values.

For primitive values and shallow structures of primitive values `constant`
will infer an exact literal type:
```
 | Decoder                      | Type                          |
 | ---------------------------- | ------------------------------|
 | constant(true)               | Decoder<true>                 |
 | constant(false)              | Decoder<false>                |
 | constant(null)               | Decoder<null>                 |
 | constant(undefined)          | Decoder<undefined>            |
 | constant('alaska')           | Decoder<'alaska'>             |
 | constant(50)                 | Decoder<50>                   |
 | constant([1,2,3])            | Decoder<[1,2,3]>              |
 | constant({x: 't'})           | Decoder<{x: 't'}>             |
```

Inference breaks on nested structures, which require an annotation to get
the literal type:
```
 | Decoder                      | Type                          |
 | -----------------------------|-------------------------------|
 | constant([1,[2]])            | Decoder<(number|number[])[]>  |
 | constant<[1,[2]]>([1,[2]])   | Decoder<[1,[2]]>              |
 | constant({x: [1]})           | Decoder<{x: number[]}>        |
 | constant<{x: [1]}>({x: [1]}) | Decoder<{x: [1]}>             |
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` \| `number` \| `boolean` \| [] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

[`Decoder`](Decoder.md)<`T`\>

#### Defined in

[decoder.ts:275](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L275)

▸ `Static` **constant**<`T`, `U`\>(`value`): [`Decoder`](Decoder.md)<`U`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` \| `number` \| `boolean` |
| `U` | extends [`T`, ...T[]] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `U` |

#### Returns

[`Decoder`](Decoder.md)<`U`\>

#### Defined in

[decoder.ts:276](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L276)

▸ `Static` **constant**<`T`, `U`\>(`value`): [`Decoder`](Decoder.md)<`U`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` \| `number` \| `boolean` |
| `U` | extends `Record`<`string`, `T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `U` |

#### Returns

[`Decoder`](Decoder.md)<`U`\>

#### Defined in

[decoder.ts:277](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L277)

▸ `Static` **constant**<`T`\>(`value`): [`Decoder`](Decoder.md)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

[`Decoder`](Decoder.md)<`T`\>

#### Defined in

[decoder.ts:278](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L278)

___

### dict

▸ `Static` **dict**<`A`\>(`decoder`): [`Decoder`](Decoder.md)<`Record`<`string`, `A`\>\>

Decoder for json objects where the keys are unknown strings, but the values
should all be of the same type.

Example:
```
dict(number()).run({chocolate: 12, vanilla: 10, mint: 37});
// => {ok: true, result: {chocolate: 12, vanilla: 10, mint: 37}}
```

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `decoder` | [`Decoder`](Decoder.md)<`A`\> |

#### Returns

[`Decoder`](Decoder.md)<`Record`<`string`, `A`\>\>

#### Defined in

[decoder.ts:446](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L446)

___

### fail

▸ `Static` **fail**<`A`\>(`errorMessage`): [`Decoder`](Decoder.md)<`A`\>

Decoder that ignores the input json and always fails with `errorMessage`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `errorMessage` | `string` |

#### Returns

[`Decoder`](Decoder.md)<`A`\>

#### Defined in

[decoder.ts:665](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L665)

___

### intersection

▸ `Static` **intersection**<`A`, `B`\>(`ad`, `bd`): [`Decoder`](Decoder.md)<`A` & `B`\>

Combines 2-8 object decoders into a decoder for the intersection of all the objects.

Example:
```
interface Pet {
  name: string;
  maxLegs: number;
}

interface Cat extends Pet {
  evil: boolean;
}

const petDecoder: Decoder<Pet> = object({name: string(), maxLegs: number()});
const catDecoder: Decoder<Cat> = intersection(petDecoder, object({evil: boolean()}));
```

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ad` | [`Decoder`](Decoder.md)<`A`\> |
| `bd` | [`Decoder`](Decoder.md)<`B`\> |

#### Returns

[`Decoder`](Decoder.md)<`A` & `B`\>

#### Defined in

[decoder.ts:566](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L566)

▸ `Static` **intersection**<`A`, `B`, `C`\>(`ad`, `bd`, `cd`): [`Decoder`](Decoder.md)<`A` & `B` & `C`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ad` | [`Decoder`](Decoder.md)<`A`\> |
| `bd` | [`Decoder`](Decoder.md)<`B`\> |
| `cd` | [`Decoder`](Decoder.md)<`C`\> |

#### Returns

[`Decoder`](Decoder.md)<`A` & `B` & `C`\>

#### Defined in

[decoder.ts:567](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L567)

▸ `Static` **intersection**<`A`, `B`, `C`, `D`\>(`ad`, `bd`, `cd`, `dd`): [`Decoder`](Decoder.md)<`A` & `B` & `C` & `D`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ad` | [`Decoder`](Decoder.md)<`A`\> |
| `bd` | [`Decoder`](Decoder.md)<`B`\> |
| `cd` | [`Decoder`](Decoder.md)<`C`\> |
| `dd` | [`Decoder`](Decoder.md)<`D`\> |

#### Returns

[`Decoder`](Decoder.md)<`A` & `B` & `C` & `D`\>

#### Defined in

[decoder.ts:568](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L568)

▸ `Static` **intersection**<`A`, `B`, `C`, `D`, `E`\>(`ad`, `bd`, `cd`, `dd`, `ed`): [`Decoder`](Decoder.md)<`A` & `B` & `C` & `D` & `E`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ad` | [`Decoder`](Decoder.md)<`A`\> |
| `bd` | [`Decoder`](Decoder.md)<`B`\> |
| `cd` | [`Decoder`](Decoder.md)<`C`\> |
| `dd` | [`Decoder`](Decoder.md)<`D`\> |
| `ed` | [`Decoder`](Decoder.md)<`E`\> |

#### Returns

[`Decoder`](Decoder.md)<`A` & `B` & `C` & `D` & `E`\>

#### Defined in

[decoder.ts:569](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L569)

▸ `Static` **intersection**<`A`, `B`, `C`, `D`, `E`, `F`\>(`ad`, `bd`, `cd`, `dd`, `ed`, `fd`): [`Decoder`](Decoder.md)<`A` & `B` & `C` & `D` & `E` & `F`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ad` | [`Decoder`](Decoder.md)<`A`\> |
| `bd` | [`Decoder`](Decoder.md)<`B`\> |
| `cd` | [`Decoder`](Decoder.md)<`C`\> |
| `dd` | [`Decoder`](Decoder.md)<`D`\> |
| `ed` | [`Decoder`](Decoder.md)<`E`\> |
| `fd` | [`Decoder`](Decoder.md)<`F`\> |

#### Returns

[`Decoder`](Decoder.md)<`A` & `B` & `C` & `D` & `E` & `F`\>

#### Defined in

[decoder.ts:570](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L570)

▸ `Static` **intersection**<`A`, `B`, `C`, `D`, `E`, `F`, `G`\>(`ad`, `bd`, `cd`, `dd`, `ed`, `fd`, `gd`): [`Decoder`](Decoder.md)<`A` & `B` & `C` & `D` & `E` & `F` & `G`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ad` | [`Decoder`](Decoder.md)<`A`\> |
| `bd` | [`Decoder`](Decoder.md)<`B`\> |
| `cd` | [`Decoder`](Decoder.md)<`C`\> |
| `dd` | [`Decoder`](Decoder.md)<`D`\> |
| `ed` | [`Decoder`](Decoder.md)<`E`\> |
| `fd` | [`Decoder`](Decoder.md)<`F`\> |
| `gd` | [`Decoder`](Decoder.md)<`G`\> |

#### Returns

[`Decoder`](Decoder.md)<`A` & `B` & `C` & `D` & `E` & `F` & `G`\>

#### Defined in

[decoder.ts:571](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L571)

▸ `Static` **intersection**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`\>(`ad`, `bd`, `cd`, `dd`, `ed`, `fd`, `gd`, `hd`): [`Decoder`](Decoder.md)<`A` & `B` & `C` & `D` & `E` & `F` & `G` & `H`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ad` | [`Decoder`](Decoder.md)<`A`\> |
| `bd` | [`Decoder`](Decoder.md)<`B`\> |
| `cd` | [`Decoder`](Decoder.md)<`C`\> |
| `dd` | [`Decoder`](Decoder.md)<`D`\> |
| `ed` | [`Decoder`](Decoder.md)<`E`\> |
| `fd` | [`Decoder`](Decoder.md)<`F`\> |
| `gd` | [`Decoder`](Decoder.md)<`G`\> |
| `hd` | [`Decoder`](Decoder.md)<`H`\> |

#### Returns

[`Decoder`](Decoder.md)<`A` & `B` & `C` & `D` & `E` & `F` & `G` & `H`\>

#### Defined in

[decoder.ts:572](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L572)

___

### lazy

▸ `Static` **lazy**<`A`\>(`mkDecoder`): [`Decoder`](Decoder.md)<`A`\>

Decoder that allows for validating recursive data structures. Unlike with
functions, decoders assigned to variables can't reference themselves
before they are fully defined. We can avoid prematurely referencing the
decoder by wrapping it in a function that won't be called until use, at
which point the decoder has been defined.

Example:
```
interface Comment {
  msg: string;
  replies: Comment[];
}

const decoder: Decoder<Comment> = object({
  msg: string(),
  replies: lazy(() => array(decoder))
});
```

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mkDecoder` | () => [`Decoder`](Decoder.md)<`A`\> |

#### Returns

[`Decoder`](Decoder.md)<`A`\>

#### Defined in

[decoder.ts:688](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L688)

___

### number

▸ `Static` **number**(): [`Decoder`](Decoder.md)<`number`\>

Decoder primitive that validates numbers, and fails on all other input.

#### Returns

[`Decoder`](Decoder.md)<`number`\>

#### Defined in

[decoder.ts:198](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L198)

___

### object

▸ `Static` **object**(): [`Decoder`](Decoder.md)<`Record`<`string`, `unknown`\>\>

An higher-order decoder that runs decoders on specified fields of an object,
and returns a new object with those fields. If `object` is called with no
arguments, then the outer object part of the json is validated but not the
contents, typing the result as a record where all keys have a value of
type `unknown`.

The `optional` and `constant` decoders are particularly useful for decoding
objects that match typescript interfaces.

To decode a single field that is inside of an object see `valueAt`.

Example:
```
object({x: number(), y: number()}).run({x: 5, y: 10})
// => {ok: true, result: {x: 5, y: 10}}

object().map(Object.keys).run({n: 1, i: [], c: {}, e: 'e'})
// => {ok: true, result: ['n', 'i', 'c', 'e']}
```

#### Returns

[`Decoder`](Decoder.md)<`Record`<`string`, `unknown`\>\>

#### Defined in

[decoder.ts:309](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L309)

▸ `Static` **object**<`A`\>(`decoders`): [`Decoder`](Decoder.md)<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `decoders` | [`DecoderObject`](../modules.md#decoderobject)<`A`\> |

#### Returns

[`Decoder`](Decoder.md)<`A`\>

#### Defined in

[decoder.ts:310](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L310)

___

### oneOf

▸ `Static` **oneOf**<`A`\>(...`decoders`): [`Decoder`](Decoder.md)<`A`\>

Decoder that attempts to run each decoder in `decoders` and either succeeds
with the first successful decoder, or fails after all decoders have failed.

Note that `oneOf` expects the decoders to all have the same return type,
while `union` creates a decoder for the union type of all the input
decoders.

Examples:
```
oneOf(string(), number().map(String))
oneOf(constant('start'), constant('stop'), succeed('unknown'))
```

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...decoders` | [`Decoder`](Decoder.md)<`A`\>[] |

#### Returns

[`Decoder`](Decoder.md)<`A`\>

#### Defined in

[decoder.ts:502](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L502)

___

### optional

▸ `Static` **optional**<`A`\>(`decoder`): [`Decoder`](Decoder.md)<`undefined` \| `A`\>

Decoder for values that may be `undefined`. This is primarily helpful for
decoding interfaces with optional fields.

Example:
```
interface User {
  id: number;
  isOwner?: boolean;
}

const decoder: Decoder<User> = object({
  id: number(),
  isOwner: optional(boolean())
});
```

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `decoder` | [`Decoder`](Decoder.md)<`A`\> |

#### Returns

[`Decoder`](Decoder.md)<`undefined` \| `A`\>

#### Defined in

[decoder.ts:483](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L483)

___

### string

▸ `Static` **string**(): [`Decoder`](Decoder.md)<`string`\>

Decoder primitive that validates strings, and fails on all other input.

#### Returns

[`Decoder`](Decoder.md)<`string`\>

#### Defined in

[decoder.ts:186](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L186)

___

### succeed

▸ `Static` **succeed**<`A`\>(`fixedValue`): [`Decoder`](Decoder.md)<`A`\>

Decoder that ignores the input json and always succeeds with `fixedValue`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fixedValue` | `A` |

#### Returns

[`Decoder`](Decoder.md)<`A`\>

#### Defined in

[decoder.ts:659](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L659)

___

### tuple

▸ `Static` **tuple**<`A`\>(`decoder`): [`Decoder`](Decoder.md)<[`A`]\>

Decoder for fixed-length arrays, aka Tuples.

Supports up to 8-tuples.

Example:
```
tuple([number(), number(), string()]).run([5, 10, 'px'])
// => {ok: true, result: [5, 10, 'px']}
```

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `decoder` | [[`Decoder`](Decoder.md)<`A`\>] |

#### Returns

[`Decoder`](Decoder.md)<[`A`]\>

#### Defined in

[decoder.ts:402](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L402)

▸ `Static` **tuple**<`A`, `B`\>(`decoder`): [`Decoder`](Decoder.md)<[`A`, `B`]\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `decoder` | [[`Decoder`](Decoder.md)<`A`\>, [`Decoder`](Decoder.md)<`B`\>] |

#### Returns

[`Decoder`](Decoder.md)<[`A`, `B`]\>

#### Defined in

[decoder.ts:403](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L403)

▸ `Static` **tuple**<`A`, `B`, `C`\>(`decoder`): [`Decoder`](Decoder.md)<[`A`, `B`, `C`]\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `decoder` | [[`Decoder`](Decoder.md)<`A`\>, [`Decoder`](Decoder.md)<`B`\>, [`Decoder`](Decoder.md)<`C`\>] |

#### Returns

[`Decoder`](Decoder.md)<[`A`, `B`, `C`]\>

#### Defined in

[decoder.ts:404](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L404)

▸ `Static` **tuple**<`A`, `B`, `C`, `D`\>(`decoder`): [`Decoder`](Decoder.md)<[`A`, `B`, `C`, `D`]\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `decoder` | [[`Decoder`](Decoder.md)<`A`\>, [`Decoder`](Decoder.md)<`B`\>, [`Decoder`](Decoder.md)<`C`\>, [`Decoder`](Decoder.md)<`D`\>] |

#### Returns

[`Decoder`](Decoder.md)<[`A`, `B`, `C`, `D`]\>

#### Defined in

[decoder.ts:405](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L405)

▸ `Static` **tuple**<`A`, `B`, `C`, `D`, `E`\>(`decoder`): [`Decoder`](Decoder.md)<[`A`, `B`, `C`, `D`, `E`]\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `decoder` | [[`Decoder`](Decoder.md)<`A`\>, [`Decoder`](Decoder.md)<`B`\>, [`Decoder`](Decoder.md)<`C`\>, [`Decoder`](Decoder.md)<`D`\>, [`Decoder`](Decoder.md)<`E`\>] |

#### Returns

[`Decoder`](Decoder.md)<[`A`, `B`, `C`, `D`, `E`]\>

#### Defined in

[decoder.ts:406](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L406)

▸ `Static` **tuple**<`A`, `B`, `C`, `D`, `E`, `F`\>(`decoder`): [`Decoder`](Decoder.md)<[`A`, `B`, `C`, `D`, `E`, `F`]\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `decoder` | [[`Decoder`](Decoder.md)<`A`\>, [`Decoder`](Decoder.md)<`B`\>, [`Decoder`](Decoder.md)<`C`\>, [`Decoder`](Decoder.md)<`D`\>, [`Decoder`](Decoder.md)<`E`\>, [`Decoder`](Decoder.md)<`F`\>] |

#### Returns

[`Decoder`](Decoder.md)<[`A`, `B`, `C`, `D`, `E`, `F`]\>

#### Defined in

[decoder.ts:407](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L407)

▸ `Static` **tuple**<`A`, `B`, `C`, `D`, `E`, `F`, `G`\>(`decoder`): [`Decoder`](Decoder.md)<[`A`, `B`, `C`, `D`, `E`, `F`, `G`]\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `decoder` | [[`Decoder`](Decoder.md)<`A`\>, [`Decoder`](Decoder.md)<`B`\>, [`Decoder`](Decoder.md)<`C`\>, [`Decoder`](Decoder.md)<`D`\>, [`Decoder`](Decoder.md)<`E`\>, [`Decoder`](Decoder.md)<`F`\>, [`Decoder`](Decoder.md)<`G`\>] |

#### Returns

[`Decoder`](Decoder.md)<[`A`, `B`, `C`, `D`, `E`, `F`, `G`]\>

#### Defined in

[decoder.ts:408](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L408)

▸ `Static` **tuple**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`\>(`decoder`): [`Decoder`](Decoder.md)<[`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`]\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `decoder` | [[`Decoder`](Decoder.md)<`A`\>, [`Decoder`](Decoder.md)<`B`\>, [`Decoder`](Decoder.md)<`C`\>, [`Decoder`](Decoder.md)<`D`\>, [`Decoder`](Decoder.md)<`E`\>, [`Decoder`](Decoder.md)<`F`\>, [`Decoder`](Decoder.md)<`G`\>, [`Decoder`](Decoder.md)<`H`\>] |

#### Returns

[`Decoder`](Decoder.md)<[`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`]\>

#### Defined in

[decoder.ts:409](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L409)

___

### union

▸ `Static` **union**<`A`, `B`\>(`ad`, `bd`): [`Decoder`](Decoder.md)<`A` \| `B`\>

Combines 2-8 decoders of disparate types into a decoder for the union of all
the types.

If you need more than 8 variants for your union, it's possible to use
`oneOf` in place of `union` as long as you annotate every decoder with the
union type.

Example:
```
type C = {a: string} | {b: number};

const unionDecoder: Decoder<C> = union(object({a: string()}), object({b: number()}));
const oneOfDecoder: Decoder<C> = oneOf(object<C>({a: string()}), object<C>({b: number()}));
```

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ad` | [`Decoder`](Decoder.md)<`A`\> |
| `bd` | [`Decoder`](Decoder.md)<`B`\> |

#### Returns

[`Decoder`](Decoder.md)<`A` \| `B`\>

#### Defined in

[decoder.ts:537](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L537)

▸ `Static` **union**<`A`, `B`, `C`\>(`ad`, `bd`, `cd`): [`Decoder`](Decoder.md)<`A` \| `B` \| `C`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ad` | [`Decoder`](Decoder.md)<`A`\> |
| `bd` | [`Decoder`](Decoder.md)<`B`\> |
| `cd` | [`Decoder`](Decoder.md)<`C`\> |

#### Returns

[`Decoder`](Decoder.md)<`A` \| `B` \| `C`\>

#### Defined in

[decoder.ts:538](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L538)

▸ `Static` **union**<`A`, `B`, `C`, `D`\>(`ad`, `bd`, `cd`, `dd`): [`Decoder`](Decoder.md)<`A` \| `B` \| `C` \| `D`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ad` | [`Decoder`](Decoder.md)<`A`\> |
| `bd` | [`Decoder`](Decoder.md)<`B`\> |
| `cd` | [`Decoder`](Decoder.md)<`C`\> |
| `dd` | [`Decoder`](Decoder.md)<`D`\> |

#### Returns

[`Decoder`](Decoder.md)<`A` \| `B` \| `C` \| `D`\>

#### Defined in

[decoder.ts:539](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L539)

▸ `Static` **union**<`A`, `B`, `C`, `D`, `E`\>(`ad`, `bd`, `cd`, `dd`, `ed`): [`Decoder`](Decoder.md)<`A` \| `B` \| `C` \| `D` \| `E`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ad` | [`Decoder`](Decoder.md)<`A`\> |
| `bd` | [`Decoder`](Decoder.md)<`B`\> |
| `cd` | [`Decoder`](Decoder.md)<`C`\> |
| `dd` | [`Decoder`](Decoder.md)<`D`\> |
| `ed` | [`Decoder`](Decoder.md)<`E`\> |

#### Returns

[`Decoder`](Decoder.md)<`A` \| `B` \| `C` \| `D` \| `E`\>

#### Defined in

[decoder.ts:540](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L540)

▸ `Static` **union**<`A`, `B`, `C`, `D`, `E`, `F`\>(`ad`, `bd`, `cd`, `dd`, `ed`, `fd`): [`Decoder`](Decoder.md)<`A` \| `B` \| `C` \| `D` \| `E` \| `F`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ad` | [`Decoder`](Decoder.md)<`A`\> |
| `bd` | [`Decoder`](Decoder.md)<`B`\> |
| `cd` | [`Decoder`](Decoder.md)<`C`\> |
| `dd` | [`Decoder`](Decoder.md)<`D`\> |
| `ed` | [`Decoder`](Decoder.md)<`E`\> |
| `fd` | [`Decoder`](Decoder.md)<`F`\> |

#### Returns

[`Decoder`](Decoder.md)<`A` \| `B` \| `C` \| `D` \| `E` \| `F`\>

#### Defined in

[decoder.ts:541](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L541)

▸ `Static` **union**<`A`, `B`, `C`, `D`, `E`, `F`, `G`\>(`ad`, `bd`, `cd`, `dd`, `ed`, `fd`, `gd`): [`Decoder`](Decoder.md)<`A` \| `B` \| `C` \| `D` \| `E` \| `F` \| `G`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ad` | [`Decoder`](Decoder.md)<`A`\> |
| `bd` | [`Decoder`](Decoder.md)<`B`\> |
| `cd` | [`Decoder`](Decoder.md)<`C`\> |
| `dd` | [`Decoder`](Decoder.md)<`D`\> |
| `ed` | [`Decoder`](Decoder.md)<`E`\> |
| `fd` | [`Decoder`](Decoder.md)<`F`\> |
| `gd` | [`Decoder`](Decoder.md)<`G`\> |

#### Returns

[`Decoder`](Decoder.md)<`A` \| `B` \| `C` \| `D` \| `E` \| `F` \| `G`\>

#### Defined in

[decoder.ts:542](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L542)

▸ `Static` **union**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`\>(`ad`, `bd`, `cd`, `dd`, `ed`, `fd`, `gd`, `hd`): [`Decoder`](Decoder.md)<`A` \| `B` \| `C` \| `D` \| `E` \| `F` \| `G` \| `H`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ad` | [`Decoder`](Decoder.md)<`A`\> |
| `bd` | [`Decoder`](Decoder.md)<`B`\> |
| `cd` | [`Decoder`](Decoder.md)<`C`\> |
| `dd` | [`Decoder`](Decoder.md)<`D`\> |
| `ed` | [`Decoder`](Decoder.md)<`E`\> |
| `fd` | [`Decoder`](Decoder.md)<`F`\> |
| `gd` | [`Decoder`](Decoder.md)<`G`\> |
| `hd` | [`Decoder`](Decoder.md)<`H`\> |

#### Returns

[`Decoder`](Decoder.md)<`A` \| `B` \| `C` \| `D` \| `E` \| `F` \| `G` \| `H`\>

#### Defined in

[decoder.ts:543](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L543)

___

### unknownJson

▸ `Static` **unknownJson**(): [`Decoder`](Decoder.md)<`unknown`\>

Decoder identity function which always succeeds and types the result as
`unknown`.

#### Returns

[`Decoder`](Decoder.md)<`unknown`\>

#### Defined in

[decoder.ts:243](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L243)

___

### valueAt

▸ `Static` **valueAt**<`A`\>(`paths`, `decoder`): [`Decoder`](Decoder.md)<`A`\>

Decoder that pulls a specific field out of a json structure, instead of
decoding and returning the full structure. The `paths` array describes the
object keys and array indices to traverse, so that values can be pulled out
of a nested structure.

Example:
```
const decoder = valueAt(['a', 'b', 0], string());

decoder.run({a: {b: ['surprise!']}})
// => {ok: true, result: 'surprise!'}

decoder.run({a: {x: 'cats'}})
// => {ok: false, error: {... at: 'input.a.b[0]' message: 'path does not exist'}}
```

Note that the `decoder` is ran on the value found at the last key in the
path, even if the last key is not found. This allows the `optional`
decoder to succeed when appropriate.
```
const optionalDecoder = valueAt(['a', 'b', 'c'], optional(string()));

optionalDecoder.run({a: {b: {c: 'surprise!'}}})
// => {ok: true, result: 'surprise!'}

optionalDecoder.run({a: {b: 'cats'}})
// => {ok: false, error: {... at: 'input.a.b.c' message: 'expected an object, got "cats"'}

optionalDecoder.run({a: {b: {z: 1}}})
// => {ok: true, result: undefined}
```

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `paths` | (`string` \| `number`)[] |
| `decoder` | [`Decoder`](Decoder.md)<`A`\> |

#### Returns

[`Decoder`](Decoder.md)<`A`\>

#### Defined in

[decoder.ts:624](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L624)

___

### withDefault

▸ `Static` **withDefault**<`A`\>(`defaultValue`, `decoder`): [`Decoder`](Decoder.md)<`A`\>

Decoder that always succeeds with either the decoded value, or a fallback
default value.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `defaultValue` | `A` |
| `decoder` | [`Decoder`](Decoder.md)<`A`\> |

#### Returns

[`Decoder`](Decoder.md)<`A`\>

#### Defined in

[decoder.ts:586](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L586)
