---
title: 'グローバル OutFlags'
---
すべてのオーディオエフェクトは、`PF_OutFlag_AUDIO_EFFECT_TOO` または `PF_OutFlag_AUDIO_EFFECT_ONLY` を設定する必要があります。

`PF_OutFlag_I_USE_AUDIO` は、オーディオデータを参照するだけで変更しない映像エフェクト向けのフラグです。

`PF_OutFlag_AUDIO_FLOAT_ONLY`、`PF_OutFlag_AUDIO_IIR`、`PF_OutFlag_I_SYNTHESIZE_AUDIO` を使うと、オーディオ出力の挙動をより細かく制御できます。詳細は [PF_OutFlags](../effect-basics/pf_outdata#pf_outflags) を参照してください。
