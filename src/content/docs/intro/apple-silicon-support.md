---
title: 'Apple Silicon対応'
---
アドビは、Apple Silicon 上でネイティブに実行される一部の製品で Apple Silicon エフェクトプラグインをサポートするようになりました。たとえば、After Effects エフェクトプラグインは、Adobe Premiere Pro や Adob​​e Media Encoder でも利用できます。

すべての Adob​​e 製品にネイティブ Apple Silicon バージョンがまだあるわけではありませんが、ネイティブ Apple Silicon バージョンがある製品では、Apple Silicon 実装を備えたエフェクトプラグインのみが利用可能になります。これらの新しい M1 マシンの急速な普及を見越して、Apple Silicon ターゲットをすぐに追加することをお勧めします。

:::no
t
e
Mac Universal バイナリをビルドするには、Xcode 12.2 以降が必要です。

:::
ユニバーサル バイナリの詳細については、[https://developer.apple.com/documentation/apple-silicon/building-a-universal-macos-binary](https://developer.apple.com/documentation/apple-silicon/building-a-universal-macos-binary) をご覧ください。

デバッグのために macOS 15 以降にプラグインをロードするには、追加の署名手順も必要です。詳細については、[here](debugging-plug-ins#signing-requirments-and-loading-unsigned-plug-ins) を参照してください。

---

## プラグインにユニバーサル バイナリ サポートを追加する方法

1. 12.2 以降でプラグイン Xcode プロジェクトを開くと、Xcode が自動的に Apple Silicon ターゲットを追加します。

    ![Mac Universal Build](../_static/mac_universal_build.png "Mac Universal Build")
    *Mac ユニバーサル ビルド*

2. After Effects に Apple Silicon ビルドの主なエントリポイントを伝えます。

    > * プラグインの .r リソース ファイルを見つけます。
    > * 既存の Intel Mac エントリポイント定義の横に `CodeMacARM64 {"EffectMain"}` を追加します。
    >「cpp」
    > #定義されている場合(AE_OS_MAC)
    > CodeMacARM64 {"EffectMain"},
    > CodeMacIntel64 {"EffectMain"},
    > #endif
    >「」
    > * 何らかの理由で、x64 と ARM で異なるエントリポイントが必要な場合は、異なるエントリポイント名と文字列を指定するだけです。

3. Any Mac (Apple Silicon、Intel) ターゲット用にビルドするか、[製品] -> [アーカイブ] を使用して、ユニバーサル バイナリをコンパイルします。

Apple Silicon ビルドにコンパイル時間の問題がないと仮定すると、Intel アプリケーションと Apple Silicon アプリケーションの両方に単一のユニバーサル バイナリを使用できるようになります。

---

## 「C」関数全体での Apple Silicon の例外動作

Apple Silicon で例外を使用する場合は、特に注意する必要があります。多くの環境では、従来の「C」関数を介して伝播する例外のスローは正常に機能しました。これは未定義の動作を伴う悪い習慣でしたが、一般的には「機能しました」。

Apple Silicon では、未定義の動作ではなく ABI が変更されているため、これが発生すると terminate() が呼び出されます。

プラグインのメイン エントリポイントは常に extern "C" 呼び出し規約であるため、プログラムの終了を防ぐために、このコードを try/catch ブロックでラップする必要があります。例えば：

```cpp
PF_Err EffectMain ( PF_Cmd cmd,
    PF_InData *in_data,
    PF_OutData *out_data,
    PF_ParamDef *params[],
    PF_LayerDef *output )
{
    try
    {
        /* Your code here */
    }
    catch
    {
        /* return most appropriate PF_Err */
    }
}
```
