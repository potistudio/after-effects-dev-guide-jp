---
title: 'SmartFX'
---
SmartFX API はエフェクトと After Effects 間の双方向通信を提供し、多くのパフォーマンスの最適化を可能にし、以前は入手できなかった依存関係情報を提供します。このエフェクト API の拡張機能は、After Effects でチャンネルごとに 32 ビットのサポートを実装する方法です。

通常のエフェクトプラグインにはフルサイズの入力バッファが与えられ、フルサイズの出力バッファをレンダリングするように求められます。出力 [extent_hint](../effect-basics/PF_InData#pf_indata-members) は、実際に入力する必要がある出力バッファーの部分を指定しますが、エフェクトがその入力全体を必要としない場合、このスキームは依然として非常に非効率的です。また、多くのエフェクトはエクステント ヒントを使用しません。

---

## かつての様子

ほとんどが画面外にある、または小さな関心領域を通して表示される、または小さなサイズにマスクされる巨大なレイヤーに適用されるぼかし効果を考えてみましょう。出力の小さなセクションのみをレンダリングする必要があり、出力のextent_hintを使用してその旨が示されます。ブラーする入力の小さなセクションだけが必要です。ブラー半径によって拡張された出力の extend_hint です。ただし、従来のエフェクト API を使用すると、After Effects がこれを認識する方法がないため、レイヤー全体がプラグインに渡されます。これらの余分なピクセルは、特に以前のエフェクトやネストされたコンプの場合、計算に非常にコストがかかり、無駄が生じる可能性があります。

---

## 現在の状況

SmartFX は、呼び出しシーケンスを逆にすることでこの問題を解決します。エフェクトには、どのくらいの出力が必要であるかが通知され、ホストに必要な入力を明示的に「要求」する必要があります。レンダリング プロセスは、プリレンダリングとレンダリングの 2 つの部分に分かれています。

プリレンダリング中に、エフェクトは必要な入力ピクセル データを記述します。この必要な入力は、好みに基づいて変更できます (非入力レイヤー パラメーター、非レイヤー パラメーター、in_data からの情報、シーケンス データの設定など)。エフェクトは、結果の出力の範囲も返す必要があります。レイヤーの要求された部分に空のピクセルがある場合、要求されたサイズよりも小さくなる可能性があります。

レンダリング段階では、エフェクトは以前に要求したピクセルのみを取得できます。この 2 パスのアプローチにより、多くの重要な最適化が容易になります。たとえば、ある入力を別の入力に対して乗算またはマットするエフェクトでは、最初の入力がそうでないことが判明する可能性があります。

マスクが交差しない場合はまったく必要ありません。また、画像バッファーのコピーを最小限に抑えるために After Effects によって内部的に実行される重要な最適化もあります。これらの最適化は、ホストがすべての入力と出力のバッファー サイズを認識した後にのみ可能になります。

AEGP と同様に、SmartFX プラグインは After Effects によってアンロードされることはありません。

---

## コンテンツの境界

ノードのコンテンツ境界は、PreRender への呼び出しから返される可能性のある最大の結果四角形です。現在のレンダリング リクエストやその他のものに応じて変更することは絶対にできません。大雑把ではなく、慎重に計算する必要があります。

この計算は非常に重要です。これはノード (およびその入力) の固有のプロパティであり、グラフが構築されると修正されます。これに違反すると、コードのさまざまな部分であらゆる種類の問題が発生する可能性があり、おそらく発生するでしょう。

---

## スマート化する方法

`PF_OutFlag2_SUPPORTS_SMART_RENDER` ([PF_OutFlags](../effect-basics/PF_OutData#pf_outflags) から) を設定したエフェクトは、古い `PF_Cmd_FRAME_SETUP` / `PF_Cmd_RENDER` / `PF_Cmd_FRAME_SETDOWN` シーケンスの代わりに、SmartFX コール `PF_Cmd_SMART_PRE_RENDER` および `PF_Cmd_SMART_RENDER` ([Frame Selectors](../effect-basics/command-selectors#frame-selectors) から) を受け取ります。スマート化されていないホストとの互換性を維持するために、古いコマンドもサポートし続けることが必要な場合があります。

---

## PF_Cmd_SMART_PRE_RENDER

After Effects はエフェクトからの出力を要求します。エフェクトは、コールバック関数を使用し、追加パラメータの構造を操作することによって、出力を生成するためにどのような入力が必要かを After Effects に伝えます。エフェクトは、*PF_Cmd_SMART_PRE_RENDER* 中にチェックアウトされていないレイヤー入力のピクセルにアクセスできません。したがって、エフェクトに必要となる可能性のあるすべてのレイヤー入力は、checkout_layer を使用して事前にチェックアウトする必要があります。エフェクトに特定のレイヤー入力が必要な場合は、後でレンダリング中にレイヤーが不要であるとエフェクトが判断する場合でも、今すぐチェックアウトする必要があります。また、*PF_Cmd_SMART_PRE_RENDER* または `PF_Cmd_SMART_RENDER` 中にパラメーター配列が SmartFX に渡されないため、必要な非レイヤー パラメーターは `PF_CHECKOUT_PARAM` ([Interaction Callbacks](../effect-details/interaction-callback-functions#interaction-callbacks) から) を使用して取得する必要があります。

---

## PF_PreRenderExtra

| Member | Purpose |
| --- | --- |
| `PF_PreRenderInput` | Describes what After Effects needs rendered (in the `PF_RenderRequest`), and the bit depth requested (in the aptly-named bitdepth member).<br /><br /><pre lang="cpp">typedef struct {<br/>  PF_LRect        rect;<br/>  PF_Field        field;<br/>  PF_ChannelMask  channel_mask;<br/>  PF_Boolean      preserve_rgb_of_zero_alpha;<br/>  char            unused[3];<br/>  long            reserved[4];<br/>} PF_RenderRequest;</pre><br /><br />`rect` is in layer coordinates. field is also relative to the layer origin; whether the active field falls on even or odd scanlines of the output buffer depends on the origin of the output buffer.<br /><br />`channel_mask` specifies for which channels the effect should provide output.<br /><br />Data written to other channels will not be honored.<br /><br />It will be one or more of the following, or'd together:<br /><br />- `PF_ChannelMask_ALPHA`<br />- `PF_ChannelMask_RED`<br />- `PF_ChannelMask_GREEN`<br />- `PF_ChannelMask_BLUE`<br />- `PF_ChannelMask_ARGB`<br /><br />If `preserve_rgb_of_zero_alpha` pixels is `TRUE`, the effect must propagate the color content of transparent pixels through to the output.<br /><br />This is related to, but distinct from, [PF_OutFlag2_REVEALS_ZERO_ALPHA](../effect-basics/PF_OutData#pf_outflags), which tells After Effects that the effect may set alpha to non-zero values for such pixels, restoring them to visibility. |
| `PF_PreRenderOutput` | Filled in by the effect to tell After Effects what output it plans to generate, based on the input.<br /><br /><pre lang="cpp">typedef struct {<br/>  PF_LRect                    result_rect;<br/>  PF_LRect                    max_result_rect;<br/>  PF_Boolean                  solid;<br/>  PF_Boolean                  reserved;<br/>  PF_RenderOutputFlags        flags;<br/>  void*                       pre_render_data;<br/>  PF_DeletePreRenderDataFunc  func;<br/>} PF_PreRenderOutput;</pre><br /><br />`pre_render_data` will be passed back to the effect during [PF_Cmd_SMART_RENDER](../effect-basics/command-selectors#frame-selectors).<br /><br />Currently, the only `PF_RenderOutputFlags` is `PF_RenderOutputFlag_RETURNS_EXTRA_PIXELS`. |
| `PF_PreRenderCallbacks` | Currently, there is only one callback - `checkout_layer`. checkout_idL is chosen by the effect.<br /><br />It must be positive and unique. After Effects populates the `PF_CheckoutResult`.<br /><br /><pre lang="cpp">PF_Err checkout_layer(<br/>  PF_ProgPtr              effect_ref,<br/>  PF_ParamIndex           index,<br/>  A_long                  checkout_idL,<br/>  const PF_RenderRequest  \*req,<br/>  A_long                  what_time,<br/>  A_long                  time_step,<br/>  A_u_long                time_scale,<br/>PF_CheckoutResult       \*result);<br/><br/>typedef struct {<br/>  PF_LRect          result_rect;<br/>  PF_LRect          max_result_rect;<br/>  PF_RationalScale  par;<br/>  long              solid;<br/>  PF_Boolean        reservedB[3];<br/>  A_long            ref_width;<br/>  A_long            ref_height;<br/>} PF_CheckoutResult;</pre><br /><br />`result_rect` can be empty. `max_result_rect` is the largest the output could possibly be, if the host asked for all of it.<br /><br />If solid is `TRUE`, the entire result_rect has opaque alpha.<br /><br />`ref_width` and `ref_height` are the original dimensions of the layer, before any effects are applied, disregarding any downsample factors.<br /><br />This will be the size of the composition for collapsed layers.<br /><br />There is a bug in 11.0 with the Global Performance Cache, when a SmartFX effect uses both [PF_OutFlag2_AUTOMATIC_WIDE_TIME_INPUT](../effect-basics/PF_OutData#pf_outflags) & [PF_OutFlag_NON_PARAM_VARY](../effect-basics/PF_OutData#pf_outflags).<br /><br />Calling checkout_layer during `PF_Cmd_SMART_PRE_RENDER` returns empty rects in `PF_CheckoutResult`.<br /><br />The workaround is to simply make the call again. This workaround is no longer needed in 11.0.1. |
| `result_rect` | The output (in layer coordinates) resulting from the render request (can be empty).<br /><br />This cannot be bigger than the input request rectangle (unless `PF_RenderOutputFlag_RETURNS_EXTRA_PIXELS` is set), but can be smaller. |
| `max_result_rect` | The maximum size the output could possibly be, if After Effects requested all of it.<br /><br />This must not vary depending on requested output size. |
| `solid` | Set this `TRUE` if every pixel in the output will be fully opaque. Set if possible; it enables certain optimizations. |
| `reserved` | Ignore. |
| `flags` | Currently, the only flag is `PF_RenderOutputFlag_RETURNS_EXTRA_PIXELS`, which tells After Effects that the smart effect will return more pixels than After Effects requested. |
| `pre_render_data` | Point this at any data that the effect would like to access during rendering.<br /><br />Effects can also allocate handles and store them in `out_data>frame_data`, as with regular (non-smart) effects.<br /><br />Since [PF_Cmd_SMART_PRE_RENDER](../effect-basics/command-selectors#frame-selectors) can be called with no corresponding [PF_Cmd_SMART_RENDER](../effect-basics/command-selectors#frame-selectors), effects must never delete this data themselves; once the effect returns from [PF_Cmd_SMART_PRE_RENDER](../effect-basics/command-selectors#frame-selectors), After Effects owns this data and will dispose of it (using either the following function or a standard free call). |
| `delete_pre_render_data_func` | Point this to a function that will eventually be called to delete the pre_render_data. |

---

## preserve_rgb_of_zero_alpha

`preserve_rgb_of_zero_alpha` is used both as input to the effect, to tell it what to render, and as output from the effect, to describe the input it needs (as passed to the checkout call). When preserve_rgb_of_zero_alpha is set in an input request, the effect must pass it recursively when making checkouts, otherwise prior effects and masking will eliminate those pixels that the effect would reveal. Use of this is discouraged, though still supported in CS3 (8.0).

---

## Rectangles

Effects must set both result rectangles accurately. After Effects' caching system relies upon them, incorrect values can cause many problems. If the plug-in returns a `result_rect` smaller than the request_rect, that tells After Effects the pixels inside the request_rect but outside the `result_rect` are empty.

Similarly, `max_result_rect` must encompass all non-zero pixels; the effect will never be asked to render anything outside this region. If there are pixels outside this rectangle, they will never be displayed.

Mis-sized output rectangles can cause problems as well. If these rectangles are too big, a loss of performance results.

Not only will many empty pixels be cached (robbing the application of valuable memory), the effect may be unnecessarily asked to render large regions of nothing. For this reason, the `max_result_rect` must be computed correctly, rather than set to some arbitrarily large size.

Both `result_rect` and `max_result_rect` may vary depending on the effect's parameters, the current time, et cetera; they are valid only for the given invocation of the effect. However, `max_result_rect` *cannot* depend on the specific render request. It must be the same no matter what portion of the output is requested by After Effects.

It is legal to return an empty `result_rect` if the request_rect doesn't intersect the effect's output pixels; no rendering need be done.

After Effects may also call the effect with an empty request_rect, meaning the effect is only being asked to compute the `max_result_rect`.

`preserve_rgb_of_zero_alpha` can influence the bounds computation process (both result_rect and `max_result_rect`) and must be respected if the effect behaves differently depending on this setting.

---

## The "Size" Of A Layer

As with non-smart effects, each smart effect can arbitrarily shrink or expand its requested input. They cannot depend on a fixed frame size, and the size of the input may change over time.

For example, the user could apply an animated drop shadow to a layer, which would add pixels to different edges of the layer at different times, depending on the direction in which the shadow is cast.

Some effects (for example, those which need to align one layer against another) need some notion of "size." This could be defined two ways, each with advantages and disadvantages.

The size of the original layer, before any effects and downsampling are applied, is given `in_data>width/height`. As this value is unaffected by subsequent effects, it can act an absolute reference for things like center points.

However, this is not fool-proof, as the user could have applied a distortion or translation effect. Also, this value is available only for the layer to which the effect is applied, not other layer parameters.

...or...

Every layer input has a `max_result_rect` which encompasses all pixel data, in some sense the master "size" of a layer.

It is available for all layers, but changes over time according to previously applied effects, possibly in ways the user might not expect (as in the drop shadow example above).

Note that the ref_width/height and `max_result_rect` for an input may be obtained without rendering, by calling `checkout_layer` with an empty `request_rect`.

This is fairly efficient, and can be useful if the layer "size" is needed first to determine exactly which pixels are required for rendering.

This is an example of requesting a layer in pre-render and then never calling `checkout_layer` (in this case, there are none).

---

## Flag On The Play

Normally, the `max_result_rect` of a given `PF_RenderRequest` will be cropped to the bounds of any applied mask.

However, if [PF_OutFlag2_REVEALS_ZERO_ALPHA](../effect-basics/PF_OutData#pf_outflags2) is set, the `max_result_rect` will be the size of the layer.

---

## PF_Cmd_SMART_RENDER

The effect will receive at most one *PF_Cmd_SMART_RENDER* call for each pre-render.

Note that render may never be called at all. After Effects may have only wanted to to perform some bounds computations, or it may have subsequently discovered that an effect's output is not needed at all (which can happen, for example, if the pre-render phase for a track matte returns a rectangle that does not intersect the effect's output.)

All effects must be able to handle Pre-Render without Render without leaking resources or otherwise entering an unstable state.

During *PF_Cmd_SMART_RENDER*, the extra parameter points to a PF_SmartRenderExtra.

---

## PF_SmartRenderExtra

| Member | Purpose |
| --- | --- |
| `PF_SmartRenderInput` | Consists of a [PF_RenderRequest](#pf_prerenderextra), the bitdepth, and a pointer to `pre_render_data` (allocated during [PF_Cmd_SMART_PRE_RENDER](../effect-basics/command-selectors#frame-selectors)).<br /><br />This `PF_SmartRenderInput` is identical to that passed in the corresponding *PF_Cmd_SMART_PRE_RENDER*. |
| `PF_SmartRenderCallbacks` | <pre lang="cpp">PF_Err checkout_layer_pixels(<br/>  PF_ProgPtr      effect_ref,<br/>  A_long          checkout_idL,<br/>  PF_EffectWorld  \*pixels);</pre><br /><br />This is used to actually access the pixels in layers checked out during *PF_Cmd_SMART_PRE_RENDER*.<br /><br />The returned `PF_EffectWorld` is valid for duration of current command or until checked in.<br /><br />You are only allowed to call `checkout_layer_pixels` only once with the checkout_idL used earlier in *PF_Cmd_SMART_PRERENDER*.<br /><br />There must be a one-to-one mapping between the number of checkouts made in *PF_Cmd_SMART_PRERENDER* and *PF_Cmd_SMART_RENDER*.<br /><br />To call `checkout_layer_pixels` more than once on a layer, you should call [checkout_layer](#pf_prerenderextra) on the same layer again with a different unique `checkout_idL` in *PF_Cmd_SMART_PRERENDER* and then use that `checkout_idL` to do another `checkout_layer_pixels` in *PF_Cmd_SMART_RENDER*.<br /><br /><pre lang="cpp">PF_Err checkin_layer_pixels(<br/>  PF_ProgPtr  effect_ref,<br/>  A_long      checkout_idL);</pre><br /><br />It isn't necessary to call (After Effects cleans up all such checkouts when the effect returns from *PF_Cmd_SMART_RENDER*), but useful to free up memory.<br /><br /><pre lang="cpp">PF_Err checkout_output(<br/>  PF_ProgPtr      effect_ref,<br/>  PF_EffectWorld  \*output);</pre><br /><br />Retrieves the output buffer. Note that effects are not allowed to check out output until at least one input has been checked out (unless the effect has no inputs at all).<br /><br />!!! tip<br />For optimal memory usage, request the output as late as possible, and request inputs as few at a time as possible. |

---

## レイヤパラメータにアクセスする場合

レイヤー入力以外のパラメーターはいつでも自由にチェックアウトできます。レイヤー入力は [PF_Cmd_SMART_PRE_RENDER](../effect-basics/command-selectors#frame-selectors) 中にアクセスする必要があります。

ただし、すべての入力を実際に *使用*する必要はありません。

[PF_Cmd_SMART_PRE_RENDER](../effect-basics/command-selectors#frame-selectors) でフレーム (またはその一部) をチェックアウトし、その後 `PF_Cmd_SMART_RENDER` でチェックアウトしない場合は、レンダリングする必要がなく、パフォーマンスが大幅に向上します。

---

## 待って、そのレイヤーを返してください!

`checkout_layer_pixels` は、PreRender で以前に使用された checkout_id を使用して 1 回だけ呼び出すことができます。 PreRender と SmartRender で行われるチェックアウトの数には 1 対 1 のマッピングが必要です。おそらくコードの構造が原因で、レイヤーのピクセルを複数回チェックアウトする必要がある場合は、複数の checkout_id を使用してください。 PreRender では、異なる一意の checkout_id を使用して、同じレイヤーで checkout_layer を呼び出します。次に、SmartRender で checkout_layer_pixels が呼び出されるたびに、それらの checkout_id の異なる 1 つを使用します。
