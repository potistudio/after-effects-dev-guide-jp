---
title: '呼び出しシーケンス'
---
すべての AEGP と同様に、プラグインの PiPL でエクスポートされたエントリ ポイント関数が起動時に呼び出されます。この関数の間、AEIO は必要な関数への関数ポインタを提供し、その機能を記述してから、適切な構造体を [AEGP_RegisterIO()](../aegps/aegp-suites#aegp_registersuite5) に渡す必要があります。

---

## インポート

AEIO で処理されるタイプのファイルをファイル インポート ダイアログでユーザーが選択すると、その [AEIO_VerifyFileImportable()](new-kids-on-the-function-block#aeio_functionblock4) 関数が呼び出されます。ユーザーがインポートするファイルごとに再度呼び出されます。 [AEIO_InitInSpecFromFile()](new-kids-on-the-function-block#aeio_functionblock4) はファイルごとに呼び出されます。ファイルを解析し、さまざまな設定関数を使用してファイルを After Effects に記述します。また、ファイルに関連付けられたオプション データを作成し、[AEGP_SetInSpecOptionsHandle()](new-kids-on-the-function-block#aegp_ioinsuite5) を使用してそのデータを保存します。

After Effects はプラグインの [AEIO_GetInSpecInfo()](new-kids-on-the-function-block#aeio_functionblock4) 関数を呼び出し、プロジェクト ウィンドウに表示するファイルに関する説明テキストを取得します。この関数の説明で述べたように、この関数はフォルダーに対しても呼び出すことができます。ファイルに有効なオプション データがない場合は、何もせず、エラーを返さないことをお勧めします (AEIO はこれを実行します)。

[AEIO_CountUserData()](new-kids-on-the-function-block#aeio_functionblock4) が送信されます。 AEIO がユーザー データが存在することを示した場合、[AEIO_GetUserData()](new-kids-on-the-function-block#aeio_functionblock4) が続きます。 After Effects は、[AEIO_DrawSparseFrame()](new-kids-on-the-function-block#aeio_functionblock4) を送信して、プラグインにビデオのフレーム（プロジェクト ウィンドウのサムネイル用）を描画するよう要求します。

サポートされているファイルがコンポジションに追加されると、ユーザー操作により `AEIO_DrawSparseFrame()` および [AEIO_GetSound()](new-kids-on-the-function-block#aeio_functionblock4) への呼び出しが生成されます。

プロジェクトが保存され、AEIO_InSpec に関連付けられたオプション データがある場合、After Effects は [AEIO_FlattenOptions()](new-kids-on-the-function-block#aeio_functionblock4) を送信し、その間 AEIO はオプション データを解析し、外部メモリへの参照を含まないその表現を作成します。同様に、AEIO_OutSpec オプション データが存在すると、[AEIO_GetFlatOutputOptions()](new-kids-on-the-function-block#aeio_functionblock4) が送信されます。

---

## エクスポート

ユーザーがレンダー キューにアイテムを追加し、AEIO でサポートされている出力形式を選択した場合、[AEIO_InitOutputSpec()](new-kids-on-the-function-block#aeio_functionblock4) が送信されます。さまざまな取得関数を使用して出力設定に関する情報を取得し、[AEGP_SetOutSpecOptionsHandle()](new-kids-on-the-function-block#aeio_functionblock4) に続けて `AEIO_GetFlatOutputOptions()` を使用して関連情報を保存します。 [AEIO_GetDepths()](new-kids-on-the-function-block#aeio_functionblock4) は、After Effects が AEIO がサポートする出力ピクセルのビット深度を判断できるように送信されます。 [AEIO_GetOutputInfo()](new-kids-on-the-function-block#aeio_functionblock4) は、ファイル名、タイプ、およびサブタイプの情報を出力モジュールの詳細に表示できるように送信されます。

ユーザーが [フォーマット オプション] ボタンをクリックすると、レンダリング キューで [AEIO_UserOptionsDialog()](new-kids-on-the-function-block#aeio_functionblock4) が呼び出されます。ユーザーが実際に「レンダリング」ボタンをクリックすると、[AEIO_SetOutputFile()](new-kids-on-the-function-block#aeio_functionblock4) が呼び出され、続いて [AEIO_GetSizes()](new-kids-on-the-function-block#aeio_functionblock4) が呼び出されます (宛先に十分なディスク容量があるかどうかを判断するのは AEIO の役割です)。

ビデオ フレームが送信される前に、AEIO がファイル ハンドルを開いてファイル ヘッダーを書き出すために [AEIO_StartAdding()](new-kids-on-the-function-block#aeio_functionblock4) が送信されます。 AEIO がビデオまたはオーディオ形式をサポートしている場合、[AEIO_AddSoundChunk()](new-kids-on-the-function-block#aeio_functionblock4) が各オーディオ チャンクに送信され、[AEIO_AddFrame()](new-kids-on-the-function-block#aeio_functionblock4) が各ビデオ フレームに送信されます。

AEIO が静止画像のシーケンスをサポートしている場合、[AEIO_OutputFrame()](new-kids-on-the-function-block#aeio_functionblock4) が繰り返し呼び出されます。 After Effects は、出力されるフレームの PF_EffectWorld 表現を送信します。

[AEIO_WriteLabels()](new-kids-on-the-function-block#aeio_functionblock4) は、プラグインにフィールドおよびアルファ解釈情報を書き出す機会を与えるために (フレームごとに) 呼び出されます。 [AEIO_EndAdding()](new-kids-on-the-function-block#aeio_functionblock4) は、出力するフレーム (または音声) がなくなったときに送信されます。出力ファイルを閉じます。
