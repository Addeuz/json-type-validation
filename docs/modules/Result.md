[@mojotech/json-type-validation](../README.md) / [Exports](../modules.md) / Result

# Namespace: Result

## Table of contents

### Interfaces

- [Err](../interfaces/Result.Err.md)
- [Ok](../interfaces/Result.Ok.md)

### Type aliases

- [Result](Result.md#result)

### Functions

- [andThen](Result.md#andthen)
- [asPromise](Result.md#aspromise)
- [err](Result.md#err)
- [isErr](Result.md#iserr)
- [isOk](Result.md#isok)
- [map](Result.md#map)
- [map2](Result.md#map2)
- [mapError](Result.md#maperror)
- [ok](Result.md#ok)
- [successes](Result.md#successes)
- [withDefault](Result.md#withdefault)
- [withException](Result.md#withexception)

## Type aliases

### Result

Ƭ **Result**<`V`, `E`\>: [`Ok`](../interfaces/Result.Ok.md)<`V`\> \| [`Err`](../interfaces/Result.Err.md)<`E`\>

The result of a computation that may fail. The decoding function
`Decoder.run` returns a `Result`. The value of a `Result` is either `Ok` if
the computation succeeded, or `Err` if there was some failure in the
process.

#### Type parameters

| Name |
| :------ |
| `V` |
| `E` |

#### Defined in

[result.ts:7](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/result.ts#L7)

## Functions

### andThen

▸ `Const` **andThen**<`A`, `B`, `E`\>(`f`, `r`): [`Result`](Result.md#result)<`B`, `E`\>

Chain together a sequence of computations that may fail, similar to a
`Promise`. If the first computation fails then the error will propagate
through. If it succeeds, then `f` will be applied to the value, returning a
new `Result`.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`value`: `A`) => [`Result`](Result.md#result)<`B`, `E`\> |
| `r` | [`Result`](Result.md#result)<`A`, `E`\> |

#### Returns

[`Result`](Result.md#result)<`B`, `E`\>

#### Defined in

[result.ts:129](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/result.ts#L129)

___

### asPromise

▸ `Const` **asPromise**<`V`\>(`r`): `Promise`<`V`\>

Create a `Promise` that either resolves with the result of `Ok` or rejects
with the error of `Err`.

#### Type parameters

| Name |
| :------ |
| `V` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `r` | [`Result`](Result.md#result)<`V`, `any`\> |

#### Returns

`Promise`<`V`\>

#### Defined in

[result.ts:55](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/result.ts#L55)

___

### err

▸ `Const` **err**<`E`\>(`error`): [`Err`](../interfaces/Result.Err.md)<`E`\>

Wraps errors in an `Err` type.

Example: `err('on fire') // => {ok: false, error: 'on fire'}`

#### Type parameters

| Name |
| :------ |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `E` |

#### Returns

[`Err`](../interfaces/Result.Err.md)<`E`\>

#### Defined in

[result.ts:44](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/result.ts#L44)

___

### isErr

▸ `Const` **isErr**<`E`\>(`r`): r is Err<E\>

Typeguard for `Err`.

#### Type parameters

| Name |
| :------ |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `r` | [`Result`](Result.md#result)<`any`, `E`\> |

#### Returns

r is Err<E\>

#### Defined in

[result.ts:49](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/result.ts#L49)

___

### isOk

▸ `Const` **isOk**<`V`\>(`r`): r is Ok<V\>

Typeguard for `Ok`.

#### Type parameters

| Name |
| :------ |
| `V` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `r` | [`Result`](Result.md#result)<`V`, `any`\> |

#### Returns

r is Ok<V\>

#### Defined in

[result.ts:37](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/result.ts#L37)

___

### map

▸ `Const` **map**<`A`, `B`, `E`\>(`f`, `r`): [`Result`](Result.md#result)<`B`, `E`\>

Apply `f` to the result of an `Ok`, or pass the error through.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`value`: `A`) => `B` |
| `r` | [`Result`](Result.md#result)<`A`, `E`\> |

#### Returns

[`Result`](Result.md#result)<`B`, `E`\>

#### Defined in

[result.ts:105](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/result.ts#L105)

___

### map2

▸ `Const` **map2**<`A`, `B`, `C`, `E`\>(`f`, `ar`, `br`): [`Result`](Result.md#result)<`C`, `E`\>

Apply `f` to the result of two `Ok`s, or pass an error through. If both
`Result`s are errors then the first one is returned.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`av`: `A`, `bv`: `B`) => `C` |
| `ar` | [`Result`](Result.md#result)<`A`, `E`\> |
| `br` | [`Result`](Result.md#result)<`B`, `E`\> |

#### Returns

[`Result`](Result.md#result)<`C`, `E`\>

#### Defined in

[result.ts:112](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/result.ts#L112)

___

### mapError

▸ `Const` **mapError**<`V`, `A`, `B`\>(`f`, `r`): [`Result`](Result.md#result)<`V`, `B`\>

Apply `f` to the error of an `Err`, or pass the success through.

#### Type parameters

| Name |
| :------ |
| `V` |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`error`: `A`) => `B` |
| `r` | [`Result`](Result.md#result)<`V`, `A`\> |

#### Returns

[`Result`](Result.md#result)<`V`, `B`\>

#### Defined in

[result.ts:120](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/result.ts#L120)

___

### ok

▸ `Const` **ok**<`V`\>(`result`): [`Ok`](../interfaces/Result.Ok.md)<`V`\>

Wraps values in an `Ok` type.

Example: `ok(5) // => {ok: true, result: 5}`

#### Type parameters

| Name |
| :------ |
| `V` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | `V` |

#### Returns

[`Ok`](../interfaces/Result.Ok.md)<`V`\>

#### Defined in

[result.ts:32](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/result.ts#L32)

___

### successes

▸ `Const` **successes**<`A`\>(`results`): `A`[]

Given an array of `Result`s, return the successful values.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `results` | [`Result`](Result.md#result)<`A`, `any`\>[] |

#### Returns

`A`[]

#### Defined in

[result.ts:99](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/result.ts#L99)

___

### withDefault

▸ `Const` **withDefault**<`V`\>(`defaultValue`, `r`): `V`

Unwraps a `Result` and returns either the result of an `Ok`, or
`defaultValue`.

Example:
```
Result.withDefault(5, number().run(json))
```

It would be nice if `Decoder` had an instance method that mirrored this
function. Such a method would look something like this:
```
class Decoder<A> {
  runWithDefault = (defaultValue: A, json: any): A =>
    Result.withDefault(defaultValue, this.run(json));
}

number().runWithDefault(5, json)
```
Unfortunately, the type of `defaultValue: A` on the method causes issues
with type inference on  the `object` decoder in some situations. While these
inference issues can be solved by providing the optional type argument for
`object`s, the extra trouble and confusion doesn't seem worth it.

#### Type parameters

| Name |
| :------ |
| `V` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `defaultValue` | `V` |
| `r` | [`Result`](Result.md#result)<`V`, `any`\> |

#### Returns

`V`

#### Defined in

[result.ts:82](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/result.ts#L82)

___

### withException

▸ `Const` **withException**<`V`\>(`r`): `V`

Return the successful result, or throw an error.

#### Type parameters

| Name |
| :------ |
| `V` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `r` | [`Result`](Result.md#result)<`V`, `any`\> |

#### Returns

`V`

#### Defined in

[result.ts:88](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/result.ts#L88)
