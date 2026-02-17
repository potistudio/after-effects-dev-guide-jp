---
title: 'PF_OutData'
---
`PF_OutData` は、プラグイン側で設定した結果や機能フラグを After Effects へ返すための構造体です。  
各フィールドには「どのセレクターで設定できるか」という制約があります。

---

## PF_OutData メンバー

| フィールド | 説明 |
| --- | --- |
| `my_version` | `PF_VERSION` マクロでプラグインのバージョンを設定します。重複エフェクトがある場合、After Effects はこの値を使って読み込む対象を判断します。 |
| `name` | 未使用です。 |
| `global_data` | 毎回の呼び出しで [PF_InData](pf_indata) に返されるグローバルデータハンドルです。確保には After Effects のメモリ API を使用してください。 |
| `num_params` | `PF_ADD_PARAM` の呼び出し数（暗黙の入力レイヤーを含む）と照合されます。 |
| `sequence_data` | `PF_Cmd_SEQUENCE_SETUP` で確保するシーケンスデータハンドルです。以降の呼び出しで [PF_InData](pf_indata) に返されます。 |
| `flat_sdata_size` | 未使用です。 |
| `frame_data` | `PF_Cmd_FRAME_SETUP` で確保するフレーム単位データです。ディスク保存はされず、`FRAME_SETUP` から `RENDER` / `FRAME_SETDOWN` への一時受け渡しに使います。 |
| `width`, `height`, `origin` | 入力と出力サイズが異なる場合に `PF_Cmd_FRAME_SETUP` で設定します。`origin` は「入力画像を出力バッファのどこへ対応づけるか」を示します。 |
| [out_flags](#pf_outflags) | After Effects へ能力・状態を通知するフラグ群です（OR で複数指定）。 |
| `return_msg` | ここに設定した C 文字列は After Effects 側で表示されます（各セレクター後に確認・クリアされます）。 |
| `start_sampL`, `dur_sampL`, `dest_snd` | [オーディオ処理](../audio/audio) セレクターで使用します。 |
| [out_flags2](#pf_outflags2) | `out_flags` と同様の追加フラグ群です（OR で複数指定）。 |

---

## PF_OutFlags

`PF_OutFlags` は、エフェクトの機能・依存関係・キャッシュ特性を After Effects に伝えるためのフラグです。  
変更時はソースコードだけでなく [PiPL](../intro/pipl-resources) も合わせて更新してください。  
一部フラグはセッション中に動的変更できます。

| フラグ | 意味 |
| --- | --- |
| `PF_OutFlag_KEEP_RESOURCE_OPEN` | `GLOBAL_SETUP` 以外でもリソースを開いたままにします。通常は必要リソースを `global_data` に読み込んで保持する方法が推奨です。 |
| `PF_OutFlag_WIDE_TIME_INPUT` | `current_time` 以外の時刻でパラメータを参照する場合に設定します。未設定だとキャッシュ無効化が不正確になることがあります。可能なら `PF_OutFlag2_AUTOMATIC_WIDE_TIME_INPUT` も併用してください。 |
| `PF_OutFlag_NON_PARAM_VARY` | パラメータ以外の要因で出力が変化することを示します（例: ランダム性のある処理）。静止画に対するキャッシュ利用が抑制されます。 |
| `PF_OutFlag_RESERVED6` | 未使用です（旧 `PF_OutFlag_SEND_PARAMS_UPDATE`）。 |
| `PF_OutFlag_SEQUENCE_DATA_NEEDS_FLATTENING` | シーケンスデータにポインタやハンドルを含む場合に必要です。保存時にフラット化し、再読み込み時に復元します。 |
| `PF_OutFlag_I_DO_DIALOG` | `PF_Cmd_DO_DIALOG` に応答してダイアログを表示するエフェクトで設定します。 |
| `PF_OutFlag_USE_OUTPUT_EXTENT` | `extent_rect` を尊重して処理することを示します。SmartFX では旧方式です。 |
| `PF_OutFlag_SEND_DO_DIALOG` | エフェクト動作にダイアログ表示が必須であることを示します（主に互換目的）。 |
| `PF_OutFlag_DISPLAY_ERROR_MESSAGE` | `return_msg` をエラーダイアログとして表示します。デバッグや試用版メッセージにも使えます。 |
| `PF_OutFlag_I_EXPAND_BUFFER` | 出力バッファを拡張するエフェクトで設定します。キャッシュ効率が下がるため、本当に必要な場合のみ使用してください。SmartFX では旧方式です。 |
| `PF_OutFlag_PIX_INDEPENDENT` | 画素ごとの独立処理であることを示します。色補正系は通常設定対象です。設定すると最適化効果が大きい場合があります。 |
| `PF_OutFlag_I_WRITE_INPUT_BUFFER` | 入力バッファへ直接書き込むことを示します。割り当てを減らせる一方、パイプラインキャッシュに不利です。 |
| `PF_OutFlag_I_SHRINK_BUFFER` | `extent_rect` に応じてバッファ縮小することを示します。SmartFX では旧方式です。 |
| `PF_OutFlag_WORKS_IN_PLACE` | 未使用です。 |
| `PF_OutFlag_SQUARE_PIX_ONLY` | 未使用です。 |
| `PF_OutFlag_CUSTOM_UI` | カスタム UI を持ち、`PF_Cmd_EVENT` を受け取る必要があることを示します。 |
| `PF_OutFlag_RESERVED5` | 未使用です。 |
| `PF_OutFlag_REFRESH_UI` | エフェクト UI / コンポ / レイヤー表示の再描画を要求します。カスタム UI は [Drawbot](../effect-ui-events/custom-ui-and-drawbot) の細粒度更新も検討してください。 |
| `PF_OutFlag_NOP_RENDER` | `PF_Cmd_FRAME_SETUP` で現在のレンダリングを無効化します。 |
| `PF_OutFlag_I_USE_SHUTTER_ANGLE` | 出力が `shutter_angle` に依存することを示します。 |
| `PF_OutFlag_I_USE_AUDIO` | [PF_CHECKOUT_LAYER_AUDIO](../effect-details/interaction-callback-functions#interaction-callbacks) で取得したオーディオに依存することを示します。 |
| `PF_OutFlag_I_AM_OBSOLETE` | 既存プロジェクト互換のためには使用可能だが、新規適用メニューには表示しないエフェクトを示します。 |
| `PF_OutFlag_FORCE_RERENDER` | 変更により再レンダリングが必要であることを示します。 |
| `PF_OutFlag_PiPL_OVERRIDES_OUTDATA_OUTFLAGS` | `GLOBAL_SETUP` で設定した値より PiPL の outflags を優先させます。 |
| `PF_OutFlag_I_HAVE_EXTERNAL_DEPENDENCIES` | 外部ファイルや外部フォントに依存することを示します。設定時は `PF_Cmd_GET_EXTERNAL_DEPENDENCIES` が送られます。 |
| `PF_OutFlag_DEEP_COLOR_AWARE` | 16 bpc カラーを扱えることを示します。 |
| `PF_OutFlag_SEND_UPDATE_PARAMS_UI` | `PF_Cmd_UPDATE_PARAMS_UI` を受け取りたい場合に設定します。 |
| `PF_OutFlag_AUDIO_FLOAT_ONLY` | オーディオ入力に `PF_SIGNED_FLOAT` 形式を要求します。`AUDIO_EFFECT_TOO` または `AUDIO_EFFECT_ONLY` も設定してください。 |
| `PF_OutFlag_AUDIO_IIR` | オーディオ処理が IIR（過去出力へ依存）であることを示します。遅延線や中間状態はシーケンスデータに保持し、キャッシュ有効性を確認して利用します。 |
| `PF_OutFlag_I_SYNTHESIZE_AUDIO` | 無音入力でもオーディオを生成するエフェクトで設定します。`AUDIO_EFFECT_TOO` または `AUDIO_EFFECT_ONLY` も必要です。 |
| `PF_OutFlag_AUDIO_EFFECT_TOO` | 映像に加えてオーディオも処理するエフェクトで設定します。 |
| `PF_OutFlag_AUDIO_EFFECT_ONLY` | オーディオのみを処理するエフェクトで設定します。 |

---

## PF_OutFlags2

`PF_OutFlags2` は After Effects 5.0 で追加された拡張フラグ群です。  
`PF_OutFlags` と同様に、変更時はソースコードと [PiPL](../intro/pipl-resources) を揃えて更新してください。

| フラグ | 意味 |
| --- | --- |
| `PF_OutFlag2_NONE` | 追加フラグなしです。 |
| `PF_OutFlag2_SUPPORTS_QUERY_DYNAMIC_FLAGS` | `PF_Cmd_QUERY_DYNAMIC_FLAGS` に応答することを示します。PiPL と `GLOBAL_SETUP` の両方で設定が必要です。 |
| `PF_OutFlag2_I_USE_3D_CAMERA` | 3D カメラ情報を参照することを示します。 |
| `PF_OutFlag2_I_USE_3D_LIGHTS` | 3D ライト情報を参照することを示します。 |
| `PF_OutFlag2_PARAM_GROUP_START_COLLAPSED_FLAG` | `PF_ParamFlag_START_COLLAPSED` の指定を有効化します。未設定時はパラメータグループが既定で折りたたまれます。 |
| `PF_OutFlag2_I_AM_THREADSAFE` | 現状、After Effects では実質未使用です。 |
| `PF_OutFlag2_CAN_COMBINE_WITH_DESTINATION` | 旧 Premiere 用で、現在は未使用です。 |
| `PF_OutFlag2_DOESNT_NEED_EMPTY_PIXELS` | 入力の空画素領域をトリムして渡してよいことを示します。入力が完全に空の場合、ヌル入力でも安全に動作できる実装が必要です。SmartFX では旧方式です。 |
| `PF_OutFlag2_REVEALS_ZERO_ALPHA` | アルファ 0 画素の RGB を露出させる可能性があることを示します。既定動作に影響する重要フラグで、必要に応じて `QUERY_DYNAMIC_FLAGS` で動的制御します。 |
| `PF_OutFlag2_PRESERVES_FULLY_OPAQUE_PIXELS` | 完全不透明画素を保持する性質を示します。 |
| `PF_OutFlag2_SUPPORTS_SMART_RENDER` | SmartFX API（`SMART_PRE_RENDER` / `SMART_RENDER`）に対応していることを示します。 |
| `PF_OutFlag2_FLOAT_COLOR_AWARE` | 32 bpc 浮動小数点カラーに対応します。`PF_OutFlag2_SUPPORTS_SMART_RENDER` も必須です。 |
| `PF_OutFlag2_I_USE_COLORSPACE_ENUMERATION` | Premiere Pro で色空間別最適化を行うエフェクト向けです。 |
| `PF_OutFlag2_I_AM_DEPRECATED` | エフェクトを Effects パネルの「Obsolete」フォルダへ移動します。`PF_OutFlag_I_AM_OBSOLETE` と用途が近いフラグです。 |
| `PF_OutFlag2_PPRO_DO_NOT_CLONE_SEQUENCE_DATA_FOR_RENDER` | Premiere Pro 専用フラグです（After Effects では未対応）。 |
| `PF_OutFlag2_AUTOMATIC_WIDE_TIME_INPUT` | `WIDE_TIME_INPUT` の高効率版です。時刻依存のチェックアウト追跡をホスト側で自動化します。SmartFX 対応が前提で、時刻依存キャッシュを使う場合は状態検証（`PF_GetCurrentState()` など）が必要です。 |
| `PF_OutFlag2_I_USE_COMP_TIMECODE` | コンポ開始時刻やドロップフレーム設定変更で再レンダリングが必要なことを示します。 |
| `PF_OutFlag2_DEPENDS_ON_UNREFERENCED_MASKS` | パラメータで直接参照していないマスクにも依存する場合に設定します。 |
| `PF_OutFlag2_OUTPUT_IS_WATERMARKED` | 出力がウォーターマーク付きで最終利用に不適切であることを示します（例: 未ライセンス版）。必要に応じて動的変更可能です。 |
| `PF_OutFlag2_SUPPORTS_GPU_RENDER_F32` | GPU レンダリング対応（F32）を示します。`PF_Cmd_GPU_DEVICE_SETUP` でデバイスごとの能力を返します。 |
| `PF_OutFlag2_SUPPORTS_THREADED_RENDERING` | マルチフレームレンダリングで同時マルチスレッド実行に対応することを示します。スレッドセーフ検証済みプラグインのみ設定してください。詳細は [Multi-Frame Rendering in AE](../effect-details/multi-frame-rendering-in-ae) を参照してください。 |
| `PF_OutFlag2_MUTABLE_RENDER_SEQUENCE_DATA_SLOWER` | レンダースレッドごとに書き込み可能な `sequence_data` 複製が必要な場合に設定します。速度低下要因になるため必要時のみ使用してください。詳細は [Multi-Frame Rendering in AE](../effect-details/multi-frame-rendering-in-ae) を参照してください。 |
