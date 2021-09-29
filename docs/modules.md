[@mojotech/json-type-validation](README.md) / Exports

# @mojotech/json-type-validation

## Table of contents

### Namespaces

- [Result](modules/Result.md)

### Classes

- [Decoder](classes/Decoder.md)

### Interfaces

- [DecoderError](interfaces/DecoderError.md)

### Type aliases

- [DecoderObject](modules.md#decoderobject)

### Functions

- [anyJson](modules.md#anyjson)
- [array](modules.md#array)
- [boolean](modules.md#boolean)
- [constant](modules.md#constant)
- [dict](modules.md#dict)
- [fail](modules.md#fail)
- [intersection](modules.md#intersection)
- [isDecoderError](modules.md#isdecodererror)
- [lazy](modules.md#lazy)
- [number](modules.md#number)
- [object](modules.md#object)
- [oneOf](modules.md#oneof)
- [optional](modules.md#optional)
- [string](modules.md#string)
- [succeed](modules.md#succeed)
- [tuple](modules.md#tuple)
- [union](modules.md#union)
- [unknownJson](modules.md#unknownjson)
- [valueAt](modules.md#valueat)
- [withDefault](modules.md#withdefault)

## Type aliases

### DecoderObject

Ƭ **DecoderObject**<`A`\>: { [t in keyof A]: Decoder<A[t]\> }

Defines a mapped type over an interface `A`. `DecoderObject<A>` is an
interface that has all the keys or `A`, but each key's property type is
mapped to a decoder for that type. This type is used when creating decoders
for objects.

Example:
```
interface X {
  a: boolean;
  b: string;
}

const decoderObject: DecoderObject<X> = {
  a: boolean(),
  b: string()
}
```

#### Type parameters

| Name |
| :------ |
| `A` |

#### Defined in

[decoder.ts:92](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L92)

## Functions

### anyJson

▸ `Const` **anyJson**(): [`Decoder`](classes/Decoder.md)<`any`\>

See `Decoder.anyJson`

#### Returns

[`Decoder`](classes/Decoder.md)<`any`\>

#### Defined in

[combinators.ts:15](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L15)

___

### array

▸ `Const` **array**(): [`Decoder`](classes/Decoder.md)<`unknown`[]\>

See `Decoder.array`

#### Returns

[`Decoder`](classes/Decoder.md)<`unknown`[]\>

#### Defined in

[combinators.ts:27](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L27)

▸ `Const` **array**<`A`\>(`decoder`): [`Decoder`](classes/Decoder.md)<`A`[]\>

See `Decoder.array`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `decoder` | [`Decoder`](classes/Decoder.md)<`A`\> |

#### Returns

[`Decoder`](classes/Decoder.md)<`A`[]\>

#### Defined in

[combinators.ts:27](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L27)

___

### boolean

▸ `Const` **boolean**(): [`Decoder`](classes/Decoder.md)<`boolean`\>

See `Decoder.boolean`

#### Returns

[`Decoder`](classes/Decoder.md)<`boolean`\>

#### Defined in

[combinators.ts:12](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L12)

___

### constant

▸ `Const` **constant**<`T`\>(`value`): [`Decoder`](classes/Decoder.md)<`T`\>

See `Decoder.constant`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` \| `number` \| `boolean` \| [] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

[`Decoder`](classes/Decoder.md)<`T`\>

#### Defined in

[combinators.ts:21](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L21)

▸ `Const` **constant**<`T`, `U`\>(`value`): [`Decoder`](classes/Decoder.md)<`U`\>

See `Decoder.constant`

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

[`Decoder`](classes/Decoder.md)<`U`\>

#### Defined in

[combinators.ts:21](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L21)

▸ `Const` **constant**<`T`, `U`\>(`value`): [`Decoder`](classes/Decoder.md)<`U`\>

See `Decoder.constant`

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

[`Decoder`](classes/Decoder.md)<`U`\>

#### Defined in

[combinators.ts:21](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L21)

▸ `Const` **constant**<`T`\>(`value`): [`Decoder`](classes/Decoder.md)<`T`\>

See `Decoder.constant`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

[`Decoder`](classes/Decoder.md)<`T`\>

#### Defined in

[combinators.ts:21](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L21)

___

### dict

▸ `Const` **dict**<`A`\>(`decoder`): [`Decoder`](classes/Decoder.md)<`Record`<`string`, `A`\>\>

See `Decoder.dict`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `decoder` | [`Decoder`](classes/Decoder.md)<`A`\> |

#### Returns

[`Decoder`](classes/Decoder.md)<`Record`<`string`, `A`\>\>

#### Defined in

[combinators.ts:33](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L33)

___

### fail

▸ `Const` **fail**<`A`\>(`errorMessage`): [`Decoder`](classes/Decoder.md)<`A`\>

See `Decoder.fail`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `errorMessage` | `string` |

#### Returns

[`Decoder`](classes/Decoder.md)<`A`\>

#### Defined in

[combinators.ts:57](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L57)

___

### intersection

▸ `Const` **intersection**<`A`, `B`\>(`ad`, `bd`): [`Decoder`](classes/Decoder.md)<`A` & `B`\>

See `Decoder.intersection`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ad` | [`Decoder`](classes/Decoder.md)<`A`\> |
| `bd` | [`Decoder`](classes/Decoder.md)<`B`\> |

#### Returns

[`Decoder`](classes/Decoder.md)<`A` & `B`\>

#### Defined in

[combinators.ts:45](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L45)

▸ `Const` **intersection**<`A`, `B`, `C`\>(`ad`, `bd`, `cd`): [`Decoder`](classes/Decoder.md)<`A` & `B` & `C`\>

See `Decoder.intersection`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ad` | [`Decoder`](classes/Decoder.md)<`A`\> |
| `bd` | [`Decoder`](classes/Decoder.md)<`B`\> |
| `cd` | [`Decoder`](classes/Decoder.md)<`C`\> |

#### Returns

[`Decoder`](classes/Decoder.md)<`A` & `B` & `C`\>

#### Defined in

[combinators.ts:45](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L45)

▸ `Const` **intersection**<`A`, `B`, `C`, `D`\>(`ad`, `bd`, `cd`, `dd`): [`Decoder`](classes/Decoder.md)<`A` & `B` & `C` & `D`\>

See `Decoder.intersection`

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
| `ad` | [`Decoder`](classes/Decoder.md)<`A`\> |
| `bd` | [`Decoder`](classes/Decoder.md)<`B`\> |
| `cd` | [`Decoder`](classes/Decoder.md)<`C`\> |
| `dd` | [`Decoder`](classes/Decoder.md)<`D`\> |

#### Returns

[`Decoder`](classes/Decoder.md)<`A` & `B` & `C` & `D`\>

#### Defined in

[combinators.ts:45](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L45)

▸ `Const` **intersection**<`A`, `B`, `C`, `D`, `E`\>(`ad`, `bd`, `cd`, `dd`, `ed`): [`Decoder`](classes/Decoder.md)<`A` & `B` & `C` & `D` & `E`\>

See `Decoder.intersection`

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
| `ad` | [`Decoder`](classes/Decoder.md)<`A`\> |
| `bd` | [`Decoder`](classes/Decoder.md)<`B`\> |
| `cd` | [`Decoder`](classes/Decoder.md)<`C`\> |
| `dd` | [`Decoder`](classes/Decoder.md)<`D`\> |
| `ed` | [`Decoder`](classes/Decoder.md)<`E`\> |

#### Returns

[`Decoder`](classes/Decoder.md)<`A` & `B` & `C` & `D` & `E`\>

#### Defined in

[combinators.ts:45](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L45)

▸ `Const` **intersection**<`A`, `B`, `C`, `D`, `E`, `F`\>(`ad`, `bd`, `cd`, `dd`, `ed`, `fd`): [`Decoder`](classes/Decoder.md)<`A` & `B` & `C` & `D` & `E` & `F`\>

See `Decoder.intersection`

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
| `ad` | [`Decoder`](classes/Decoder.md)<`A`\> |
| `bd` | [`Decoder`](classes/Decoder.md)<`B`\> |
| `cd` | [`Decoder`](classes/Decoder.md)<`C`\> |
| `dd` | [`Decoder`](classes/Decoder.md)<`D`\> |
| `ed` | [`Decoder`](classes/Decoder.md)<`E`\> |
| `fd` | [`Decoder`](classes/Decoder.md)<`F`\> |

#### Returns

[`Decoder`](classes/Decoder.md)<`A` & `B` & `C` & `D` & `E` & `F`\>

#### Defined in

[combinators.ts:45](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L45)

▸ `Const` **intersection**<`A`, `B`, `C`, `D`, `E`, `F`, `G`\>(`ad`, `bd`, `cd`, `dd`, `ed`, `fd`, `gd`): [`Decoder`](classes/Decoder.md)<`A` & `B` & `C` & `D` & `E` & `F` & `G`\>

See `Decoder.intersection`

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
| `ad` | [`Decoder`](classes/Decoder.md)<`A`\> |
| `bd` | [`Decoder`](classes/Decoder.md)<`B`\> |
| `cd` | [`Decoder`](classes/Decoder.md)<`C`\> |
| `dd` | [`Decoder`](classes/Decoder.md)<`D`\> |
| `ed` | [`Decoder`](classes/Decoder.md)<`E`\> |
| `fd` | [`Decoder`](classes/Decoder.md)<`F`\> |
| `gd` | [`Decoder`](classes/Decoder.md)<`G`\> |

#### Returns

[`Decoder`](classes/Decoder.md)<`A` & `B` & `C` & `D` & `E` & `F` & `G`\>

#### Defined in

[combinators.ts:45](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L45)

▸ `Const` **intersection**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`\>(`ad`, `bd`, `cd`, `dd`, `ed`, `fd`, `gd`, `hd`): [`Decoder`](classes/Decoder.md)<`A` & `B` & `C` & `D` & `E` & `F` & `G` & `H`\>

See `Decoder.intersection`

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
| `ad` | [`Decoder`](classes/Decoder.md)<`A`\> |
| `bd` | [`Decoder`](classes/Decoder.md)<`B`\> |
| `cd` | [`Decoder`](classes/Decoder.md)<`C`\> |
| `dd` | [`Decoder`](classes/Decoder.md)<`D`\> |
| `ed` | [`Decoder`](classes/Decoder.md)<`E`\> |
| `fd` | [`Decoder`](classes/Decoder.md)<`F`\> |
| `gd` | [`Decoder`](classes/Decoder.md)<`G`\> |
| `hd` | [`Decoder`](classes/Decoder.md)<`H`\> |

#### Returns

[`Decoder`](classes/Decoder.md)<`A` & `B` & `C` & `D` & `E` & `F` & `G` & `H`\>

#### Defined in

[combinators.ts:45](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L45)

___

### isDecoderError

▸ `Const` **isDecoderError**(`a`): a is DecoderError

Type guard for `DecoderError`. One use case of the type guard is in the
`catch` of a promise. Typescript types the error argument of `catch` as
`any`, so when dealing with a decoder as a promise you may need to
distinguish between a `DecoderError` and an error string.

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `any` |

#### Returns

a is DecoderError

#### Defined in

[decoder.ts:100](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L100)

___

### lazy

▸ `Const` **lazy**<`A`\>(`mkDecoder`): [`Decoder`](classes/Decoder.md)<`A`\>

See `Decoder.lazy`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mkDecoder` | () => [`Decoder`](classes/Decoder.md)<`A`\> |

#### Returns

[`Decoder`](classes/Decoder.md)<`A`\>

#### Defined in

[combinators.ts:60](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L60)

___

### number

▸ `Const` **number**(): [`Decoder`](classes/Decoder.md)<`number`\>

See `Decoder.number`

#### Returns

[`Decoder`](classes/Decoder.md)<`number`\>

#### Defined in

[combinators.ts:9](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L9)

___

### object

▸ `Const` **object**(): [`Decoder`](classes/Decoder.md)<`Record`<`string`, `unknown`\>\>

See `Decoder.object`

#### Returns

[`Decoder`](classes/Decoder.md)<`Record`<`string`, `unknown`\>\>

#### Defined in

[combinators.ts:24](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L24)

▸ `Const` **object**<`A`\>(`decoders`): [`Decoder`](classes/Decoder.md)<`A`\>

See `Decoder.object`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `decoders` | [`DecoderObject`](modules.md#decoderobject)<`A`\> |

#### Returns

[`Decoder`](classes/Decoder.md)<`A`\>

#### Defined in

[combinators.ts:24](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L24)

___

### oneOf

▸ `Const` **oneOf**<`A`\>(...`decoders`): [`Decoder`](classes/Decoder.md)<`A`\>

See `Decoder.oneOf`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...decoders` | [`Decoder`](classes/Decoder.md)<`A`\>[] |

#### Returns

[`Decoder`](classes/Decoder.md)<`A`\>

#### Defined in

[combinators.ts:39](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L39)

___

### optional

▸ `Const` **optional**<`A`\>(`decoder`): [`Decoder`](classes/Decoder.md)<`undefined` \| `A`\>

See `Decoder.optional`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `decoder` | [`Decoder`](classes/Decoder.md)<`A`\> |

#### Returns

[`Decoder`](classes/Decoder.md)<`undefined` \| `A`\>

#### Defined in

[combinators.ts:36](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L36)

___

### string

▸ `Const` **string**(): [`Decoder`](classes/Decoder.md)<`string`\>

See `Decoder.string`

#### Returns

[`Decoder`](classes/Decoder.md)<`string`\>

#### Defined in

[combinators.ts:6](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L6)

___

### succeed

▸ `Const` **succeed**<`A`\>(`fixedValue`): [`Decoder`](classes/Decoder.md)<`A`\>

See `Decoder.succeed`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fixedValue` | `A` |

#### Returns

[`Decoder`](classes/Decoder.md)<`A`\>

#### Defined in

[combinators.ts:54](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L54)

___

### tuple

▸ `Const` **tuple**<`A`\>(`decoder`): [`Decoder`](classes/Decoder.md)<[`A`]\>

See `Decoder.tuple`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `decoder` | [[`Decoder`](classes/Decoder.md)<`A`\>] |

#### Returns

[`Decoder`](classes/Decoder.md)<[`A`]\>

#### Defined in

[combinators.ts:30](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L30)

▸ `Const` **tuple**<`A`, `B`\>(`decoder`): [`Decoder`](classes/Decoder.md)<[`A`, `B`]\>

See `Decoder.tuple`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `decoder` | [[`Decoder`](classes/Decoder.md)<`A`\>, [`Decoder`](classes/Decoder.md)<`B`\>] |

#### Returns

[`Decoder`](classes/Decoder.md)<[`A`, `B`]\>

#### Defined in

[combinators.ts:30](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L30)

▸ `Const` **tuple**<`A`, `B`, `C`\>(`decoder`): [`Decoder`](classes/Decoder.md)<[`A`, `B`, `C`]\>

See `Decoder.tuple`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `decoder` | [[`Decoder`](classes/Decoder.md)<`A`\>, [`Decoder`](classes/Decoder.md)<`B`\>, [`Decoder`](classes/Decoder.md)<`C`\>] |

#### Returns

[`Decoder`](classes/Decoder.md)<[`A`, `B`, `C`]\>

#### Defined in

[combinators.ts:30](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L30)

▸ `Const` **tuple**<`A`, `B`, `C`, `D`\>(`decoder`): [`Decoder`](classes/Decoder.md)<[`A`, `B`, `C`, `D`]\>

See `Decoder.tuple`

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
| `decoder` | [[`Decoder`](classes/Decoder.md)<`A`\>, [`Decoder`](classes/Decoder.md)<`B`\>, [`Decoder`](classes/Decoder.md)<`C`\>, [`Decoder`](classes/Decoder.md)<`D`\>] |

#### Returns

[`Decoder`](classes/Decoder.md)<[`A`, `B`, `C`, `D`]\>

#### Defined in

[combinators.ts:30](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L30)

▸ `Const` **tuple**<`A`, `B`, `C`, `D`, `E`\>(`decoder`): [`Decoder`](classes/Decoder.md)<[`A`, `B`, `C`, `D`, `E`]\>

See `Decoder.tuple`

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
| `decoder` | [[`Decoder`](classes/Decoder.md)<`A`\>, [`Decoder`](classes/Decoder.md)<`B`\>, [`Decoder`](classes/Decoder.md)<`C`\>, [`Decoder`](classes/Decoder.md)<`D`\>, [`Decoder`](classes/Decoder.md)<`E`\>] |

#### Returns

[`Decoder`](classes/Decoder.md)<[`A`, `B`, `C`, `D`, `E`]\>

#### Defined in

[combinators.ts:30](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L30)

▸ `Const` **tuple**<`A`, `B`, `C`, `D`, `E`, `F`\>(`decoder`): [`Decoder`](classes/Decoder.md)<[`A`, `B`, `C`, `D`, `E`, `F`]\>

See `Decoder.tuple`

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
| `decoder` | [[`Decoder`](classes/Decoder.md)<`A`\>, [`Decoder`](classes/Decoder.md)<`B`\>, [`Decoder`](classes/Decoder.md)<`C`\>, [`Decoder`](classes/Decoder.md)<`D`\>, [`Decoder`](classes/Decoder.md)<`E`\>, [`Decoder`](classes/Decoder.md)<`F`\>] |

#### Returns

[`Decoder`](classes/Decoder.md)<[`A`, `B`, `C`, `D`, `E`, `F`]\>

#### Defined in

[combinators.ts:30](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L30)

▸ `Const` **tuple**<`A`, `B`, `C`, `D`, `E`, `F`, `G`\>(`decoder`): [`Decoder`](classes/Decoder.md)<[`A`, `B`, `C`, `D`, `E`, `F`, `G`]\>

See `Decoder.tuple`

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
| `decoder` | [[`Decoder`](classes/Decoder.md)<`A`\>, [`Decoder`](classes/Decoder.md)<`B`\>, [`Decoder`](classes/Decoder.md)<`C`\>, [`Decoder`](classes/Decoder.md)<`D`\>, [`Decoder`](classes/Decoder.md)<`E`\>, [`Decoder`](classes/Decoder.md)<`F`\>, [`Decoder`](classes/Decoder.md)<`G`\>] |

#### Returns

[`Decoder`](classes/Decoder.md)<[`A`, `B`, `C`, `D`, `E`, `F`, `G`]\>

#### Defined in

[combinators.ts:30](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L30)

▸ `Const` **tuple**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`\>(`decoder`): [`Decoder`](classes/Decoder.md)<[`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`]\>

See `Decoder.tuple`

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
| `decoder` | [[`Decoder`](classes/Decoder.md)<`A`\>, [`Decoder`](classes/Decoder.md)<`B`\>, [`Decoder`](classes/Decoder.md)<`C`\>, [`Decoder`](classes/Decoder.md)<`D`\>, [`Decoder`](classes/Decoder.md)<`E`\>, [`Decoder`](classes/Decoder.md)<`F`\>, [`Decoder`](classes/Decoder.md)<`G`\>, [`Decoder`](classes/Decoder.md)<`H`\>] |

#### Returns

[`Decoder`](classes/Decoder.md)<[`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`]\>

#### Defined in

[combinators.ts:30](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L30)

___

### union

▸ `Const` **union**<`A`, `B`\>(`ad`, `bd`): [`Decoder`](classes/Decoder.md)<`A` \| `B`\>

See `Decoder.union`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ad` | [`Decoder`](classes/Decoder.md)<`A`\> |
| `bd` | [`Decoder`](classes/Decoder.md)<`B`\> |

#### Returns

[`Decoder`](classes/Decoder.md)<`A` \| `B`\>

#### Defined in

[combinators.ts:42](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L42)

▸ `Const` **union**<`A`, `B`, `C`\>(`ad`, `bd`, `cd`): [`Decoder`](classes/Decoder.md)<`A` \| `B` \| `C`\>

See `Decoder.union`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ad` | [`Decoder`](classes/Decoder.md)<`A`\> |
| `bd` | [`Decoder`](classes/Decoder.md)<`B`\> |
| `cd` | [`Decoder`](classes/Decoder.md)<`C`\> |

#### Returns

[`Decoder`](classes/Decoder.md)<`A` \| `B` \| `C`\>

#### Defined in

[combinators.ts:42](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L42)

▸ `Const` **union**<`A`, `B`, `C`, `D`\>(`ad`, `bd`, `cd`, `dd`): [`Decoder`](classes/Decoder.md)<`A` \| `B` \| `C` \| `D`\>

See `Decoder.union`

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
| `ad` | [`Decoder`](classes/Decoder.md)<`A`\> |
| `bd` | [`Decoder`](classes/Decoder.md)<`B`\> |
| `cd` | [`Decoder`](classes/Decoder.md)<`C`\> |
| `dd` | [`Decoder`](classes/Decoder.md)<`D`\> |

#### Returns

[`Decoder`](classes/Decoder.md)<`A` \| `B` \| `C` \| `D`\>

#### Defined in

[combinators.ts:42](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L42)

▸ `Const` **union**<`A`, `B`, `C`, `D`, `E`\>(`ad`, `bd`, `cd`, `dd`, `ed`): [`Decoder`](classes/Decoder.md)<`A` \| `B` \| `C` \| `D` \| `E`\>

See `Decoder.union`

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
| `ad` | [`Decoder`](classes/Decoder.md)<`A`\> |
| `bd` | [`Decoder`](classes/Decoder.md)<`B`\> |
| `cd` | [`Decoder`](classes/Decoder.md)<`C`\> |
| `dd` | [`Decoder`](classes/Decoder.md)<`D`\> |
| `ed` | [`Decoder`](classes/Decoder.md)<`E`\> |

#### Returns

[`Decoder`](classes/Decoder.md)<`A` \| `B` \| `C` \| `D` \| `E`\>

#### Defined in

[combinators.ts:42](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L42)

▸ `Const` **union**<`A`, `B`, `C`, `D`, `E`, `F`\>(`ad`, `bd`, `cd`, `dd`, `ed`, `fd`): [`Decoder`](classes/Decoder.md)<`A` \| `B` \| `C` \| `D` \| `E` \| `F`\>

See `Decoder.union`

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
| `ad` | [`Decoder`](classes/Decoder.md)<`A`\> |
| `bd` | [`Decoder`](classes/Decoder.md)<`B`\> |
| `cd` | [`Decoder`](classes/Decoder.md)<`C`\> |
| `dd` | [`Decoder`](classes/Decoder.md)<`D`\> |
| `ed` | [`Decoder`](classes/Decoder.md)<`E`\> |
| `fd` | [`Decoder`](classes/Decoder.md)<`F`\> |

#### Returns

[`Decoder`](classes/Decoder.md)<`A` \| `B` \| `C` \| `D` \| `E` \| `F`\>

#### Defined in

[combinators.ts:42](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L42)

▸ `Const` **union**<`A`, `B`, `C`, `D`, `E`, `F`, `G`\>(`ad`, `bd`, `cd`, `dd`, `ed`, `fd`, `gd`): [`Decoder`](classes/Decoder.md)<`A` \| `B` \| `C` \| `D` \| `E` \| `F` \| `G`\>

See `Decoder.union`

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
| `ad` | [`Decoder`](classes/Decoder.md)<`A`\> |
| `bd` | [`Decoder`](classes/Decoder.md)<`B`\> |
| `cd` | [`Decoder`](classes/Decoder.md)<`C`\> |
| `dd` | [`Decoder`](classes/Decoder.md)<`D`\> |
| `ed` | [`Decoder`](classes/Decoder.md)<`E`\> |
| `fd` | [`Decoder`](classes/Decoder.md)<`F`\> |
| `gd` | [`Decoder`](classes/Decoder.md)<`G`\> |

#### Returns

[`Decoder`](classes/Decoder.md)<`A` \| `B` \| `C` \| `D` \| `E` \| `F` \| `G`\>

#### Defined in

[combinators.ts:42](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L42)

▸ `Const` **union**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`\>(`ad`, `bd`, `cd`, `dd`, `ed`, `fd`, `gd`, `hd`): [`Decoder`](classes/Decoder.md)<`A` \| `B` \| `C` \| `D` \| `E` \| `F` \| `G` \| `H`\>

See `Decoder.union`

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
| `ad` | [`Decoder`](classes/Decoder.md)<`A`\> |
| `bd` | [`Decoder`](classes/Decoder.md)<`B`\> |
| `cd` | [`Decoder`](classes/Decoder.md)<`C`\> |
| `dd` | [`Decoder`](classes/Decoder.md)<`D`\> |
| `ed` | [`Decoder`](classes/Decoder.md)<`E`\> |
| `fd` | [`Decoder`](classes/Decoder.md)<`F`\> |
| `gd` | [`Decoder`](classes/Decoder.md)<`G`\> |
| `hd` | [`Decoder`](classes/Decoder.md)<`H`\> |

#### Returns

[`Decoder`](classes/Decoder.md)<`A` \| `B` \| `C` \| `D` \| `E` \| `F` \| `G` \| `H`\>

#### Defined in

[combinators.ts:42](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L42)

___

### unknownJson

▸ `Const` **unknownJson**(): [`Decoder`](classes/Decoder.md)<`unknown`\>

See `Decoder.unknownJson`

#### Returns

[`Decoder`](classes/Decoder.md)<`unknown`\>

#### Defined in

[combinators.ts:18](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L18)

___

### valueAt

▸ `Const` **valueAt**<`A`\>(`paths`, `decoder`): [`Decoder`](classes/Decoder.md)<`A`\>

See `Decoder.valueAt`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `paths` | (`string` \| `number`)[] |
| `decoder` | [`Decoder`](classes/Decoder.md)<`A`\> |

#### Returns

[`Decoder`](classes/Decoder.md)<`A`\>

#### Defined in

[combinators.ts:51](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L51)

___

### withDefault

▸ `Const` **withDefault**<`A`\>(`defaultValue`, `decoder`): [`Decoder`](classes/Decoder.md)<`A`\>

See `Decoder.withDefault`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `defaultValue` | `A` |
| `decoder` | [`Decoder`](classes/Decoder.md)<`A`\> |

#### Returns

[`Decoder`](classes/Decoder.md)<`A`\>

#### Defined in

[combinators.ts:48](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/combinators.ts#L48)
