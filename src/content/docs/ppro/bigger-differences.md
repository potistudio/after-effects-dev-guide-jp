---
title: '大きな差異'
---
エフェクトが After Effects でサポートされる基本的な ARGB_8u ピクセル形式のみをサポートしている限り、Premiere Pro は After Effects のホスティング動作を模倣し、レンダー パイプライン アーキテクチャの違いによるさまざまな違いを隠そうとします。ただし、エフェクトで 32 ビット RGB などの追加のピクセル フォーマットをサポートする必要がある場合は、さらなる発散動作を処理できるように準備してください。

---

## ピクセル形式

Premiere Pro は、After Effects で使用される 8 ビット RGB 形式（ARGB_8u）以外のピクセル形式のサポートを宣言するための関数スイートを提供します。これらのピクセル形式には、Premiere Pro ネイティブ 8 ビット RGB 形式 - BGRA_8u のほか、YUV、32 ビット形式などが含まれます。さまざまなピクセル形式の詳細については、["Pixel Formats and Colorspaces" from the Premiere Pro SDK Guide](http://ppro-plugin-sdk.aenhancers.com/universals/pixel-formats-and-color-spaces.html) を参照してください。

PF Pixel Format Suite (PrAESDKSupport.h で定義) を使用して、他のピクセル フォーマットで [PF_EffectWorld / PF_LayerDef](../effect-basics/PF_EffectWorld) を登録します。これらのピクセル フォーマットで白黒の値を取得するには、Premiere Pixel Format Suite (適切な名前の PrSDKPixelFormatSuite.h で定義) を使用します。

`PF_BLEND()` などの After Effects 機能は、8 ビット RGB を超えるピクセル形式で動作するように拡張されていません。

---

## 32 ビット浮動小数点数のサポート

Premiere Pro は、After Effects 16 ビット レンダリングまたは SmartFX をサポートしていません。 Premiere Pro で 32 ビット レンダリングを行うには、32 ビット ピクセル形式のいずれかのサポートを宣言し（前のセクションを参照）、`PF_Cmd_RENDER` の 32 ビット レンダリングを実装する必要があります。この方法で複数のレンダリング深度をサポートできます。例については、SDK Noise サンプルプロジェクトを参照してください。

エフェクトが適用されるクリップによっては、ソース入力の品質を維持するために 32 ビット処理が必ずしも必要なわけではありません。ただし、必要に応じて、32 ビット レンダリングを強制し、エフェクト処理の粒度を高め、ヘッドルームを増やす設定があります。タイムラインからプレビューを制御するには、[設定] > [シーケンス設定] > [ビデオ プレビュー] > [最大ビット深度] に移動します。ファイルにエクスポートするには、[エクスポート設定] > [ビデオ] > [基本設定] > [最大深度でレンダリング] を使用します。

---

## PF_CHECKOUT_PARAM とピクセル形式

CS6 より前では、`PF_CHECKOUT_PARAM()` は、現在レンダリングに使用されているピクセル形式に関係なく、8 ビット ARGB バッファーのみを返しました。 CS6 以降、エフェクトは、32 ビット浮動小数点数、YUV などのいずれであっても、レンダー リクエストと同じ形式でフレームを取得するようにオプトインできるようになりました。

プラグインはこの動作を要求する場合がありますが、既存のプラグインは引き続き 8 ビット ARGB フレームを受信して動作します。この呼び出しは、PF Utility Suite の EffectWantsCheckedOutFramesToMatch RenderPixelFormat() であり、PrSDKAESupport.h で定義されています。。この呼び出しは `PF_Cmd_GLOBAL_SETUP` で行う必要があります。これは、エフェクトが `AddSupportedPixelFormat()` を使用して 8 ビット RGB を超えるサポートを既にアドバタイズしているのと同じセレクターです。
