---
title: 'サンプルプロジェクト'
---
現在の API でサポートされているすべてのタイプのプラグインのサンプルが少なくとも 1 つあり、特定の概念を説明するためのプロジェクトもあります。

サンプルプロジェクトでは、コードを可能な限りシンプルにしています。派手な実装はプログラミングの授業で良い成績を収めるかもしれませんが、API 機能の使用方法を理解するのには役立ちません。

休憩の後は、サンプルプロジェクトのビルド方法について説明しますので、以下を読み続けてください。

---

## サンプルプロジェクトの説明

| Project | Description |
| --- | --- |
| AEGPs | AEGPs hook directly into After Effects' menus and other areas in the UI.<br /><br />See below for specifics on where the AEGP appears in the UI. |
| Artie | Artie the Artisan takes over rendering of all 3D layers in a given composition.<br /><br />This is the same API used by our internal 3D renderers; it is very complex, and exposes a great deal of tacit information about the After Effects rendering pipeline.<br /><br />Unless you have a compelling reason to replace the way After Effects handles 3D rendering, you need never work with this sample.<br /><br />Artisans appear in Composition > Composition Settings, in the 3D Renderer tab, in the Renderer drop-down. |
| Easy Cheese | A keyframer (which shows up on the Animation > Keyframe Assistant submenu), Easy Cheese shows how to manipulate various characteristics of keyframes (in a way that, uncannily, resembles our shipping plug-in, Easy Ease...) |
| FBIO | Exercises the After Effects Input/Output (AEIO) API. Similar to the IO sample, but supports the frame-based .ffk file format.<br /><br />!!! note<br />We now recommend developing a [Premiere Pro Importers](other-integration-possibilities#premiere-pro-importers) instead. |
| Grabba | Gets frames (formatted as the plug-in requests) from any composition in the project. |
| IO | Exercises the After Effects Input/Output (AEIO) API. Supports the fictitious .fak file format, and handles all requests from After Effects for retrieving data from or outputting to such files.<br /><br />!!! note<br />We now recommend developing a [Premiere Pro Importers](other-integration-possibilities#premiere-pro-importers) instead. |
| Mangler | Mangler is a keyframer demonstrating the use of an ADM palette, just like our own. |
| Panelator | Creates a panel that can be docked along with the rest of the standard panels.<br /><br />!!! note<br />It is far more work to create a panel this way than using the HTML5 Panel SDK.<br /><br />We recommend starting with that SDK instead. |
| Persisto | Shows how to read and write information from the After Effects preferences file. |
| ProjDumper | Creates a text file representing every element in an After Effects project. |
| Projector | Imports the (fictitious) .sdk file format, and creates a project using AEGP API calls.<br /><br />Whenever you're wondering how to get or set some characteristic of a project element, look here first.<br /><br />!!! note<br />There are some hardcoded paths in Projector.h. If you don't set these to refer to actual media on disk, you WILL get errors while running this plug-in. Don't blame us; change them! |
| QueueBert | Pronounced "Cue-BARE!", QueueBert manipulates all aspects of render queue items and the output modules associated with them. |
| Streamie | Manipulates streams, both dynamic and fixed. |
| Sweetie | Sweetie uses the PICA (or "Suite Pea") API to provide a function Suite, for use by other plug-ins.<br /><br />If you're writing multiple plug-ins that rely on the same image processing library, you could provide the library functionality using such a suite. |
| Text Twiddler | Manipulates text layers and their contents. |
| Effects | All effects appear in the Effects & Presets panel, and in the Effect menu. |
| Checkout | Checks out (of After Effects' frame cache) a frame of input from another layer, at a specified time.<br /><br />This is an important concept for all effects with layer parameters. Premiere Pro compatible. |
| Convolutrix | Exercises our image convolution callbacks. Premiere Pro compatible. |
| Gamma Table | Shows how to manage sequence data, and uses our iteration callbacks.<br /><br />For nostalgia's sake, we're leaving this one sample in C; it's also compatible with many third-party plug-in hosts, due to its reliance on version 3.x API features. |
| Paramarama | Exercises wayward param types not used in other sample. Premiere Pro compatible. |
| PathMaster | Shows how to access paths from within an effect. |
| Portable | Shows how to detect and respond to several different plug-in hosts. Premiere Pro compatible. |
| Resizer | Resizer resizes (surprise!) the output buffer. This is useful for effects like glows and drop shadows, which would be truncated at the layer's edges if they didn't expand the output buffer.<br /><br />Premiere Pro compatible. |
| SDK Backwards | Reverses a layer's audio, and mixes it with a keyframe-able sine wave. |
| SDK Noise | Premiere Pro compatible, demonstrates 32-bit and YUV rendering in Premiere Pro. |
| Shifter | Shifts an image in the output buffer, and exercises our transform_world and subpixel sampling functions. |
| SmartyPants | Demonstrates the SmartFX API, required for support of floating point pixels. |
| Transformer | Exercises our image transformation callbacks. |
| Effect Template |   |
| Skeleton | Skeleton is the starting point for developing effects. Premiere Pro compatible. |
| Effects with Custom UI |   |
| CCU | Implements a custom user interface in the composition and layer windows, supporting pixel aspect ratio and downsample ratios. Premiere Pro compatible. |
| ColorGrid | Shows how to use arbitrary data type parameters. Also has a nice custom UI. Premiere Pro compatible. |
| Custom ECW UI | Implements a very boring custom user interface in the effect controls window, and shows how to respond to numerous UI events. |
| Histogrid | New for CC 2015 (13.5). An example of how custom UI can access asynchronously-rendered upstream frames for lightweight processing in CC 2015 and later.<br /><br />This effect calculates a sampled 10x10 color grid from the upstream frame, and displays a preview of that color grid.<br /><br />In render, a higher-quality grid is calculated and used to modify the output image, creating a blend of a color grid with the original image. |
| Supervisor | Shows how to control parameters (both values and UI) based on the value of other parameters. Premiere Pro compatible. |
| BlitHook |   |
| EMP | External Monitor Preview. Use this as a starting point for adding support to output video from the composition panel to video hardware. |

---

## サンプルプロジェクトのビルド

サンプルプロジェクトを 1 つのマスター プロジェクトに結合し、SDK の Examples フォルダーに保存しました。 macOS の場合、これは Buildall.xcodeproj です。 Windows の場合は、BuildAll.sln です。

IDE では、プロジェクトの出力フォルダーを変更して、After Effects のプラグインフォルダーにビルドする必要があります。

開発には、macOS のパス `~/Library/Application Support/Adobe/Common/Plug-ins/[version]/MediaCore/` を使用することをお勧めします。

バージョンは、すべての CC バージョンの場合は 7.0 にロックされ、それ以前のバージョンの場合は CSx にロックされます。

例: `~/Library/Application Support/Adobe/Common/Plug-ins/7.0/MediaCore/`

または: `~/Library/Application Support/Adobe/Common/Plug-ins/CS6/MediaCore/`

Windows の場合は次のパス: `[Program Files]\Adobe\Common\Plug-ins\[version]\MediaCore\`

例: `C:\Program Files\Adobe\Common\Plug-ins\7.0\MediaCore\`

または: `C:\Program Files\Adobe\Common\Plug-ins\CS6\MediaCore\`

この Windows パスは開発目的でのみ推奨されることに注意してください。 Windows インストーラは、[Where Installers Should Put Plug-ins](where-installers-should-put-plug-ins) のガイドラインに従う必要があります。

Xcode では、[Xcode ファイル] > [プロジェクト設定] > [詳細設定] でプロジェクトに対してこのパスを 1 回設定できます。 [*ビルドの場所*] で [*カスタム: 絶対*] を選択し、パスを入力します。

Visual Studio では、便宜上、環境変数 AE_PLUGIN_BUILD_DIR を使用してすべてのサンプルプロジェクトの出力パスを指定しています。これをシステムのユーザー環境変数として設定する必要があります。 Windows 7 では、[*マイ コンピュータ*] > [プロパティ*] > を右クリックし、左側のサイドバーで [システムの詳細設定*] を選択します。新しいダイアログで、[*環境変数*] ボタンをクリックします。 [ユーザー変数] 領域で、AE_PLUGIN_BUILD_DIR という名前の新しい変数を、上記のパスで作成します。 Windows からログアウトし、再度ログインすると、変数が設定されます。

あるいは、ソリューション エクスプローラーでプロジェクトを右クリックして [プロパティ] を選択し、次に [構成プロパティ] > [リンカー] > [全般] で出力ファイルを設定することで、Visual Studio で各プロジェクトの出力パスを個別に設定できます。

プラグインをコンパイルするときに、次のようなリンク エラーが表示される場合:

「ファイル「[MediaCore プラグイン パス]plugin.prm」を開けません。Visual Studio を管理者モードで起動してください。。 Visual Studio インストールで、devenv.exe を右クリックし、[プロパティ] > [互換性] > [特権レベル] をクリックし、[管理者としてこのプログラムを実行する] をクリックします。
