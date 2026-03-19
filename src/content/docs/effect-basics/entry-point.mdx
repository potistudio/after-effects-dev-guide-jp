---
title: 'エントリポイント'
---
After Effects とエフェクトプラグインの通信は、すべてホスト側（After Effects）から開始されます。  
ホストは、プラグインが公開する単一のエントリポイント関数を呼び出して処理を指示します。

エフェクトプラグインのエントリポイントは、次のシグネチャを持つ必要があります。

```cpp
PF_Err EffectMain(
    PF_Cmd      cmd,
    PF_InData   *in_data,
    PF_OutData  *out_data,
    PF_ParamDef *params[],
    PF_LayerDef *output,
    void        *extra
)
```

ここでは関数名を `EffectMain` としていますが、実際の名前は [PiPL Resources](../intro/pipl-resources) で指定したものを使えます。

After Effects は呼び出しのたびに [PF_InData](pf_indata) と `PF_ParamDef[]`（パラメータ配列）を更新します。  
プラグインから戻ると、After Effects は [PF_OutData](pf_outdata) の内容を確認し、必要に応じて `output` に書き込まれた画像を利用します。

---

## エントリポイント引数

| 引数 | 説明 |
| --- | --- |
| [cmd](command-selectors) | 実行する処理種別を示す [コマンドセレクター](command-selectors) です。 |
| [in_data](pf_indata) | アプリケーション状態や、今回の処理対象に関する入力情報です。各種インターフェイス関数や画像処理関数へのポインタも含まれます。 |
| [out_data](pf_outdata) | プラグインから After Effects へ返す情報を設定します。 |
| [params](parameters) | `in_data->current_time` 時点のパラメータ配列です。`params[0]` は入力画像（[PF_EffectWorld / PF_LayerDef](pf_effectworld)）です。利用可能なセレクターは [呼び出しシーケンス](command-selectors#calling-sequence) を参照してください。詳細は [PF_ParamDef](pf_paramdef) も参照してください。 |
| [output](pf_effectworld) | エフェクトプラグインがレンダリング結果を書き込む出力画像です。利用可能なセレクターは限定されます。 |
| [extra](../effect-ui-events/pf_eventextra) | `cmd` に応じて意味が変わる追加引数です。`PF_Cmd_EVENT` の場合は [イベント種別](../effect-ui-events/effect-ui-events) を表します。主にイベント処理と [パラメータ監視](../effect-details/parameter-supervision) で使用します。 |
