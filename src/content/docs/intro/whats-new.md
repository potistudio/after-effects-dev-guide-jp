---
title: '変更点'
---
After Effects プラグインを初めて開発する場合は、「新機能」セクションをスキップして、[How To Start Creating Plug-ins](how-to-start-creating-plug-ins) に直接アクセスしてください。

---

## 25.6 SDK の新機能

### Windows on Arm のサポート

* AE SDK は、Arm 上の Windows 用のエフェクトの構築をネイティブにサポートするようになりました。アドビは企業として、多くの製品でのネイティブ サポートを進めており、Premiere Pro、After Effects、Adobe Media Encoder の Arm ネイティブ バージョンの Windows のベータ リリースが利用可能です。これらのアプリケーションのネイティブ バージョンを実行する場合は、ネイティブにコンパイルされたエフェクトのみが機能するため、すぐに Windows on Arm サポートを使用してエフェクトを更新することが重要です。詳細については、[Windows on Arm Support](windows-on-arm-support) セクションを参照してください。

---

## 25.2 SDK の新機能

AEGP_LayerSuite9 の一部として、オブジェクト タイプが 3D モデルの場合、AEGP_GetLayerObjectType は AEGP_ObjectType_3D_MODEL を返すことができるようになりました。

---

## After Effects 2022 の新機能

After Effects 2022 には、マルチフレーム レンダリングをサポートする最初の完全な公開リリースが含まれています。 2021 年 10 月にリリースされた関連する AE Effects SDK には、PF_Iterate スレッドの最大数を増やすための 1 つの変更が含まれています。

---

## 2021 年 3 月の After Effects SDK の新機能

### マルチフレーム レンダリングの変更

1. `PF_OutFlag2_SUPPORTS_THREADED_RENDERING` フラグの最終的な動作が導入されました。マルチフレーム レンダリングのサポートを示すためにこのフラグを設定すると、`sequence_data` に保存されているデータがレンダリング時に強制的に const/読み取り専用になり、`sequence_data` へのアクセスはスイート `PF_EffectSequenceDataSuite1` を介して行われるようになります。
2. 新しい sequence_data 動作に対応するようにプラグインを更新できない場合、新しいフラグ `PF_OutFlag2_MUTABLE_RENDER_SEQUENCE_DATA_SLOWER` を `PF_OutFlag2_SUPPORTS_THREADED_RENDERING` と一緒に設定できるようになりました。 After Effects では、レンダリングの同時実行性をそれほど適用できなくなるため、このフラグを設定するエフェクトのパフォーマンスが向上します (そのため \_SLOWER フラグ名が付けられます)。
3. 新しいスイートである Compute Cache (以前は 3 ウェイ チェックアウト キャッシュと呼ばれていました) が利用可能になりました。このスイートは、フレームのレンダリングに必要なデータの計算とキャッシュを行う複数のレンダリングスレッドをサポートするために、プラグインが sequence_data の代替または補足として使用できるスレッドセーフ キャッシュを提供します。

これらの変更により、今後 AE ベータ ビルドとのマルチフレーム レンダリングの互換性を維持するには、2021 年 3 月の SDK に更新してコンパイルする必要があります。 2020 年 6 月の SDK でコンパイルされたプラグインは、AE 22.0x6 (2021 年 6 月 29 日リリース) 以降、`PF_OutFlag2_SUPPORTS_THREADED_RENDERING` が設定されている場合でも、マルチフレーム レンダリングのサポートを中止します。

詳細については、[Multi-Frame Rendering in AE](../effect-details/multi-frame-rendering-in-ae) を参照してください。

### Apple シリコンのサポート* AE SDK は、Apple Silicon 用のエフェクトの構築をネイティブにサポートするようになりました。 After Effects 自体はまだ Apple Silicon 上で実行されていませんが、Adobe は企業として、多くの製品でのネイティブサポートを進めています。 Premiere Pro などのアプリケーションではネイティブ バージョンが利用できるようになり、モーション グラフィック テンプレートなどの機能によってエフェクトを Premiere Pro に読み込むことができます。 Premiere Pro のネイティブ バージョンを実行している場合は、ネイティブにコンパイルされたエフェクトのみが機能するため、Apple Silicon サポートを使用してエフェクトをすぐに更新することが重要です。詳細については、[Apple Silicon Support](apple-silicon-support) セクションを参照してください。

### エフェクトからシンボルをエクスポートする

* macOS ではデフォルトでシンボルをエクスポートしないように SDK サンプルが更新されました。詳細については、[Exporting Symbols in Effects](symbol-export) を参照してください。

### 2021 年 3 月の SDK をダウンロードする

