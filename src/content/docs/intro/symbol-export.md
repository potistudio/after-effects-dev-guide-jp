---
title: 'エフェクトでのシンボルエクスポート'
---
After Effects チームは最近、C++ 言語の One Definition Rule（ODR）に違反する競合シンボルの問題を認識しました。

2021 年初頭に、After Effects で使用される Boost ライブラリのバージョンが 1.74 にアップグレードされました。過去数か月にわたって、同様に Boost を使用しているが、After Effects またはプラグインが間違ったバージョンの Boost を呼び出してしまい、ユーザーのハングやクラッシュを引き起こす可能性のある方法でシンボルをエクスポートしているプラ​​グインを多数特定しました。また、多くの AE SDK サンプルがデフォルトですべてのシンボルをエクスポートするように設定されており、これらが他のプラグインの開始点として使用されていると仮定して、問題の一因となっている可能性があることも特定しました。これらは、2021 年 3 月の SDK の一部として修正されました。

**After Effects でエクスポートする必要がある唯一のシンボルは、プラグインのエントリ ポイントです。**

例は、entry.h の SDK サンプルにあります。

```cpp
#ifdef AE_OS_WIN
        #define DllExport   __declspec( dllexport )
#elif defined AE_OS_MAC
        #define DllExport   __attribute__ ((visibility ("default")))
#endif
```
次に、これがエントリ ポイント関数に適用されます。次に例を示します。

```cpp
extern "C" DllExport
PF_Err PluginDataEntryFunction(
    PF_PluginDataPtr inPtr,
    PF_PluginDataCB inPluginDataCallBackPtr,
    SPBasicSuite* inSPBasicSuitePtr,
    const char* inHostName,
    const char* inHostVersion)
{
    PF_Err result = PF_Err_INVALID_CALLBACK;

    result = PF_REGISTER_EFFECT(
        inPtr,
        inPluginDataCallBackPtr,
        "ColorGrid", // Name
        "ADBE ColorGrid", // Match Name
        "Sample Plug-ins", // Category
        AE_RESERVED_INFO); // Reserved Info

    return result;
}
```
---

## Xcode シンボルのエクスポートを無効にする

Xcode でシンボルのエクスポートを無効にするには:

1. プロジェクトの **ビルド** 設定で **Apple Clang - コード生成** セクションを見つけます。
2. **デフォルトで非表示になるシンボル**を**はい**に設定します

![Apple Clang Symbols](../_static/appleclang-symbols.png "Apple Clang Symbols")
*Apple Clang シンボル*

公開する必要がある特定のシンボルについては、コード内で `__attribute__((visibility("default")))` を使用します。

詳細については、Apple の Xcode ドキュメント [https://help.apple.com/xcode/mac/11.4/#/itcaec37c2a6](https://help.apple.com/xcode/mac/11.4/#/itcaec37c2a6) (以下の抜粋) を参照してください。

> デフォルトで非表示のシンボル (GCC_SYMBOLS_PRIVATE_EXTERN)
>
> 有効にすると、コード内で __attribute__((visibility("default"))) を使用してエクスポートするように明示的にマークされていない限り、すべてのシンボルは private extern として宣言されます。有効にしない場合、プライベート extern として明示的にマークされていない限り、すべてのシンボルがエクスポートされます。

---

## Visual Studio エクスポートの無効化

デフォルトでは、Visual Studio からのビルドではシンボルのエクスポートが自動的に無効になります。シンボルをエクスポートするには、モジュール定義ファイルを指定するか、関数定義で \_\_declspec(dllexport) キーワードを設定する必要があります。

詳細については、Microsoft の Visual Studio ドキュメント [https://docs.microsoft.com/en-us/cpp/build/exporting-from-a-dll?view=msvc-160](https://docs.microsoft.com/en-us/cpp/build/exporting-from-a-dll?view=msvc-160) (以下の抜粋) を参照してください。

> 次の 2 つの方法を使用して DLL から関数をエクスポートできます。
>
> 1. モジュール定義 (.def) ファイルを作成し、DLL をビルドするときに .def ファイルを使用します。 DLL から関数を名前ではなく序数でエクスポートする場合は、このアプローチを使用します。
> 2. 関数の定義でキーワード __declspec(dllexport) を使用します。
>
> いずれかの方法で関数をエクスポートする場合は、必ず __stdcall 呼び出し規則を使用してください。
