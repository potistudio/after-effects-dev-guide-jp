---
title: '実装'
---
AEGP API を通じて利用できる機能は非常に膨大であり、After Effects との統合は非常に完全であるため、プラグインがあらゆる状況で適切に動作することを保証するには、かなりの設計作業が必要です。

AEGP は、PICA 関数スイートを通じて After Effects と対話します。

AEGP は特定の順序でロードされるわけではありません。

AEGP API のバージョンを (AEGP のエントリ ポイント関数内から) チェックして、特定のスイートが利用可能かどうかを確認します。

AEGP は、PF_ProgPtr (PF_InData からのエフェクトによって取得される) を必要としないエフェクト API スイート関数を使用することもできます。

---

## エントリーポイント

```cpp
A_Err AEGP_PluginInitFuncPrototype(
    struct SPBasicSuite  *pica_basicP,
    A_long               major_versionL,
    A_long               minor_versionL,
    AEGP_PluginID        aegp_plugin_id,
    AEGP_GlobalRefcon    *global_refconP)
```
[PiPL Resources](../intro/pipl-resources) でエクスポートされたプラグインのエントリ ポイントは、起動時に 1 回だけ呼び出されます。 AEGP への他のすべての呼び出しは、登録されている関数に送られます。

これは、すべての通信が同じエントリ ポイントを経由するエフェクトプラグイン モデルとは大きく異なります。

プラグインのロード順序は異なる場合があるため、エントリ ポイント機能中に After Effects によって提供されていないスイートを取得することは決して得策ではありません。むしろ、適切なフック機能が実行されるまで待機してください。

AEGP [API Versions](../intro/compatibility-across-multiple-versions#api-versions) は、AEGP が異なる動作をする必要がある場合、または異なる動作を処理する必要がある場合に、After Effects の異なるバージョンを区別するのに役立ちます。

それらの他の関数はコールバック フックとして登録されます。メニュー項目を追加する AEGP は、After Effects でこれらの項目を有効にするかどうかを決定するために呼び出すことができる UpdateMenuHook 関数 (AE_GeneralPlug.h で説明されている関数シグネチャを使用) を登録する必要があります。同様に、コマンドを処理するプラグインは CommandHook (すべてのコマンドに 1 つ) を登録します。

---

## 専門分野

AEIO とアーティザンは、依存するメッセージング ストリームを受信するために After Effects に登録する必要があります。

AEGP API の他のすべてと同様、これは関数スイートを通じて行われます。この場合は、適切な名前の AEGP_RegisterSuite です。

---

## 例: メニュー項目の追加

エントリ ポイント関数中に、[Command Suite](aegp-suites#aegp_commandsuite1) から `AEGP_GetUniqueCommand()` を使用して、`AEGP_InsertMenuCommand` で使用するコマンド ID を After Effects から取得します。追加するメニュー項目ごとに異なる ID を使用します。

AEGP_RegisterSuite の `AEGP_RegisterCommandHook()` を使用して、メニュー項目が選択されたときに呼び出す関数を After Effects に指示します。 `AEGP_RegisterUpdateMenuHook()` を使用して登録した機能により、メニュー項目が有効または無効になります。メニュー更新機能を登録しない限り、メニュー項目は永久に無効になります。

メニュー項目をいくつ追加しても、登録する CommandHook は 1 つだけです。呼び出されると、(コマンド ID に基づいて) どのメニュー項目が選択されたかを判断し、AEGP PICA スイート関数を使用してプロジェクトの現在の状態を判断し、それに応じて動作します。たとえば、キーフレーム プラグインは、(キーフレーム可能な) パラメータ ストリームが現在の選択の一部でない限り、メニュー項目を無効にする必要がある場合があります。

---

## プライベートデータ

エフェクトとは異なり、AEGP は After Effects セッション中にアンロードされることはありません。ただし、静的変数やグローバル変数に依存することが得策であるという意味ではありません。

すべてのフック関数には、その関数に固有のストレージ情報の plugin_refconPV が渡されます。。多くの AEGP Suite 関数は `aegp_plugin_id` をパラメータとして受け取ります。渡された `global_refconPV` に、割り当てた構造体または ID そのものに保存します。

可能であれば、静的変数やグローバル変数ではなく、これらの refcon を使用して情報を保存してください。これは、マルチスレッドの問題に対処する場合に特に重要になります。

グローバル (`aegp_plugin_id` など) には `global_refconPV` を使用し、フック関数固有のストレージには refcon を使用します。

「After Effects の複数のインスタンス」の潜在的な問題。 After Effects の 2 番目のコマンドライン インスタンスが起動されると、すべての AEGP ハンドルが複製されます。これにより問題が発生する場合は (実際に問題が発生する可能性があります)、プラグインの特定のインスタンス化に保存されたハンドルをアタッチするコードを提供します。

---

## スレッド化

AEGP はスレッド化をまったくサポートしていません。すべては、コールバックに応答して、またはアイドル フックから、メイン スレッドから実行する必要があります。

スレッドセーフな呼び出しが 1 つあります: `AEGP_CauseIdleRoutinesToBeCalled()`。

ただし、`SPBasicSuite` 自体はスレッドセーフではないため、関数ポインタをメインスレッドに隠しておく必要があります。
