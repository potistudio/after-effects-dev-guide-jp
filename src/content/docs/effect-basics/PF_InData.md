---
title: 'PF_InData'
---
After Effects は、`PF_InData` を使用してシステム、プロジェクト、レイヤー、オーディオ情報を通信します。この構造は、各コマンドセレクターがプラグインに送信される前に更新されます。

特定の [PF_Cmds](command-selectors) 中にのみ有効なフィールドが記載されています。

また、心配しないでください。 `PF_InData` は気が遠くなるほど大きいですが、各メンバーの目的を覚える必要はありません。場合によっては、いくつかのフィールドを使用することになります。

---

## PF_InData メンバー

| Name | Description |
| --- | --- |
| `inter` | Callbacks used for user interaction, adding parameters, checking whether the user has interrupted the effect, displaying a progress bar, and obtaining source frames and parameter values at times other than the current time being rendered.<br /><br />This very useful function suite is described in [Interaction Callback Functions](../effect-details/interaction-callback-functions). |
| `utils` | Graphical and mathematical callbacks. This pointer is defined at all times. |
| `effect_ref` | Opaque data that must be passed to most of the various callback routines.<br /><br />After Effects uses this to identify your plug-in. |
| `quality` | The current quality setting, either `PF_Quality_HI` or `PF_Quality_LO`.<br /><br />Effects should perform faster in LO, and more accurately in HI.<br /><br />The graphics utility callbacks perform differently between LO and HI quality; so should your effect!<br /><br />This field is defined during all frame and sequence selectors. |
| `version` | Effects specification version, Indicate the version you need to run successfully during `PF_Cmd_GLOBAL_SETUP`. |
| `serial_num` | The serial number of the invoking application. |
| `appl_id` | The identifier of the invoking application.<br /><br />If your plug-in is running in After Effects, `appl_id` contains the application creator code 'FXTC'.<br /><br />If it is running in [Premiere Pro & Other Hosts](../ppro/ppro) it will be 'PrMr'.<br /><br />Use this to test whether your plug-in, licensed for use with one application, is being used with another. |
| `num_params` | Input parameter count. |
| `what_cpu` | Under macOS this contains the Gestalt value for CPU type (see Inside Macintosh, volume 6). Undefined on Windows. |
| `what_fpu` | Under macOS this contains the Gestalt value for FPU type. Undefined on Windows. |
| `current_time` | The time of the current frame being rendered, valid during [PF_Cmd_RENDER](command-selectors#frame-selectors).<br /><br />This is the current time in the layer, not in any composition.<br /><br />If a layer starts at other than time 0 or is time-stretched, layer time and composition time are distinct.<br /><br />The current frame number is `current_time` divided by `time_step`.<br /><br />The current time in seconds is `current_time` divided by time_scale.<br /><br />To handle time stretching, composition frame rate changes, and time remapping, After Effects may ask effects to render at non-integral times (between two frames).<br /><br />Be prepared for this; don't assume that you'll only be asked for frames on frame boundaries.<br /><br />!!! note<br />As of CS3 (8.0), effects may be asked to render at negative current times. Deal! |
| `time_step` | The duration of the current source frame being rendered.<br /><br />In several situations with nested compositions, this source frame duration may be different than the time span between frames in the layer (`local_time_step`).<br /><br />This value can be converted to seconds by dividing by time_scale.<br /><br />When calculating other source frame times, such as for [PF_CHECKOUT_PARAM](../effect-details/interaction-callback-functions#interaction-callbacks), use this value rather than `local_time_step`.<br /><br />Can be negative if the layer is time-reversed. Can vary from one frame to the next if time remapping is applied on a nested composition.<br /><br />Can differ from local_time_step when source material is stretched or remapped in a nested composition.<br /><br />For example, this could occur when an inner composition is nested within an outer composition with a different frame rate, or time remapping is applied to the outer composition.<br /><br />This value will be 0 during [PF_Cmd_SEQUENCE_SETUP](command-selectors#sequence-selectors) if it is not constant for all frames.<br /><br />It will be set correctly during `PF_Cmd_FRAME_SETUP` and `PF_Cmd_FRAME_SETDOWN` selectors.<br /><br />!!! warning<br />This can be zero, so check it before you divide. |
| `total_time` | Duration of the layer.<br /><br />If the layer is time-stretched longer than 100%, the value will be adjusted accordingly; but if the layer is time-stretched shorter, the value will not be affected.<br /><br />If time remapping is enabled, this value will be the duration of the composition.<br /><br />This value can be converted to seconds by dividing by `time_scale`. |
| `local_time_step` | Time difference between frames in the layer.<br /><br />Affected by any time stretch applied to a layer.<br /><br />Can be negative if the layer is time-reversed.<br /><br />Unlike `time_step`, this value is constant from one frame to the next.<br /><br />This value can be converted to seconds by dividing by `time_scale`.<br /><br />For a step value that is constant over the entire frame range of the layer, use `local_time_step`, which is based on the composition's framerate and layer stretch. |
| `time_scale` | The units per second that `current_time`, `time_step`, `local_time_step` and `total_time` are in.<br /><br />If `time_scale` is 30, then the units of `current_time`, `time_step`, `local_time_step` and `total_time` are in 30ths of a second.<br /><br />The `time_step` might then be 3, indicating that the sequence is actually being rendered at 10 frames per second. `total_time` might be 105, indicating that the sequence is 3.5 seconds long. |
| `field` | Valid only if [PF_OutFlag_PIX_INDEPENDENT](PF_OutData#pf_outflags) was set during [PF_Cmd_GLOBAL_SETUP](command-selectors#global-selectors).<br /><br />Check this field to see if you can process just the upper or lower field. |
| `shutter_angle` | Motion blur shutter angle. Values range from 0 to 1, which represents 360 degrees.<br /><br />Will be zero unless motion blur is enabled and checked for the target layer.<br /><br />`shutter_angle == 180` means the time interval between `current_time` and `current_time + 1/2 time_step`.<br /><br />Valid only if [PF_OutFlag_I_USE_SHUTTER_ANGLE](PF_OutData#pf_outflags) was set during [PF_Cmd_GLOBAL_SETUP](command-selectors#global-selectors).<br /><br />See the section on [Motion Blur](../effect-details/motion-blur) for details on how to implement motion blur in your effect. |
| `width` | Dimensions of the source layer, which are not necessarily the same as the width and height fields in the input image parameter.<br /><br />Buffer resizing effects can cause this difference. Not affected by downsampling. |
| `height` |   |
| `extent_hint` | The intersection of the visible portions of the input and output layers; encloses the composition rectangle transformed into layer coordinates.<br /><br />Iterating over only this rectangle of pixels can speed your effect dramatically. See [extent_hint Usage](#extent_hint-usage) later in this chapter regarding proper usage. |
| `output_origin_x` | The origin of the output buffer in the input buffer. Non-zero only when the effect changes the origin. |
| `output_origin_y` |   |
| `downsample_x` | Point control parameters and layer parameter dimensions are automatically adjusted to compensate for a user telling After Effects to render only every nth pixel.<br /><br />Effects need the downsampling factors to interpret scalar parameters representing pixel distances in the image (like sliders).<br /><br />For example, a blur of 4 pixels should be interpreted as a blur of 2 pixels if the downsample factor is 1/2 in each direction (downsample factors are represented as ratios.)<br /><br />Valid only during:<br /><br />- [PF_Cmd_SEQUENCE_SETUP](command-selectors#sequence-selectors)<br />- [PF_Cmd_SEQUENCE_RESETUP](command-selectors#sequence-selectors)<br />- [PF_Cmd_FRAME_SETUP](command-selectors#frame-selectors)<br />- [PF_Cmd_RENDER](command-selectors#frame-selectors) |
| `downsample_y` |   |
| `pixel_aspect_ratio` | Pixel aspect ratio (width over height). |
| `in_flags` | Unused. |
| `global_data` | Data stored by your plug-in during other selectors. Locked and unlocked by After Effects before and after calling the plug-in. |
| `sequence_data` |   |
| `frame_data` |   |
| `start_sampL` | Starting sample number, relative to the start of the audio layer. |
| `dur_sampL` | Duration of audio, expressed as the number of samples. Audio-specific. |
| `total_sampL` | Samples in the audio layer; equivalent to total_time expressed in samples. |
| `src_snd` | `PF_SoundWorld` describing the input sound. Audio-specific. |
| `pica_basicP` | Pointer to the PICA Basic suite, used to acquire other suites. |
| `pre_effect_source_origin_x` | Origin of the source image in the input buffer. Valid only when sent with a frame selector.<br /><br />Non-zero only if one or more effects that preceded this effect on the same layer resized the output buffer and moved the origin.<br /><br />Check for both the resize and the new origin to determine output area.<br /><br />This is useful for effects which have implicit spatial operations (other than point controls), like flipping a file around an image's center.<br /><br />!!! note<br />Checked-out point parameters are adjusted for the pre-effect origin at the current time, not the time being checked out. |
| `pre_effect_source_origin_y` |   |
| `shutter_phase` | Offset from frame time to shutter open time as a percentage of a frame duration. |

---

## エクステントヒントの使用法

:::note
[SmartFX](../smartfx/smartfx) の場合、ヒントの四角形ははるかに効果的で複雑です。

:::
`extent_hint` を使用して、出力が必要なピクセルのみを処理します。これは最も簡単な最適化の 1 つです。

[PF_Cmd_GLOBAL_SETUP](command-selectors#global-selectors) (および PiPL) 中に [PF_OutData](PF_OutData#pf_outdata) に [PF_OutFlag_USE_OUTPUT_EXTENT](PF_OutData#pf_outflags) を設定することで、`in_data>extent_hint` を使用することを After Effects に伝えます。

`extent_hint` コードをテストする前に環境設定メニューからキャッシュを無効にして、コンポジション内の何かが変更されるたびに After Effects がエフェクトをレンダリングできるようにします。

そうしないと、キャッシュ メカニズムによってプラグインの (おそらく正しくない) 出力が不明瞭になってしまいます。

コンポジション内でレイヤーを移動してトリミングします。 `output>extent_hint` は、コンポジション内で表示されるレイヤーの部分です。

マスクをレイヤーに追加し、移動させます。

これにより、画像のゼロ以外のアルファ領域をすべて囲む `extent_hint` が変更されます。

`in_data>extent_hint` は、これら 2 つの長方形 (コンポジションとマスク) の交差部分であり、交差するたびに変化します。

[PF_OutFlag_PIX_INDEPENDENT](PF_OutData#pf_outflags) を設定するエフェクトの入力範囲と出力範囲の間の四角形の交差を簡略化するために、サイズ変更と原点シフトの前に、元の入力レイヤーの座標空間で範囲四角形が計算されます。

出力バッファの座標系で出力範囲を取得するには、`PF_InData->output_origin_x` フィールドと `y` フィールドによって `extent_hint` をオフセットします。

出力サイズを計算するときにダウンサンプリングを考慮します。ユーザーは最大解像度でレンダリングできる必要があります。

出力バッファーが 30,000 x 30,000 を超える場合は、出力バッファーをそのサイズに固定し、警告ダイアログを表示することを検討してください。

コードが正しく動作したら、キャッシュを有効にして、エフェクトを再レンダリングする必要がある頻度を確認します。

ドロップ シャドウを考えてみましょう。ユーザーは静止画像に静的なドロップ シャドウを頻繁に適用します。

`output>extent_hint` は無視されるため、キャッシュがより頻繁に使用されます。

バッファ拡張エフェクトの場合は、`output>extent_hint` をプラグインの変換された境界と交差させ、[PF_Cmd_FRAME_SETUP](command-selectors#frame-selectors) 中にそれに応じてサイズを設定します。

---

## ピクセルが 20% 増加しました!6.0 の時点では、渡されるエクステント ヒントは、予測レンダリングの決定に役立つように、レイヤー自体より 20% 大きくなっています。

多くのエフェクトは「タッチするだけ」でバッファを拡張し、After Effects は後でヒント四角形を使用することがよくあります。

---

## ポイント コントロールとバッファ拡張

出力バッファを拡張するエフェクトは、[PF_Cmd_FRAME_SETUP](command-selectors#frame-selectors) 中に `PF_InData` に `output_origin_x/y` を設定することで、元のレイヤーの左上隅に位置します。

このシフトは、`pre_effect_source_origin_x/y` の後続の効果に報告されます。ポイント パラメータは、このシフトに合わせて自動的に調整されます。

Gaussian Blur や Resizer SDK サンプルなどのバッファー エクスパンダをエフェクトの「前」に適用し、大きなサイズ変更値を使用します。

エフェクトが `pre_effect_source_origin_x/y` を正しく処理していない場合、ブラーのオンとオフを切り替えると出力の位置が移動します。

すべてのポイント パラメータ値は (常に) `pre_effect_source_origin_x/y` で記述されたシフト値を持ちます。ほとんどのエフェクトでは、これは透過的に機能します。

ただし、バッファ拡張が時間の経過とともに変化する場合 (アニメーション化されたブラー量と同様)、原点のシフトによりアニメーション化されていないポイントが移動します。

フレーム間のポイント パラメータ値をキャッシュするエフェクトを設計するときは、これを考慮してください。
