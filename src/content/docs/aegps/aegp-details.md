---
title: 'AEGP詳細'
---
## クッキーを食べましょう

After Effects が AEGP が呼び出す関数に関する状態情報を保持する必要がある場合（職人がフレームをレンダリングしているときや、キーフレーマーが同じストリームに一連のキーフレームを追加および削除しているときなど）、begin() 関数と end() 関数を呼び出します。

通常、begin 関数は不透明な識別子、つまり「cookie」を返します。これを使用する関数に渡す必要があります。 end 関数は Cookie を適切に破棄します。例については、`AEGP_StartAddKeyframes()` ([AEGP_KeyframeSuite3](aegp-suites#aegp_keyframesuite3) の下) を参照してください。

---

## レンダーキュー内の項目を変更する

`AEGP_AddCompToRenderQueue` を ([AEGP_RenderQueueSuite1](aegp-suites#aegp_renderqueuesuite1) から) 呼び出した場合、またはユーザーがレンダー キューにコンポジションを手動で追加または削除した場合、レンダー キュー アイテムへのすべての参照は無効になります。同様に、出力モジュールを追加または削除すると、各レンダー キュー アイテムのそのような参照が無効になります。

---

## 名前と固体

ソリッドには After Effects UI には名前がありますが、`PF_LayerDef` [PF_EffectWorld / PF_LayerDef](../effect-basics/PF_EffectWorld) には名前がありません。したがって、`AEGP_GetItemName` ([AEGP_ItemSuite9](aegp-suites#aegp_itemsuite9) 内) または `AEGP_GetLayerName` ([AEGP_LayerSuite9](aegp-suites#aegp_layersuite9) 内) によってそれらの名前を取得することはできません。

ただし、それらに関連付けられた ItemH を `AEGP_GetItemName` ([AEGP_ItemSuite9](aegp-suites#aegp_itemsuite9) から) に使用することはできます。

---

## エラーと問題の報告

`AEGP_ItemSuite>AEGP_ReportInfo()` を使用してユーザーに情報を報告し、プラグインを識別します。 AEIO プラグインは、代わりに (すべての関数とともに) 渡される AEIO_BasicData に含まれる msg_func ポインターを使用します。

---

## 変換: 最初に何が起こるか?

After Effects は、自動方向（パスまたは対象点に向かって）に基づいて回転を計算し、次に方向を計算してから、X、Y、および Z 回転を計算します。

---

## エフェクトレイヤーパラメータからピクセルにアクセスする

`AEGP_GetNewStreamValue` ([AEGP_StreamSuite5](aegp-suites#aegp_streamsuite5) 内) を使用してレイヤーの `layer_id` を取得し、次に新しい `AEGP_GetLayerFromLayerID` ([AEGP_LayerSuite9](aegp-suites#aegp_layersuite9) 内) を使用して `AEGP_LayerH` を取得します。
