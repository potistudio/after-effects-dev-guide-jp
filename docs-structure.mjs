export const DOC_STRUCTURE = {
  topLevel: [
    { label: 'はじめに', slug: 'index' },
    { label: 'バージョン履歴', slug: 'history' },
  ],
  sections: [
    {
      label: '導入',
      items: [
        { label: 'このSDKでできること', slug: 'intro/what-can-i-do' },
        { label: 'その他の統合方法', slug: 'intro/other-integration-possibilities' },
        { label: 'SDKの対象読者', slug: 'intro/sdk-audience' },
        { label: '変更点', slug: 'intro/whats-new' },
        { label: 'プラグイン開発の始め方', slug: 'intro/how-to-start-creating-plug-ins' },
        { label: 'サンプルプロジェクト', slug: 'intro/sample-projects' },
        { label: 'プラグインのデバッグ', slug: 'intro/debugging-plug-ins' },
        { label: '複数バージョン互換性', slug: 'intro/compatibility-across-multiple-versions' },
        { label: 'サードパーティ製ホスト', slug: 'intro/third-party-plug-in-hosts' },
        { label: 'PiPLリソース', slug: 'intro/pipl-resources' },
        { label: '例外', slug: 'intro/exceptions' },
        { label: 'インストーラーの配置先', slug: 'intro/where-installers-should-put-plug-ins' },
        { label: 'ローカライズ', slug: 'intro/localization' },
        { label: 'Apple Silicon対応', slug: 'intro/apple-silicon-support' },
        { label: 'Windows on Arm対応', slug: 'intro/windows-on-arm-support' },
        { label: 'エフェクトでのシンボルエクスポート', slug: 'intro/symbol-export' },
        { label: 'GPUエフェクトのビルド', slug: 'intro/gpu-build-instructions' },
        { label: '次のステップ', slug: 'intro/next-steps' },
      ],
    },
    {
      label: 'エフェクト基礎',
      items: [
        { label: 'エフェクト基礎', slug: 'effect-basics/effect-basics' },
        { label: 'エントリーポイント', slug: 'effect-basics/entry-point' },
        { label: 'コマンドセレクター', slug: 'effect-basics/command-selectors' },
        { label: 'PF_InData', slug: 'effect-basics/pf_indata' },
        { label: 'PF_OutData', slug: 'effect-basics/pf_outdata' },
        { label: 'パラメータ', slug: 'effect-basics/parameters' },
        { label: 'PF_ParamDef', slug: 'effect-basics/pf_paramdef' },
        { label: 'PF_EffectWorld / PF_LayerDef', slug: 'effect-basics/pf_effectworld' },
        { label: 'エラー', slug: 'effect-basics/errors' },
      ],
    },
    {
      label: 'エフェクト詳細',
      items: [
        { label: 'AEにおけるマルチフレームレンダリング', slug: 'effect-details/multi-frame-rendering-in-ae' },
        { label: 'エフェクト詳細', slug: 'effect-details/effect-details' },
        { label: 'After EffectsのFunction Suiteへのアクセス', slug: 'effect-details/accessing-function-suites' },
        { label: 'メモリアロケーション', slug: 'effect-details/memory-allocation' },
        { label: '画像バッファ管理関数', slug: 'effect-details/image-buffer-management-functions' },
        { label: 'イテレーションSuite', slug: 'effect-details/iteration-suites' },
        { label: 'グラフィックスユーティリティSuite', slug: 'effect-details/graphics-utility-suites' },
        { label: '連携コールバック関数', slug: 'effect-details/interaction-callback-functions' },
        { label: 'ピクセルアスペクト比', slug: 'effect-details/pixel-aspect-ratio' },
        { label: 'パラメータと浮動小数点値', slug: 'effect-details/parameters-floating-point-values' },
        { label: 'パラメータ監視', slug: 'effect-details/parameter-supervision' },
        { label: 'グローバル/シーケンス/フレームデータ', slug: 'effect-details/global-sequence-frame-data' },
        { label: '任意データパラメータ', slug: 'effect-details/arbitrary-data-parameters' },
        { label: '便利なユーティリティ関数', slug: 'effect-details/useful-utility-functions' },
        { label: 'モーションブラー', slug: 'effect-details/motion-blur' },
        { label: 'パスの扱い', slug: 'effect-details/working-with-paths' },
        { label: 'カメラ/ライト情報へのアクセス', slug: 'effect-details/accessing-camera-light-information' },
        { label: '色空間変換', slug: 'effect-details/color-space-conversion' },
        { label: 'パラメータ順序の安全な変更', slug: 'effect-details/changing-parameter-orders' },
        { label: 'ヒントとコツ', slug: 'effect-details/tips-tricks' },
        { label: 'Compute Cache API', slug: 'effect-details/compute-cache-api' },
      ],
    },
    {
      label: 'SmartFX',
      items: [{ label: 'SmartFX', slug: 'smartfx/smartfx' }],
    },
    {
      label: 'エフェクトUIとイベント',
      items: [
        { label: 'エフェクトUIとイベント', slug: 'effect-ui-events/effect-ui-events' },
        { label: 'PF_EventExtra', slug: 'effect-ui-events/pf_eventextra' },
        { label: 'PF_EventUnion', slug: 'effect-ui-events/pf_eventunion' },
        { label: 'カスタムUIとDrawbot', slug: 'effect-ui-events/custom-ui-and-drawbot' },
        { label: 'UIコールバック', slug: 'effect-ui-events/ui-callbacks' },
        { label: 'ヒントとコツ', slug: 'effect-ui-events/tips-and-tricks' },
      ],
    },
    {
      label: 'オーディオ',
      items: [
        { label: 'オーディオ', slug: 'audio/audio' },
        { label: 'グローバルOutflags', slug: 'audio/global-outflags' },
        { label: 'オーディオデータ構造', slug: 'audio/audio-data-structures' },
        { label: 'オーディオ専用Floatスライダー変数', slug: 'audio/audio-specific-float-slider-variables' },
        { label: 'オーディオデータへのアクセス', slug: 'audio/accessing-audio-data' },
        { label: 'オーディオの注意点', slug: 'audio/audio-considerations' },
      ],
    },
    {
      label: 'AEGP',
      items: [
        { label: 'AEGP', slug: 'aegps/aegps' },
        { label: '概要', slug: 'aegps/overview' },
        { label: 'データ型', slug: 'aegps/data-types' },
        { label: '実装', slug: 'aegps/implementation' },
        { label: 'AEGP Suite', slug: 'aegps/aegp-suites' },
        { label: 'エフェクトからAEGP Suiteを使う裏技', slug: 'aegps/cheating-effect-usage-of-aegp-suites' },
        { label: 'AEGP詳細', slug: 'aegps/aegp-details' },
      ],
    },
    {
      label: 'Artisan',
      items: [
        { label: 'Artisan', slug: 'artisans/artisans' },
        { label: 'Artisanデータ型', slug: 'artisans/artisan-data-types' },
      ],
    },
    {
      label: 'AEIO',
      items: [
        { label: 'AEIO', slug: 'aeios/aeios' },
        { label: '呼び出しシーケンス', slug: 'aeios/calling-sequence' },
        { label: 'AEIO_ModuleInfo', slug: 'aeios/aeio_moduleinfo' },
        { label: '新しいFunction Block', slug: 'aeios/new-kids-on-the-function-block' },
        { label: '実装詳細', slug: 'aeios/implementation-details' },
      ],
    },
    {
      label: 'Premiere Pro',
      items: [
        { label: 'Premiere Proとその他ホスト', slug: 'ppro/ppro' },
        { label: 'プラグインのインストール', slug: 'ppro/plug-in-installation' },
        { label: '基本的なホスト差異', slug: 'ppro/basic-host-differences' },
        { label: 'マルチスレッド', slug: 'ppro/multithreading' },
        { label: '大きな差異', slug: 'ppro/bigger-differences' },
        { label: 'Plug-Ins... Reloaded', slug: 'ppro/plug-ins-reloaded' },
        { label: 'Premiere Elements', slug: 'ppro/premiere-elements' },
        { label: '非対応機能', slug: 'ppro/unsupported-features' },
        { label: 'その他のホスト', slug: 'ppro/other-hosts' },
      ],
    },
  ],
};

export const STARLIGHT_SIDEBAR = [
  ...DOC_STRUCTURE.topLevel.map((item) =>
    item.slug === 'index' ? { label: item.label, link: '/' } : { label: item.label, slug: item.slug },
  ),
  ...DOC_STRUCTURE.sections.map((section) => ({
    label: section.label,
    items: section.items.map((item) => ({ label: item.label, slug: item.slug })),
  })),
];

export const TITLE_BY_SLUG = Object.fromEntries(
  [
    ...DOC_STRUCTURE.topLevel,
    ...DOC_STRUCTURE.sections.flatMap((section) => section.items),
  ].map((item) => [item.slug, item.label]),
);
