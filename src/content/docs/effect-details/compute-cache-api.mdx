---
title: 'Compute Cache API'
---
Compute Cache API は、エフェクトがレンダリング前またはレンダリング中にデータを計算、保存、読み取りできるシーケンス データの代替または補足としてスレッドセーフ キャッシュを提供します。計算に時間がかかるデータをキャッシュするために使用する必要があります。マルチフレーム レンダリング効果の場合、スレッド間の冗長な計算を排除することで大きな利点が得られます。キャッシュは After Effects の他のキャッシュと統合されるため、メモリ使用量は他のキャッシュ間でバランスがとれます。このモデルは、パラメーターを使用して A/B テストを実行するユーザーと、A と B の両方の状態に対して保持されるキャッシュ状態もサポートしているため、ワークフローが高速化されます。これらの最後の 2 つの設計特性は、単一フレームとマルチフレームの両方のレンダリング効果に役立ちます。

Compute Cache は AEGP_ComputeCache スイートに実装されており、`AEGP_ComputeCacheSuite1` および `AEGP_ComputeCacheCallbacks` を介してアクセスできます。

---

## AEGP_ComputeCacheSuite1

| Function | Purpose |
| --- | --- |
| `AEGP_ClassRegister` | Registers the cache type using a globally unique identifier for the compute class, such as "adobe.ae.effect.test_effect.cache_v_1".<br /><br />An object of type `AEGP_ComputeCacheCallbacks` should be setup with function pointers to the callback methods required by `AEGP_ComputeCacheSuite1`.<br /><br />This function will typically be called during `PF_Cmd_GLOBAL_SETUP`, but can be called any time.<br /><br /><pre lang="cpp">A_Err (*AEGP_ClassRegister)(<br/>  AEGP_CCComputeClassIdP  compute_classP,<br/>  const AEGP_ComputeCacheCallbacks  \*callbacksP);</pre> |
| `AEGP_ClassUnRegister` | Unregister a previously registered cache type using the globally unique identifier for the compute class.<br /><br />All cached values will be purged at this time through calls to delete_compute_value.<br /><br />This function will typically be called during `PF_Cmd_GLOBAL_SETDOWN`, but can be called any time.<br /><br /><pre lang="cpp">A_Err (*AEGP_ClassUnregister)(<br/>  AEGP_CCComputeClassIdP    compute_classP);</pre> |
| `AEGP_ComputeIfNeededAndCheckout` | This is the main checkout call that is used to compute and/or return an `AEGP_CCCheckoutReceiptP` receipt pointer to the cache entry.<br /><br />Pass in the `AEGP_CCComputeClassIdP` that was used in the `AEGP_RegisterClass` method.<br /><br />The `AEGP_CCComputeOptionsRefconP` object will be passed through to the `AEGP_ComputeCacheCallbacks`, `generate_key` and `compute` method as needed. This objects type is opaque to `AEGP_ComputeCacheSuite1` and will need to be casted appropriately by the effects implementation of `generate_key` and `compute`.<br /><br />The `wait_for_other_threadB bool` is used when the cache value needs to be computed. When set to `true`, the method will always execute the compute step or return a completed receipt to the cache. When set to `false`, this method will complete the compute step unless another thread is already computing the cache entry, in which case `A_Err_NOT_IN_CACHE_OR_COMPUTE_PENDING` will be returned.<br /><br />See [Impact of wait_for_other_threadB on AEGP_ComputeIfNeededAndCheckout](#impact-of-wait_for_other_threadb-on-aegp_computeifneededandcheckout) for more information on this parameter.<br /><br />The `CCCheckoutReceiptP` is an opaque pointer that can then be passed into `AEGP_GetReceiptComputeValue` to get a pointer to the computed value from the cache.<br /><br /><pre lang="cpp">A_Err (*AEGP_ComputeIfNeededAndCheckout)(<br/>  AEGP_CCComputeClassIdP    compute_classP,<br/>  AEGP_CCComputeOptionsRefconP  opaque_optionsP,<br/>  bool  wait_for_other_threadB,<br/>  AEGP_CCCheckoutReceiptP   \*compute_receiptPP);</pre> |
| `AEGP_CheckoutCached` | Use this method to check if the cache value has already been computed, returning the `AEGP_CCCheckoutReceiptP` receipt if available.<br /><br />If the cache has not been computed, `A_Err_NOT_IN_CACHE_OR_COMPUTE_PENDING` will be returned.<br /><br /><pre lang="cpp">A_Err (*AEGP_CheckoutCached)(<br/>  AEGP_CCComputeClassIdP    compute_classP,<br/>  AEGP_CCComputeOptionsRefconP    opaque_optionsP,<br/>  AEGP_CCCheckoutReceiptP   \*compute_receiptPP);</pre> |
| `AEGP_GetReceiptComputeValue` | Use this method to retrieve the cache value from the compute method.<br /><br />Pass in the receipt received from `AEGP_ComputeIfNeededAndCheckout` or `AEGP_CheckoutCached`.<br /><br />The returned `CCComputeValueRefconP` should be casted to the correct object type that was used in the `compute` method.<br /><br /><pre lang="cpp">A_Err (*AEGP_GetReceiptComputeValue)(<br/>  const AEGP_CCCheckoutReceiptP   compute_receiptP,<br/>  AEGP_CCComputeValueRefconP    \*compute_valuePP);</pre> |
| `AEGP_CheckinComputeReceipt` | Call this method after the effect code is done using a checked-out, computed cache value, before returning to the host, passing in the receipt returned from `AEGP_ComputeIfNeededAndCheckout` or `AEGP_CheckoutCached`.<br /><br />If the receipt being passed in is invalid, error `A_Err_STRUCT` will be returned. A pop-up error dialog will also be shown with this message, *"Trying to check in invalid receipt. Please make sure you are not double checking in or checking in invalid receipts."*<br /><br /><pre lang="cpp">A_Err (*AEGP_CheckinComputeReceipt)(<br/>  AEGP_CCCheckoutReceiptP   compute_receiptP );</pre> |

---

## AEGP_ComputeCacheCallbacks

The effect must provide implementations for these callbacks.

| Function | Purpose |
| --- | --- |
| `generate_key` | Called when creating a cache entry and when doing a cache lookup. Should be fast to compute. All of the inputs needed to uniquely address the cache entry must be hashed into the key. If a layer checkout is needed to calculate the cache value, such as with a histogram, then the hash of that input must be included<br /><br />See `PF_ParamUtilsSuite::PF_GetCurrentState` to get the hash for a layer param. Note this is the hash of the inputs needed to generate the frame, not a hash the pixels in the frame, thus a render is not triggered when making this call.<br /><br />The `AEGP_CCComputeOptionsRefconP` will contain the data passed into the `AEGP_ComputeIfNeededAndCheckout` or `AEGP_CheckoutCached` methods.<br /><br />The `AEGP_CComputeKeyP` `out_keyP` returns the hashed key value, see the `AEGP_CCComputeKey` definition in the `AE_ComputeCacheSuite.h` for type definition.<br /><br />!!! note<br />The `AEGP_CCComputeOptionsRefconP` parameter passed into `generate_key` and `compute` must contain all inputs to calculate the hash key for a cache value / to compute the cache value itself.<br /><br />This will frequently include many or all of the effect parameters and any layer parameters needed to calculate the cache value. See the [Real-world Integration Example](#real-world-integration-example) for more details.<br /><br /><pre lang="cpp">A_Err (*generate_key)(<br/>  AEGP_CCComputeOptionsRefconP   optionsP,<br/>  AEGP_CCComputeKeyP   out_keyP);</pre> |
| `compute` | Called by `AEGP_ComputeIfNeededAndCheckout` when a cache value needs to be computed.<br /><br />The `AEGP_CCComputeOptionsRefconP` will contain the data passed into the `AEGP_ComputeIfNeededAndCheckout` method.<br /><br />Set `out_valuePP` to point to the result of the computed cache value, casted to the `AEGP_CCComputeValueRefconP` type.<br /><br />For example:<br /><br /><pre lang="cpp">\*out_valuePP = reinterpret_cast<AEGP_CCComputeValueRefconP>(myComputedResultP);</pre><br /><br /><pre lang="cpp">A_Err (*compute)(<br/>  AEGP_CCComputeOptionsRefconP   optionsP,<br/>  AEGP_CCComputeValueRefconP   \*out_valuePP);</pre> |
| `approx_size_value` | Called by the cache system to determine the total footprint of memory being used by the computed cache value. The computed value is not required to be a flat structure.<br /><br />The size is an input to the cache purging heuristic.<br /><br />The `AEGP_CCComputeValueRefconP` is the computed cache value that can be used to generate the size value to return.<br /><br /><pre lang="cpp">size_t (*approx_size_value)(<br/>  AEGP_CCComputeValueRefconP   valueP);</pre> |
| `delete_compute_value` | This is called to free the value when the cache entry needs to be purged. All resources owned by the cache value must be freed here.<br /><br /><pre lang="cpp">void (*delete_compute_value)(<br/>  AEGP_CCComputeValueRefconP   valueP);</pre> |

---

## キーの生成

`generate_key` コールバックは、キャッシュ内のエントリのキャッシュ キーとして使用される、登録済みクラス内で一意のキーを返す必要がありますが、将来を見据えて、キーはすべての登録済みクラスにわたってグローバルに一意であることを強くお勧めします。 AE SDK は、キーとして使用できる GUID の生成を支援する `AEGP_HashSuite1` スイートを提供します。

`generate_key` の結果は、次の構造体から型定義された `AEGP_CCComputeKey` オブジェクトとして提供する必要があります。

```cpp
typedef struct AEGP_GUID {
    A_long bytes[4];
} AEGP_GUID;
```
---

## AEGP_HashSuite1

`AEGP_HashSuite1` を使用すると、`AEGP_ComputeCacheCallbacks` `generate_key()` コールバック メソッド内で使用する一意のキーを生成できます。

スイートを取得した後、バッファーを使用して `AEGP_CreateHashFromPtr()` メソッドを呼び出します。キャッシュ エントリに格納されている内容を簡単に思い出せるように、認識可能な文字列を含む文字配列をお勧めします。次に、エフェクト パラメータ、レイヤー チェックアウト ハッシュ結果などを指定して `AEGP_HashMixInPtr()` を呼び出します。これにより、別のキャッシュ キーとエントリが生成されます。

| Function | Purpose |
| --- | --- |
| `AEGP_CreateHashFromPtr` | Call this to begin creating the hash which will be returned in `hashP` that can be used for returning from `generate_key`.<br /><br /><pre lang="cpp">A_Err (*AEGP_CreateHashFromPtr)(<br/>  const A_u_longlong buf_sizeLu,<br/>  const void \*bufPV,<br/>  AEGP_GUID \*hashP);</pre> |
| `AEGP_HashMixInPtr` | Call this for each effect parameter, layer checkout hash or other data that would be used in calculating a cache entry.<br /><br /><pre lang="cpp">A_Err(*AEGP_HashMixInPtr)(<br/>  const A_u_longlong buf_sizeLu,<br/>  const void \*bufPV,<br/>  AEGP_GUID \*hashP);</pre> |

`AEGP_HashSuite1` の使用例を次に示します。ここで、Levels2Histo_generate_key_cb() は、`generate_key()` に対して呼び出されるコールバックです。

```cpp
A_Err Levels2Histo_generate_key_cb(AEGP_CCComputeOptionsRefconP opaque_optionsP, AEGP_CCComputeKeyP out_keyP)
{
    try
    {
        const Levels2Histo_options&  histo_op( *reinterpret_cast<Levels2Histo_options*>(opaque_optionsP));
        A_Err err = Err_NONE;

        AEFX_SuiteScoper<AEGP_HashSuite1> hash_suite = AEFX_SuiteScoper<AEGP_HashSuite1>(
            in_dataP,
            kAEGPHashSuite,
            kAEGPHashSuiteVersion1,
            out_dataP);

        // define a simple buffer that is easy to recognize as a starting hash
        const char* hash_buffer = "Level2Histo";
        err = hash_suite->AEGP_CreateHashFromPtr(sizeof(hash_buffer), hash_buffer, out_keyP);

        // Mix in effect parameters that would create a different compute result and should generate a different cache entry and key.
        if (!err) {
            err = hash_suite->AEGP_HashMixInPtr(sizeof(histo_op.depthL), &histo_op.depthL, out_keyP);
        }

        if (!err) {
            err = hash_suite->AEGP_HashMixInPtr(sizeof(histo_op.bB), &histo_op.bB, out_keyP);
        }

        // mix in any other effect parameters that should affect the cache key
        // ...

        // out_keyP is returned as the generated key for use as the cache key.
    }
    catch (...)
    {
        /* return most appropriate PF_Err */
    }
}
```
---

## キャッシュ値を計算またはチェックアウトする

キャッシュ サポートを追加する場合、最初に答えるべき質問の 1 つは、1 つのレンダリング呼び出しで複数のキャッシュ値をチェックアウトする必要があるかどうかです。レンダリングを完了するために複数のキャッシュ値が必要な場合は、マルチチェックアウト パターンを適用して、複数のレンダリング呼び出しにわたってキャッシュを同時に計算することで、計算のシリアル化を回避できます。

### 単一のキャッシュ値

レンダリング呼び出しでフレームのレンダリングに必要なキャッシュ値が 1 つだけの場合は、`AEGP_ComputeIfNeededAndCheckout` の `wait_for_other_threadB` パラメータを `true` に設定します。チェックアウト呼び出しはレシートを返し、おそらく計算コールバックを呼び出してキャッシュにデータを設定します。または、必要な計算をすでに開始している別のスレッドを待機しています。

### マルチチェックアウトキャッシュ値

レンダリング呼び出しに複数のキャッシュ値が必要な場合は、マルチチェックアウト パターンを使用してレンダリングスレッドの利用を維持し、計算のシリアル化を回避できます。

マルチチェックアウトを使用する概念は、1 つのレンダリング (例: フレーム 3 のレンダリング) スレッドに、そのスレッドと同時に必要なキャッシュ値を計算している他のレンダリングスレッド (例: フレーム 1、2) を利用させることです (例: フレーム 3 にはフレーム 1 と 2 からのデータが必要です)。要求されたキャッシュ値を計算しているスレッドが他にない場合、レンダリングスレッド (フレーム 3) が計算を実行します。すべてのキャッシュ値のチェックアウト呼び出しが完了すると、レンダリングスレッド (フレーム 3) は、他のスレッド (フレーム 1、2) が計算を完了するのを待ってから、ピクセル レンダリングを実行します。ピクセルのレンダリングが完了したら、チェックアウトされたキャッシュ値 (フレーム 1、2、および 3) を必ずチェックインしてください。

以下は、このアプローチを説明するための疑似コードの例です。

```cpp
Render()
{
    // Make a request for each cache value that is needed to complete the render
    bool first_err = AEGP_ComputeIfNeededAndCheckout(first_options, do_not_wait, first_cache_receipt);
    bool second_err = AEGP_ComputeIfNeededAndCheckout(second_options, do_not_wait, second_cache_receipt);
    // Add as many additional do_not_wait checkout calls here as needed.

    // Once all the requests have been made, check to see if any of the Checkouts did not return
    // a valid checkout receipt.
    if(first_err == A_Err_NOT_IN_CACHE_OR_COMPUTE_PENDING) {
        AEGP_ComputeIfNeededAndCheckout(wait, first_cache_receipt);
    }
    if(second_err == A_Err_NOT_IN_CACHE_OR_COMPUTE_PENDING) {
        AEGP_ComputeIfNeededAndCheckout(wait, second_cache_receipt);
    }
    // Add as many additional waiting checkout calls here as needed

    // All cache values are now available via AEGP_GetReceiptComputeValue for use in the Render

    // ... complete the render steps

    // Check in all cache values now
    AEGP_CheckinComputeReceipt(first_cache_receipt);
    AEGP_CheckinComputeReceipt(second_cache_receipt);
}
```
---

## wait_for_other_threadB の AEGP_ComputeIfNeededAndCheckout への影響

`AEGP_ComputeIfNeededAndCheckout` を呼び出すと、`wait_for_other_threadB` が `false` に設定されており、要求されたキャッシュ値を別のスレッドがすでにレンダリングしている場合を除き、パラメータのほぼすべての並べ替えでキャッシュ値のチェックアウト レシートが返されます。

| Cache State | `wait_for_other_threadB` set to `False` | `wait_for_other_threadB` set to `True` |
| --- | --- | --- |
| *No cache for key* | Compute and checkout receipt returned | Compute and checkout receipt returned |
| *Being computed by another thread* | Returns A_Err_NOT_IN_CACHE_OR_COMPUTE_PENDING<br /><br />Note that After Effects will not report this error to the user, it is only for the effect to respond to. | Wait for another thread and return checkout receipt upon completion |
| *Cached* | Checkout receipt returned | Checkout receipt returned |

---

## キャッシュ状態の確認

* キャッシュ値が計算されたかどうかをエフェクトでチェックする必要があるが、別のスレッドで計算が完了するのを待っている間は実際に実行またはブロックしたくないシナリオが考えられます。これは、`AEGP_CheckoutCached()` メソッドを通じて実現できます。
* この呼び出しは、別のコードがキャッシュに追加されることが期待されるポーリング パターンを実装するために使用できます。たとえば、UI スレッドは、レンダースレッドで生成されたヒストグラムのキャッシュをポーリングできます。
* キャッシュ値が利用可能な場合、`AEGP_CCCheckoutReceiptP` パラメータは、キャッシュ値を取得するために `AEGP_GetReceiptComputeValue()` に渡すことができるチェックアウト レシートを返します。キャッシュ値が利用できない場合、メソッドは `A_Err_NOT_IN_CACHE_OR_COMPUTE_PENDING` エラー コードを返します。

---

## キャッシュの永続化

* フラット化されたシーケンス データとは異なり、計算キャッシュの内容はプロジェクトと一緒に保存されないため、計算されたものはプロジェクトを再度開いたときに再計算する必要があります。
* After Effects による他の操作でメモリが必要な場合、キャッシュ内のエントリは自動的に消去されます。利用可能なキャッシュ値に依存するコードは、毎回計算ステップを完了する必要があることを想定して作成する必要があります。
* `approx_size_value` コールバックはすぐに返されますが、キャッシュ エントリによって保持されているデータのかなり正確な測定値が提供されます。これにより、After Effects は何をいつパージするかをより適切に決定できるようになります。
* キャッシュ クラスの登録を解除すると、そのクラスのすべてのデータがキャッシュから削除されます。これにより、キャッシュ クラスに関連付けられたキャッシュ内のエントリごとに `delete_compute_value` コールバックが実行されます。
* `delete_compute_value` コールバックは、キャッシュ エントリに関連するリソースを解放する必要があります。計算キャッシュにはリソースへの void \* ポインターのみが含まれており、エフェクトに代わってリソースを解放することはできません。

---

## 実際の統合例

After Effects に同梱されているオート カラー プラグインは、コンピューティング キャッシュと `HashSuite1` スイートを利用して、エフェクト パラメーターの時間的スムージングが 0 より大きい値に設定されている場合に使用されるヒストグラムとレベル データをキャッシュするエフェクトです。キャッシュ スイートとハッシュ スイートを統合する最初の手順は、Auto Color の時間スムージングによってどのデータが計算されているか、その計算のどの部分に時間がかかっているか、そしてどのエフェクト パラメータによって再計算が必要になるかを特定することでした。

:::no
t
e
各エフェクトは異なるデータを計算してキャッシュする必要があるため、このレビューはエフェクトごとに独自に行う必要があります。

:::
Auto Color の時間的スムージングの場合、レンダリングされるフレームには、周囲のフレームからのヒストグラム データとレベル データの両方が必要です。必要な周囲のフレームの数は、時間的平滑化パラメーターの値に基づきます。ヒストグラム データとレベル データはどちらも計算にコストがかかる場合がありますが、一般的にはフレームごとに 1 回計算し、キャッシュし、必要に応じて再利用できます。

ただし、オート カラー エフェクトには、ブラック クリップ、ホワイト クリップ、ミッド トーン、オート カラー モードなど、キャッシュ値の計算に使用される他の多くのパラメータがあります。したがって、これらのパラメータは `generate_key` メソッドと `compute` メソッドに含める必要があります。

その情報を入手して、コンピューティング キャッシュの統合を開始しました。

1. クラス登録 ID を定義し、チェックアウト キャッシュ クラスとコールバックを登録および登録解除するための呼び出しを追加します。
    - AEGP_ClassRegister の呼び出しは `PF_Cmd_GLOBAL_SETUP` 中に実行されます。
    - AEGP_ClassUnregister の呼び出しは `PF_Cmd_GLOBAL_SETDOWN` 中に実行されます。
2. `generate_key`、`compute`、`approx_size_value`、`delete_compute_value` のコールバック関数を実装します。
    - `generate_key` は、`AEGP_HashSuite1` を利用して、ブラック クリップ、ホワイト クリップ、ミッド トーン、オート レベル モードで混合する独自のキーを生成します。また、計算される特定のフレームに対してキャッシュが一意であることを保証するために、フレーム時間とタイム ステップも混合します。
    - `compute` は、ヒストグラムとレベルを計算し、これら 2 つのデータ構造を、計算コールバックから `out_valuePP` パラメーターとして設定される単一の構造体に格納します。
    - `approx_size_value` は、キャッシュされた値にあるヒストグラムとレベルのデータ構造を `sizeof()` に追加して、キャッシュ エントリによって使用されているメモリのサイズを返します。
    - `delete_compute_value` は、キャッシュ エントリのヒストグラムおよびレベル データ構造によって保持されているメモリをクリアします。
3. 計算/チェックアウト呼び出しを時間的平滑化に統合する
    - Temporal Smoothing コードが更新され、`AEGP_ComputeIfNeededAndCheckout` への呼び出しが追加されました。。この呼び出しは、周囲のフレーム ヒストグラムとレベル データを計算する他のレンダリングスレッドからの結果を利用して、時間平滑化アルゴリズムに必要なフレーム時間/タイム ステップごとに行われます。
4. キャッシュのチェックアウトとチェックインを統合する
    - フレームに必要なキャッシュ値がすべて計算されると、エフェクト コードは `AEGP_GetReceiptComputeValue` を使用して必要なキャッシュ値をチェックアウトします。
    - キャッシュ値は、フレームの色を調整するための時間的平滑化アルゴリズムの一部として使用されます。
    - 現在のフレームでキャッシュ値が不要になると、キャッシュ値を受信するたびに `AEGP_CheckinComputeReceipt` への呼び出しが行われます。
    - 現時点では、オートカラーは `AEGP_CheckoutCached` を使用しません。
5. sequence_data と Compute Cache 実装のテスト
    - Auto Color はシーケンス データを使用してヒストグラムとレベル データを保存していましたが、Compute Cache を使用する前は、各レンダリングスレッドに sequence_data の一意のコピーがありました。これは、フレームに必要なすべてのヒストグラムとレベルをすべてのスレッドでレンダリングする必要があることを意味します。
    - 計算キャッシュを使用するように変更したことで、レンダリングされる各フレームは、ヒストグラムとレベルのデータを計算し、将来の使用に備えて保存する他のレンダリングスレッドのパフォーマンス上の利点を獲得しました。
    - Compute Cache を使用したフッテージに対するオート カラー エフェクトのレンダリングの改善により、sequence_data バージョンよりも少なくとも 3 倍高速なレンダリングが実現しました。
