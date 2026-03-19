---
title: 'GPUエフェクトのビルド'
---
AE GPU SDK は、API をデモするための SDK_Invert_ProcAmp サンプル エフェクトとともにバージョン 16.0 に追加されました。

SDK_Invert_ProcAmp サンプルをビルドするには、最初にいくつかの依存関係をインストールする必要があります。

## Mac セットアップ手順

SDK_Invert_ProcAmp プラグインは Boost を使用して GPU カーネル ファイルを処理するため、マシンに Boost をインストールする必要があります。 Boost は homebrew を通じてインストールするか、boost.org から直接ダウンロードしてインストールできます。

1. Homebrew を通じて Boost をインストールするか、[boost.org](https://www.boost.org/releases/latest/) から直接ダウンロードします。
    - Boost では、最新のインストール手順をここで提供しています: [Getting Started with Boost](https://www.boost.org/doc/user-guide/getting-started.html)
2. Boost がインストールされたら、インストール パスを取得します。
    - homebrew 経由でインストールした場合は、次のようになります: `/usr/local/Cellar/boost/1.67.0_1/include/boost`
    - 直接ダウンロードしてインストールした場合は、次のようなもの: `/usr/local/include/boost`
3. Xcode で SDK_Invert_ProcAmp プロジェクトを開き、[設定] -> [場所] -> [カスタム パス] に移動します。
4. 次のエントリを追加します。
    - 名前: `BOOST_BASE_PATH`
    - 表示名: `BOOST`
    - パス: `[Your Boost installation path]`
5. ビルド時に Python エラーが表示された場合は、(zsh ではなく) bash 用に Python がインストールされていることを確認してください。 bash 用の python3 をインストールしても「python コマンドが見つかりません」エラーが表示される場合は、「プロジェクト設定」->「ビルド ルール」に移動し、「python」キーワードを「python3」に変更してみてください。

## Windows セットアップ手順

1. boost.org から Boost をインストールします (最新の手順は [here](https://www.boost.org/doc/user-guide/getting-started.html) です)
    - boost パッケージを解凍し、付属の bootstrap.bat を実行します。
    - 次に `.\b2` を実行して Boost をビルドします
    - 次に `.\b2 install --prefix=C:\Boost` を実行します
2. [https://developer.nvidia.com/cuda-downloads](https://developer.nvidia.com/cuda-downloads) から CUDA SDK をインストールします。
    - AE ビルドが使用しているものと同じ CUDA バージョンを使用してください。
    - AE 25.4 は CUDA 12.8 を使用します。
3. [https://github.com/microsoft/DirectXShaderCompiler/releases](https://github.com/microsoft/DirectXShaderCompiler/releases) から最新の DirectX コンパイラーをインストールします。
4. 次のシステム環境変数を設定します。
    - CUDA_SDK_BASE_PATH: `[CUDA installation path]`
        - (例: `C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.8`)
    - Boost_BASE_PATH: `[Boost installation path]`
        - (例: `C:\Boost\include\boost-1_88`)
    - DXC_SDK_BASE_PATH: `[DXC installation path]`
        - (例: `C:\dxc_2023_08_14`)

### 導入手順 (DirectX):
バイナリと一緒に生成される DirectXAssets フォルダーも次のようにする必要があります。
エフェクトを機能させるためにコピーする必要があります。アセットは、
実行時のアプリケーション。

PF_OutFlag2_SUPPORTS_DIRECTX_RENDERING を
DirectX レンダリング用の Global Flags の一部と対応する
PiPL リソース ファイル内の値を更新する必要があります。効果が落ちてしまいます
フラグが欠落している場合は、CPU 実装に戻ります。

### CUDA ランタイム API とドライバー API:
1. **CUDA ドライバー API を利用する**

    互換性を最大限に高めるために、CUDA ドライバーのみを使用することを強くお勧めします。
    API。ランタイム API とは異なり、ドライバー API は将来の API と互換性があります。
    ドライバーたち。 CUDA ランタイム API は、処理/自動化するために構築されていることに注意してください。
    公開されており、内部で処理する必要があるハウスキーピングの一部
    ドライバー API なので、いくつかの新しい手順やコードが必要になる可能性があります。
    ランタイム API からドライバー API に移行するために実装します。

2. **代替 1: CUDA ランタイムへの静的リンク**

    CUDA ランタイム API が必要な場合は、静的にリンクすることをお勧めします。
    CUDA ランタイム、cudart_static.lib。これは、将来のドライバー バージョンでも機能します。

3. **代替 2: CUDA ランタイムに動的にリンクする**

    これも機能しますが、互換性の問題が発生しやすい可能性があります。互換性のある CUDA
    将来的に動作するには、ランタイム DLL がユーザーのシステムで利用可能である必要があります
    ドライバーたち。現在、After Effects には CUDA ランタイム DLL のコピーが同梱されています。
    推奨する CUDA SDK バージョンに対応しています。これは変更される可能性があります
    未来。 CUDA ランタイムに動的にリンクする必要がある場合は、
    CUDA ランタイム DLL のコピーをプラグインと一緒に出荷することをお勧めします。
    dlopen/LoadLibrary を使用して、必要なランタイムを明示的にロードします。さらに詳しく
    詳細については、NVIDIA の GPU 管理の「CUDA 互換性」セクションを参照してください。
    および展開ガイド: [https://docs.nvidia.com/deploy/cuda-compatibility/](https://docs.nvidia.com/deploy/cuda-compatibility/)
