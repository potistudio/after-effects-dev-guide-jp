---
title: 'エラー'
---
常に、常に、*常に* (常に!) `main()` から `PF_Err` を返します。プラグインはすべてのエラーを After Effects に返す必要があります。

エラー（コールバックや PICA スイートによって返されるエラー）は、エラーを処理していない限り、After Effects に渡すことが非常に重要です。

正しいエラー コードを返すこと、および割り当てたメモリを破棄することに注意してください。

本当に。私たちは真剣です。

---

## エラーコード

| Error | Meaning |
| --- | --- |
| `PF_Err_NONE` | Success. |
| `PF_Err_OUT_OF_MEMORY` | Memory allocation failed.<br /><br />Note that RAM preview will cause this condition, so After Effects will be expecting to receive this error from your plug-in. |
| `PF_Err_INTERNAL_STRUCT_DAMAGED` | Problems using a data structure. |
| `PF_Err_INVALID_INDEX` | Problems finding/using array member. |
| `PF_Err_UNRECOGNIZED_PARAM_TYPE` | Problem with parameter data. |
| `PF_Err_INVALID_CALLBACK` | Problems accessing function through pointer. |
| `PF_Err_BAD_CALLBACK_PARAM` | Problems using a parameter passed to a callback. |
| `PF_Interrupt_CANCEL` | Both effect and AEGP callbacks can return this to effects, if a user action aborts a render.<br /><br />If the effect gets this error from a callback, it should stop processing the frame and return the error to the host.<br /><br />Failure to pass the error back may result in misrendered frames being cached. |
| `PF_Err_CANNOT_PARSE_KEYFRAME_TEXT` | Return this from `PF_Arbitrary_SCAN_FUNC` when problems occur parsing the clipboard into keyframe data. |

---

## エラー報告ポリシー

After Effects には、エラー処理に関する一貫したポリシーがあります。それに従ってください。

プラグインのコードでエラーが発生した場合は、プラグインから After Effects に戻る前に、すぐにユーザーに報告してください。

After Effects では、プラグインの実行中に発生したオペレーティング システムからのエラーは、ユーザー側のものであると見なされます。

コールバック関数の 1 つからエラー コードが返された場合は、それを After Effects に返します。私たちはすでにそれを報告しました。

After Effects ではメモリ不足エラーが報告されることはありません。 RAM プレビュー中、および After Effects が - noui モードで実行されている場合、エラー報告は常に抑制されます。

プラグイン内からエラーを報告するには、`PF_OutFlag_DISPLAY_ERROR_MESSAGE` を設定し、[PF_OutData>return_msg](PF_OutData#pf_outdata) にエラーを記述します。

そうすることで、エラーがレンダリング ログに記録され、レンダリング エンジンまたはスクリプトによるレンダリングでシステムがハングするのを防ぐことができます。

---

## 掘り下げてみましょう！

これでエフェクトプラグインの基本を理解したので、実際のコードを試してみる準備が整いました。さあ、始めましょう！

プラグインのセットアップの基本を理解した後、再利用可能なコード、高度な機能、コードを最適化して高速化する方法についていくつかの質問が生じるかもしれません。

この目的を達成するために、After Effects は関数スイートを通じて膨大な量の内部機能を公開します。

ユーティリティ関数の After Effects コードを利用することで、画像処理アルゴリズムを迅速に実装できるはずです。

これについては [Effect Details](../effect-details/effect-details) で説明します。
