---
title: 'メモリアロケーション'
---
大きなサイズのメモリ割り当てには After Effects を使用してください。小さい割り当ての場合は、new と delete を使用できますが、これは例外であり、規則ではありません。メモリ不足状態（RAM プレビュー中など）では、プラグインがメモリ不足状態に適切に対処し、OS メモリに関して After Effects と競合しないことが非常に重要です。メモリ割り当て関数を使用することで、After Effects はメモリ スワップを回避するために、キャッシュされたイメージを解放するタイミングを知ることができます。大量の割り当てに関数を使用しないと、ロックアップ、クラッシュ、技術サポートへの問い合わせが発生する可能性があります。そんなことはしないでください。

既存の C++ クラスをラップしている場合は、そのクラスの new と delete を実装する基本クラスを作成し、そこから派生させます。 STL をオーバーロードする場合、グローバルな new および delete をオーバーロードすることはお勧めしません。代わりに、テンプレート定義の一部としてアロケーターを提供します。

After Effects によって渡されたハンドルは、呼び出される前にロックされ、戻ってくるとロックが解除されます。

---

## PF_HandleSuite1

| Function | Purpose | Replaces |
| --- | --- | --- |
| `host_new_handle` | Allocates a new handle.<br /><br /><pre lang="cpp">PF_Handle (*host_new_handle)(<br/>  A_HandleSize size);</pre> | `PF_NEW_HANDLE` |
| `host_lock_handle` | Locks a handle.<br /><br /><pre lang="cpp">void * (*host_lock_handle)(<br/>  PF_Handle pf_handle);</pre> | `PF_LOCK_HANDLE` |
| `host_unlock_handle` | Unlocks a handle.<br /><br /><pre lang="cpp">void (*host_unlock_handle)(<br/>  PF_Handle pf_handle);</pre> | `PF_UNLOCK_HANDLE` |
| `host_dispose_handle` | Frees a handle.<br /><br /><pre lang="cpp">void (*host_dispose_handle)(<br/>  PF_Handle pf_handle);</pre> | `PF_DISPOSE_HANDLE` |
| `host_get_handle_size` | Returns the size, in bytes, of the reallocatable block whose handle is passed in.<br /><br /><pre lang="cpp">A_HandleSize (*host_get_handle_size)(<br/>  PF_Handle pf_handle);</pre> | `PF_GET_HANDLE_SIZE` |
| `host_resize_handle` | Resizes a handle.<br /><br /><pre lang="cpp">PF_Err (*host_resize_handle)(<br/>  A_HandleSize new_sizeL, PF_Handle \*handlePH);</pre> | `PF_RESIZE_HANDLE` |
