---
title: '連携コールバック関数'
---
マクロ化されていない関数ポインターは [PF_InData](../effect-basics/PF_InData#pf_indata) で提供されますが、それらにアクセスするには提供されたマクロを使用します。マクロの使用を非推奨にすることについて、私たちがどれほど厳格であるかがわかりますか?これは私たちのちょっとした秘密にしましょう。

---

## インタラクションコールバック

| Function | Purpose |
| --- | --- |
| `PF_ADD_PARAM` | Enumerate your plug-in's parameters to After Effects during [PF_Cmd_PARAM_SETUP](../effect-basics/command-selectors#global-selectors), using multiple calls to this function.<br /><br />!!! note<br /><br />Failing to completely clear out a PF_ParamDef prior to PF_ADD_PARAM() can cause many problems.<br />Always use `AEFX_CLR_STRUCT` before adding parameters.<br /><br /><pre lang="cpp">PF_Err PF_ADD_PARAM (<br/>  PF_InData       \*in_data,<br/>  PF_ParamIndex   index,<br/>  PF_ParamDefPtr  def);</pre><br /><br />We provide convenience macros for specific parameter types, in Utils/ Param_Utils.h:<br /><br />- `PF_ADD_COLOR`<br />- `PF_ADD_ARBITRARY`<br />- `PF_ADD_SLIDER`<br />- `PF_ADD_FIXED`<br />- `PF_ADD_FLOAT_SLIDERX`<br />- `PF_ADD_CHECKBOXX`<br />- `PF_ADD_BUTTON`<br />- `PF_ADD_ANGLE`<br />- `PF_ADD_NULL`<br />- `PF_ADD_LAYER`<br />- `PF_ADD_255_SLIDER`<br />- `PF_ADD_PERCENT`<br />- `PF_ADD_POINT`<br />- `PF_ADD_POINT_3D`<br />- `PF_ADD_TOPICX`<br />- `PF_END_TOPIC`<br />- `PF_ADD_POPUPX`<br />- `PF_ADD_FLOAT_SLIDERX_DISABLED` |
| `PF_ABORT` | Returns non-zero if the user has cancelled; return that value to After Effects.<br /><br />Wrap your render routine in a "while abort has not been requested" while loop.<br /><br /><pre lang="cpp">PF_Err PF_ABORT (PF_InData \*in_data);</pre> |
| `PF_PROGRESS` | Displays a progress bar during processing; current and total describe the percentage complete.<br /><br />Returns non-zero if you should suspend or abort your current processing; return that value to After Effects.<br /><br />Call once per scanline, unless your effect is very slow.<br /><br />If total is `0`, `PF_ABORT` is used instead (presenting the user with different choices).<br /><br /><pre lang="cpp">PF_Err PF_PROGRESS (<br/>  PF_InData  \*in_data,<br/>  A_long     current,<br/>  A_long     total );</pre> |
| `PF_CHECKOUT_PARAM` | Obtains parameter values, or the source video layer, at a specified time. After Effects makes caching decisions based on the checkout state of parameters.<br /><br />Allocate a new [PF_ParamDef](../effect-basics/PF_ParamDef#pf_paramdef) to hold the result; those passed to the plug-in are read-only.<br /><br />If you check out a layer parameter that's set to `<none>`, the layer returned will be filled with zeros.<br /><br />Masks are not included with checked-out layers.<br /><br />Do not check out layer parameters during UI event handling.<br /><br /><pre lang="cpp">PF_Err PF_CHECKOUT_PARAM (<br/>  PF_InData      \*in_data,<br/>  PF_ParamIndex  index,<br/>  A_long         what_time,<br/>  A_long         step,<br/>  A_long         time_scale,<br/>  PF_ParamDef    \*param);</pre><br /><br />If checking out the source layer, a deinterlaced frame will be returned. If you ask for the time that references the upper field, you will receive back the upper field with a filter used to generate the extra scanlines.<br /><br />For example, assuming line 0 and 2 are upper fields, and line 1 is a lower field, if you check out the upper fields, line 0 and 2 will be passed back directly from the source footage, and line 1 will be calculated by averaging lines 0 and 2.<br /><br />If you want to reassemble a full resolution source frame with both fields present, you can call `PF_CHECKOUT_PARAM` twice to get both fields, and reinterlace the footage.<br /><br />What happens when checking out a layer at a time that is not frame-aligned? All items have essentially infinite time resolution, so when asking for a time at any value, AE renders the item at that time.<br /><br />For a composition, that involves interpolating all of the keyframes values to the subframe time.<br /><br />For footage, AE returns a full image that corresponds to the time asked, which is the nearest-to-left frame.<br /><br />If the user has frame-blending on that layer, an interpolated frame is generated. |
| `PF_CHECKIN_PARAM` | Balance every `PF_CHECKOUT_PARAM`, with a `PF_CHECKIN_PARAM`.<br /><br />Not doing so causes dismal performance and leaks memory. Once checked in, the fields in the [PF_ParamDef](../effect-basics/PF_ParamDef#pf_paramdef) will no longer be valid.<br /><br /><pre lang="cpp">PF_Err PF_CHECKIN_PARAM (<br/>  PF_InData    \*in_data,<br/>  PF_ParamDef  \*param );</pre> |
| `PF_REGISTER_UI` | Register a custom user interface element. See [Effect UI & Events](../effect-ui-events/effect-ui-events). Note: The PF_UIAlignment flags are not honored.<br /><br /><pre lang="cpp">PF_Err PF_REGISTER_UI (<br/>  PF_InData        \*in_data,<br/>  PF_CustomUIInfo  \*cust_info );</pre> |
| `PF_CHECKOUT_LAYER_AUDIO` | Given an index, start_time, duration, time_scale, rate, bytes_per_sample, num_channels, and fmt_signed, After Effects will return a corresponding PF_LayerAudio.<br /><br />After Effects will perform any necessary resampling.<br /><br /><pre lang="cpp">PF_Err PF_CHECKOUT_LAYER_AUDIO (<br/>  PF_InData      \*in_data,<br/>  PF_ParamIndex  index,<br/>  A_long         start_time,<br/>  A_long         duration,<br/>  A_u_long       time_scale,<br/>  PF_UFixed      rate,<br/>  A_long         bytes_per_sample,<br/>  A_long         num_channels,<br/>  A_long         fmt_signed,<br/>  PF_LayerAudio  \*audio);</pre> |
| `PF_CHECKIN_LAYER_AUDIO` | Balance all calls to PF_CHECKOUT_LAYER_AUDIO, regardless of error conditions, with matching calls to `PF_CHECKIN_LAYER_AUDIO`.<br /><br /><pre lang="cpp">PF_Err PF_CHECKIN_LAYER_AUDIO (<br/>  PF_InData      \*in_data,<br/>  PF_LayerAudio  audio );</pre> |
| `PF_GET_AUDIO_DATA` | Returns information about the PF_LayerAudio.<br /><br />All the parameters after audio are optional; pass 0 for any value in which you aren't interested. rate0 is unsigned, and fmt_signed0 should be non-zero for signed, zero for unsigned.<br /><br />This callback is for visual effects that read audio information. To *alter* audio, write an audio filter.<br /><br /><pre lang="cpp">PF_Err PF_GET_AUDIO_DATA (<br/>  PF_InData        \*in_data,<br/>  PF_LayerAudio    audio,<br/>  PF_SndSamplePtr  \*data0,<br/>  A_long           \*num_samples0,<br/>  PF_UFixed        \*rate0,<br/>  A_long           \*bytes_per_sample0,<br/>  A_long           \*num_channels0,<br/>  A_long           \*fmt_signed0);</pre> |

---

## パラメータのチェックアウトとパラメータ ゼロ

エフェクトは、エフェクト コントロール (およびコンポジション) パネル内で 0 から n までの順序で画像に適用されます。

effect[n-1] からの出力は、effect[n] の入力 ([param[0]](../effect-basics/PF_ParamDef#param-zero)) です。

一方、通常のエフェクトが `PF_CHECKOUT_PARAM` を使用してレイヤーをチェックアウトすると、順序に関係なく、生の (エフェクトがかかっていない) ソース レイヤを受け取ります。

ただし、[SmartFX](../smartfx/smartfx) エフェクトがその入力パラメータ (params[0]) をチェックアウトすると、以前のエフェクトが * 適用されます。

---

## パラメータのチェックアウト動作

レイヤーのインポイントとアウトポイントがトリミングされているかどうかに関係なく、ソースフッテージの開始から終了まで有効なフレームが取得され、その前後が透明になります。

チェックアウトされているコンポジションよりも低いフレーム レートを持つレイヤー パラメータは、低いフレーム レートで必要な頻度でのみ更新されます。

30fps コンポジションでチェックアウトされた 10fps レイヤーは、3 フレームごとに更新するだけで済みます。静的な入力レイヤーにもかかわらず、エフェクトの出力をフレームごとに変更したい場合は、[PF_Outflag_NON_PARAM_VARY](../effect-basics/PF_OutData#pf_outflags) を設定する必要があります。

エフェクトが継続的にラスタライズされた Adob​​e Illustrator レイヤーをチェックアウトすると、After Effects は、ジオメトリが適用された Illustrator レイヤーをコンポジション サイズのバッファーにレンダリングします。

---

## パラメータのチェックアウトと再入

異なる時点でレイヤーをチェックアウトするプラグインは、リエントラント動作を生成する可能性があります。 Checkout サンプル プラグインがコンポジション B のレイヤーに適用され、B がコンポジション A にプリコンポーズされ、そこに Checkout も適用されるインスタンスを考えてみましょう。

コンポジション A がレンダリングされると、Checkout[A] に *PF_Cmd_RENDER* が送信され、その間に現在の時間以外の時間からレイヤー (コンポジション B) がチェックアウトされます。

チェックアウトされたレイヤーを提供するために、After Effects は *PF_Cmd_RENDER* を `Checkout[B]` に送信します。

さあ、再帰！

パラメータをチェックアウトする場合、エフェクトは再入可能なレンダー リクエストを適切に処理する必要があります。

グローバルを使用したり、静的変数を読み書きしたりしないでください...でも、とにかくそうするつもりはありませんでしたよね?

---

## 反復中の進行状況

After Effects は、レンダリング中であっても、ユーザーのインタラクションに可能な限り応答するよう努めます。。 PF_ITERATE() を適切に使用して、同じことを行います。たとえば、`PF_Cmd_RENDER` への応答中に PF_ITERATE 関数を 3 回使用しているとします。

この場合、次のように始めることになります。

```cpp
lines_per_iterateL = in_data>extent_hint.top - in_data>extent_hint.bottom;
total_linesL = 3 * lines_per_iterateL;
lines_so_farL = 0;
```
各反復の後、すでに完了した行を現在の位置に追加します。

```cpp
suites.iterate8suite()>iterate( lines_so_farL,
                                total_linesL,
                                input_worldP,
                                &output>extent_hint,
                                refcon,
                                WhizBangPreProcessFun,
                                output_worldP);

lines_so_farL += lines_per_iterateL;

ERR(PF_PROGRESS(lines_so_farL, total_linesL));

suites.iterate8suite()>iterate( lines_so_farL,
                                total_linesL,
                                input_worldP,
                                &output>extent_hint,
                                refcon,
                                WhizBangRenderFunc,
                                output_worldP);

lines_so_far += lines_per_iterateL;

ERR(PF_PROGRESS(lines_so_farL, total_linesL));

suites.iterate8suite()>iterate( lines_so_farL,
                                total_linesL,
                                input_worldP,
                                &output>extent_hint,
                                refcon,
                                WhizBangPostProcessFunc,
                                output_worldP);

ERR(PF_PROGRESS(lines_so_farL, total_linesL));
```
