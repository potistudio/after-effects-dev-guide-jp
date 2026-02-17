---
title: 'AEにおけるマルチフレームレンダリング'
---
より多くの CPU コアとスレッドを備えた最新のハードウェアを活用するために、After Effects 2022 以降ではマルチフレーム レンダリングがサポートされるようになりました。マルチフレーム レンダリング (MFR) を使用すると、複数のフレームを同時にレンダリングできるため、レンダリングと AE コンポジションのエクスポートが高速化されます。

サードパーティのエフェクトは、次の PF_OutFlag を設定することで、AE Effects SDK を介してマルチフレーム レンダリングのサポートを有効にすることができます。

```cpp
PF_OutFlag2_SUPPORTS_THREADED_RENDERING
```
このフラグは、エフェクトが複数のスレッドでの同時レンダリングをサポートしていることを示します。レイヤー上のこのエフェクトの単一または複数のアプリケーションを呼び出して、複数のスレッドで同時にレンダリングできます。このフラグを設定する前に、エフェクトはスレッドセーフである必要があります。詳細については、以下の [What does it mean for an effect to be thread-safe?](#what-does-it-mean-for-an-effect-to-be-thread-safe) セクションを参照してください。

:::no
t
e
After Effects でマルチフレーム レンダリングを使用する場合、スレッドセーフではなく、このフラグが設定されていないエフェクトでは、各レンダースレッドが一度に 1 スレッドずつエフェクト コードに出入りすることが強制されます。これにより、MFR によるパフォーマンスの向上が大幅に低下するため、エフェクトの横に警告アイコンがエフェクト コントロール ウィンドウに表示され、パフォーマンスへの影響をユーザーに警告します。

:::
---

レンダリング中に sequence_data への書き込みが必要なエフェクトの場合、下位互換性のためにフラグを使用できます。

```cpp
PF_OutFlag2_MUTABLE_RENDER_SEQUENCE_DATA_SLOWER
```
各レンダリングスレッドには、他のレンダリングスレッドと共有も同期もされない独自の sequence_data インスタンスがあります。 sequence_data に格納されたデータの計算に時間がかかる場合は、新しい [Compute Cache For Multi-Frame Rendering](#compute-cache-for-multi-frame-rendering) を使用する必要があります。

:::no
t
e
`PF_OutFlag2_MUTABLE_RENDER_SEQUENCE_DATA_SLOWER` フラグを使用するには、2021 年 3 月以降の SDK に対してコンパイルする必要があります。

:::
---

## 2021 年 3 月の SDK によるマルチフレーム レンダリング エフェクトの更新

2021 年 3 月の SDK では、AE ベータ ビルド 22.0x6 (2021 年 6 月 29 日にリリース) 以降で有効になる新しい `sequence_data` 動作が導入されています。マルチフレーム レンダリングをサポートするには、2020 年 6 月の SDK でコンパイルされたエフェクトはすべて、2021 年 3 月の SDK で再コンパイルする必要があります。また、エフェクトは、少なくともバージョン 13.25 でコンパイルされたことを AE に報告する必要がありますが、関連する SDK を自動的に設定するには、SDK 定数 PF_AE_PLUG_IN_VERSION および PF_AE_PLUG_IN_SUBVERS を使用することをお勧めします。

以下の表は、新しい動作をサポートするためにエフェクトに加える必要がある変更の概要を示しています。

| MFR & Sequence Data Usage | Changes Needed with March 2021 SDK |
| --- | --- |
| Plugin does not set PF_OutFlag2_SUPPORTS_THREADED_RENDERING | No changes needed. Effect and sequence_data will continue to work as it did in the past. |
| Plugin sets PF_OutFlag2_SUPPORTS_THREADED_RENDERING but neither reads nor writes to sequence_data during Render | Recompile the plugin with the March 2021 SDK, no other code changes are required.<br /><br />If the plugin is not compiled with the March 2021 SDK, the plugin will stop utilizing MFR starting with AE 22.0x6. |
| Plugin sets PF_OutFlag2_SUPPORTS_THREADED_RENDERING but only reads sequence_data during Render | Recompile the plugin with the March 2021 SDK, update reading sequence_data via `PF_EffectSequenceDataSuite1` for thread-safe access. See [Accessing sequence_data at Render Time with Multi-Frame Rendering](global-sequence-frame-data#accessing-sequence_data-at-render-time-with-multi-frame-rendering) for more information. |
| Plugin sets PF_OutFlag2_SUPPORTS_THREADED_RENDERING and reads and writes to sequence_data during Render | Recompile the plugin with the March 2021 SDK and modify the plugin to:<br /><br />1. Utilize the [Compute Cache API](compute-cache-api#compute-cache-api) for thread-safe cache access instead of reading/writing to sequence_data directly.  See [Compute Cache For Multi-Frame Rendering](#compute-cache-for-multi-frame-rendering) for more information. AND / OR<br />2. Add the `PF_OutFlag2_MUTABLE_RENDER_SEQUENCE_DATA_SLOWER` to the effect to restore direct read/write access to sequence_data. |

:::no
t
e
2021 年 3 月の SDK でコンパイルされ、PF_OutFlag2_SUPPORTS_THREADED_RENDERING フラグと、オプションで PF_OutFlag2_MUTABLE_RENDER_SEQUENCE_DATA_SLOWER フラグを使用してコンパイルされたエフェクトは、`PF_EffectSequenceDataSuite1` が導入された 18.0 以降の After Effects ベータビルドで動作します。両方の sequence_data 動作をサポートする必要がある場合は、このスイートの存在を確認してください。

:::
---

## マルチフレーム レンダリングによるコマンドセレクターへの影響

UI セレクターは引き続きメイン スレッドで送信されますが、`PF_Cmd_SEQUENCE_SETUP`、`PF_Cmd_SEQUENCE_RESETUP`、`PF_Cmd_SEQUENCE_SETDOWN`、`PF_Cmd_SMART_PRE_RENDER`、`PF_Cmd_RENDER`、`PF_Cmd_SMART_RENDER` は UI セレクターの処理と同時に複数のスレッドで送信される可能性があるため、これらのセレクターはすべてスレッドセーフである必要があります。

`PF_Cmd_GLOBAL_SETUP` セレクターと `PF_Cmd_GLOBAL_SETDOWN` セレクターはメインスレッドでのみ送信され、他のセレクターと同時に送信されません。

---

## マルチフレームレンダリングにおけるシーケンスデータ

`sequence_data` オブジェクトと関連するシーケンス セレクターは、エフェクトの存続期間中にデータを保存する方法を提供するために長年使用されてきました。マルチフレーム レンダリングでは、注意すべきいくつかの変更が導入されています。

**2020 年 6 月時点の変更点**

* マルチフレーム レンダリングでは、After Effects が `sequence_data` をレンダリングスレッドにマーシャリングする必要があります。 `PF_OutFlag_SEQUENCE_DATA_NEEDS_FLATTENING` フラグによるフラット化を必要とする `sequence_data` のエフェクトでこれを効率的にするには、これらのエフェクトでも `PF_OutFlag2_SUPPORTS_GET_FLATTENED_SEQUENCE_DATA` フラグを設定する必要があります。

:::no
t
e
After Effects の将来のバージョンでは、`PF_OutFlag2_SUPPORTS_GET_FLATTENED_SEQUENCE_DATA` フラグを設定し、プラグインで関連するセレクターを処理することが必須になる予定です。この要件を満たさないエフェクトを読み込むと、警告ダイアログが表示されます。

:::
**2021年3月時点の変更点**

* `sequence_data` オブジェクトは、レンダリング時に読み取られるときに const になるため、`PF_EffectSequenceDataSuite` インターフェイスを介してアクセスする必要があります。
* レンダリング時の `sequence_data` への書き込みはデフォルトで無効になっており、レンダリング時に `sequence_data` に書き込もうとした場合の結果は不定になります。
* レンダリング時にエフェクトが sequence_data に書き込む必要がある場合は、`PF_OutFlag2_MUTABLE_RENDER_SEQUENCE_DATA_SLOWER` フラグを設定する必要があります。これにより、After Effects に `sequence_data` への書き込みを許可するように指示されますが、パフォーマンスが犠牲になります。 `sequence_data` オブジェクトは、レンダリングの開始時に各レンダリングスレッドに複製され、各レンダリングスレッドは、レンダリングの存続期間中管理する `sequence_data` の独自の独立したコピーを持ちます。パフォーマンス上の理由から、エフェクトに必要なデータの書き込みには [Compute Cache For Multi-Frame Rendering](#compute-cache-for-multi-frame-rendering) を使用することをお勧めします。

---

## マルチフレーム レンダリング用のキャッシュの計算

コンピューティング キャッシュは、エフェクトがレンダリング前またはレンダリング中にデータを計算、保存、読み取りできるシーケンス データの代替または補足としてスレッドセーフ キャッシュを提供します。

### コンピューティング キャッシュはいつ使用しますか?

* エフェクトで `sequence_data` を使用し、レンダリング中に `sequence_data` への書き込みまたは更新が必要な場合、特に必要なデータの計算に時間がかかる場合は、コンピューティング キャッシュを使用する必要があります。
* Compute Cache を使用しない場合、エフェクトは `PF_OutFlag2_MUTABLE_RENDER_SEQUENCE_DATA_SLOWER` フラグを追加する必要があります。これにより、レンダースレッドごとに sequence_data の一意のコピーが作成されます。各レンダリングスレッドは、時間のかかる計算を個別に実行する必要がある場合があり、レンダリングスレッド間で結果を共有できなくなります。
* コンピューティング キャッシュを使用すると、レンダリングスレッドがデータを計算するタスクを共有し、すでに計算されたデータの利点を享受できます。
* Compute Cache API は、エフェクトのニーズに応じて、シングル チェックアウト計算タスクとマルチ チェックアウト計算タスクの両方をサポートします。詳細については、[Compute Cache API](compute-cache-api#compute-cache-api) のドキュメントを参照してください。

### コンピューティング キャッシュを有効にするにはどうすればよいですか?

Compute Cache API は 2021 年 3 月の SDK から利用可能になり、このスイートは After Effects 2022 以降のビルドでデフォルトで有効になります。

実装の詳細とサンプル コードについては、[Compute Cache API](compute-cache-api#compute-cache-api) のドキュメントを参照してください。

---

## エフェクトがスレッドセーフであるとはどういう意味ですか?**実装と共有データに競合状態がないことが保証され、同時にアクセスされたときに常に正しい状態にある場合、エフェクトはスレッドセーフです。**

より具体的に言うと、次のような効果があります。

1. 静的変数またはグローバル変数がない、または競合状態のない静的変数またはグローバル変数がある。
2. レンダリング時に `in_data->global_data` に書き込みません。読書は可能です。 `PF_Cmd_GLOBAL_SETUP`と`PF_Cmd_GLOBAL_SETDOWN`のみを記入してください。
3. レンダリング時または `PF_Cmd_UPDATE_PARAMS_UI` イベント中に `in_data->sequence_data` に書き込みません。読み取りは、PF_EffectSequenceDataSuite インターフェイスを介して実行できます。

:::no
t
e
エフェクトがミューテックスやゲートなどのブロッキング同期メカニズムを使用している場合、ホストにコールバックするときにこれらを保持してはなりません。一般的な通話は、スイートを使用するとき、またはチェックアウトの通話を行うときです。これを行わないと、デッドロックが発生する可能性が非常に高くなります。

:::
---

## エフェクト内の静的変数とグローバル変数を見つける方法

エフェクト内の静的変数とグローバル変数を見つけやすくするために、**静的アナライザー ツール**を開発しました。
このツールは、この Git リポジトリで見つけることができます: [https://github.com/adobe/ae-plugin-thread-safety](https://github.com/adobe/ae-plugin-thread-safety)

### macOS の場合

1. 上記の URL で Git リポジトリをクローン/ダウンロードします。
2. **Mac** フォルダーで bash スクリプト `check_symbols_for_thread_safety.sh` を見つけます
3. プラグインまたはエフェクトのパッケージ コンテンツ内に移動し、バイナリ ファイルを見つけます。 (たとえば、**Curves.plugin** のバイナリ ファイルはここにあります: `/Applications/Adobe After Effects [your AE version]/Plug-ins/Effects/Curves.plugin/Contents/MacOS/Curves`)
4. バイナリを分析するには、次のコマンドを実行します。
    ```sh
    check_symbols_for_thread_safety.sh [Binary location]
    For example, check_symbols_for_thread_safety.sh /Applications/Adobe After Effects [your AE version]/Plug-ins/Effects/Curves.plugin/Contents/MacOS/Curves)
    ```
5. ツールからの出力は次の形式で表示されます。
    ```sh
    [symbol type]; [symbol name]
    ```
6. `[symbol type]` は、変数の型を示す 1 文字で、大文字と小文字が区別されます。すべてのタイプ情報はここで見つけることができます: [https://linux.die.net/man/1/nm](https://linux.die.net/man/1/nm)
7. 出力の例を次に示します。
    ```cpp
    b; Deform::FindSilEdges()::new_kInfinite
    ```
- `b` は、このシンボルが初期化されていないデータ セクションにあることを示し、静的変数である可能性があることを示します。
    - `Deform::FindSilEdges()::new_kInfinite` はシンボル名で、`Deform` は変数が配置されている名前空間の名前です。
    - `FindSilEdges()` は、変数が含まれる関数名です。
    - `new_kInfinite` は実際の変数名です。変数の場所によっては、名前空間と関数の名前が表示されない場合があります。
8. コード内の各シンボルを検索して修正し (方法については [here](#how-to-locate-the-static-and-global-variables-in-your-effects) を参照)、ソリューション内のすべてのバイナリ ファイルに対してこれを繰り返します。

### Windows の場合

#### 準備

1. **このツールを実行するには、Visual Studio が動作するインストールが必要です**
2. 上記の URL で Git リポジトリをクローン/ダウンロードします。
3. **Win** フォルダーで `register_msdia.cmd` スクリプトを見つけます
4. **スタート メニュー**から**「x64 Native Tools Command Prompt for VS....」**を検索します。
5. 右クリック→「管理者として実行」
6. ターミナルで、`cd` を `register_msdia.cmd` が存在するディレクトリに移動します。
7. `.\register_msdia.cmd` を実行します
8. このスクリプトは、**DIA SDK** とその他の必要な依存関係を登録します。
9. 静的アナライザーが動作する準備ができている必要があります

#### Windows 静的アナライザーの使用

1. **Win** フォルダーで実行可能ファイル `CheckThreadSafeSymbols.exe` を見つけます
2. **デバッグ** モードでエフェクトをコンパイルし、**.pdb** ファイルを見つけます。
3. プロジェクトのビルド設定を変更していない場合は、同じビルド ディレクトリに **.obj** ファイルがいくつかあるはずです。
4. 何をスキャンするかについては **2 つのオプション**があります。`-objfile` または `-source` フラグを使用する、バイナリまたはソース ファイルです。
    - 注: どちらのオプションからでも同じシンボルを取得できます。
        - ソース コードが最終的にどのバイナリになるか正確にわからない場合、またはソース ファイルごとにスレッドセーフを追跡したい場合は、`-source` オプションを使用します。
        - プロジェクトのどの部分をスキャンするかをより細かく制御したい場合は、`-objfile` オプションを使用します。
5. オブジェクト ファイル内のシンボルを分析するには、次のコマンドを実行します。
    ```bat
    CheckThreadSafeSymbols.exe -objfile [absolute path to the binary you want analyzed] [absolute path to .pdb]
    ```
6. ソース ファイル内のシンボルを分析するには、次のコマンドを実行します。
    ```bat
    CheckThreadSafeSymbols.exe -source [absolute path to the source file you want analyzed] [absolute path to .pdb]
    ```
7. グローバル変数は、pdbs 内の 1 つのファイルまたはバイナリのスコープに限定されないため、フィルタリングせずにすべてのプロジェクト グローバルのリストを確認する必要があります。 -g 出力を使用して、それらすべてのリストを取得します。
    ```bat
    CheckThreadSafeSymbols.exe -g [absolute path to .pdb]
    ```
8. エフェクトがどのバイナリを出力しているかわからない場合、このツールはバイナリの **(ノイズが多い)** リストと、それぞれがデータを取得するソース ファイルを出力することもできます。変更したファイルは、上部近くにある可能性があります。リストを表示するには、次を実行します。
    ```bat
    CheckThreadSafeSymbols.exe -sf [absolute path to .pdb]
    ```
9. 出力シンボルは次の形式になります。
    ```cpp
    [Symbol name], [Symbol type], [Datakind], ([Section type of data location], [Binary Address][Binary Address Offset])
    ```
10. 出力の例を次に示します。
    ```cpp
    menuBuf, Type: char[0x1000], File Static, (static, [0008FCD0][0003:00001CD0])
    ```
- `menuBuf` は実際の変数名です。
    - `Type: char[0x1000]` は変数の型を示します。ここでのデータは `char` です。
    - `File Static` は、そのデータがどのような種類のものであるかを示します。ここのデータは **ファイル スコープの静的変数です。** すべてのデータの種類とその意味については、このページ [https://docs.microsoft.com/en-us/visualstudio/debugger/debug-interface-access/datakind?view=vs-2019](https://docs.microsoft.com/en-us/visualstudio/debugger/debug-interface-access/datakind?view=vs-2019) で確認できます。
    - `static` は、データがメモリの静的セクションにあることを示します。
    - `[0008FCD0][0003:00001CD0]` は、データのバイナリ アドレスとバイナリ アドレス オフセットを示します。
11. コード内の各シンボルを検索して修正し (方法については [here](#how-to-locate-the-static-and-global-variables-in-your-effects) を参照)、ソリューション内のすべてのバイナリ/ソース ファイルに対して繰り返します。

---

## エフェクトにスタティックとグローバルがある場合の対処方法

静的変数またはグローバル変数が表示された場合は、可能であればそれをローカル変数にすることが最善です。しかし、その変数が静的またはグローバルでなければならない場合はどうなるでしょうか?

静的またはグローバルを処理するための標準的なアプローチをいくつか示します。

### 動作を変更せずに、関数間でデータを簡単に渡すことはできないでしょうか?

```cpp
// Example of a non Thread-Safe code
static int should_just_be_local;

void UseState() {
    DoComputation(should_just_be_local);
}

void SetAndUseState() {
    should_just_be_local = DoComputation();
    UseState();
}
```
これを構造体に追加するか、関数の引数を展開してそれを含めます。

```cpp
// We can fix the above code by passing the should_just_be_local variable through function arguments

void UseState(int should_just_be_local) {
    DoComputation(should_just_be_local);
}

void SetAndUseState() {
    int should_just_be_local = DoComputation();
    UseState(should_just_be_local);
}
```
### コードを実行する前にデータを初期化できますか (ルックアップ テーブル、const 変数など)。

```cpp
// Example of a non Thread-Safe code

// Many places in the code need to read this table but won't be writing to it
static int state_with_initializer[64];
static bool state_was_initialized = false;

void InitializeState() {
    for (int i = 0; i < 64; ++i) {
        state_with_initializer[i] = i * i;
    }
    state_was_initialized = true;
}

void Main() {
    if (!state_was_initialized) {
        InitializeState();
    }
    DoComputation(state_with_initializer);
}
```
`const` にするか、マクロに置き換えます。

```cpp
std::array<int, 64> InitializeState() {
    std::array<int, 64> temp;

    for (int i = 0; i < 64; ++i) {
        temp[i] = i * i;
    }
    return temp;
}

// We can fix the above code by making this table a const and initialize it before using it
static const std::array<int, 64> state_with_initializer = InitializeState();

void Main() {
    DoComputation(state_with_initializer);
}
```
### データは、以降のレンダリングでは変更されないデータに基づいて実行時に 1 回初期化されますか?

```cpp
// Example of a non Thread-Safe code
static int depends_on_unchanging_runtime_state;

void UseState() {
    DoComputation(depends_on_unchanging_runtime_state);
}

void SetAndUseState() {
    depends_on_unchanging_runtime_state = DoComputationThatNeedsStateOnlyOnce();
    UseState();
}
```
コードを実行する前に、この状態が不明であることを再確認してください (ケース 2)。ただし、実行時に初期化する必要がある場合は、const static local を使用してください。 (静的ローカル オブジェクトのスレッドセーフな初期化は C++ 仕様の一部であることに注意してください)。

```cpp
void UseState(int depends_on_unchanging_runtime_state) {
    DoComputation(depends_on_unchanging_runtime_state);
}

void SetAndUseState() {
    // We can fix the above code by making the variable a const static local
    static const int depends_on_unchanging_runtime_state = DoComputationThatNeedsStateOnlyOnce();

    UseState(depends_on_unchanging_runtime_state);
}
```
### データは const ではなく、静的/グローバルのままである必要があります。ただし、各レンダリングスレッドはデータの独自のコピーを持つことができます。

```cpp
// This variable has to be static and not a const
static int this_thread_needs_access;

void SetState(int new_state) {
    this_thread_needs_access = new_state;
}

void UseState() {
    DoComputation(this_thread_needs_access);
}
```
変数を thread_local にするだけです。

```cpp
// Make this variable a thread_local variable
thread_local static int this_thread_needs_access;

void SetState(int new_state) {
    this_thread_needs_access = new_state;
}

void UseState() {
    DoComputation(this_thread_needs_access);
}
```
### データは const ではなく静的/グローバルに保つ必要があり、各スレッドは最新の状態から読み書きする必要があります。 （レア）

```cpp
// This variable has to be static and not a const
// It also needs to be shared across several threads
static int every_thread_needs_latest_state;

void SetState(int new_state) {
    every_thread_needs_latest_state = new_state;
}

void UseState() {
    DoComputation(every_thread_needs_latest_state);
}
```
この場合、ミューテックスを使用してアクセスを保護します。

```cpp
// Add a mutex (lock)
static std::mutex ex_lock;

static int every_thread_needs_latest_state;

void SetState(int new_state) {
    {
        // Protect the access with the mutex (lock)
        std::lock_guard<std::mutex> lock(ex_lock);
        every_thread_needs_latest_state = new_state;
    }
}

void UseState() {
    int state_capture;
    {
        // Protect the access with the mutex (lock)
        std::lock_guard<std::mutex> lock(ex_lock);
        state_capture = every_thread_needs_latest_state;
    }
    DoComputation(state_capture);
}
```
:::no
t
e
上記の例は、エフェクトで確認された一般的なケースです。ニーズに最適な静的変数とグローバル変数を処理するための他の方法をいつでも思いつくことができます。

:::
---

## エフェクトをスレッドセーフとして設定する

- GlobalSetup で `PF_OutFlag2_SUPPORTS_THREADED_RENDERING` フラグを設定して、エフェクトがスレッドセーフであり、マルチフレーム レンダリングをサポートしていることを After Effects に伝えます。
- 必要に応じて、`PF_OutFlag2_MUTABLE_RENDER_SEQUENCE_DATA_SLOWER` を追加して、レンダリング ステージで sequence_data を書き込めるようにします。
- `AE_Effect_Global_OutFlags_2` マジックナンバーを更新します。初めてマジックナンバーを変更せずにエフェクトを使用して AE を起動し、エフェクトを適用すると、AE が入力する正しい数値を表示します。
- `PF_OutFlag_SEQUENCE_DATA_NEEDS_FLATTENING` フラグを使用している場合は、`PF_OutFlag2_SUPPORTS_GET_FLATTENED_SEQUENCE_DATA` フラグも設定してください。

---

## エフェクトがスレッドセーフかどうかをテストする方法

エフェクトをスレッドセーフにするための上記の手順を完了すると、いくつかのテストを行う準備が整います。

### マルチフレーム レンダリングを有効にする

- After Effects 2022 では、マルチフレーム レンダリングがデフォルトで有効になっています。
- MFR のオンとオフを切り替えるには、[環境設定] > [メモリとパフォーマンス] > [パフォーマンス] に移動し、[マルチフレーム レンダリング] チェックボックスを切り替えます。

### 効果をテストする

上記の準備手順が完了したら、効果を徹底的にテストしてください。単純なコンポジションと複雑なコンポジションをテストし、エフェクトでマルチフレーム レンダリングを利用するため、パフォーマンスの向上を確認できるはずです。

- 既存の手動テスト計画と自動テスト計画をすべて検討します。
- すべてのエフェクトパラメータをテストし、それらが適切に機能していることを確認します。
- 必要に応じて、すでにスレッドセーフになっている AE エフェクトの一部を追加します。 [Thread-Safe First Party Effects](#thread-safe-first-party-effects) セクションを参照してください。
- マルチフレーム レンダリングを有効にしてレンダリングするときに、クラッシュ、ハング、レンダリングの違い、その他の予期しない変更が発生しないことを確認してください。

---

## スレッドセーフなファーストパーティエフェクト

MFR でサポートされているエフェクトの完全なリストについては、[https://helpx.adobe.com/after-effects/user-guide.html/after-effects/using/effect-list.ug.html](https://helpx.adobe.com/after-effects/user-guide.html/after-effects/using/effect-list.ug.html) をご覧ください。さらに毎週追加されます。
