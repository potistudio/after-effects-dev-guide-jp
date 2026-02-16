---
title: 'エントリーポイント'
---
After Effects とエフェクトプラグイン間のすべての通信は After Effects によって開始され、ホスト（After Effects）が単一のエントリ ポイント関数を呼び出すことによってすべて行われます。

すべてのエフェクトプラグインについて、エントリ ポイント関数には次のシグネチャが必要です。

```cpp
PF_Err main (
    PF_Cmd       cmd,
    PF_InData    *in_data,
    PF_OutData   *out_data,
    PF_ParamDef  *params[],
    PF_LayerDef  *output,
    void         *extra)
```
上記のエントリ ポイント関数の名前は「main」ですが、[PiPL Resources](../intro/pipl-resources) で指定されたものであれば何でも構いません。

エントリポイント関数を呼び出すたびに、After Effects は [PF_InData](PF_InData) とプラグインのパラメータ配列 PF_ParamDef[] を更新します（注記のある場合を除く）。

プラグインが呼び出しから戻った後、After Effects は [PF_OutData](PF_OutData) の変更をチェックし、必要に応じて、エフェクトがレンダリングした PF_LayerDef を使用します。

---

## エントリポイント関数のパラメータ

| Argument | Purpose |
| --- | --- |
| [cmd](command-selectors) | After Effects sets the [Command Selectors](command-selectors) to tell the plug-in what to do. |
| [in_data](PF_InData) | Information about the application's state and the data the plug-in is being told to act upon.<br /><br />Pointers to numerous interface and image manipulation functions are also provided. |
| [out_data](PF_OutData) | Pass back information to After Effects by setting fields within out_data. |
| [params](parameters) | An array of the plug-in's parameters at the time provided in in_data> current_time.<br /><br />`params[0]` is the input image (a [PF_EffectWorld / PF_LayerDef](PF_EffectWorld)) to which the effect should be applied.<br /><br />These values are only valid during certain selectors (this is noted in the [selector descriptions](command-selectors#calling-sequence)).<br /><br />Parameters are discussed at length here: [PF_ParamDef](PF_ParamDef). |
| [output](PF_EffectWorld) | The output image, to be rendered by the effect plug-in and passed back to After Effects.<br /><br />Only valid during certain selectors. |
| [extra](../effect-ui-events/PF_EventExtra) | The extra parameter varies with the command sent or (in the case of [PF_Cmd_EVENT](command-selectors#messaging), the [event type](../effect-ui-events/effect-ui-events)).<br /><br />Used primarily for event management and [Parameter Supervision](../effect-details/parameter-supervision). |
