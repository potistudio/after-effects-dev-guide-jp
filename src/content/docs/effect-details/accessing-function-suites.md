---
title: 'After EffectsのFunction Suiteへのアクセス'
---
C++ コードを作成している場合、スイートへのアクセスは AEFX_SuiteScoper を使用して行う必要があります。AEFX_SuiteScoper は、必要に応じてスイートを自動的に取得し、完了時にスイートを破棄します。

AEFX_SuiteScope を使用して PF_GPUDeviceSuite1 スイートにアクセスする例を次に示します。

```cpp
AEFX_SuiteScoper<PF_GPUDeviceSuite1> gpu_suite = AEFX_SuiteScoper<PF_GPUDeviceSuite1>(
    in_dataP,
    kPFGPUDeviceSuite,
    kPFGPUDeviceSuiteVersion1,
    out_dataP);
```
:::note
AEFX_SuiteScoper は、要求されたスイートを取得できず、オプションの 2 番目のテンプレート引数 `ALLOW_NO_SUITE` が false に設定されている場合、例外 `A_Err_MISSING_SUITE` をスローします。

`ALLOW_NO_SUITE` を `false` に設定する場合は、`AEFX_SuiteScoper<>` 呼び出しを try/catch ラッパーでラップしてください。

`ALLOW_NO_SUITE` が `true` に設定されている場合は、返されたポインタを使用する前に、返されたポインタが NULL でないことを確認する必要があります。

:::
スイートを取得したら、スイート リスト内の任意の関数を呼び出すことができます。

```cpp
gpu_suite->GetDeviceInfo(in_dataP->effect_ref, extraP->input->device_index, &device_info);
```
C コードを使用する必要がある場合は、チェックアウト サンプル プロジェクトで示されているように、`PF_Suite_Helper` ユーティリティ ファイルを使用してスイートを手動で取得およびリリースします。

これらのメソッドは両方とも、バックグラウンドで、`PF_InData` が指す `SPBasicSuite` のメンバー関数である `AcquireSuite` を使用して PICA 関数スイートを取得します。

---

## スイートのバージョン

WhizBangSuite1 は 2 つの引数を取る Foobar() 関数を提供し、WhizBangSuite2>Foobar() は 3 つの引数を取ることができます。スイートの各新しいバージョンは古いバージョンに置き換わりますが、同じスイートの複数のバージョンを自由に取得してください。以前に出荷されたスイートを削除したり変更したりすることはありません。

プラグイン ホストの機能が不明な場合 (Premiere 以外のサードパーティ ホストは PICA をサポートしていません)、最新バージョンを取得して、以前のバージョンに「フォールバック」してみます。必要な機能が利用できない場合は、ユーザーに警告し、エラーを返します (または、より「プリミティブ」なプラグイン ホストで実行している場合は、他の動作に戻ります)。 After Effects プラグインの他のホストでのこれらのスイートのサポートは、すべて同様に曲がりくねった洞窟や通路の迷路であることに注意してください。

---

## スレッド化

特に文書化されていない限り、スイートによって提供される関数はスレッドセーフではないと想定してください。たとえば、ユーザー インターフェイスを変更する処理はプラグインのメイン スレッドのみで行う必要があります。
