---
title: 'パラメータ監視'
---
監視とは、一部のパラメータの値を他のパラメータの値に基づいて動的に変更することを意味します。パラメータを監視するには、*PF_Cmd_PARAM_SETUP* 中にパラメータを追加する前に [PF_ParamFlag_SUPERVISE](../effect-basics/PF_ParamDef#pf_paramdef) を設定します。変更されるたびに [PF_Cmd_USER_CHANGED_PARAM](../effect-basics/command-selectors#messaging) が届きます。変更されたパラメータの (プラグインのパラメータ配列への) インデックスは、PF_UserChangedParamExtra (追加) パラメータで送信されます。 *PF_Cmd_USER_CHANGED_PARAM* 中に、パラメーターの値と外観を変更できます。

---

## パラメータ UI の更新

いずれかのパラメータに `PF_ParamFlag_SUPERVISE` を設定すると、After Effects は PF_OutFlag_SEND_UPDATE_PARAMS_UI を設定した場合と同様に *PF_Cmd_UPDATE_PARAMS_UI* を送信します。

*PF_Cmd_UPDATE_PARAMS_UI* 中には、外観の変更とパラメータの状態の有効化のみが可能です。 [PF_ParamUtilSuite3](#pf_paramutilsuite3) の `PF_UpdateParamUI()` を使用して UI を更新し、変更するパラメータの *コピー* を渡します。オリジナルを変更しないでください。 `PF_OutFlag_REFRESH_UI` を設定する必要はありません。 `PF_UpdateParamUI()` がそれを処理します。

:::no
t
e
これは、`PF_PUI_STD_CONTROL_ONLY` パラメータの UI を更新する唯一の方法です。

:::
---

## パラメータ値の更新

パラメータの値 (UI だけでなく) は、[PF_Cmd_USER_CHANGED_PARAM](../effect-basics/command-selectors#messaging) および [PF_Cmd_EVENT](../effect-basics/command-selectors#messaging) (*PF_Event_DO_CLICK*、*PF_Event_DRAG*、および *PF_Event_KEYDOWN*) 中に変更できます。 After Effects は、他の時点で行われた変更を受け入れません。

パラメータの *値* (UI だけでなく) を変更する場合は、元のパラメータを変更し、`PF_Paramdef.uu.change_flags` を `PF_ChangeFlag_CHANGED_VALUE` に設定します。

この変更により UI も更新され、ユーザーは元に戻すことができます。 `PF_ChangeFlag_CHANGED_VALUE` はレイヤー パラメーターとしてサポートされていないことに注意してください。

このスイートは、AEGP スイートの使用を必要とせずに、エフェクトプラグインにパラメーター ストリームへのアクセスを提供するために提供されています。これらの機能の少なくとも一部は、いくつかのサードパーティ ホストによって提供されます。これらの関数は、監視パラメータを持つエフェクトの場合に特に便利です。

---

## PF_ParamUtilSuite3

| Function | Purpose |
| --- | --- |
| `PF_UpdateParamUI` | <pre lang="cpp">PF_UpdateParamUI(<br/>  PF_ProgPtr         effect_ref,<br/>  PF_ParamIndex      param_index,<br/>  const PF_ParamDef  \*defP);</pre><br /><br />Force After Effects to refresh the parameter's UI, in the effect controls palette.<br /><br />Starting in CC 2014, After Effects will now honor a change to a custom UI height. Simply change the ui_height of your custom UI PF_ParamDef and then call PF_UpdateParamUI.<br /><br />The effect's custom UI height will be updated in the Effect Control Window.<br /><br />Starting in CS6, when a plug-in disables a parameter, we now save that state in the UI flags so that the plug-in can check that flag in the future to see if it is disabled.<br /><br />!!! danger<br />Never pass param[0] to this function. |
| `PF_GetCurrentState` | <pre lang="cpp">PF_GetCurrentState(<br/>  PF_ProgPtr     effect_ref,<br/>  PF_ParamIndex  param_index,<br/>  const A_Time   \*startPT0,<br/>  const A_Time   \*durationPT0,<br/>  PF_State       \*stateP);</pre><br /><br />This API, combined with `PF_AreStatesIdentical` below, lets you determine if a set of inputs (either layers, other properties, or both) are different between when you first called `PF_GetCurrentState` and a current call, so it can be used for caching. You can specify a range of time to consider or all of time.<br /><br />Updated in CS6 to add `param_index`, `startPT0`, and `durationPT0`. Pre-defined constants for `param_index` are as follows:<br /><br />- `PF_ParamIndex_CHECK_ALL` - check every parameter, including every layer referred to by a layer parameter.<br />- `PF_ParamIndex_CHECK_ALL_EXCEPT_LAYER_PARAMS` - omit all layers. Pass a specific layer parameter index to include that as the only layer parameter tested.<br />- `PF_ParamIndex_CHECK_ALL_HONOR_EXCLUDE` - Similar to `CHECK_ALL`, but honor `PF_ParamFlag_EXCLUDE_FROM_HAVE_INPUTS_CHANGED`.<br /><br />Passing in NULL for both start and duration indicates all time.<br /><br />For effects that do simulation across time and therefore set `PF_OutFlag2_AUTOMATIC_WIDE_TIME_INPUT`, when you ask about a time range, it will be expanded to include any times needed to produce that range.<br /><br />Populates a `PF_State`, an opaque data type used as a receipt for the current state of the effect's parameters (the PF_State is used in our internal frame caching database). |
| `PF_AreStatesIdentical` | <pre lang="cpp">PF_AreStatesIdentical(<br/>  PF_ProgPtr      effect_ref,<br/>  const PF_State  \*state1P,<br/>  const PF_State  \*state2P,<br/>  A_Boolean       \*samePB);</pre><br /><br />New in CS6. Compare two different states, retrieved using `PF_GetCurrentState`, above. |
| `PF_HasParamChanged` | No longer supported in `PFParamUtilsSuite3`.<br /><br /><pre lang="cpp">PF_HasParamChanged(<br/>  PF_ProgPtr     effect_ref,<br/>  const          PF_State \*stateP,<br/>  PF_ParamIndex  param_index,<br/>  PF_Boolean     \*changedPB);</pre><br /><br />Given a PF_State, passes back true if any of the tested parameters differ from the saved state. Contrary to the name, the call does not provide a way to test a single parameter.<br /><br />At a minimum, all non-layer parameters will be tested. For finer granularity to test a specific set of parameters, use `PF_HaveInputsChangedOverTimeSpan` below instead.<br /><br />Pre-defined constants for `param_index` are as follows:<br /><br />- `PF_ParamIndex_CHECK_ALL` - check every parameter, including every layer referred to by a layer parameter.<br />- `PF_ParamIndex_CHECK_ALL_EXCEPT_LAYER_PARAMS` - omit all layers. Pass a specific layer parameter index to include that as the only layer parameter tested. |
| `PF_HaveInputsChangedOverTimeSpan` | No longer supported in `PFParamUtilsSuite3`. Use `PF_AreStatesIdentical()` instead. |
| `PF_IsIdenticalCheckout` | <pre lang="cpp">PF_IsIdenticalCheckout(<br/>  PF_ProgPtr     effect_ref,<br/>  PF_ParamIndex  param_index,<br/>  A_long         what_time1,<br/>  A_long         time_step1,<br/>  A_u_long       time_scale1,<br/>  A_long         what_time2,<br/>  A_long         time_step2,<br/>  A_u_long       time_scale2,<br/>  PF_Boolean     \*identicalPB);</pre><br /><br />Returns `TRUE` if a parameter's value is the same at the two passed times. Note: the times need not be contiguous; there could be different intervening values. |
| `PF_FindKeyframeTime` | <pre lang="cpp">PF_FindKeyframeTime(<br/>  PF_ProgPtr     effect_ref,<br/>  PF_ParamIndex  param_index,<br/>  A_long         what_time,<br/>  A_u_long       time_scale,<br/>  PF_TimeDir     time_dir,<br/>  PF_Boolean     \*foundPB,<br/>  PF_KeyIndex    \*key_indexP0,<br/>  A_long         \*key_timeP0,<br/>  A_u_long       \*key_timescaleP0);</pre><br /><br />Searches (in the specified direction) for the next keyframe in the parameter's stream. The last three parameters are optional. |
| `PF_GetKeyframeCount` | <pre lang="cpp">PF_GetKeyframeCount(<br/>  PF_ProgPtr     effect_ref,<br/>  PF_ParamIndex  param_index,<br/>  PF_KeyIndex    \*key_countP);</pre><br /><br />Returns the number of keyframes in the parameter's stream. |
| `PF_CheckoutKeyframe` | <pre lang="cpp">PF_CheckoutKeyframe(<br/>  PF_ProgPtr     effect_ref,<br/>  PF_ParamIndex  param_index,<br/>  PF_KeyIndex    key_index,<br/>  A_long         \*key_timeP0,<br/>  A_u_long       \*key_timescaleP0,<br/>  PF_ParamDef    \*paramP0);</pre><br /><br />Checks a keyframe for the specified parameter out of our keyframe database. param_index is zero-based. You can request time, timescale, or neither; useful if you're performing your own motion blur. |
| `PF_CheckinKeyframe` | <pre lang="cpp">PF_CheckinKeyframe(<br/>  PF_ProgPtr   effect_ref,<br/>  PF_ParamDef  \*paramP);</pre><br /><br />All calls to PF_CheckoutKeyframe must be balanced with this check-in, or pain will ensue. |
| `PF_KeyIndexToTime` | <pre lang="cpp">PF_KeyIndexToTime(<br/>  PF_ProgPtr     effect_ref,<br/>  PF_ParamIndex  param_index,<br/>  PF_KeyIndex    key_indexP,<br/>  A_long         \*key_timeP,<br/>  A_u_long       \*key_timescaleP);</pre><br /><br />Returns the time (and timescale) of the specified keyframe. |
