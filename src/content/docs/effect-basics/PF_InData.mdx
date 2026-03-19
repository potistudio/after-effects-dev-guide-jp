---
title: 'PF_InData'
---
After Effects は `PF_InData` を通じて、システム状態、プロジェクト情報、レイヤー情報、オーディオ情報をエフェクトへ渡します。  
この構造体はコマンドセレクターごとに更新されます。

フィールドによって有効なセレクターが異なるため、必要なタイミングでのみ参照してください。

---

## PF_InData メンバー

| フィールド | 説明 |
| --- | --- |
| `inter` | ユーザー操作、パラメータ追加、進捗表示、中断確認、現在時刻以外の値取得などに使うコールバック群です。詳細は [Interaction Callback Functions](../effect-details/interaction-callback-functions) を参照してください。 |
| `utils` | グラフィック処理や数値計算のユーティリティコールバックです。常に有効です。 |
| `effect_ref` | 多くのコールバック呼び出し時に渡す識別子です。After Effects はこれでプラグインを識別します。 |
| `quality` | 現在の画質設定です（`PF_Quality_HI` / `PF_Quality_LO`）。通常、`LO` は高速、`HI` は高精度向けです。 |
| `version` | エフェクト仕様バージョンです。`PF_Cmd_GLOBAL_SETUP` で必要なバージョンを示します。 |
| `serial_num` | 呼び出し元アプリケーションのシリアル番号です。 |
| `appl_id` | 呼び出し元アプリの識別子です。After Effects は `FXTC`、[Premiere Pro など](../ppro/ppro) は `PrMr` です。ホスト判定やライセンス制御に使えます。 |
| `num_params` | 入力パラメータ数です。 |
| `what_cpu` | macOS では CPU 種別（Gestalt 値）が入ります。Windows では未定義です。 |
| `what_fpu` | macOS では FPU 種別（Gestalt 値）が入ります。Windows では未定義です。 |
| `current_time` | 現在レンダリング中フレームの時刻です。レイヤー時間基準であり、コンポ時間ではありません。`time_step` で割るとフレーム番号、`time_scale` で割ると秒に変換できます。タイムリマップやストレッチ時はフレーム境界外（非整数時刻）や負の時刻が渡されることがあります。 |
| `time_step` | 現在レンダリング中の「ソースフレームの長さ」です。`local_time_step` と異なりフレームごとに変化する場合があります。ネストやタイムリマップ時には負値や可変値になり得ます。`PF_CHECKOUT_PARAM` など別時刻計算にはこちらを使ってください。0 の場合があるため除算前に必ず確認します。 |
| `total_time` | レイヤー全体の長さです。`time_scale` で割ると秒へ変換できます。タイムストレッチやタイムリマップ設定の影響を受けます。 |
| `local_time_step` | レイヤー上でのフレーム間隔です。レイヤーストレッチを反映し、通常はフレーム間で一定です。逆再生時は負値になり得ます。 |
| `time_scale` | `current_time` / `time_step` / `local_time_step` / `total_time` の時間単位（1 秒あたりの単位数）です。 |
| `field` | `PF_OutFlag_PIX_INDEPENDENT` を設定した場合に有効です。上フィールド / 下フィールド処理の判断に使います。 |
| `shutter_angle` | モーションブラーのシャッター角情報です。`PF_OutFlag_I_USE_SHUTTER_ANGLE` を設定した場合に有効です。詳細は [Motion Blur](../effect-details/motion-blur) を参照してください。 |
| `width` | ソースレイヤー幅です。入力画像パラメータのサイズと一致しない場合があります（上流でバッファ拡張された場合など）。ダウンサンプルの影響は受けません。 |
| `height` | ソースレイヤー高さです（`width` と同様）。 |
| `extent_hint` | 入力と出力の可視領域の交差矩形です。ここに限定して処理すると大きく高速化できます。 |
| `output_origin_x` | 入力バッファ基準での出力バッファ原点 X です。原点を移動した場合のみ非 0 になります。 |
| `output_origin_y` | 入力バッファ基準での出力バッファ原点 Y です。 |
| `downsample_x` | ダウンサンプリング率（X）です。スライダー値など「ピクセル距離を表す値」を解釈する際に使用します。`PF_Cmd_SEQUENCE_SETUP` / `PF_Cmd_SEQUENCE_RESETUP` / `PF_Cmd_FRAME_SETUP` / `PF_Cmd_RENDER` で有効です。 |
| `downsample_y` | ダウンサンプリング率（Y）です。 |
| `pixel_aspect_ratio` | ピクセルアスペクト比（幅 / 高さ）です。 |
| `in_flags` | 未使用です。 |
| `global_data` | プラグインが保持するグローバルデータです。呼び出し前後で After Effects がロック / アンロックを管理します。 |
| `sequence_data` | プラグインが保持するシーケンスデータです。 |
| `frame_data` | プラグインが保持するフレームデータです。 |
| `start_sampL` | オーディオレイヤー先頭基準の開始サンプル番号です。 |
| `dur_sampL` | オーディオ長（サンプル数）です。 |
| `total_sampL` | オーディオレイヤー全体のサンプル数です（`total_time` のサンプル版）。 |
| `src_snd` | 入力オーディオを表す `PF_SoundWorld` です。 |
| `pica_basicP` | 他スイート取得に使う PICA Basic スイートへのポインタです。 |
| `pre_effect_source_origin_x` | 上流エフェクトによるリサイズ / 原点移動を反映した、入力バッファ中のソース原点 X です。フレーム系セレクターで有効です。 |
| `pre_effect_source_origin_y` | 上流エフェクトによるリサイズ / 原点移動を反映した、入力バッファ中のソース原点 Y です。 |
| `shutter_phase` | フレーム時刻に対するシャッター開時刻のオフセットです（フレーム長に対する割合）。 |

