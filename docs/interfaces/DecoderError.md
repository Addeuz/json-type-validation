[@mojotech/json-type-validation](../README.md) / [Exports](../modules.md) / DecoderError

# Interface: DecoderError

Information describing how json data failed to match a decoder.
Includes the full input json, since in most cases it's useless to know how a
decoder failed without also seeing the malformed data.

## Table of contents

### Properties

- [at](DecoderError.md#at)
- [input](DecoderError.md#input)
- [kind](DecoderError.md#kind)
- [message](DecoderError.md#message)

## Properties

### at

• **at**: `string`

#### Defined in

[decoder.ts:55](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L55)

___

### input

• **input**: `unknown`

#### Defined in

[decoder.ts:54](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L54)

___

### kind

• **kind**: ``"DecoderError"``

#### Defined in

[decoder.ts:53](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L53)

___

### message

• **message**: `string`

#### Defined in

[decoder.ts:56](https://github.com/Addeuz/json-type-validation/blob/7f0c0fa/src/decoder.ts#L56)
