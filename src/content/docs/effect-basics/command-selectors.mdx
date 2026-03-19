---
title: 'コマンドセレクター'
---
コマンドセレクターは、After Effects がエフェクトプラグインに「何を実行するか」を伝えるための指示です。

セレクターが送信されるたびに、エフェクトは次の情報を受け取ります。

- [PF_InData](pf_indata#pf_indata)（ホスト状態と入力情報）
- `PF_ParamDef[]`（パラメータ配列）
- 各種コールバック / スイート関数

エフェクトは [PF_OutData](pf_outdata#pf_outdata) に結果を返し、必要に応じて [PF_EffectWorld](pf_effectworld)（`PF_LayerDef`）へレンダリング結果を書き込みます。  
イベント系セレクターでは [PF_EventExtra](../effect-ui-events/pf_eventextra) を使って追加情報を受け取ります。

---

## 呼び出しシーケンス

呼び出し順は一部のみ固定で、それ以外はユーザー操作やホスト状態で変化します。

代表的な流れは次のとおりです。

1. 初回適用時  
`PF_Cmd_GLOBAL_SETUP` → `PF_Cmd_PARAM_SETUP` → `PF_Cmd_SEQUENCE_SETUP`
2. 各フレームの通常レンダリング  
`PF_Cmd_FRAME_SETUP` → `PF_Cmd_RENDER` → `PF_Cmd_FRAME_SETDOWN`
3. SmartFX レンダリング  
`PF_Cmd_SMART_PRE_RENDER`（必要回数）→ `PF_Cmd_SMART_RENDER`
4. 終了・破棄  
`PF_Cmd_SEQUENCE_SETDOWN`、必要に応じて `PF_Cmd_GLOBAL_SETDOWN`

`PF_Cmd_ABOUT` は ECW（エフェクトコントロールウィンドウ）から *About...* が選択されたときに送られます。

---

## コマンドセレクター一覧

### グローバルセレクター

| セレクター | 主な役割 |
| --- | --- |
| `PF_Cmd_ABOUT` | プラグイン説明ダイアログを表示します。`out_data->return_msg` を設定すると、After Effects がモーダルダイアログを表示します。 |
| `PF_Cmd_GLOBAL_SETUP` | プラグインの基本挙動を定義します。`out_data->my_version` を含む `PF_OutData` と各種フラグを設定します。 |
| `PF_Cmd_GLOBAL_SETDOWN` | グローバル領域で確保したメモリを解放します。 |
| `PF_Cmd_PARAM_SETUP` | パラメータ定義と UI 登録を行います。[PF_ADD_PARAM](../effect-details/interaction-callback-functions#interaction-callbacks) を使用し、`PF_OutData::num_params` を設定します。 |

### シーケンスセレクター

| セレクター | 主な役割 |
| --- | --- |
| `PF_Cmd_SEQUENCE_SETUP` | シーケンス単位のデータを初期化します。エフェクト初回適用時に呼ばれます。 |
| `PF_Cmd_SEQUENCE_RESETUP` | ディスク読み込み後や複製時にシーケンスデータを再構築します（通常はアンフラット化）。 |
| `PF_Cmd_SEQUENCE_FLATTEN` | 保存・複製に備えてシーケンスデータをフラット化します。ポインタを含むデータをディスク保存可能な形へ変換してください。 |
| `PF_Cmd_SEQUENCE_SETDOWN` | シーケンスデータを解放します。 |

### フレーム / オーディオ / SmartFX セレクター

| セレクター | 主な役割 |
| --- | --- |
| `PF_Cmd_FRAME_SETUP` | フレーム単位の作業領域を確保します。必要に応じて出力サイズや原点オフセットを指定します。 |
| `PF_Cmd_RENDER` | 通常レンダリング（8/16bpc）を実行します。32bpc は `PF_Cmd_SMART_RENDER` で処理します。 |
| `PF_Cmd_FRAME_SETDOWN` | `PF_Cmd_FRAME_SETUP` で確保したフレームデータを解放します。 |
| `PF_Cmd_AUDIO_SETUP` | オーディオレンダリング前に入力サンプル範囲を要求・初期化します。必要なら `startsampL` / `endsampL` を更新します。 |
| `PF_Cmd_AUDIO_RENDER` | `PF_OutData.dest_snd` にオーディオ処理結果を書き込みます。 |
| `PF_Cmd_AUDIO_SETDOWN` | `PF_Cmd_AUDIO_SETUP` で確保したメモリを解放します。 |
| `PF_Cmd_SMART_PRE_RENDER` | SmartFX の事前解析です。必要入力領域と出力可能領域を決定します。GPU レンダリング可能なら `PF_RenderOutputFlag_GPU_RENDER_POSSIBLE` を設定します。 |
| `PF_Cmd_SMART_RENDER` | SmartFX の実レンダリングを行います。 |

### メッセージングセレクター

| セレクター | 主な役割 |
| --- | --- |
| `PF_Cmd_EVENT` | UI イベントを処理します。イベント種別は `extra` 内の `e_type` で判定します。 |
| `PF_Cmd_USER_CHANGED_PARAM` | ユーザーによるパラメータ変更時に送信されます（`PF_ParamFlag_SUPERVISE` 設定時）。 |
| `PF_Cmd_UPDATE_PARAMS_UI` | ECP の表示更新要求です。`PF_UpdateParamUI()` で UI 特性のみ更新します。値変更は行わないでください。 |
| `PF_Cmd_DO_DIALOG` | オプションダイアログ表示要求です。`PF_OutFlag_I_DO_DIALOG` を設定している場合に送信されます。 |
| `PF_Cmd_ARBITRARY_CALLBACK` | 任意データ型（`PF_Param_ARBITRARY_DATA`）のハンドラ呼び出しです。 |
| `PF_Cmd_GET_EXTERNAL_DEPENDENCIES` | 外部依存情報を返します（`PF_OutFlag_I_HAVE_EXTERNAL_DEPENDENCIES` 設定時）。 |
| `PF_Cmd_COMPLETELY_GENERAL` | AEGP からの汎用メッセージに応答します。 |
| `PF_Cmd_QUERY_DYNAMIC_FLAGS` | 実行時条件に応じて動的フラグ（`WIDE_TIME_INPUT` など）を返します。キャッシュ最適化のため高速応答が重要です。 |
| `PF_Cmd_GPU_DEVICE_SETUP` | GPU デバイスごとの初期化を行います。対応可否に応じて `PF_OutFlag2_SUPPORTS_GPU_RENDER_Fxx` を設定します。 |
| `PF_Cmd_GPU_DEVICE_SETDOWN` | `gpu_data` に紐づく GPU リソースを解放します。 |
| `PF_Cmd_GPU_SMART_RENDER_GPU` | `PF_Cmd_SMART_RENDER` の GPU 版です。GPU フレーム入出力で SmartFX を実行します。 |

---

## `PF_Cmd_USER_CHANGED_PARAM` と `PF_Cmd_UPDATE_PARAMS_UI` の違い

- `PF_Cmd_USER_CHANGED_PARAM`  
ユーザーが実際に値を変更したときに送信されます。値の補正や他パラメータへの反映など、ロジック変更はこちらで行います。
- `PF_Cmd_UPDATE_PARAMS_UI`  
表示状態の更新要求です。タイムライン移動や ECP 表示などでも送信されます。ここでは見た目の更新のみを行います。
