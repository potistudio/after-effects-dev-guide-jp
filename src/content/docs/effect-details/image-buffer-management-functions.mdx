---
title: '画像バッファ管理関数'
---
これらの関数を使用して、[PF_EffectWorld / PF_LayerDef](../effect-basics/PF_EffectWorld) を作成および破棄し、ビット深度を調べます。

---

## PF_WorldSuite1

`PF_WorldSuite1` は `PF_WorldSuite2` の前身となるスイートです。  
`PF_WorldSuite2` と後方互換性があり、`PF_NewWorld` と `PF_DisposeWorld` の2つの関数が定義されています。  
古い開発環境との互換性が必要でない限り、`PF_WorldSuite2` の使用を推奨します。

## PF_WorldSuite2

| 関数 | 説明 |
| --- | --- |
| `PF_NewWorld` | Creates a new `PF_EffectWorld`.<br /><br /><pre lang="cpp">PF_Err PF_NewWorld(<br/>  PF_ProgPtr      effect_ref,<br/>  A_long          widthL,<br/>  A_long          heightL,<br/>  PF_Boolean      clear_pixB,<br/>  PF_PixelFormat  pixel_format,<br/>  PF_EffectWorld  \*worldP);</pre> |
| `PF_DisposeWorld` | Disposes of a `PF_EffectWorld`.<br /><br /><pre lang="cpp">PF_Err PF_DisposeWorld(<br/>  PF_ProgPtr      effect_ref,<br/>  PF_EffectWorld  \*worldP);</pre> |
| `PF_GetPixelFormat` | Get the pixel format for a given `PF_EffectWorld`.<br /><br /><pre lang="cpp">PF_Err PF_GetPixelFormat(<br/>  const PF_EffectWorld  \*worldP,<br/>  PF_PixelFormat        \*pixel_formatP);</pre><br /><br />`pixel_formatP` can be:<br /><br />- `PF_PixelFormat_ARGB32` - standard 8-bit RGB<br />- `PF_PixelFormat_ARGB64` - 16-bit RGB<br />- `PF_PixelFormat_ARGB128` - 32-bit floating point RGB |

### PF_NewWorld

```cpp
PF_Err PF_NewWorld(
    PF_ProgPtr      effect_ref,
    A_long          widthL,
    A_long          heightL,
    PF_Boolean      clear_pixB,
    PF_PixelFormat  pixel_format,
    PF_EffectWorld  *worldP
);
```

新しい `PF_EffectWorld` を作成し、`worldP` に格納します。  
成功時は `PF_Err_NONE` を、失敗時はエラーコードを、`PF_Err` で返します。

#### 引数

##### effect_ref

自身のプラグインインスタンスを識別するポインターです。  
`PF_InData.effect_ref` を使用してください。

##### widthL

作成する `PF_EffectWorld` の幅をピクセル単位で指定してください。

##### heightL

作成する `PF_EffectWorld` の高さをピクセル単位で指定してください。

##### clear_pixB

作成する `PF_EffectWorld` のピクセルデータを初期化するか否かを指定してください。  
`true` の場合、各チャンネルはデータ型の初期値(0)で初期化されます。  
`false` の場合、初期化は行われないため、メモリ上の不定値が残っている可能性があります。

##### pixel_format

作成する `PF_EffectWorld` のピクセルフォーマットを指定してください。  
この値に応じて、作成される`PF_EffectWorld`の`world_flags`と`rowbytes`の値が、以下のように決定されます。

|pixel_format|world_flags|rowbytes|
|---|---|---|
|PF_PixelFormat_ARGB32|0(なし)|widthL × 4|
|PF_PixelFormat_ARGB64|PF_WorldFlag_RESERVED0|widthL × 8|
|PF_PixelFormat_ARGB128|PF_WorldFlag_RESERVED1|widthL × 16|
|PF_PixelFormat_GPU_BGRA128|PF_WorldFlag_RESERVED1|widthL × 16|
|PF_PixelFormat_Reserved|PF_WorldFlag_RESERVED0|widthL × 8|
|PF_PixelFormat_BGRA32|PF_WorldFlag_RESERVED0|widthL × 8|
|PF_PixelFormat_VUYA32|PF_WorldFlag_RESERVED0|widthL × 8|
|PF_PixelFormat_NTSCDV25|PF_WorldFlag_RESERVED0|widthL × 8|
|PF_PixelFormat_PALDV25|PF_WorldFlag_RESERVED0|widthL × 8|
|PF_PixelFormat_INVALID|PF_WorldFlag_RESERVED0|widthL × 8|
|PF_PixelFormat_FORCE_LONG_INT|PF_WorldFlag_RESERVED0|widthL × 8|
