---
title: 'コマンドセレクター'
---
コマンドとは、簡単に言えば、After Effects がエフェクトに実行させたいものです。

一部のセレクターへの応答は必須です。ほとんどはオプションですが、これらを追加したのには *理由* があることを思い出してください...

コマンドセレクターが送信されるたびに、エフェクトは [PF_InData](PF_InData#pf_indata) の After Effects からの情報、PF_ParamDef[] の入力値とパラメーター値 (入力レイヤーを含むパラメーターの説明の配列) を受け取り、コールバックと関数スイートにアクセスします。

[PF_OutData](PF_OutData#pf_outdata) の After Effects に情報を送り返し、（必要に応じて）出力を [PF_EffectWorld](PF_EffectWorld) とも呼ばれる PF_LayerDef にレンダリングします。

イベント中に、[PF_EventExtra](../effect-ui-events/PF_EventExtra) でイベント固有の情報を受け取ります。

---

## 呼び出しシーケンス

最初のいくつかのコマンドセレクターのみが予測可能です。残りの呼び出しシーケンスはユーザーのアクションによって決まります。

最初に適用されるとき、プラグインは `PF_Cmd_GLOBAL_SETUP` を受け取り、次に `PF_Cmd_PARAM_SETUP` を受け取ります。ユーザーがレイヤーにエフェクトを追加するたびに、`PF_Cmd_SEQUENCE_SETUP` が送信されます。

基本的な非 SmartFX エフェクトによってレンダリングされた各フレームに対して、After Effects は `PF_Cmd_FRAME_SETUP`、次に `PF_Cmd_RENDER`、次に `PF_Cmd_FRAME_SETDOWN` を送信します。

すべてのエフェクトプラグインは `PF_Cmd_RENDER` に応答する必要があります

SmartFX の場合、単一の `PF_Cmd_SMART_RENDER` が送信される前に、`PF_Cmd_SMART_PRE_RENDER` を何度でも送信できます。

`PF_Cmd_SEQUENCE_SETDOWN` は、ユーザーがエフェクトを削除するかプロジェクトを閉じるとき、終了時に送信されます。 `PF_Cmd_SEQUENCE_RESETUP` は、プロジェクトが読み込まれるとき、またはプロジェクトが適用されるレイヤーが変更されるときに送信されます。 `PF_Cmd_SEQUENCE_FLATTEN` は、After Effects プロジェクトがディスクに書き出されるときに送信されます。

`PF_Cmd_ABOUT` は、ユーザーがエフェクト コントロール ウィンドウ (ECW) から *About...* を選択したときに送信されます。

`PF_Cmd_GLOBAL_SETDOWN` は、After Effects が終了するとき、またはエフェクトの最後のインスタンスが削除されるときに送信されます。プラグインがいつメモリから削除されるかを判断するために、このメッセージに依存しないでください。 OS 固有のエントリ ポイントを使用します。

---

## コマンドセレクターテーブル

### グローバル セレクター

すべてのプラグインはこれらのセレクターに応答する必要があります。

| Selector | Response |
| --- | --- |
| `PF_Cmd_ABOUT` | Display a dialog describing the plug-in. Populate out_data>return_msg and After Effects will display it in a simple modal dialog.<br /><br />Include your plug- in's version information in the dialog. On macOS, the current resource file will be set to your effects module during this selector. |
| `PF_Cmd_GLOBAL_SETUP` | Set any required flags and `PF_OutData` fields (including out_data>my_version) to describe your plug-in's behavior. |
| `PF_Cmd_GLOBAL_SETDOWN` | Free all global data (only required if you allocated some). |
| `PF_Cmd_PARAM_SETUP` | Describe your parameters and register them using [PF_ADD_PARAM](../effect-details/interaction-callback-functions#interaction-callbacks).<br /><br />Also, register custom user interface elements.<br /><br />Set [PF_OutData>num_params](PF_OutData#pf_outdata) to match your parameter count. |

### Sequence Selectors

These control sequence data handling.

| Selector | Response |
| --- | --- |
| `PF_Cmd_SEQUENCE_SETUP` | Allocate and initialize any sequence-specific data. Sent when the effect is first applied. [PF_InData](PF_InData) is initialized at this time. |
| `PF_Cmd_SEQUENCE_RESETUP` | Re-create (usually unflatten) sequence data. Sent after sequence data is read from disk, during pre-composition, or when the effect is copied;<br /><br />After Effects flattens sequence data before duplication. During duplication, `PF_Cmd_SEQUENCE_RESETUP` is sent for both the old and new sequences.<br /><br />Don't expect a `PF_Cmd_SEQUENCE_FLATTEN` between `PF_Cmd_SEQUENCE_RESETUPs`. |
| `PF_Cmd_SEQUENCE_FLATTEN` | Sent when saving and when duplicating the sequence. Flatten sequence data containing pointers or handles so it can be written to disk.<br /><br />This will saved with the project file. Free the unflat data and set the `out_data>sequence_data` to point to the new flattened data. Flat data must be correctly byte-ordered for file storage.<br /><br />As of 6.0, if an effect's sequence data has recently been flattened, the effect may be deleted without receiving an additional `PF_Cmd_SEQUENCE_SETDOWN`.<br /><br />In this case, After Effects will dispose of your flat sequence data. |
| `PF_Cmd_SEQUENCE_SETDOWN` | Free all sequence data. |

### Frame Selectors

Passed for each frame (or set of audio samples) to be rendered by your plug-in.

| Selector | Response |
| --- | --- |
| `PF_Cmd_FRAME_SETUP` | Allocate any frame-specific data. This is sent immediately before each frame is rendered, to allow for frame-specific setup data.<br /><br />If your effect changes the size of its output buffer, specify the new output height, width, and relative origin. All parameters except the input layer are valid.<br /><br />If you set width and height to 0, After Effects ignores your response to the following `PF_Cmd_RENDER`.<br /><br />NOTE: If [PF_Outflag_I_EXPAND_BUFFER](PF_OutData#pf_outflags) is set, you will receive this selector (and `PF_Cmd_FRAME_SETDOWN`) twice, once without `PF_Cmd_RENDER` between them.<br /><br />This is so we know whether or not the given layer will be visible.<br /><br />Frame data dates from the days when machines might have 8MB of RAM. Given the calling sequence (above), it's much more efficient to just allocate during `PF_Cmd_RENDER`. |
| `PF_Cmd_RENDER` | Render the effect into the output, based on the input frame and any parameters.<br /><br />This render call can only support 8-bit or 16-bit per channel rendering. 32-bit per channel rendering must be handled in `PF_Cmd_SMART_RENDER`.<br /><br />All fields in `PF_InData` are valid.<br /><br />If your response to this selector is interrupted (your calls to `PF_ABORT` or `PF_PROGRESS` returns an error code), your results will not be used.<br /><br />You cannot delete `frame_data` during this selector; you must wait until `PF_Cmd_FRAME_SETDOWN`. |
| `PF_Cmd_FRAME_SETDOWN` | Free any frame data allocated during `PF_Cmd_FRAME_SETUP`. |
| `PF_Cmd_AUDIO_SETUP` | Sent before every audio render. Request a time span of input audio. Allocate and initialize any sequence-specific data.<br /><br />If your effect requires input from a time span other than the output time span, update the `startsampL` and `endsampL` field in `PF_OutData`. |
| `PF_Cmd_AUDIO_RENDER` | Populate [PF_OutData.dest_snd](PF_OutData#pf_outdata) with effect-ed audio. All fields in `PF_InData` are valid.<br /><br />If your response to this selector is interrupted (your calls to `PF_ABORT` or `PF_PROGRESS` returns an error code), your results will not be used. |
| `PF_Cmd_AUDIO_SETDOWN` | Free memory allocated during `PF_Cmd_AUDIO_SETUP`. |
| `PF_Cmd_SMART_PRE_RENDER` | SmartFX only. Identify the area(s) of input the effect will need to produce its output, based on whatever criteria the effect implements.<br /><br />May be sent up to twice when MediaCore is hosting. The first will come during GetFrameDependencies to collect the inputs.<br /><br />The source checkouts can return full frame dimensions here. Once the sources are rendered, if they are different in size than the first call then this selector will be emitted a second time with the actual source sizes in order to get a correct output size.<br /><br />Note that MediaCore wants all of the output, so `PF_PreRenderOutput::max_result_rect` will be used.<br /><br />**New in 16.0**<br /><br />Set `PF_RenderOutputFlag_GPU_RENDER_POSSIBLE` in `PF_PreRenderOutput` to render on the GPU.<br /><br />If this flag is not set the requested render is not possible with the requested GPU, because of parameters or render settings.<br /><br />The host may re-call PreRender with another what_gpu option (or PF_GPU_Framework_None).<br /><br /><pre lang="cpp">typedef struct {<br/>  PF_RenderRequest  output_request; // what the effect is being asked to render<br/>  short             bitdepth;       // bitdepth the effect is being driven in (in bpc)<br/>  const             void \*gpu_data; // (new AE 16.0)<br/>  PF_GPU_Framework  what_gpu;       // (new AE 16.0)<br/>  A_u_long          device_index;   // (new AE 16.0) For use in conjunction with PrSDKGPUDeviceSuite<br/>} PF_PreRenderInput;</pre> |
| `PF_Cmd_SMART_RENDER` | SmartFX only. Perform rendering and provide output for the area(s) the effect was asked to render. |

### Messaging

The communication channel between After Effects and your plug-in.

| Selector | Response |
| --- | --- |
| `PF_Cmd_EVENT` | This selector makes use of the extra parameter; the type of event to be handled is indicated by the e_type field, a member of the structure pointed to by extra.<br /><br />See [Effect UI & Events](../effect-ui-events/effect-ui-events). |
| `PF_Cmd_USER_CHANGED_PARAM` | The user changed a parameter value. You will receive this command only if you've set the `PF_ParamFlag_SUPERVISE` flag.<br /><br />You modify the parameter to control values, or make one parameter's value affect others. A parameter can be modified by different actions.<br /><br />`in_data.current_time` is set to the time of the frame that the user is looking at in the UI (internally, the current time of the comp converted into layer time) while they are changing the param that triggered the `PF_Cmd_USER_CHANGED_PARAM`.<br /><br />It's also the time of a keyframe that is added automatically (if there isn't one already, and the stopwatch is enabled).<br /><br />This is usually the same as the value passed for the PF_Cmd_RENDER that follows immediately after (unless caps lock is down), but not necessarily - there could be other comp windows open that cause a render at a different time in response to the changed param. |
| `PF_Cmd_UPDATE_PARAMS_UI` | The effect controls palette (ECP) needs to be updated. This might occur after opening the ECP or moving to a new time within the composition.<br /><br />You can modify parameter characteristics (enabling or disabling them, for example) by calling `PF_UpdateParamUI()`.<br /><br />Only cosmetic changes may be made in response to this command. Don't change parameter values while responding to `PF_Cmd_UPDATE_PARAMS_UI`; do so during `PF_Cmd_USER_CHANGED_PARAM` instead.<br /><br />This command will only be sent regularly if `PF_OutFlag_SEND_UPDATE_PARAMS_UI` was set in the PiPL, and during `PF_Cmd_GLOBAL_SETUP`.<br /><br />!!! note<br />Never check out parameters during this selector. Recursive badness is almost guaranteed to result. |
| `PF_Cmd_DO_DIALOG` | Display an options dialog. this is sent when the Options button is clicked (or a menu command has been selected).<br /><br />This selector will only be sent if the effect has previously indicated that it has a dialog (by setting the global `PF_OutFlag_I_DO_DIALOG` flag in response to `PF_Cmd_GLOBAL_SETUP`).<br /><br />In version 3.x, the params passed with `PF_Cmd_DO_DIALOG` were invalid.<br /><br />This is no longer the case; plug-ins can access non-layer parameters, check out parameters at other times, and perform UI updates during `PF_Cmd_DO_DIALOG`.<br /><br />They still may not change the parameter's values. |
| `PF_Cmd_ARBITRARY_CALLBACK` | Manage your arbitrary data type. You'll only receive this if you've registered a custom data type parameter.<br /><br />The extra parameter indicates which handler function is being called.<br /><br />Custom data types are discussed further in [Implementing Arbitrary Data](../effect-details/arbitrary-data-parameters). |
| `PF_Cmd_GET_EXTERNAL_DEPENDENCIES` | Only sent if `PF_OutFlag_I_HAVE_EXTERNAL_DEPENDENCIES` was set during `PF_Cmd_GLOBAL_SETUP`.<br /><br />Populate a string handle (in the PF_ExtDependenciesExtra pointed to by extra) with a description of your plug-in's dependencies, making sure to allocate space for the terminating NULL character.<br /><br />Return just a `NULL` pointer for the string handle if there are no dependencies to report.<br /><br />If the check type is `PF_DepCheckType_ALL_DEPENDENCIES`, report everything that might be required for your plug-in to render.<br /><br />Report only missing items (or a null string if nothing's missing) if the check type is `PF_DepCheckType_MISSING_DEPENDENCIES`. |
| `PF_Cmd_COMPLETELY_GENERAL` | Respond to an AEGP. The extra parameter points to whatever parameter the AEGP sent.<br /><br />AEGPs can only communicate with effects which respond to this selector. |
| `PF_Cmd_QUERY_DYNAMIC_FLAGS` | Sent only to plug-ins which have specified `PF_OutFlag2_SUPPORTS_QUERY_DYNAMIC_FLAGS` in `PF_OutFlags2`, in their PiPL and during `PF_Cmd_GLOBAL_SETUP`.<br /><br />With all of the dynamic flags, if you will ever change them during this command, you must have set the flag on during `PF_Cmd_GLOBAL_SETUP`.<br /><br />This selector will be sent at arbitrary times.<br /><br />In response, the effect should access its (non-layer) parameters using `PF_CHECKOUT_PARAM`, and decide whether any of the flags that support `PF_Cmd_QUERY_DYNAMIC_FLAGS` should be set, such as:<br /><br />- `PF_OutFlag_WIDE_TIME_INPUT`<br />- `PF_OutFlag_NON_PARAM_VARY`<br />- `PF_OutFlag_PIX_INDEPENDENT`<br />- `PF_OutFlag_I_USE_SHUTTER_ANGLE`<br />- `PF_OutFlag2_I_USE_3D_CAMERA`<br />- `PF_OutFlag2_I_USE_3D_LIGHTS`<br />- `PF_OutFlag2_DOESNT_NEED_EMPTY_PIXELS`<br />- `PF_OutFlag2_REVEALS_ZERO_ALPHA`<br />- `PF_OutFlag2_DEPENDS_ON_UNREFERENCED_MASKS`<br />- `PF_OutFlag2_OUTPUT_IS_WATERMARKED`<br /><br />After Effects uses this information for caching and optimization purposes, so try to respond as quickly as possible. |
| `PF_Cmd_GPU_DEVICE_SETUP` | This selector can be called at any time by the host. It will be called not more than once for each GPU device.<br /><br />Multiple GPU devices may be in the setup state at one time.<br /><br />It will be called after GlobalSetup and before SequenceSetup.<br /><br />The intent is for the effect to do GPU initialization if necessary and to give the effect an opportunity to opt out of a GPU device based solely on the properties of that device, and not any render context (frame size, etc).<br /><br />If the effect rejects the GPU device it will get called for CPU render.<br /><br />`PF_InData::what_gpu != PF_GPU_Framework_None` is expected.<br /><br />Effect is expected to set one or both of the `PF_OutFlag2_SUPPORTS_GPU_RENDER_Fxx` flags in `PF_OutData::out_flags2` if the device and framework in what_gpu is supported.<br /><br />Note that only `PF_OutFlag2_SUPPORTS_GPU_RENDER_F32` will be in AE 16.0.<br /><br />Effects that do not set flags here will NOT be considered to support GPU rendering for any of these devices.<br /><br />`PF_GPUDeviceSetupOutput::gpu_data` is a plug-in owned pointer that must be released with a the `PF_Cmd_GPU_DEVICE_SETDOWN` selector.<br /><br />This pointer is also available at render time. |
| `PF_Cmd_GPU_DEVICE_SETDOWN` | Release any resources associated with gpu_data. In AE this will be called just before GPU device release.<br /><br /><pre lang="cpp">typedef struct {<br/>  void              \*gpu_data;  // effect must dispose.<br/>  PF_GPU_Framework  what_gpu;<br/>  A_u_long          device_index; // For use in conjunction with PrSDKGPUDeviceSuite<br/>} PF_GPUDeviceSetdownInput;<br/><br/>typedef struct {<br/>  PF_GPUDeviceSetdownInput  input;<br/>} PF_GPUDeviceSetdownExtra;</pre> |
| `PF_Cmd_GPU_SMART_RENDER_GPU` | GPU equivalent to the existing `PF_Cmd_SMART_RENDER` selector.<br /><br />At render time, either the `PF_Cmd_SMART_RENDER` or the `PF_Cmd_SMART_RENDER_GPU` selector will be called, depending on whether the effect is expected to produce a CPU or GPU frame as output.<br /><br />`PF_Cmd_SMART_RENDER_GPU` will only be called when `what_gpu != PF_GPU_Framework_None`, and has effects on any input / output `PF_LayerDef`'s.<br /><br />All frame check-ins and check-outs will operate on GPU frames when this selector is in progress. Note `PF_Cmd_SMART_RENDER` shares the `Extra` structs.<br /><br /><pre lang="cpp">typedef struct {<br/>  PF_RenderRequest  output_request;   // what the effect is being asked to render<br/>  short             bitdepth;         // bitdepth the effect is being driven in (in bpc)<br/>  void              \*pre_render_data; // passed back from value placed in extra->output->pre_render_data during PF_Cmd_PRE_RENDER<br/>  const void        \*gpu_data;        // (new AE 16.0)<br/>  PF_GPU_Framework  what_gpu;         // (new AE 16.0)<br/>  A_u_long          device_index;     // (new AE 16.0)<br/>} PF_SmartRenderInput;<br/><br/>typedef struct {<br/>  PF_SmartRenderInput \*input;<br/>  PF_SmartRenderCallbacks \*cb;<br/>} PF_SmartRenderExtra;</pre><br /><br />The `what_gpu` and `device_index` fields are in the extra input for GPU-related selectors indicates to the plug-in the GPU framework to be used for rendering.<br /><br />Input and output buffers will be prepared on this framework and device.<br /><br />The device, context, command queue, and other associated GPU state can be queried with `PrSDKGPUDeviceSuite::GetDeviceInfo`.<br /><br />`what_gpu` will be the same between `PF_Cmd_SMART_PRE_RENDER` and `PF_Cmd_SMART_RENDER_GPU` selector calls. |

---

## 違いは何ですか?

`PF_Cmd_USER_CHANGED_PARAM` と `PF_Cmd_UPDATE_PARAMS_UI` の間には微妙な違いがあります。

エフェクトでは、ユーザーが実際にパラメータ値を変更する場合 (`PF_Cmd_USER_CHANGED_PARAM`) と、タイムラインをスクラブするだけの場合 (`PF_Cmd_UPDATE_PARAMS_UI`) を区別する必要があります。これは、プラグインの最初のロード時にも送信されます)。

最初のいくつかのコマンドセレクターのみが予測可能です。残りの呼び出しシーケンスはユーザーのアクションによって決まります。

最初に適用されるとき、プラグインは `PF_Cmd_GLOBAL_SETUP` を受け取り、次に `PF_Cmd_PARAM_SETUP` を受け取ります。ユーザーがレイヤーにエフェクトを追加するたびに、`PF_Cmd_SEQUENCE_SETUP` が送信されます。

基本的な非 SmartFX エフェクトによってレンダリングされた各フレームに対して、After Effects は `PF_Cmd_FRAME_SETUP`、次に `PF_Cmd_RENDER`、次に `PF_Cmd_FRAME_SETDOWN` を送信します。。すべてのエフェクトプラグインは `PF_Cmd_RENDER` *.* に応答する必要があります。

SmartFX の場合、単一の `PF_Cmd_SMART_RENDER` が送信される前に、`PF_Cmd_SMART_PRE_RENDER` を何度でも送信できます。

`PF_Cmd_SEQUENCE_SETDOWN` は、ユーザーがエフェクトを削除するかプロジェクトを閉じるとき、終了時に送信されます。 `PF_Cmd_SEQUENCE_RESETUP` は、プロジェクトが読み込まれるとき、またはプロジェクトが適用されるレイヤーが変更されるときに送信されます。 `PF_Cmd_SEQUENCE_FLATTEN` は、After Effects プロジェクトがディスクに書き出されるときに送信されます。

`PF_Cmd_ABOUT` は、ユーザーがエフェクト コントロール ウィンドウ (ECW) から *About...* を選択したときに送信されます。

`PF_Cmd_GLOBAL_SETDOWN` は、After Effects が終了するとき、またはエフェクトの最後のインスタンスが削除されるときに送信されます。プラグインがいつメモリから削除されるかを判断するために、このメッセージに依存しないでください。 OS 固有のエントリ ポイントを使用します。