---

## `extent_hint` の使い方

:::not
e
[SmartFX](../smartfx/smartfx) では `extent_hint` の扱いがより厳密です。SmartFX 実装時は SmartFX の仕様を優先してください。
:::

`extent_hint` を使うと「実際に必要な画素範囲」だけを処理でき、実装コストが低いわりに効果の大きい最適化になります。

`PF_Cmd_GLOBAL_SETUP`（および PiPL）で [PF_OutFlag_USE_OUTPUT_EXTENT](pf_outdata#pf_outflags) を設定すると、After Effects に `in_data->extent_hint` を利用することを伝えられます。

実装確認時は、一度キャッシュを無効化して挙動を確認してください。キャッシュ有効のままだと、不正な出力がキャッシュで隠れて気付きにくくなります。

- レイヤーの移動・トリミングを行い、`extent_hint` の変化を確認する
- マスクを追加・移動し、交差矩形が適切に更新されるか確認する
- バッファ拡張を行う場合は、`output_origin_x/y` を考慮して出力座標系へ補正する
- ダウンサンプリング時でもフル解像度で破綻しないサイズ計算にする

バッファ拡張型エフェクトでは、`PF_Cmd_FRAME_SETUP` 中に `output->extent_hint` と実際の変換境界の交差で出力サイズを決めると安全です。

---

## AE 6.0 以降の 20% マージン

AE 6.0 以降、`extent_hint` は予測レンダリングを助けるため、レイヤー境界より最大 20% 大きく渡される場合があります。

これは「少しだけ外側も参照する」タイプのエフェクトでキャッシュ効率を上げるための仕様です。

---

## ポイントパラメータとバッファ拡張

出力バッファを拡張するエフェクトは、`PF_Cmd_FRAME_SETUP` で `output_origin_x/y` を設定して元レイヤーとの対応位置を示します。  
このシフトは後段エフェクトへ `pre_effect_source_origin_x/y` として引き継がれ、ポイントパラメータにも反映されます。

上流に Gaussian Blur や Resizer のような拡張系エフェクトがある状態で位置ずれが起きる場合、`pre_effect_source_origin_x/y` の扱い漏れを疑ってください。

また、拡張量が時間変化する場合は、原点シフトにより「見かけ上固定のポイント」が動くことがあります。フレーム間でポイント値をキャッシュする設計では、この影響を考慮してください。
