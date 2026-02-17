---
title: 'パラメータについて'
---
パラメータは、時間とともに変化する値のストリームです。
ソース画像、スライダー、角度、ポイント、色、パス、任意データ型などが該当します。

エフェクトには `PF_ParamDef[]` 配列として渡されますが、値が有効なタイミングはセレクターごとに異なります。

After Effects 側が補間・キーフレーム管理を行うため、プラグインは値の利用に集中できます。
パラメータ定義は [PF_Cmd_PARAM_SETUP](command-selectors#グローバルセレクター) 中に [PF_ADD_PARAM](../effect-details/interaction-callback-functions#interaction-callbacks) で登録します。

`PF_ParamDef` を設定する前は、`AEFX_CLR_STRUCT`（`AE_Macros.h`）で構造体を初期化してください。

```cpp
PF_ParamDef def;

AEFX_CLR_STRUCT(def);
// PF_ADD_***
---

## パラメータ型

| パラメータ型 | 定義構造体 | `PF_ParamDefUnion` メンバ | 値型 | 説明 |
| --- | --- | --- | --- | --- |
| `PF_Param_LAYER` | [PF_LayerDef](pf_effectworld) | `ld` | `A_long` | コンポジション内の画像 / 音声レイヤー参照です。`params[0]` は常に入力レイヤーです。 |
| `PF_Param_SLIDER` | `PF_SliderDef` | `sd` | `long` | 旧式です。現在は非推奨です。 |
| `PF_Param_FIX_SLIDER` | `PF_FixedSliderDef` | `fd` | `PF_Fixed` | 旧式の固定小数点スライダーです。現在は `PF_Param_FLOAT_SLIDER` 推奨です。 |
| `PF_Param_FLOAT_SLIDER` | `PF_FloatSliderDef` | `fs_d` | `PF_FpLong` | 数値スライダーです。オーディオ用途では位相・精度・カーブ許容値も扱えます。 |
| `PF_Param_ANGLE` | `PF_AngleDef` | `ad` | `PF_Fixed` | 固定小数点の角度（度）です。360° を超える複数回転も指定できます。 |
| `PF_Param_CHECKBOX` | `PF_CheckBoxDef` | `bd` | `PF_Boolean` | チェックボックスです。`PF_ParamFlag_CANNOT_INTERP` が常に有効です。 |
| `PF_Param_COLOR` | `PF_ColorDef` | `cd` | `PF_Pixel` | RGB 色です（alpha 未使用）。高精度が必要なら [PF_ColorParamSuite1](../effect-details/parameters-floating-point-values#pf_colorparamsuite1) を使います。 |
| `PF_Param_POINT` | `PF_PointDef` | `td` | `PF_Fixed` | 2D ポイントです。座標系は左上原点、右方向が +X、下方向が +Y です。 |
| `PF_Param_POPUP` | `PF_PopupDef` | `pd` | `A_long` | 選択肢リストです。`PF_DEF_NAMESPTR` に `Entry1 / Entry2 / Entry3` 形式で登録します。 |
| `PF_Param_ARBITRARY_DATA` | `PF_ArbitraryDef` | `arb_d` | 任意 | カスタムデータ型です。ID、初期値、実データハンドルを管理します。詳細は [Arbitrary Data Parameters](../effect-details/arbitrary-data-parameters) を参照。 |
| `PF_Param_PATH` | `PF_PathDef` | `path_d` | `PF_PathID` | 同一レイヤー上のマスク参照です。データは直接アクセスせず、`PF_PathQuerySuite1` / `PF_PathDataSuite` を使用します。 |
| `PF_Param_GROUP_START` / `PF_Param_GROUP_END` | なし | なし | なし | パラメータをグループ化して ECP 上で折りたたみ表示できます。ネストも可能です。 |
| `PF_Param_BUTTON` | `PF_Button` | `button_d` | なし | 押下イベントのみを持つボタンです。検出には [Parameter Supervision](../effect-details/parameter-supervision) を使用します。 |
| `PF_Param_POINT_3D` | `PF_Point3D` | `point3d_d` | `PF_FpLong (3)` | 3D ポイントです（CS5.5 以降）。Premiere Pro では未対応です。 |

---

## スライダー範囲が効かないとき

スライダーがグレーアウトしていないのに動かない場合は、次を確認してください。

- `valid_min` / `slider_min` / `valid_max` / `slider_max` の設定
- `PF_Param_FIX_SLIDER` で固定小数点変換を正しく行っているか
- `AE_Macros.h` のマクロに `int` ではなく固定小数点値を渡していないか

---

## ポイントパラメータの原点

After Effects は、上流エフェクトによる出力サイズ変更や原点オフセットを考慮した座標を `PF_Param_POINT` に渡します。
ECP 上で `(0,0)` と見えていても、内部的にはオフセットが反映済みの場合があります。
