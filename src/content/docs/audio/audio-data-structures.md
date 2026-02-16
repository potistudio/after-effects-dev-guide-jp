---
title: 'オーディオデータ構造'
---
After Effects では、オーディオデータを表現するために次のデータ型を使用します。

| 構造体 | 説明 |
| --- | --- |
| `PF_SoundFormat` | オーディオ形式を示します（符号なし PCM / 符号付き PCM / 浮動小数点）。 |
| `PF_SoundSampleSize` | サンプルサイズを示します（1 / 2 / 4 byte）。 |
| `PF_SoundChannels` | チャンネル構成を示します（モノラル / ステレオ）。 |
| `PF_SoundFormatInfo` | サンプリングレート、チャンネル数、サンプルサイズ、フォーマットを保持します。 |
| `PF_SoundWorld` | `PF_SoundWorlds` でオーディオを表現します。`PF_SoundFormatInfo` に加えて、オーディオ長と実データへのポインタを保持します。 |

`PF_SoundFormat`、`PF_SoundSampleSize`、`PF_SoundChannels` はすべて `PF_SoundFormatInfo` に含まれます。

`PF_SoundWorlds` には `PF_SoundFormatInfo` と、インスタンス固有の追加情報が含まれます。