SDK は、Adobe Developer Console ([https://adobe.io/after-effects/](https://adobe.io/after-effects/)) からダウンロードできます。

### After Effects ベータ版ビルド

この SDK の AE ホスト側の変更にアクセスするには、Creative Cloud デスクトップ アプリから新しい After Effects ベータビルドをダウンロードする必要があります。ビルド 18.2x11 以降は、2021 年 3 月の SDK でサポートされています。

---

## 2020 年 6 月以降の After Effects ベータ版の新機能

AE (現在はベータ ビルドのみ) がマルチフレーム レンダリングをサポートするようになりました。詳細については、[Multi-Frame Rendering in AE](../effect-details/multi-frame-rendering-in-ae) を参照してください。

---

## CC 2019 (16.0) の新機能は何ですか?

GPU エフェクトの処理方法にいくつかの変更を加えました。詳細については、「GPU エフェクトの変更」を参照してください。

---

## 15.0 の新機能は何ですか?

After Effects は、Premiere Pro で以前サポートされていた *GPU エフェクト レンダリング* をサポートするようになりました。 「ADBE」を含む一致名を持つ不明なエフェクトは GPU レンダリングから除外されるため、GPU エフェクトのいずれかに独自のカスタム一致名があることを確認してください。 GPU レンダリングをサポートするエフェクトには、エフェクト パネルに GPU バッジが表示されます。

Premiere Pro SDK の GPU エフェクト サンプル プロジェクトは、AE で GPU エフェクトとして登録できるように更新されましたが、レンダリング出力にはまだ作業が必要です。

新しいエントリ ポイントが定義され、レガシー PiPL リソースに依存せずに、実行時にエフェクトがホストに基本情報を登録できるようになりました。この方法で、エフェクトは単一のバイナリに複数のエントリ ポイントを登録できます。 Premiere Pro は、このエントリ ポイントをサポートする最初のホストであり、After Effects は将来のリリースでこれをサポートする予定です。

エフェクト サンプル プロジェクトは、下位互換性のために PiPL を維持しながら、このアプローチを使用するように更新されました。`AEGP_StreamSuite` はバージョン 5 になり、[AEGP_GetExpression()](../aegps/aegp-suites#aegp_streamsuite5) と [AEGP_SetExpression()](../aegps/aegp-suites#aegp_streamsuite5) は Unicode をサポートするようにアップグレードされました。

`PF_AdvTimeSuite` はバージョン 4 になり、現在のコンプ内のフレームのインデックスを返す新しい呼び出し [PF_TimeCountFrames()](../effect-details/useful-utility-functions#pf_advtimesuite4) が追加されました。

新しい AEGP Math Suite は、行列乗算の便利な呼び出しを提供します。

アプリケーションのフォントが Adob​​e Clean になりました。以前は、After Effects の UI で使用されていたフォントは、Windows では Tahoma、macOS X では Lucida Grande でした。これは独自のフォントであるため、UI で使用できるようにすることはできません。

---

## CC 2017.1 (14.2) の新機能は何ですか?

- レイヤーパラメータにはマスクとエフェクトを含めることができます

マットの設定やディスプレイスメント マップなど、レイヤーを入力として使用するエフェクトは、レイヤーのソースのみではなく、入力レイヤーのマスクとエフェクトをターゲットにできるようになりました。これは、エフェクトによって参照できるようにレイヤーを事前に構成する必要がないことを意味します。

エフェクトにレイヤー パラメーターが含まれる場合、レイヤー セレクターの右側にある新しいメニューを使用して、ソース、マスク、またはエフェクトから入力レイヤーをターゲットにするかどうかを選択できます。

- ソース: レイヤーのソースのみを対象とします。マスクとエフェクトは無視されます。
- マスク: マスクが適用された後のレイヤーをターゲットにします。効果は無視されます。
- エフェクトとマスク: マスクとエフェクトが適用された後のレイヤーをターゲットにします。

このコントロールは、レイヤー ビューア パネルの下部にある [表示] メニューに似ており、ソース、マスク、または個々のエフェクトなど、レンダリング順序のさまざまな位置からレイヤーをレンダリングできます。

これはユーザー向けのオプションであるため、デザインはその効果を意識しないように設計されています。エフェクトの観点から見ると、入力にはエフェクトに変更を加えることなく、上流のエフェクトとマスクが含まれるだけです。レイヤー パラメーターを使用するエフェクトについては、テストに関する推奨事項をいくつか示します。

- 効果は引き続き期待どおりに機能します。
- ソース/マスク/エフェクトのレイヤーパラメータで新しいコントロールを使用すると、エフェクトが機能します。
- 古いプロジェクトを開いたり、以前のバージョンのプロジェクトにセーブバックしても、効果は失われません。
- エフェクトが自己参照できないことを確認します。つまり、レイヤー上のエフェクトを同じレイヤーの入力として使用することはできません。
- スイートの機能強化

PF_AdvTimeSuite は現在バージョン 3 で、より高いフレーム レートをサポートする、改訂された `PF_TimeDisplayPrefVersion` パラメーターを使用する改訂された [PF_GetTimeDisplayPref()](../effect-details/useful-utility-functions#pf_advtimesuite4) 呼び出しを提供します。
以前のバージョン 2 の呼び出しでは、構造体でサポートされている範囲を超える値に問題がある場合にエラーを返すことができるようになりました。Comp Suite は現在バージョン 11 で、選択範囲を特定のレイヤー インデックスに移動するための新しい呼び出し [AEGP_ReorderCompSelection()](../aegps/aegp-suites#aegp_compsuite11) が追加されています。
`AEGP_SetSelection()` と一緒に使用する必要があります。

---

## CC 2017 (14.1) の新機能は何ですか?

[AEGP Item Suite](../aegps/aegp-suites#aegp_itemsuite9) および [AEGP Render Queue Item Suite](../aegps/aegp-suites#render-queue-item-suite) の Unicode サポート。

---

## CC 2017 (14.0) の新機能は何ですか?

GLator サンプルが戻ってきました!エフェクトプラグインでの適切な OpenGL コンテキスト管理を示すために更新されました。

---

## CC 2015.3 (13.8) の新機能は何ですか?

PF_OutFlag_I_AM_OBSOLETE が Premiere Pro でサポートされるようになりました。また、Premiere Pro のエフェクト カスタム UI は、Retina ディスプレイなどの高 DPI ディスプレイをサポートするようになりました。

---

## CC 2015 (13.6) の新機能は何ですか?

新しい AEGP アイテム ビュー スイート。これにより、アイテム ビューの再生時間を取得する方法が提供されます。このリリースでは、合成ケースのみが実装されています。戻される時間は、再生時はビューの再生時間、それ以外の場合は現在 (針) 時間になります。

AEGP_RenderNewItemSoundData() が再加工され、13.2 と同様の機能を提供します。

---

## CC 2015 (13.5.1) の新機能は何ですか?

このリリースでは、スレッドの変更により 13.5 で問題が発生したいくつかのオーディオ API が修正されています。 13.5 では、UI スレッドで呼び出される場合、AEGP_RenderNewItemSoundData() は A_Err_GENERIC を返します。これにより、UI スレッドで呼び出されたときに機能が復元されます。

デッドロックを回避するために、PF_Cmd_UPDATE_PARAMS_UI のみで、AEGP_RenderNewItemSoundData() は無音を返すようになりました。このコンテキストでは以前のように機能しなくなりますが、他の場所では引き続き正常に機能します。

---

## CC 2015 (13.5) の新機能は何ですか?

- 個別の UI スレッドとレンダリングスレッド

After Effects のこのリリースには、UI (メイン) スレッドをレンダリングスレッドから分離するための主要なアーキテクチャの変更が含まれています。レンダースレッドは、PF_Cmd_RENDER、PF_Cmd_SMART_PRERENDER、PF_Cmd_SMART_RENDER などのセレクターを送信してプラグインに影響を与えます。 UI スレッドは、PF_Cmd_SEQUENCE_SETUP、PF_Cmd_USER_CHANGED_PARAM、PF_Cmd_DO_DIALOG、PF_EVENT_DRAW などのセレクターを送信します。 PF_Cmd_SEQUENCE_RESETUP は

レンダリングスレッドと UI スレッドの両方で送信されます。

これらの変更は、インタラクティブなパフォーマンスと応答性を向上させるためのものです。同時に、新しい設計ではいくつかの新しい要件が導入され、既存のプラグインが依存していた前提が崩れる可能性があります。主な変更点の一部を次に示します。

1. レンダースレッドによってプロジェクトを変更できなくなりました (実際、レンダースレッドにはプロジェクトの独自のローカル コピーが存在します)。
2. レンダリングでは、カスタム UI 更新のために変更されたシーケンス データを UI スレッドに渡すことができません
3。一般に、UI スレッドはフレームの同期レンダリングなどの時間のかかる操作を実行すべきではなくなりました。

プラグインは影響を受けていますか?次の問題をテストします。

1. UI パラメータの変更後にレンダリングが更新されない。これは、現在レンダリングにコピーされていない可能性がある sequence_data に依存しているためです。
2.コンポジションウィンドウでクリック/ドラッグ中にレンダリングが更新されない(同様の理由)
3. レンダリングで生成された sequence_data に依存しているため、カスタム エフェクト UI が更新されません (別のプロジェクト内にあり、レンダリング プロジェクトが不変で、キャッシュに以前にレンダリングされたフレームが含まれているため、UI では利用できなくなります)
4. レンダリングスレッド (または UI スレッド) での操作が予期されていないことを示すエラー

一般に、UI を保持または更新する計算は、レンダリングスレッドからプッシュするのではなく、UI スレッドからプルする必要があります。このようなケースでは、新しいものを使用する必要がある場合があります。

13.5 API または過去のリリースとは異なるソリューション。

- より効率的なシーケンス データ処理の必要性

PF_OutFlag2_SUPPORTS_GET_FLATTENED_SEQUENCE_DATA

PF_Cmd_GET_FLATTENED_SEQUENCE_DATA

バージョン 13.2 までは、sequence_data のシリアル化/フラット化には常に、データ構造の割り当て解除と再割り当てが含まれていました。 13.5 以降、エフェクトの変更が加えられると、シリアル化/フラット化がさらに頻繁に発生します。なぜ？ AE は、UI スレッドからレンダースレッドに送信して両方の同期を保つために、プロジェクトの変更をシリアル化/フラット化する必要があります。

このプロセスをより効率的にするために、13.5 以降、AE は、既存のデータの割り当て解除と再割り当てを必要とせずに、PF_Cmd_GET_FLATTENED_SEQUENCE_DATA を送信してシーケンス データを要求できるようになりました。このセレクターと PF_Cmd_SEQUENCE_FLATTEN の主な違いは、エフェクトが現在使用している元の構造体を破棄せずに、正しいフラット化された状態のコピーが返されることです。コード例については、PathMaster サンプル プロジェクトを参照してください。

これは最終的に、スレッドセーフになるように再構築されたプラグインに必要になります (下記の PF_OutFlag2_AE13_5_THREADSAFE を参照)。由緒ある PF_Cmd_SEQUENCE_FLATTEN は、将来のバージョンでは最終的にサポートされなくなります。

- PF_OutFlag_FORCE_RERENDER の変更

可能であれば、GuidMixInPtr() (次のセクションで説明)、任意波形データ、または PF_ChangeFlag_CHANGED_VALUE のいずれかを使用して再レンダリングをトリガーすることをお勧めします。これらすべてにより、キャッシュされたフレームを元に戻す後に再利用できます。注: 14.0 では、レイヤーまたはパスのパラメーターに PF_ChangeFlag_CHANGED_VALUE を設定しても再レンダリングはトリガーされません。代わりに、AEGP_StreamSuite を使用して値の設定を変更できます。

>AEGP_SetStreamValue()。

FORCE_RERENDER は、sequence_data を UI スレッドからレンダー プロジェクト/エフェクト クローンにコピーして一致を保つ必要がある場合にも引き続き必要です。

FORCE_RERENDER は、レンダリング リクエストがキャッシュを使用するかどうかに関係なく、このトリガーになります。レンダリング状態の管理に必要な API の完全なセットが整ったら、FORCE_RERENDER を非推奨にすることができます。

FORCE_RERENDER は、sequence_data の UI コピーをレンダースレッドのコピーと同期する必要があるため、以前のすべての状況で機能するわけではありません。

FORCE_RERENDER は、PF_Cmd_USER_CHANGED_PARAM 中に設定すると機能します。 CLICK および DRAG イベントでも機能しますが、PF_Cmd_GET_FLATTENED_SEQUENCE_DATA が実装されている場合に限ります。これは、マウス操作の途中で平坦化や UI 状態の損失を防ぐために必要です。 GET_FLATTENED がないと、新しい FORCE_RERENDER 動作はオンになりません。

- キャッシュされたフレームの GUID

PF_OutFlag2_I_MIX_GUID_DEPENDENCIES

GuidMixInPtr()

SmartFX のみで使用されます。カスタム UI または PF_Cmd_DO_DIALOG がシーケンス データを変更する場合、またはレンダリング結果が考慮されていない他のものに依存しており、再レンダリングが必要になる場合は、これを使用します。 PF_Cmd_SMART_PRERENDER 中に、エフェクトは GuidMixInPtr() を呼び出して、レンダリングに影響を与える追加の状態をキャッシュされたフレームの内部 GUID に混合できます。この GUID を使用して、AE はフレームがすでに存在するかどうか、またはレンダリングする必要があるかどうかを判断できます。 SmartyPants サンプル プロジェクトの例を参照してください。

これは、プラグインがレンダリングに他に何を考慮しているかをホストが認識していなかったため、キャッシュからフレームを削除する古いメカニズム PF_OutFlag_FORCE_RERENDER および PF_Cmd_DO_DIALOG に対する改善です。これは、PF_OutFlag2_OUTPUT_IS_WATERMARKED の代わりに使用することもできます。

- UIをブロックせずにフレームを非同期にリクエストします

PF_OutFlag2_CUSTOM_UI_ASYNC_MANAGER

PF_GetContextAsyncManager() AEGP_CheckoutOrRender_ItemFrame_AsyncManager() AEGP_CheckoutOrRender_LayerFrame_AsyncManager()

このようなレンダリングが以前に副作用またはキャンセルされた暗黙性によってトリガーされていた場合(カスタム UI ヒストグラム描画など)、プラグイン内部からは有効期間が明確ではないため、新しい「非同期マネージャー」を使用します。これは、エフェクト カスタム UI に対する複数の同時非同期リクエストを処理でき、他の AE UI 動作との対話を自動的にサポートします。

注: フレームの非同期取得は、受動的な描画状況を処理する場合に推奨されますが、ユーザー アクションによってプロジェクトの状態が更新される場合には推奨されません。 (1) 特定のユーザーのクリックに応答し、かつ 2) 結果としてプロジェクトを更新する必要がある場合は、同期 AEGP_RenderAndCheckoutLayerFrame() をお勧めします。

SDK の新しい HistoGrid サンプルは、1 つ以上のフレーム レンダリングが必要な場合に、UI スレッドで完全に非同期のカスタム UI DRAW イベント処理を行う方法を示しています。例えば効果ペインに表示されるヒストグラムを計算します。上流パラメータをドラッグして変更しても、マウスをその上に置くまでヒストグラム描画が更新されない可能性があるという既知のバグがまだ存在することに注意してください。

- UI からエフェクトのレンダリング出力を取得

キーヤーなどのエフェクトや、後処理されたビデオのヒストグラムを描画するエフェクトは、AEGP_LayerRenderOptionsSuite の新しい関数 AEGP_NewFromDownstreamOfEffect() を使用して、必要な AEGP_LayerRenderOptionsH を取得できます。この関数は UI スレッドからのみ呼び出すことができます。

- レンダリングスレッドでの AEGP の使用

AEGP 呼び出しが危険に使用される可能性がある場合 (間違ったスレッドからの使用やレンダリング時のプロジェクトの状態の変更など) の検証を強化しました。コードがそのようなケースに遭遇すると、新たなエラーが発生する可能性があります。たとえば、レンダースレッドで次の呼び出しを行うとエラーが発生します。

suites.UtilitySuite5()->AEGP_StartUndoGroup() suites.StreamSuite2()->AEGP_GetStreamName() suites.StreamSuite2()->AEGP_SetExpressionState() suites.StreamSuite2()->AEGP_SetExpression() suites.StreamSuite2()->AEGP_GetNewLayerStream() suites.StreamSuite2()->AEGP_DisposeStream() suites.EffectSuite3()->AEGP_DisposeEffect() suites.UtilitySuite5()->AEGP_EndUndoGroup()

解決策は、これらの呼び出しを UI スレッドに移動することです。パッシブ UI 更新のセレクター (PF_EVENT_DRAW など) は、プロジェクトの状態を変更する場所ではありません。

より厳格な要件のもう 1 つの例は、AEGP_RegisterWithAEGP() です。ドキュメントには、この関数が PF_Cmd_GLOBAL_SETUP で呼び出される必要があることが常に記載されています。ただし、以前のバージョンでは、プラグインは他の時点でも問題が発生することなくこの関数を呼び出すことができました。 13.5 ではもうありません。それ以外のときにこの関数を呼び出すと、クラッシュが発生する可能性があります。- PF_Cmd_SEQUENCE_RESETUP は UI またはレンダリングスレッドで呼び出されますか?

PF_Cmd_SEQUENCE_RESETUP でのみ有効な PF_InFlag_PROJECT_IS_RENDER_ONLY フラグが追加されました。これは、エフェクト インスタンスがレンダリング専用であるかどうかを示します。その場合、プロジェクトは完全に読み取り専用として扱われ、そのエフェクト インスタンスでは UI 関連のセレクターを受け取ることはありません。これを使用すると、レンダリングに必要のない UI のみの初期化を最適化して取り除くことができます。このフラグが false の場合は、通常どおり UI をセットアップする必要があります。これは、レンダリング時のエラー報告を避けるために使用しないでください。レンダリング時のエラーは、既存の SDK メカニズムを介して通常どおり報告される必要があります。

- デッドロックを回避するための変更

開発中に、特定の呼び出しの使用法でデッドロックが発生する可能性があることが判明しました。これを避けるためにシートベルトが導入されました。特定の呼び出しを使用する場合、PF_Cmd_UPDATE_PARAMS_UI でこのようなケースが発生します。これは、UI で使用されるこれらの呼び出しでは非推奨の同期動作が原因です。

PF_Cmd_UPDATE_PARAMS_UI のみで、レイヤー パラメーターの PF_PARAM_CHECKOUT() は、実際にレンダリングされたピクセルではなく、同じサイズの黒いフレームを返すことなどを除いて、以前と同様に動作します。パラメータの検出を有効/無効にするためにこれを使用したコードは、以前と同様に機能するはずです。 PF_Cmd_UPDATE_PARAMS_UI の外で解析フレームの取得などにこれを使用したコードは、以前と同様に機能します。

PF_Cmd_UPDATE_PARAMS_UI のみで、PF_GetCurrentState() はランダムな GUID を返すようになりました。このコンテキストでは以前のように機能しなくなりますが、他の場所では引き続き正常に機能します。

上記の使用はまれですが、これが影響する場合は、回避策についてお問い合わせください。

- 廃止されました

AEGP_RenderAndCheckoutFrame() (UI スレッド上)。同期レンダリングは対話性をブロックするため、通常、この呼び出しは UI スレッドでは使用しないでください。

レンダリングスレッドで使用しても問題ありません。これが UI スレッドで依然として役立つ可能性がある 1 つのケースは、AE プロジェクトを更新するパラメーターを計算するためにフレームを必要とする UI ボタン​​のようなケースです。

たとえば、フレームを取得し、その結果としてエフェクト パラメータを調整する「自動カラー」ボタンです。

このブロック操作が遅い場合の進行状況ダイアログのベータ版が実装されていますが、UI スレッドでのこの呼び出しの使用は、この特殊な場合に限定する必要があります。ダイアログのデザインは最終的なものではありません。

- スレッドセーフ効果のフラグ

PF_OutFlag2_AE13_5_THREADSAFEスレッド用に更新されたプラグインは、このフラグを使用して、プラグインが UI スレッド <> レンダリングスレッドセーフであることが期待されていることを AE に伝える必要があります。

このフラグは、異なる AE プロジェクト コピー上の異なるスレッドが同時に有効であるが、同じインスタンスにはアクセスできないことを AE に伝えます。複数のレンダリングスレッドはまだ使用されていませんが、これは将来のリリースで役立つでしょう。

- 7 以降のエフェクト バージョンのサポート (新しい最大バージョンはメジャー バージョン 127)

バージョン 7 以降のエフェクトは、現在の SDK ヘッダーでビルドされた場合、13.5 で適切にレポートされるようになりました。これらの再コンパイルされたエフェクトを 13.5 より古い AE バージョンで使用することは可能ですが、内部的にはバージョン番号がモジュロ 8 でラップされます (たとえば、AE は内部的にエフェクト バージョン 8 をバージョン 0 として認識します)。

これは、古い AE によってエラー ダイアログ表示に表示されるバージョンに影響を与え、使用状況レポートに影響を与える可能性があります。

64 ビットへの移行に伴い、多くの古いプラグインが AE でアンロード可能になったため、このラッピングによって現在使用されている実際のプラグインとあいまいさが生じる可能性は低いはずです (これらのプラグインのバージョン番号がここ数年で急速に増加している場合を除く)。

ただし、古い SDK でビルドして 8 以降のバージョンを使用すると、プラグインが誤ったバージョンを AE に報告することになり、上位ビットが設定されるエフェクトの PiPL バージョン チェックとの不一致が発生します。これはサポートされていません。

古い SDK でビルドした場合は、エフェクトのバージョンを 7 以下に保つ必要があります。バージョン最大値の増加は、AE 13.5 以降のみが「認識」するバージョンに 4 つの新しい上位ビットを追加することによって実現されました。これらの新しい上位バージョン ビットは、元の既存のメジャー バージョン ビットと連続していません。中間ビットは無視してください。新しいバージョンのレイアウトは 16 進数または 2 進数で次のようになります。

0x 3C38 0000

^^ 16 進数マスクとしてのオリジナルのメジャー バージョン ビット 0 ～ 7

^^ 元の MAJOR バージョンのビット 8 ～ 127 を拡張する新しい HIGH ビット

0b 0011 1100 0011 1000 0000 0000 0000 0000

^^ ^ 16 進数マスクとしてのオリジナルの MAJOR バージョン ビット 0 ～ 7

^^ ^^無視/使用しないでください

^^ ^^ 新しい HIGH ビットは、元の MAJOR バージョンのビット 8 ～ 127 を拡張します。

これらのビットは、13.5 より前の AE バージョンでは無視されます。

- macOS 用の新しいインストーラー ヒント

開発者は、macOS X 上のプラグイン、スクリプト、プリセットのデフォルトの場所へのパスを新しい plist ファイルで見つけることができます (Windows レジストリ内のパスと同じ): /Library/Preferences/com.Adobe.After Effects.paths.plistWindows のレジストリでパス キーを使用するのと同じように、この plist の値を使用して、インストーラーまたはスクリプトがファイルを書き込む場所を指定できます: HKEY_LOCAL_MACHINESOFTWAREAdobeAfter Effects13.5

- 進行中の作業

AEGP_RenderAndCheckoutLayerFrame_Async() AEGP_CancelAsyncRequest()

この API は進行中であるため、まだ使用しないでください。

---

## CC 2014.1 (13.1) の新機能は何ですか?

PF_CreateNewAppProgressDialog()

レンダリングの速度が遅いことを検出しない限り、ダイアログは開きません。 (2 秒のタイムアウト)。

---

## CC 2014 (13.0) の新機能は何ですか?

CC 2014 以降、After Effects は [PF_UpdateParamUI](../effect-details/parameter-supervision#pf_paramutilsuite3) を使用して行われたカスタム UI 高さの変更を受け入れるようになりました。

[AEGP Effect Suite](../aegps/aegp-suites#aegp_effectsuite4) はバージョン 4 になり、エフェクト マスクを操作するための新しい機能が追加されました。 [AEGP_RenderSuite](../aegps/aegp-suites#aegp_rendersuite4) はバージョン 4 になり、現在のフレーム チェックアウトを可能にする新しい関数 `AEGP_RenderAndCheckoutLayerFrame` が追加されました。

非レンダリング時にエフェクトが適用されたレイヤー。これは、ボタンがクリックされ、レンダリング中に少し待ってもよい場合など、フレームを必要とする操作に役立ちます。

:::note
非同期ではないため、カスタム UI がフレームに基づいて描画する必要があるという一般的な問題は解決されません。

:::
レイヤーのレンダリング オプションは、新しい [AEGP_LayerRenderOptionsSuite](../aegps/aegp-suites#aegp_renderoptionssuite4) を使用して指定されます。

[Mercury Transmit](other-integration-possibilities#mercury-transmit) プラグインと [HTML5 Panels](other-integration-possibilities#html5-panels) がサポートされるようになりました。

---

## CC (12.0) の新機能は何ですか?

エフェクト名の長さは、以前は 31 文字でしたが、最大 47 文字にできるようになりました。

[PF_AngleParamSuite](../effect-details/parameters-floating-point-values#pf_angleparamsuite1) を追加し、角度パラメータの浮動小数点値を取得する方法を提供しました。 [PF App Suite](../effect-details/useful-utility-functions) バージョン 5 では、現在の言語をクエリする `PF_AppGetLanguage` が追加され、プラグインが正しい言語文字列を使用できるようになり、色をクエリできる新しい要素に対していくつかの新しい PF_App_ColorType 列挙値が使用できるようになります。

[AEGP Persistent Data Suite](../aegps/aegp-suites#persistent-data-suite) はバージョン 4 になり、いくつかの異なるアプリケーション BLOB の取得を選択するための新しいパラメーターが AEGP_GetApplicationBlob に追加されました。時間と ARGB 値を取得/設定する新しい関数もあります。

[AEGP Composition Suite](../aegps/aegp-suites#aegp_compositesuite2) はバージョン 10 になり、レイヤー名またはソース名が表示されるかどうか、ブレンド モード列が表示されるかどうかを確認/変更する新しい機能が追加されました。また、モーション ブラー アダプティブ サンプル制限を取得および設定するための新しい関数も追加されました。

[AEGP Layer Suite](../aegps/aegp-suites#aegp_layersuite9) はバージョン 8 になり、レイヤーのサンプリング品質を設定/取得するための新しい関数が追加されました。 [AEGP_CanvasSuite](../artisans/artisan-data-types#aegp_canvassuite8) もバージョン 8 になりました。新しい関数 `AEGP_MapCompToLayerTime` は、AEGP_ConvertCompToLayerTime とは異なり、折りたたまれたコンプまたはネストされたコンプでの時間の再マッピングを処理します。[AEGP_UtilitySuite](../aegps/aegp-suites#aegp_utilitysuite6) はバージョン 6 になり、新しい Unicode 対応関数 `AEGP_ReportInfoUnicode` が追加されました。もう 1 つの新しい関数 `AEGP_GetPluginPaths` は、プラグインおよび After Effects 実行可能ファイル自体に関連するいくつかの便利なパスを提供します。

`AEGP_NewPlaceholderFootageWithPath` の動作が更新され、file_type が適切に設定されるようになりました。そうでないと警告が表示されます。

`AEGP_InsertMenuCommand` は、[ファイル] > [新規] サブメニューにメニュー項目を挿入できるようになりました。

[AEGP_IOInSuite](../aeios/new-kids-on-the-function-block#aegp_ioinsuite5) はバージョン 5 になり、ネイティブ開始時間を取得/設定/クリアするための新しい関数と、フッテージのドロップフレーム設定を取得/設定するための新しい関数が追加されました。

---

## CS6.0.1 (11.0.1) の新機能は何ですか?

11.0.1 で新たに追加された AE エフェクト API バージョンは 13.3 に増加しました。

これにより、エフェクトで 11.0 と 11.0.1 を区別できるようになります。

SmartFX エフェクトで `PF_OutFlag2_AUTOMATIC_WIDE_TIME_INPUT` と `PF_OutFlag_NON_PARAM_VARY` の両方を使用する場合、11.0 のグローバル パフォーマンス キャッシュにバグがあります。

`PF_Cmd_SMART_PRE_RENDER` 中に `checkout_layer` を呼び出すと、`PF_CheckoutResult` に空の四角形が返されます。

回避策は、もう一度電話をかけることです。この回避策は 11.0.1 では必要なくなりました。

---

## CS6 (11.0) の新機能は何ですか?

パラメーター UI の処理を​​改善するために、いくつかの改良を加えました。 `PF_PUI_INVISIBLE` パラメータ UI フラグが After Effects でサポートされるようになりました。これは、プラグインがレンダリングに影響する隠しパラメータを必要とする場合に役立ちます。プラグインが [PF_UpdateParamUI](../effect-details/parameter-supervision#pf_paramutilsuite3) を使用してパラメータを無効にした場合、その状態を UI フラグに保存するようになりました。これにより、プラグインは将来フラグをチェックして、フラグが無効になっているかどうかを確認できるようになります。新しいフラグ `PF_ParamFlag_SKIP_REVEAL_WHEN_UNHIDDEN` を使用すると、親を回して開いたり、パラメーターをスクロールしてエフェクト コントロール パネルやタイムライン パネルに表示したりすることなく、パラメーターを再表示できます。

プラグインが試用モードのときに出力上にウォーターマークをレンダリングするエフェクトは、新しい `PF_OutFlag2_OUTPUT_IS_WATERMARKED` を使用して、ウォーターマーク レンダリング モードがオンかオフかを After Effects に伝えることができるようになりました。

新しいグローバル パフォーマンス キャッシュは、古いキャッシュされたフレーム [when changing your effect's rendering](../effect-details/tips-tricks#caching-behavior) を破棄するように After Effects に指示する必要があることを意味します。

`PF_HasParamChanged` と `PF_HaveInputsChangedOverTimeSpan` を削除し、代わりに [PF_AreStatesIdentical](../effect-details/parameter-supervision#pf_paramutilsuite3) を提供しました。

カスタム UI を提供するエフェクトは、`PF_Event_MOUSE_EXITED` を受信して​​、マウスがレイヤーまたはコンプ パネルから出たという通知を取得できるようになりました。 `PF_ParamUtilsSuite` は現在バージョン 3 です。

`PF_GET_PLATFORM_DATA` には、実行可能ファイルとリソース ファイルのワイド文字パスを取得するための新しいセレクターが追加されました: `PF_PlatData_EXE_FILE_PATH_W` および `PF_PlatData_RES_FILE_PATH_W`。以前の非ワイド セレクターは非推奨になりました。

3D は AE CS6 の主要なテーマです。新しい `AEGP_LayerFlag_ENVIRONMENT_LAYER` が追加されました。新しい [layer streams](../aegps/aegp-suites#aegp_streamsuite5) が多数追加されました。

さらに、`AEGP_LayerStream_SPECULAR_COEFF` は `AEGP_LayerStream_SPECULAR_INTENSITY` に、`AEGP_LayerStream_SHININESS_COEFF` は `AEGP_LayerStream_SPECULAR_SHININESS` に、`AEGP_LayerStream_METAL_COEFF` は単に `AEGP_LayerStream_METAL` に名前が変更されました。新しいスイート [AEGP_RenderQueueMonitorSuite](../aegps/aegp-suites#render-queue-monitor-suite) は、レンダー キュー マネージャーがレンダーの任意の時点で何が起こっているかを把握するために必要なすべての情報を提供します。

[AEGP Mask Suite](../aegps/aegp-suites#aegp_masksuite6) は現在バージョン 6 で、マスク フェザー フォールオフ タイプを取得および設定する関数を提供します。 [AEGP Mask Outline Suite](../aegps/aegp-suites#aegp_maskoutlinesuite3) は現在バージョン 3 で、マスク アウトラインのフェザー情報を取得および設定するためのアクセスを提供します。

マスクに依存するエフェクトに、新しいフラグ `PF_OutFlag2_DEPENDS_ON_UNREFERENCED_MASKS` が使用できるようになりました。

[AEGP Composition Suite](../aegps/aegp-suites#aegp_compositesuite2) は現在バージョン 9 です。 AEGP_CreateTextLayerInComp および

AEGP_CreateBoxTextLayerInComp に新しいパラメータ select_new_layerB が追加されました。

[AEGP Render Suite](../aegps/aegp-suites#aegp_rendersuite4) はバージョン 3 になり、レンダー レシートの GUID を取得する新しい関数が追加されました。

最後に、2 つの新しい読み取り専用 [Dynamic Stream](../aegps/aegp-suites#aegp_dynamicstreamsuite4) フラグ、`AEGP_DynStreamFlag_SHOWN_WHEN_EMPTY` と `AEGP_DynStreamFlag_SKIP_REVEAL_WHEN_UNHIDDEN` を追加しました。

Premiere Pro CS6 で実行されるエフェクトのために、`PF_CHECKOUT_PARAM` から 32 ビット浮動小数点数および YUV フレームを取得する機能が追加されました。

---

## ...CS6 より前の新機能は何でしょうか?

これまでの歴史については、SDK の廃止されたコピーを参照してください (これは当社では提供していません。誰かが古いソフトウェアの開発を依頼する場合は、SDK を提供するのが最善です)。
