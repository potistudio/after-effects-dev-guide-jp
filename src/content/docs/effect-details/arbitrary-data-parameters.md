---
title: '任意データパラメータ'
---
一部の値は、After Effects の既存のパラメータ タイプでは適切に表現されません。任意のデータ型のパラメータ「arbデータ」を作成することで、After Effects で補間する任意のデータを作成・登録することができます。データを強制的に事前定義されたパラメータ タイプに変換する必要がなく、当社の補間エンジンとパラメータ管理を利用できます。

カスタムデータ型用の新しいメッセージング構造を作成しました。これは、C++ クラスのメンバー (およびフレンド) 関数として簡単に概念化できます。任意波形データを使用する場合は、ここで説明するすべてのセレクターに応答する必要があります。

これらの関数はカスタムデータ構造管理を扱います。任意波形データは、ユーザーの気まぐれに応じてアンロードおよびリロードされます。ディスクセーフなフラット化機能と非フラット化機能を提供します。

---

## 任意のデータセレクター

| Selector | Response |
| --- | --- |
| `PF_Arbitrary_NEW_FUNC` | Allocate, populate, and return a handle to a new instance of your arb data. |
| `PF_Arbitrary_DISPOSE_FUNC` | Free and destroy an instance of your arbitrary data type. |
| `PF_Arbitrary_COPY_FUNC` | Make a copy of an existing instance. You will be passed two handles, but only the source handle contains a valid instance. You must create a new instance, copy the values from the source, and put it in the destination handle. If you are passed a NULL handle, create a default instance of your arb data. |
| `PF_Arbitrary_FLAT_SIZE_FUNC` | You'll be passed a handle to an instance of your data type, and a variable in which you return the size of a flattened version of that instance. |
| `PF_Arbitrary_FLATTEN_FUNC` | Flatten the instance you're passed, and place it in the supplied buffer. The buffer will be the size you reported in response to `PF_Arbitrary_FLAT_SIZE_FUNC`. |
| `PF_Arbitrary_UNFLATTEN_FUNC` | Unpack the buffer into an instance of your arbitrary data type, and put in the handle which you've been passed. |
| `PF_Arbitrary_INTERP_FUNC` | Your interpolation function is passed three handles to instances of your arbitrary data type; one containing initial values (0), one final values (1), and a third to hold your interpolated data (somewhere between 0 and 1). You are also passed a float indicating where, between 0 and 1, your interpreted value should be.<br /><br />Allocate an instance and fill it with interpolated data. Then put the interpolated instance into the handle you've been passed. The velocity curves have already been accounted for when the normalized time value was calculated.<br /><br />!!! note<br />Never check out parameters if the [in_data>effect_ref](../effect-basics/PF_InData#pf_indata-members) is NULL. |
| `PF_Arbitrary_COMPARE_FUNC` | You are passed two instances of your arbitrary data, and a pointer to a comparison result. Populate the result with one of the values for `PF_ArbCompareResult` (see `AE_Effect.h`) to indicate whether the first was equal to, less than, more than, or simply not equal to the second. |
| `PF_Arbitrary_PRINT_SIZE_FUNC` | Indicate the buffer size you require for printing your parameter's current values by setting `print_sizePLu` (member of `print_size_func_params`, part of the `PF_ArbParamsExtra` structure). |
| `PF_Arbitrary_PRINT_FUNC` | Format your arbitrary data for text-based export, and copy the result to the buffer. This can be as elaborate as you would like.<br /><br />Your plug-in should emulate the cut-and-paste behavior for pasting text representations of parameter settings (into a Microsoft Excel spreadsheet, for example) displayed by the plug-ins shipped with After Effects.<br /><br />You have a great deal of flexibility in how you format your output. |
| `PF_Arbitrary_SCAN_FUNC` | Given a buffer of text data (often from the system clipboard), parse it into your arbitrary data format. |

---

## 任意のデータの実装

通常のコマンドおよびイベント セレクターに加えて、ARB データには別のホスト インタラクション セットが必要です。 After Effects がそれらを表すデータを管理するため、これは他のパラメータ タイプに対して透過的です。 arb データ プラグインを作成すると、After Effects が実行する膨大な量のパラメータ管理と、それらの管理アクションが発生するシーケンスについての洞察が得られます。実装を再考し、After Effects が管理するパラメータタイプを使用することになる場合もあります。

arb データをインスタンス化し (もちろん After Effects のメモリ割り当て関数を使用して)、ParamDef.u.arb_d.depaught をポイントします。適切なデフォルト値を設定します。パラメータを設定するために値変数は必要ありません。安全のためにゼロにしてください。

プラグインのエントリ関数に、[PF_Cmd_ARBITRARY_CALLBACK](../effect-basics/command-selectors#messaging) を処理するケースを含めます。

セカンダリ イベント ハンドラー `HandleArbitrary` を呼び出します。追加で `PF_ArbParamsExtra` を受け取り、これには送信されたコマンドを識別する `PF_FunctionSelector` が含まれます。

おそらく After Effects が `PF_Cmd_ARBITRARY_CALLBACK` を送信し、`PF_FunctionSelector` が `PF_Arbitrary_COPY_FUNC` になっている可能性があります。ソースおよび宛先任意波形へのポインタは `PF_ArbParamsExtra.copy_func_params` で提供されます。新しい任意波形を割り当て、`dest_arbPH` をポイントします。 `src_arbH` が NULL の場合、`dest_arbPH` のデフォルト任意波形を作成します。

ユーザーはタイムラインパネルで任意波形のキーフレームデータを選択し、それをコピーして、別のアプリケーションに切り替えることができます。 `PF_Arbitrary_PRINT_SIZE_FUNC` が送信されます。 `PF_ArbParamsExtra` に `print_sizePLu` を設定して、出力バッファのサイズを設定します。 `PF_Arbitrary_PRINT_FUNC` を受け取ります。 `print_bufferPC` 出力バッファに問題の Arb のテキスト表現を設定します。

ユーザーはキーフレーム データを任意波形のタイムラインに貼り付けることができます。 `PF_Arbitrary_SCAN_FUNC` が届きます。渡された文字バッファーの内容に基づいて任意波形を作成します (サイズは `print_sizeLu` で示されます)。

---

## 任意のデータ?再入場！

プラグイン コードはさまざまな理由で After Effects によって呼び出される可能性があるため、カスタムデータ タイプをサポートするには再帰的にリエントラントである必要があります。プラグインは、エフェクトの別のインスタンスに依存するレイヤーをチェックアウトする可能性があります。 (一見) 無関係なレイヤーをチェックアウトしようとすると、プラグインの任意のデータ処理コードがトリガーされます。グローバル変数を介してアクセスされる静的な値に依存する C ランタイム ライブラリへの呼び出しに注意してください。この事態に対する準備ができていないと、After Effects が停止し、ユーザーがモニターを罵ったり殴ったりすることになります。

---

## 任意のパラメータにアクセスできない場合

`in_data>effect_ref` が `NULL` の場合、任意のパラメータをチェックアウトしません。

---

## ダイアログ中の変更

After Effects は、`PF_Cmd_DO_DIALOG` 中に任意のデータパラメータに加えられた変更を無視します。

これは仕様によるものです。オプション ダイアログの表示中に行われた変更は、その時点での任意のパラメーターだけでなく、エフェクト ストリーム全体に影響します。

これらの変更に基づいて任意波形の動作を変更する必要がある場合は、その情報をシーケンス データに保存し、後で (多くの場合 `PF_Cmd_USER_CHANGED_PARAM` 中に) 適用します。
