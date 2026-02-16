---
title: '非対応機能'
---
Premiere Pro は現在、After Effects API の次の機能をサポートしていないことがわかっています。

(「-」の黒丸が付いた機能が必要な場合は、[Premiere Pro API Engineering](mailto:bbb@adobe.com) に機能リクエストを電子メールで送信してください。「F」が先頭にある番号は機能リクエスト番号、その他はバグ番号です)

- F7233 - エクステントヒントのサポート
- F7835 - 単一プラグイン内の複数の PiPL
- F7836 - AEGP サポート
- F7517 - オーディオ サポート - プラグインが PF_Cmd_GLOBAL_SETUP で PF_OutFlag_I_USE_AUDIO を設定すると、プラグインはまったくロードされなくなります
- F9355 - PF_ParamFlag_COLLAPSE_TWIRLY をサポート
- PF ワールド トランスフォーム スイート
- PF AE チャンネルスイート
- AE の高ビット色深度サポートの実装
- スマートFX
- 3D サポート
- PF_SUBPIXEL_SAMPLE()、PF_GET_PIXEL_DATA16()

---

## しかし... 実行できないのに、なぜロードしたのでしょうか?!

Premiere Pro は AEGP プラグインをロードしようとします。これを検出して問題のある動作を回避するために、コマンド フック関数は After Effects によってのみ提供されるスイートにアクセスできます。 AEGP_CanvasSuite が優れた候補です。

スイートが存在しない場合は、エラーを返します。プラグインは Premiere Pro の「これらをロードしない」リストに追加されます。
