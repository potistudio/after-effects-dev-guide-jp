---
title: 'はじめに'
---
Adobe® After Effects® ソフトウェア開発キットへようこそ。

このドキュメントは継続的に更新されています。最新の公開版 SDK は [Adobe Developer Console](https://www.adobe.io/after-effects/) から入手できます。

不明点がある場合は、まず [After Effects SDK Forum](https://community.adobe.com/t5/after-effects/bd-p/after-effects?page=1&sort=latest_replies&filter=all&topics=label-sdk) を確認してください。既存の回答で解決しない場合は、新しい質問を投稿してください。

---

## このドキュメントについて

このガイドは、長年にわたって拡張と改訂を重ねてきた「リファレンス」と「実装ガイド」を兼ねたドキュメントです。

After Effects API の仕様を網羅しつつ、実装時に迷いやすい点を実践的に説明する構成になっています。今後も、必要に応じて図解や補足説明を追加していきます。

---

## ドキュメント構成

[What Can I Do With This SDK?](intro/what-can-i-do)
この SDK で実現できること、プラグインの基本的な仕組み、サンプルプロジェクトの使い方を説明します。

[Effect Basics](effect-basics/effect-basics)
エフェクトプラグインの基本です。エントリポイントの引数、各種フラグ、パラメータ、画像バッファを扱います。

[Effect Details](effect-details/effect-details)
コールバックやスイートを使った実装の詳細を扱います。実運用を想定した注意点やテスト観点も含みます。

[SmartFX](smartfx/smartfx)
32-bit float 画像に対応する SmartFX API の拡張仕様を説明します。

[Effect UI & Events](effect-ui-events/effect-ui-events)
UI イベント、カスタム UI の実装、パラメータ監視、UI メッセージングを扱います。

[Audio](audio/audio)
オーディオ処理向けの API、データ構造、フラグ、実装上の注意点を説明します。

[AEGPs](aegps/aegps)
After Effects の汎用プラグイン API（AEGP）を説明します。プロジェクト操作やメニュー連携も含みます。

[Artisans](artisans/artisans)
3D レンダラ AEGP（Artisan）の設計と API を説明します。

[AEIOs](aeios/aeios)
ファイル入出力を担う AEGP（AEIO）の実装を説明します。

[Premiere Pro & Other Hosts](ppro/ppro)
Premiere Pro など、他ホストでの互換性と実装差分を説明します。

---

## 表記規則

関数名、構造体名、C/C++ コードは等幅フォントで表記します（例: `MyStruct`, `MyFunction()`）。

リンクは青色テキストで表示されます。

コマンドセレクターはイタリックで表記します（例: *PF_Cmd_RENDER*）。

---

## コーディングスタイルについて

SDK サンプルには、Adobe 内部で長年使われてきた命名規則が含まれています。採用は任意ですが、既存サンプルやヘッダーとの整合性を保つため、同じ規約を使うと読みやすくなります。

### 命名規約

| 型 | サフィックス | 例 |
| --- | --- | --- |
| ハンドル | `H` | `fooH` |
| ポインタ | `P` | `fooP` |
| 真偽値 | `B` | `visibleB` |
| 浮動小数点 | `F` | `degreesF` |
| 長整数 | `L` | `offsetL` |
| 符号なし長整数 | `Lu` | `countLu` |
| 短整数 | `S` | `indexS` |
| 文字 | `C` | `digitC` |
| 符号なし文字 | `Cu` | `redCu` |
| 関数ポインタ | `_func` | `sample_func` |
| 時間値 | `T` | `durationT` |
| `char*`（NULL 終端 C 文字列） | `Z` | `nameZ` |
| 矩形 | `R` | `boundsR` |
| 固定小数点矩形 | `FiR` | `boundsFiR` |
| 浮動小数点矩形 | `FR` | `boundsFR` |
| 比率 | `Rt` | `scale_factorRt` |
| `void*` | `PV` | `refconPV` |
| オプション引数（NULL 可） | `0` | `extra_flags0` |
