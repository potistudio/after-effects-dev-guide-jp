---
title: 'グローバル/シーケンス/フレームデータ'
---
After Effects では、プラグインはグローバル、シーケンス、フレームの 3 つのスコープでデータを保存できます。情報を保存する場所を慎重に検討してください。選択を誤ると、パフォーマンスに影響を与えたり、プラグインがユーザーにとってわかりにくくなる可能性があります。

エフェクトのすべてのインスタンスに共通する情報には、グローバル データを使用します: 静的変数とデータ、ビットマップ、他の DLL または外部アプリケーションへのポインター。エフェクトがマルチフレーム レンダリングをサポートしている場合、静的変数またはグローバル変数には競合状態があってはなりません (詳細については、[What does it mean for an effect to be thread-safe?](multi-frame-rendering-in-ae#what-does-it-mean-for-an-effect-to-be-thread-safe) を参照してください)。

プラグインのこのインスタンスに固有のもの (UI 設定、テキスト文字列、パラメーターに保存されていないカスタム データ) はすべてシーケンス データまたは新しい [Compute Cache For Multi-Frame Rendering](multi-frame-rendering-in-ae#compute-cache-for-multi-frame-rendering) に保存します。

フレーム データは、特定のフレームのレンダリングに固有の情報に使用されます。ほとんどのマシンは一度にフレーム全体をメモリにロードできるため、これは使用されなくなりました。もちろん、IMAX を生成するユーザーは、あなたが行う最適化を高く評価するでしょう。

---

## 永続性

After Effects はシーケンス データをプロジェクト ファイルに保存しますが、グローバル データやフレーム データは保存しません。外部データを指すシーケンス データ内のポインターは、プロジェクトを再度開くと無効になる可能性が高いため、再接続する必要があります。このプロセスをシーケンス データの「フラット化」および「非フラット化」と呼びます。

:::note
コンピューティング キャッシュは、その内容をプロジェクト ファイルに保存しません。キャッシュに保存されたデータは、レンダリング中に再作成する必要があります。

:::
---

## シーケンスデータの検証

シーケンス データを慎重に検証することは、フレーム N がフレーム N-1 に依存し、シーケンス データ内で計算されたデータのキャッシュを使用する、時間をかけてシミュレーションを実行するエフェクトの場合に重要です。パラメータが変更されると、特定の計算データが有効でなくなる可能性がありますが、変更のたびにすべてを盲目的に再計算するのも無駄です。

フレーム N をレンダリングするよう求められた場合、キャッシュされたデータがフレーム N-1 まで計算されていると仮定して、[PF_ParamUtilSuite3](parameter-supervision#pf_paramutilsuite3) から `PF_GetCurrentState()` / `PF_AreStatesIdentical()` を呼び出して、現在のパラメータ設定を考慮して計算されたデータのキャッシュがまだ有効かどうかを確認します。

レイヤーパラメーター ([param[0]](../effect-basics/PF_ParamDef#param-zero) を含む) を含むすべてのパラメーター ([PF_ParamFlag_EXCLUDE_FROM_HAVE_INPUTS_CHANGED](../effect-basics/PF_ParamDef#parameter-flags) が設定されているパラメーターを除く) の状態が、経過した期間にわたってチェックされます。

変更追跡はタイムスタンプを使用して行われるため、これは効率的に行われます。

入力が変更されていない場合は、キャッシュを安全に使用できます。また、内部キャッシュ システムは、渡された範囲に一時的な依存関係があると想定します。。したがって、上流で何かが変更された場合、ホストのキャッシュは自動的に適切に無効化されます。

機能していることをテストするには、各フレームに 1 つのパラメータをキーフレームしてエフェクトを適用します。 RAM プレビューしてキャッシュを埋めてから、キーフレームの 1 つを変更します。関連するフレームとすべての依存フレーム (シミュレーションの場合は後続のフレームなど) はキャッシュ マークを失い、再レンダリングが必要になります。同様に、レイヤーパラメータのソースに対するアップストリームの変更により、時間選択的なキャッシュの無効化が発生する必要があります。

---

## フラット化されたシーケンス データとフラット化されていないシーケンス データ

シーケンス データが外部メモリ (ポインターまたはハンドル内) を参照している場合は、ディスク セーフ ストレージ用にデータをフラット化および非フラット化する必要があります。これは、独自の小型ファイル形式を作成することに似ています。

[PF_Cmd_SEQUENCE_FLATTEN](../effect-basics/command-selectors#sequence-selectors) を受信したら、ポインターによって参照されるデータを 1 つの連続したブロックに置き、後で古い構造を復元できるようにします。

シーケンス データに long へのポインターが含まれている場合は、フラット化されたデータを格納するために 4 バイトを割り当てます。プラットフォーム固有のバイト順序を処理する必要があります。

ユーザー (プラグインのコピーを 2 つ購入したユーザー) は、同じプロジェクトを macOS と Windows で動作させたいと考えている可能性があることに注意してください。

After Effects は、フラット データまたは非フラット データのいずれについても、データがリロードされるときに [PF_Cmd_SEQUENCE_RESETUP](../effect-basics/command-selectors#sequence-selectors) を送信します。

両方の構造内の共通のオフセットにあるフラグを使用して、データの状態を示します。

```cpp
typedef struct {
    A_char*    messageZ;
    PF_FpLong  big_numF;
    void*      temp_storage;
} non_flat_data;

typedef struct {
    char       message[256];
    PF_FpLong  big_numF;
    A_Boolean  big_endianB;
} flat_data;
```
---

## シーケンスデータのサイズ変更

[PF_Cmd_SEQUENCE_SETUP](../effect-basics/command-selectors#sequence-selectors) 中に、エフェクトのこのインスタンスに固有のデータのハンドルを割り当てます。

どのセレクターでもシーケンス データの内容は変更できますが、サイズは変更できません。

シーケンス データ ハンドルのサイズを変更できるのは、次のセレクター中にのみです。

- `PF_Cmd_AUDIO_SETUP`
- `PF_Cmd_AUDIO_SETDOWN`
- `PF_Cmd_FRAME_SETUP`
- `PF_Cmd_FRAME_SETDOWN`
- `PF_Cmd_AUDIO_RENDER`
- `PF_Cmd_RENDER`
- `PF_Cmd_SEQUENCE_SETUP`
- `PF_Cmd_SEQUENCE_SETDOWN`
- `PF_Cmd_SEQUENCE_FLATTEN`
- `PF_Cmd_SEQUENCE_RESETUP`
- `PF_Cmd_DO_DIALOG`

---

## マルチフレーム レンダリングを使用してレンダリング時に sequence_data にアクセスする

エフェクトでマルチフレーム レンダリングを有効にすると、`sequence_data` オブジェクトはレンダリング中に読み取り専用/定数になり、`PF_EffectSequenceDataSuite1` スイートを介して各レンダリングスレッドでアクセスできます。

### PF_EffectSequenceDataSuite1

| Function | Purpose |
| --- | --- |
| `PF_GetConstSequenceData` | Retrieves the read-only const sequence_data object for a rendering thread when Multi-Frame Rendering is enabled for an effect.<br /><br /><pre lang="cpp">PF_Err(*PF_GetConstSequenceData)(<br/>  PF_ProgPtr effect_ref,<br/>  PF_ConstHandle \*sequence_data);</pre> |

```cpp
static PF_Err Render(
    PF_InData   *in_dataP,
    PF_OutData  *out_dataP,
    PF_ParamDef *params[],
    PF_LayerDef *output )
{
    PF_ConstHandle seq_handle;

    AEFX_SuiteScoper<PF_EffectSequenceDataSuite1> seqdata_suite =
        AEFX_SuiteScoper<PF_EffectSequenceDataSuite1>(
            in_dataP,
            kPFEffectSequenceDataSuite,
            kPFEffectSequenceDataSuiteVersion1,
            out_dataP);

    PF_ConstHandle const_seq;
    seqdata_suite->PF_GetConstSequenceData(in_data->effect_ref, &const_seq);

    // cast const_seq to the type used when storing to sequence_data

    // rest of render function code...
}
```
