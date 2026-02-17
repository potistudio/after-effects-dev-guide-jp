---
title: 'PF_ParamDef'
---
After Effects は、現在時点のパラメータ値を `PF_ParamDef[]` としてエフェクトへ渡します。  
`params` 配列の有効範囲はセレクターごとに異なります。詳細は [コマンドセレクター](command-selectors) を参照してください。

---

## パラメータゼロ

最初のパラメータ `params[0]` は、エフェクト適用対象の入力画像です。  
型は [PF_EffectWorld / PF_LayerDef](pf_effectworld) です。

---

## その他のパラメータ

すべてのパラメータ型は `PF_ParamDef` で表現されます。  
内部にユニオン（`PF_ParamDefUnion`）を持つため、`param_type` に対応するメンバのみが有効です。

## PF_ParamDef メンバー

| 型 | 名前 | 説明 |
| --- | --- | --- |
| `A_long` | `id` | パラメータ ID です。将来パラメータ順を入れ替えても、ID を維持すれば既存プロジェクト互換を保ちやすくなります。 |
| `PF_ChangeFlags` | `change_flags` | パラメータ値を変更したときに設定します。主にドラッグ中イベント、`PF_Cmd_USER_CHANGED_PARAM`、`PF_Cmd_UPDATE_PARAMS_UI` で有効です。 |
| [PF_ParamUIFlags](#parameter-ui-flags) | `ui_flags` | パラメータ追加前に UI 挙動を指定します。イベント処理中に変更できるのは基本的に `PF_PUI_DISABLED` のみです。 |
| `A_short` | `ui_width` | 非標準 UI パラメータの表示幅です。 |
| `A_short` | `ui_height` | 非標準 UI パラメータの表示高さです。 |
| [PF_ParamType](parameters) | `param_type` | パラメータの型です。 |
| `A_char[32]` | `PF_DEF_NAME` | パラメータ名です。イベント処理中に変更できます。長さ上限は 31 文字（終端除く）です。 |
| [PF_ParamFlags](#parameter-flags) | `flags` | パラメータ追加前に挙動フラグを指定します。イベント処理中に動的変更できるフラグは一部のみです。 |
| `PF_ParamDefUnion` | `u` | 各 [パラメータ型](parameters) の実体を保持するユニオンです。`param_type` に対応するメンバのみ意味を持ちます。 |

---

## Parameter UI Flags

パラメータ UI を制御するフラグです。  
UI フラグと挙動フラグは別フィールドなので、混同すると予期しない動作になります。

| フラグ | 説明 |
| --- | --- |
| `PF_PUI_TOPIC` | パラメータの「トピック領域」（折りたたみ時にも見える領域）で `PF_Cmd_EVENT` を処理する場合に設定します。併せて `PF_OutFlag_CUSTOM_UI` の設定が必要です。 |
| `PF_PUI_CONTROL` | パラメータのコントロール領域で `PF_Cmd_EVENT` を処理する場合に設定します。`PF_OutFlag_CUSTOM_UI` も必要です。詳細は [Effect UI & Events](../effect-ui-events/effect-ui-events) を参照してください。 |
| `PF_PUI_STD_CONTROL_ONLY` | 標準 UI コントロールだけを表示し、データストリーム（キーフレーム対象）を持たせない場合に設定します。`PF_ParamFlag_SUPERVISE` も併用してください。`PF_Param_CUSTOM` / `PF_Param_NO_DATA` / `PF_Param_LAYER` / `PF_Param_ARBITRARY_DATA` / `PF_Param_PATH` には使用できません。 |
| `PF_PUI_NO_ECW_UI` | Effect Controls Window に UI を表示しません。別 UI から値を操作するケース向けです。AE ではタイムラインのキーフレーム表示には影響しません。 |
| `PF_PUI_ECW_SEPARATOR` | Premiere でのみ有効です。パラメータの上に太い区切り線を表示します。 |
| `PF_PUI_DISABLED` | パラメータを無効化（グレーアウト）します。主に `PF_Cmd_USER_CHANGED_PARAM` の応答で使います。 |
| `PF_PUI_DONT_ERASE_TOPIC` | トピック領域の消去を After Effects 側で行わないようにします。 |
| `PF_PUI_DONT_ERASE_CONTROL` | コントロール領域の消去を After Effects 側で行わないようにします。 |
| `PF_PUI_RADIO_BUTTON` | Premiere でのみ有効です。`PF_Param_POPUP` をラジオボタン表示にします。 |
| `PF_PUI_INVISIBLE` | パラメータ UI を Effect Controls とタイムラインの両方で非表示にします。CS6 以降の After Effects でも有効です。 |

これらに加えて、[AEGP_GetDynamicStreamFlags](../aegps/aegp-suites#aegp_dynamicstreamsuite4) で表示状態を動的に制御できます。

---

## Parameter Flags

挙動フラグは UI フラグとは別概念です。  
通常は [PF_Cmd_PARAM_SETUP](command-selectors) でパラメータ追加前に設定します。イベント中に変更可能なものは個別に記載します。

| フラグ | 意味 |
| --- | --- |
| `PF_ParamFlag_CANNOT_TIME_VARY` | 時間変化しないパラメータとして扱います。タイムラインでキーフレーム化できなくなります。 |
| `PF_ParamFlag_CANNOT_INTERP` | 代数補間を無効化します。オン / オフ型など連続補間が不要な値に向きます。保持補間は利用可能です。 |
| `PF_ParamFlag_COLLAPSE_TWIRLY` | `PF_Cmd_UPDATE_PARAMS_UI` / `PF_Cmd_USER_CHANGED_PARAM` 中に折りたたみ状態を動的制御します。 |
| `PF_ParamFlag_SUPERVISE` | 対象パラメータの変更時に `PF_Cmd_USER_CHANGED_PARAM` を受け取るためのフラグです。詳細は [Parameter Supervision](../effect-details/parameter-supervision) を参照してください。 |
| `PF_ParamFlag_START_COLLAPSED` | 初期折りたたみ状態を制御します。`PF_OutFlag2_PARAM_GROUP_START_COLLAPSED_FLAG` が有効でないと反映されません。 |
| `PF_ParamFlag_USE_VALUE_FOR_OLD_PROJECTS` | 後方互換用です。旧バージョンに存在しない新規パラメータを読み込むとき、`PF_ADD_PARAM()` で設定した `value` を初期値として使います。 |
| `PF_ParamFlag_LAYER_PARAM_IS_TRACKMATTE` | Premiere Pro 専用です。レイヤーパラメータをトラックマット用途として扱うことを示します。After Effects では無視されます。 |
| `PF_ParamFlag_EXCLUDE_FROM_HAVE_INPUTS_CHANGED` | `PF_OutFlag2_AUTOMATIC_WIDE_TIME_INPUT` 利用時に、`PF_AreStatesIdentical` / `PF_HaveInputsChangedOverTimeSpan` の入力変化判定から除外したいパラメータで使います。 |
| `PF_ParamFlag_SKIP_REVEAL_WHEN_UNHIDDEN` | 非表示解除時に自動スクロールや親グループ展開を行わないようにします（CS6 以降）。 |

---

## PF_ValueDisplayFlags

`PF_FloatSliderDef` と `PF_FixedSliderDef` には `PF_ValueDisplayFlags` があり、情報パレットの表示設定に合わせて値表示形式を切り替えられます。  
設定次第で 0-1、0-255、0-32768、0.0-1.0 などの表示になります。

`PF_ValueDisplayFlag_PERCENT` を設定すると表示に `%` を付与できます。  
パーセント表示を使う場合は、ユーザー混乱を避けるため基本的に 0-100 範囲に収めることを推奨します。
