---
title: 'カスタムUIとDrawbot'
---
カスタム UI は、Drawbot を使用した複合描画モデルを使用します。 Drawbot スイートは次の用途に使用できます。

1. 基本的な 2D パス描画: 線、長方形、円弧、ベジェ
2. パスのストローク/塗りつぶし/シェーディング
3. 画像描画：ARGB/BGRAバッファを表面に合成
4. プッシング/ポッピングの表面状態
5. テキスト描画（サプライヤーがサポートしている場合）（クライアントは、実際に描画する前にテキスト描画がサポートされているかどうかを最初に確認する必要があります）

描画は `PF_Event_DRAW` 中にのみ発生します (`PF_Event_DRAG` や `PF_Event_DO_CLICK` 中には発生しません)。

Drawbot を使用するには、まず、PF_Context を新しいスイート呼び出し [PF_GetDrawingReference](#drawbot_drawbotsuite) に渡して図面参照を取得します。

NULL 以外の図面参照が返された場合は、それを使用して [DRAWBOT_DrawbotSuite](#drawbot_drawbotsuite) からサプライヤーとサーフェスの参照を取得します。

Drawbot スイートには、`DRAWBOT_DrawbotSuite`、`DRAWBOT_SupplierSuite`、`DRAWBOT_SurfaceSuite`、`DRAWBOT_PathSuite` が含まれます。

---

## カスタム UI を「カスタム」らしく見せないようにする

ホスト アプリケーション UI と一致させるには、新しい [PF_EffectCustomUIOverlayThemeSuite](#pf_effectcustomuioverlaythemesuite) を使用します。ユーザーはあなたに感謝するでしょう。

---

## 再描画

ペインの特定の領域を再描画するには、次のことをお勧めします。

1. エフェクトから `PF_InvalidateRect` ([PF_AppSuite](../effect-details/useful-utility-functions#pf_appsuite) から) を呼び出します。これにより、遅延表示の再描画が発生し、次に利用可能なアイドル状態の瞬間に更新されます。この四角形は、関連付けられたペインに関連する座標にあります。 NULL の四角形を使用すると、ペイン全体が更新されます。
2. [event outflag](PF_EventExtra) を `PF_EO_UPDATE_NOW` に設定します。これにより、現在のイベントが返されたときに、指定されたペインの即時描画イベントが発生します。

エフェクトが一度に複数のウィンドウを更新する必要がある場合は、`PF_OutFlag_REFRESH_UI` ([PF_OutFlags](../effect-basics/PF_OutData#pf_outflags) から) を設定する必要があります。これにより、ECW、コンプ、およびレイヤー ウィンドウ全体が再描画されます。

---

## HiDPI および Retina ディスプレイのサポート

HiDPI および Retina ディスプレイをサポートするには、2 倍のサイズのオフスクリーン イメージを使用し、[Drawbot_SurfaceSuite](#drawbot_surfacesuite) の `Transform` 関数を使用して、描画前にイメージを半分に縮小します。

---

## PF_EffectCustomUISuite

エフェクトが図面参照を取得できるようにします。これは、Drawbot を使用するために必要な最初の呼び出しです。

### PF_EffectCustomUISuite1

| Function | Purpose |
| --- | --- |
| `PF_GetDrawingReference` | Get the drawing reference.<br /><br /><pre lang="cpp"> PF_GetDrawingReference(<br/>  const PF_ContextH  effect_contextH,<br/>  DRAWBOT_DrawRef    \*referenceP0);</pre> |

---

## Drawbot_DrawbotSuite

Using the Drawbot reference, get the supplier and surface references.

### Drawbot_DrawbotSuite1

| Function | Purpose |
| --- | --- |
| `GetSupplier` | Get the supplier reference.<br /><br />Needed to use [Drawbot_SupplierSuite](#drawbot_suppliersuite).<br /><br /><pre lang="cpp"> GetSupplier(<br/>  DRAWBOT_DrawRef      in_drawbot_ref,<br/>  DRAWBOT_SupplierRef  \*out_supplierP);</pre> |
| `GetSurface` | Get the surface reference.<br /><br />Needed to use [Drawbot_SurfaceSuite](#drawbot_surfacesuite).<br /><br /><pre lang="cpp"> GetSurface(<br/>  DRAWBOT_DrawRef     in_drawbot_ref,<br/>  DRAWBOT_SurfaceRef  \*out_surfaceP);</pre> |

---

## Drawbot_SupplierSuite

Calls to create and release drawing tools, get default settings, and query drawing capabilities.

### Drawbot_SupplierSuite1

| Function | Purpose |
| --- | --- |
| `NewPen` | Create a new pen. Release this using `ReleaseObject` from [Drawbot_SupplierSuite](#drawbot_suppliersuite).<br /><br /><pre lang="cpp"> NewPen(<br/>  DRAWBOT_SupplierRef      in_supplier_ref,<br/>  const DRAWBOT_ColorRGBA  \*in_colorP,<br/>  float                    in_size,<br/>  DRAWBOT_PenRef           \*out_penP);</pre> |
| `NewBrush` | Create a new brush. Release this using `ReleaseObject` from [Drawbot_SupplierSuite](#drawbot_suppliersuite).<br /><br /><pre lang="cpp"> NewBrush(<br/>  DRAWBOT_SupplierRef      in_supplier_ref,<br/>  const DRAWBOT_ColorRGBA  \*in_colorP,<br/>  DRAWBOT_BrushRef         \*out_brushP);</pre> |
| `SupportsText` | Check if current supplier supports text.<br /><br /><pre lang="cpp"> SupportsText(<br/>  DRAWBOT_SupplierRef  in_supplier_ref,<br/>  DRAWBOT_Boolean      \*out_supports_textB);</pre> |
| `GetDefaultFontSize` | Get the default font size.<br /><br /><pre lang="cpp"> GetDefaultFontSize(<br/>  DRAWBOT_SupplierRef  in_supplier_ref,<br/>  float                \*out_font_sizeF);</pre> |
| `NewDefaultFont` | Create a new font with default settings.<br /><br />You can pass the default font size from `GetDefaultFontSize`.<br /><br />Release this using `ReleaseObject` from [Drawbot_SupplierSuite](#drawbot_suppliersuite).<br /><br /><pre lang="cpp"> NewDefaultFont(<br/>  DRAWBOT_SupplierRef  in_supplier_ref,<br/>  float                in_font_sizeF,<br/>  DRAWBOT_FontRef      \*out_fontP);</pre> |
| `NewImageFromBuffer` | Create a new image from buffer passed to in_dataP.<br /><br />Release this using `ReleaseObject` from [Drawbot_SupplierSuite](#drawbot_suppliersuite).<br /><br /><pre lang="cpp"> NewImageFromBuffer(<br/>  DRAWBOT_SupplierRef  in_supplier_ref,<br/>  int                  in_width,<br/>  int                  in_height,<br/>  int                  in_row_bytes,<br/>  DRAWBOT_PixelLayout  in_pl,<br/>  const void           \*in_dataP,<br/>  DRAWBOT_ImageRef     \*out_imageP);</pre><br /><br />`DRAWBOT_PixelLayout` can be one of the following:<br /><br />- `kDRAWBOT_PixelLayout_24RGB`<br />- `kDRAWBOT_PixelLayout_24BGR`<br />- `kDRAWBOT_PixelLayout_32RGB`<br />- `ARGB` (A is ignored)<br />- `kDRAWBOT_PixelLayout_32BGR`<br />- `BGRA` (A is ignored)<br />- `kDRAWBOT_PixelLayout_32ARGB_Straight`<br />- `kDRAWBOT_PixelLayout_32ARGB_Premul`<br />- `kDRAWBOT_PixelLayout_32BGRA_Straight`<br />- `kDRAWBOT_PixelLayout_32BGRA_Premul` |
| `NewPath` | Create a new path. Release this using `ReleaseObject` from [Drawbot_SupplierSuite](#drawbot_suppliersuite).<br /><br /><pre lang="cpp"> NewPath(<br/>  DRAWBOT_SupplierRef  in_supplier_ref,<br/>  DRAWBOT_PathRef      \*out_pathP);</pre> |
| `SupportsPixelLayoutBGRA` | A given Drawbot implementation can support multiple channel orders, but will likely prefer one over the other.<br /><br />Use the following four callbacks to get the preferred channel order for any API that takes a `DRAWBOT_PixelLayout` (e.g. `NewImageFromBuffer`).<br /><br /><pre lang="cpp"> SupportsPixelLayoutBGRA(<br/>  DRAWBOT_SupplierRef  in_supplier_ref,<br/>  DRAWBOT_Boolean      \*out_supports_bgraPB);</pre> |
| `PrefersPixelLayoutBGRA` | <pre lang="cpp">PrefersPixelLayoutBGRA(<br/>  DRAWBOT_SupplierRef  in_supplier_ref,<br/>  DRAWBOT_Boolean      \*out_prefers_bgraPB);</pre> |
| `SupportsPixelLayoutARGB` | <pre lang="cpp">SupportsPixelLayoutARGB(<br/>  DRAWBOT_SupplierRef  in_supplier_ref,<br/>  DRAWBOT_Boolean      \*out_supports_argbPB);</pre> |
| `PrefersPixelLayoutARGB` | <pre lang="cpp">PrefersPixelLayoutARGB(<br/>  DRAWBOT_SupplierRef  in_supplier_ref,<br/>  DRAWBOT_Boolean      \*out_prefers_argbPB);</pre> |
| `RetainObject` | Retain (increase reference count on) any object (pen, brush, path, etc). For example, it should be used when any object is copied and the copied object should be retained.<br /><br /><pre lang="cpp"> RetainObject(<br/>  DRAWBOT_ObjectRef  in_obj_ref);</pre> |
| `ReleaseObject` | Release (decrease reference count on) any object (pen, brush, path, etc). This function MUST be called for any object created using `NewXYZ()` from this suite.<br /><br />Do not call this function on a `DRAWBOT_SupplierRef` and `DRAWBOT_SupplierRef`, since these are not created by the plug-in.<br /><br /><pre lang="cpp"> ReleaseObject(<br/>  DRAWBOT_ObjectRef  in_obj_ref);</pre> |

---

## Drawbot_SurfaceSuite

Calls to draw on the surface, and to query and set drawing settings.

### Drawbot_SurfaceSuite1

| Function | Purpose |
| --- | --- |
| `PushStateStack` | Push the current surface state onto the stack. It should be popped to retrieve old state.<br /><br />It is required to restore state if you are going to clip or transform a surface or change the interpolation or anti-aliasing policy.<br /><br /><pre lang="cpp"> PushStateStack(<br/>  DRAWBOT_SurfaceRef  in_surface_ref);</pre> |
| `PopStateStack` | Pop the last pushed surface state off the stack.<br /><br /><pre lang="cpp"> PopStateStack(<br/>  DRAWBOT_SurfaceRef  in_surface_ref);</pre> |
| `PaintRect` | Paint a rectangle with a color on the surface.<br /><br /><pre lang="cpp"> PaintRect(<br/>  DRAWBOT_SurfaceRef       in_surface_ref,<br/>  const DRAWBOT_ColorRGBA  \*in_colorP,<br/>  const DRAWBOT_RectF32    \*in_rectPR);</pre> |
| `FillPath` | Fill a path using a brush and fill type.<br /><br /><pre lang="cpp"> FillPath(<br/>  DRAWBOT_SurfaceRef  in_surface_ref,<br/>  DRAWBOT_BrushRef    in_brush_ref,<br/>  DRAWBOT_PathRef     in_path_ref,<br/>  DRAWBOT_FillType    in_fill_type);</pre><br /><br />`DRAWBOT_FillType` is one of the following:<br /><br />- `kDRAWBOT_FillType_EvenOdd`<br />- `kDRAWBOT_FillType_Winding` |
| `StrokePath` | Stroke a path using a pen.<br /><br /><pre lang="cpp"> StrokePath(<br/>  DRAWBOT_SurfaceRef  in_surface_ref,<br/>  DRAWBOT_PenRef      in_pen_ref,<br/>  DRAWBOT_PathRef     in_path_ref);</pre> |
| `Clip` | Clip the surface.<br /><br /><pre lang="cpp"> Clip(<br/>  DRAWBOT_SurfaceRef    in_surface_ref,<br/>  DRAWBOT_SupplierRef   in_supplier_ref,<br/>  const DRAWBOT_Rect32  \*in_rectPR);</pre> |
| `GetClipBounds` | Get clip bounds.<br /><br /><pre lang="cpp"> GetClipBounds(<br/>  DRAWBOT_SurfaceRef  in_surface_ref,<br/>  DRAWBOT_Rect32      \*out_rectPR);</pre> |
| `IsWithinClipBounds` | Checks whether a rect is within the clip bounds.<br /><br /><pre lang="cpp"> IsWithinClipBounds(<br/>  DRAWBOT_SurfaceRef    in_surface_ref,<br/>  const DRAWBOT_Rect32  \*in_rectPR,<br/>  DRAWBOT_Boolean       \*out_withinPB);</pre> |
| `Transform` | Transform the last surface state.<br /><br /><pre lang="cpp"> Transform(<br/>  DRAWBOT_SurfaceRef       in_surface_ref,<br/>  const DRAWBOT_MatrixF32  \*in_matrixP);</pre> |
| `DrawString` | Draw a string.<br /><br /><pre lang="cpp"> DrawString(<br/>  DRAWBOT_SurfaceRef       in_surface_ref,<br/>  DRAWBOT_BrushRef         in_brush_ref,<br/>  DRAWBOT_FontRef          in_font_ref,<br/>  const DRAWBOT_UTF16Char  \*in_stringP,<br/>  const DRAWBOT_PointF32   \*in_originP,<br/>  DRAWBOT_TextAlignment    in_alignment_style,<br/>  DRAWBOT_TextTruncation   in_truncation_style,<br/>  float                    in_truncation_width);</pre><br /><br />`DRAWBOT_TextAlignment` is one of the following:<br /><br />- `kDRAWBOT_TextAlignment_Left`<br />- `kDRAWBOT_TextAlignment_Center`<br />- `kDRAWBOT_TextAlignment_Right`<br /><br />`DRAWBOT_TextTruncation` is one of the following:<br /><br />- `kDRAWBOT_TextTruncation_None`<br />- `kDRAWBOT_TextTruncation_End`<br />- `kDRAWBOT_TextTruncation_EndEllipsis`<br />- `kDRAWBOT_TextTruncation_PathEllipsis` |
| `DrawImage` | Draw an image created using `NewImageFromBuffer()` on the surface. Alpha = [0.0f, 1.0f ].<br /><br /><pre lang="cpp"> DrawImage(<br/>  DRAWBOT_SurfaceRef      in_surface_ref,<br/>  DRAWBOT_ImageRef        in_image_ref,<br/>  const DRAWBOT_PointF32  \*in_originP,<br/>  float                   in_alpha);</pre> |
| `SetInterpolationPolicy` | <pre lang="cpp">SetInterpolationPolicy(<br/>  DRAWBOT_SurfaceRef           in_surface_ref,<br/>  DRAWBOT_InterpolationPolicy  in_interp);</pre><br /><br />`DRAWBOT_InterpolationPolicy` is one of the following:<br /><br />- `kDRAWBOT_InterpolationPolicy_None`<br />- `kDRAWBOT_InterpolationPolicy_Med`<br />- `kDRAWBOT_InterpolationPolicy_High` |
| `GetInterpolationPolicy` | <pre lang="cpp">GetInterpolationPolicy(<br/>  DRAWBOT_SurfaceRef           in_surface_ref,<br/>  DRAWBOT_InterpolationPolicy  \*out_interpP);</pre> |
| `SetAntiAliasPolicy` | <pre lang="cpp">SetAntiAliasPolicy(<br/>  DRAWBOT_SurfaceRef       in_surface_ref,<br/>  DRAWBOT_AntiAliasPolicy  in_policy);</pre><br /><br />`DRAWBOT_AntiAliasPolicy` is one of the following:<br /><br />- `kDRAWBOT_AntiAliasPolicy_None`<br />- `kDRAWBOT_AntiAliasPolicy_Med`<br />- `kDRAWBOT_AntiAliasPolicy_High` |
| `GetAntiAliasPolicy` | <pre lang="cpp">GetAntiAliasPolicy(<br/>  DRAWBOT_SurfaceRef       in_surface_ref,<br/>  DRAWBOT_AntiAliasPolicy  \*out_policyP);</pre> |
| `Flush` | Flush drawing. This is not always needed, and if overused, may cause excessive redrawing and flashing.<br /><br /><pre lang="cpp"> Flush(<br/>  DRAWBOT_SurfaceRef  in_surface_ref);</pre> |

---

## Drawbot_PathSuite

Calls to draw paths.

### Drawbot_PathSuite1

| Function | Purpose |
| --- | --- |
| `MoveTo` | Move to a point.<br /><br /><pre lang="cpp"> MoveTo(<br/>  DRAWBOT_PathRef  in_path_ref,<br/>  float            in_x,<br/>  float            in_y);</pre> |
| `LineTo` | Add a line to the path.<br /><br /><pre lang="cpp"> LineTo(<br/>  DRAWBOT_PathRef  in_path_ref,<br/>  float            in_x,<br/>  float            in_y);</pre> |
| `BezierTo` | Add a cubic bezier to the path.<br /><br /><pre lang="cpp"> BezierTo(<br/>  DRAWBOT_PathRef         in_path_ref,<br/>  const DRAWBOT_PointF32  \*in_pt1P,<br/>  const DRAWBOT_PointF32  \*in_pt2P,<br/>  const DRAWBOT_PointF32  \*in_pt3P);</pre> |
| `AddRect` | Add a rect to the path.<br /><br /><pre lang="cpp"> AddRect(<br/>  DRAWBOT_PathRef        in_path_ref,<br/>  const DRAWBOT_RectF32  \*in_rectPR);</pre> |
| `AddArc` | Add a arc to the path. Zero start degrees == 3 o'clock.<br /><br />Sweep is clockwise. Units for angle are in degrees.<br /><br /><pre lang="cpp"> AddArc(<br/>  DRAWBOT_PathRef         in_path_ref,<br/>  const DRAWBOT_PointF32  \*in_centerP,<br/>  float                   in_radius,<br/>  float                   in_start_angle,<br/>  float                   in_sweep);</pre> |
| `Close` | Close the path.<br /><br /><pre lang="cpp"> Close(<br/>  DRAWBOT_PathRef  in_path_ref);</pre> |

---

## PF_EffectCustomUIOverlayThemeSuite

This suite should be used for stroking and filling paths and vertices on the Composition and Layer Windows. After Effects is using this suite internally, and we have made it available to make custom UI look consistent across effects. The foreground/shadow colors are computed based on the app brightness level so that custom UI is always visible regardless of the application's Brightness setting in the Preferences.

### PF_EffectCustomUIOverlayThemeSuite1

| Function | Purpose |
| --- | --- |
| `PF_GetPreferredForegroundColor` | Get the preferred foreground color.<br /><br /><pre lang="cpp"> PF_GetPreferredForegroundColor(<br/>  DRAWBOT_ColorRGBA  \*foreground_colorP);</pre> |
| `PF_GetPreferredShadowColor` | Get the preferred shadow color.<br /><br /><pre lang="cpp"> PF_GetPreferredShadowColor(<br/>  DRAWBOT_ColorRGBA  \*shadow_colorP);</pre> |
| `PF_GetPreferredStrokeWidth` | Get the preferred foreground & shadow stroke width.<br /><br /><pre lang="cpp"> PF_GetPreferredStrokeWidth(<br/>  float  \*stroke_widthPF);</pre> |
| `PF_GetPreferredVertexSize` | Get the preferred vertex size.<br /><br /><pre lang="cpp"> PF_GetPreferredVertexSize(<br/>  float  \*vertex_sizePF);</pre> |
| `PF_GetPreferredShadowOffset` | Get the preferred shadow offset.<br /><br /><pre lang="cpp"> PF_GetPreferredShadowOffset(<br/>  A_LPoint  \*shadow_offsetP);</pre> |
| `PF_StrokePath` | Stroke the path with the overlay theme foreground color.<br /><br />Optionally draw the shadow using the overlay theme shadow color.<br /><br />Uses overlay theme stroke width for stroking foreground and shadow strokes.<br /><br /><pre lang="cpp"> PF_StrokePath(<br/>  const DRAWBOT_DrawRef  drawbot_ref,<br/>  const DRAWBOT_PathRef  path_ref<br/>  PF_Boolean             draw_shadowB);</pre> |
| `PF_FillPath` | Fills the path with overlay theme foreground color.<br /><br />Optionally draw the shadow using the overlay theme shadow color.<br /><br /><pre lang="cpp"> PF_FillPath(<br/>  const DRAWBOT_DrawRef  drawbot_ref,<br/>  const DRAWBOT_PathRef  path_ref<br/>  PF_Boolean             draw_shadowB);</pre> |
| `PF_FillVertex` | Fills a square vertex around the center point using the overlay theme foreground color and vertex size.<br /><br /><pre lang="cpp"> PF_FillVertex(<br/>  const DRAWBOT_DrawRef  drawbot_ref,<br/>  const A_FloatPoint     \*center_pointP<br/>  PF_Boolean             draw_shadowB);</pre> |
