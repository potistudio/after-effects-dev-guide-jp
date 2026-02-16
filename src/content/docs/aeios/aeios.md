---
title: 'AEIO'
---
AEIO は、メディア ファイルのインポートおよび/またはエクスポートを実行する AEGP です。 AEIO は、指定されたタイプのファイルに対して、After Effects (または After Effects に付属のプラグイン) が通常実行するすべてのことを実行します。インポート側では、AEIO は既存のファイルを開いて、ファイル固有の解釈オプションを管理し、ファイルのオーディオとフレームを AEGP_SoundWorld および PF_EffectWorld 形式で After Effects に提供できます。さらに、AEIO は対話形式でファイルを作成し、ファイルから設定を読み取るのではなく、ユーザーに希望の設定を尋ねることができます。エクスポート側では、AEIO はレンダー キュー アイテムの出力オプションを作成および管理し、出力ファイルを作成して、フレーム (After Effects によって PF_EffectWorlds として提供される) をそれらのファイルに保存できます。

AEIO は、下位バイトから上位バイトまで ARGB 順序でピクセルを含む非圧縮ビデオを処理します。ピクセルはチャネルごとに 8 ビット、16 ビット、または 32 ビット浮動小数点にすることができます。 AEIO は、サポートされているコーデックの独自の圧縮/解凍を処理する必要があります。

---

## AEIO、それとも AEGP?

AEIO はピクセルとオーディオデータを After Effects に提供します。

タイムラインまたはプロジェクト形式を表すファイル形式のインポーター/エクスポーターを作成している場合 (After Effects またはその他のインストールされている AEIO でサポートされているファイル形式を参照)、AEGP を作成し、そのコマンドを [インポート/エクスポート] サブメニューに追加します。

---

## インポート用の AEIO、それとも MediaCore インポーター?

After Effects は MediaCore インポーター プラグインをサポートしています。 MediaCore は、Premiere Pro から派生した共有ライブラリのセットです。したがって、MediaCore API は [Premiere Pro SDK](http://ppro-plugin-sdk.aenhancers.com/) で説明されます。

MediaCore インポーター プラグインのみがインポーター優先順位システムをサポートしています。最も優先順位の高いインポーターがファイルをインポートする最初の機会を持ち、インポートされた特定のファイルがサポートされていない場合は、次に優先順位が高いインポーターがそのファイルのインポートを試行する機会が与えられます。 MediaCore インポーターは、AEIO へのファイルのインポートを延期できません。したがって、After Effects がすでにプラグインを提供しているファイル タイプのファイル処理を引き継ぐことが目的の場合は、MediaCore インポーター プラグインを開発する必要があります。

上記の制約によって、AEIO インポーターと MediaCore インポーターのどちらを構築する必要があるかがまだ決まっていない場合は、Premiere Pro、Media Encoder、Prelude、SpeedGrade、Audition などのビデオおよびオーディオ アプリケーション全体で使用できる MediaCore インポーターを構築することをお勧めします。

---

## 仕組み

AEIO は、エントリ ポイント関数内から、特定のイベントに応答して呼び出される関数の名前を関数ポインタの構造に設定します。。これらの関数フックの多くはオプションです。

---

## After Effects では何ができるでしょうか?

多くの AEIO フック関数では、After Effects にデフォルトの処理を実行するように依頼できます（この機能については各フックの説明に記載されています）。

やむを得ない理由がない限り、関数から `AEIO_Err_USE_DFLT_CALLBACK` を返し、After Effects に処理を任せてください。

これは、実装を開始する前に呼び出しシーケンスを学習する良い方法でもあります。

---

## AEIO の登録

プラグインのエントリ ポイント関数中に、AEIO がサポートするファイル タイプを記述する AEIO_ModuleInfo と、ファイル処理関数を指す AEIO_FunctionBlock 構造体を設定します。これらの関数の一部では、AEIO_Err_USE_DFLT_CALLBACK を返すことで After Effects のデフォルトの動作に依存できます。ただし、必要な署名に一致する関数を提供する必要があります。これらの構造を両方とも入力したら、[AEGP_RegisterSuite5](../aegps/aegp-suites#aegp_registersuite5) から `AEGP_RegisterIO()` を呼び出します。

レジスタ呼び出しに渡す AEIO_ModuleInfo では、After Effects がインポートダイアログ、Windows の「ファイルの種類」ドロップダウン、または macOS の有効ドロップダウンで使用するファイルタイプと説明情報を指定します。 CS6 では、より長い拡張子を持つ組み込みインポーターがいくつかありますが、ファイル拡張子は 3 文字を超えることはできません。

---

## インスペック、アウトスペック

ほとんどのインポート関連関数では、`AEIO_InSpecH` が渡されます。ほとんどの出力関連関数では、`AEIO_OutSpecH` が渡されます。

この謎のハンドルは何ですか？これらの不透明なデータ ハンドルを [AEGP_IOInSuite5](new-kids-on-the-function-block#aegp_ioinsuite5) および [AEGPIOOutSuite4](new-kids-on-the-function-block#aegpiooutsuite4) とともに使用して、インポートまたは出力に関する情報を設定またはクエリすることができます。

たとえば、インポートでは、AEGP_IOInSuite で `AEGP_SetInSpecDimensions` を呼び出すときに `AEIO_InSpecH` を使用します。

また、エクスポート中に、`AEGP_IOOutSuite` で `AEGP_GetOutSpecDimensions` を呼び出すときは、`AEIO_OutSpecH` を使用します。したがって、これらのハンドルを使用して、After Effects と入力または出力の詳細に関する情報を交換します。
