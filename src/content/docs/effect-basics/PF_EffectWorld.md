---
title: 'PF_EffectWorld / PF_LayerDef'
---
After Effects は、画像バッファを `PF_EffectWorld`（別名 `PF_LayerDef`）で表現します。

---

## PF_EffectWorld 構造体

| 項目 | 説明 |
| --- | --- |
| `world_flags` | 代表的なフラグは次の 2 つです。<br /><br />- `PF_WorldFlag_DEEP`: 16 bpc バッファ<br />- `PF_WorldFlag_WRITEABLE`: このバッファへの書き込み許可あり<br /><br />通常、入力バッファの直接書き換えはできず、出力バッファへの書き込みが基本です。 |
| `data` | 画像データ先頭へのポインタ（`PF_PixelPtr`）です。直接キャストせず、後述の [PF_PixelPtr Accessor Macros](#pf_pixelptr-accessor-macros) を使って取得してください。画素並びは低位バイトから `A, R, G, B` です。 |
| `rowbytes` | 1 行あたりのバイト数です。行末パディングを含むため、`width * pixel_size` と一致するとは限りません。走査時は必ず `rowbytes` を使って行頭を計算してください。フィールドレンダリング有無には依存しません。同じ解像度でも入力と出力で値が異なる場合があります。 |
| `width` | ピクセルバッファ幅です。 |
| `height` | ピクセルバッファ高さです。 |
| `extent_hint` | レイヤー内の非透明（alpha != 0）画素を囲む最小矩形です。必要出力範囲のヒントとして使います。 |
| `pix_aspect_ratio` | `PF_Rational` で表されるピクセルアスペクト比です。チェックアウトした別レイヤーではこの値を使えますが、適用対象レイヤーでは `PF_InData.pixel_aspect_ratio` を参照してください。 |
| `platform_ref` | プラットフォーム依存参照情報です。CS5 以降は基本的に未使用です。`PF_Cmd_GLOBAL_SETUP` では出力コンテキストがないため取得できません。 |
| `dephault` | レイヤーパラメータ専用です。`PF_LayerDefault_MYSELF` または `PF_LayerDefault_NONE` を取ります。 |

---

## 16.0 以降（GPU Smart Render）

`PF_Cmd_SMART_RENDER_GPU` では、`PF_LayerDef` は CPU レンダー時と同様に埋まります。  
ただし `PF_LayerDef.data` は `NULL` で、他フィールドのみ有効です。

---

## `rowbytes` の注意点

次の走査線へ進む際に `width * sizeof(pixel)` で計算してはいけません。  
必ず `rowbytes` を使って行オフセットを求めてください。

`PF_EffectWorld` の有効領域外へ書き込むと、他バッファやキャッシュ破壊につながります。

`rowbytes` 対応を検証するには、対象エフェクトの後段に Grow Bounds を適用する方法が有効です。

この状態では、論理解像度が同じでも出力側 `rowbytes` が入力より大きくなり、誤実装を検出しやすくなります。

---

## バイトアラインメントとビット深度

`PF_EffectWorld` の画素先頭は 16 バイト境界に揃っているとは限りません。  
大きなバッファの部分領域が渡される場合があるため、SIMD 最適化コードでは前提を固定しないでください。

After Effects は 8 bpc に加えて 16 bpc、32 bpc（float）をサポートします。

入力と出力で異なるビット深度が同時に渡されることはなく、プラグインが宣言していない深度が渡されることもありません。

---

## Opaque Pixel 用アクセサマクロ

`PF_PixelPtr` から実画素型へアクセスする際は、次のマクロを使います。

ポインタの生キャストは安全ではありません。将来実装変更の可能性もあるため、抽象化されたアクセサ経由で取得してください。

---

## PF_PixelPtr Accessor Macros

| マクロ | 用途 |
| --- | --- |
| `PF_GET_PIXEL_DATA16` | 指定ワールドから 16 bpc 画素ポインタを取得します。対象が 16 bpc でなければ `NULL` が返ります。 |
| `PF_GET_PIXEL_DATA8` | 指定ワールドから 8 bpc 画素ポインタを取得します。対象が 8 bpc でなければ `NULL` が返ります。 |

`PF_GET_PIXEL_DATA16` / `PF_GET_PIXEL_DATA8` は、安全に画素型へアクセスするための API と考えてください。

例:

```cpp
{
    PF_Pixel16 *deep_pixelP = NULL;
    PF_Err     err = PF_Err_NONE;
    err = PF_GET_PIXEL_DATA16(output, NULL, &deep_pixelP);
}
```

16 bpc でない場合、`deep_pixelP` は `NULL` になります。

第 2 引数は通常 `NULL` を渡します。  
特別な用途として、別ポインタを渡して「指定ワールド深度として解釈した値」を取得することもできます。
