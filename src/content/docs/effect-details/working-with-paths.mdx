---
title: 'パスの扱い'
---
## パスデータへのアクセス

パスは、その値に直接アクセスできないという点で、他のパラメーター タイプとは異なります。チェックアウトおよびチェックイン (レイヤー パラメーターなど) に加えて、パス データ関数スイートを使用して、特定の時点でのパスの詳細を取得する必要があります。 [PF_PathQuerySuite1](#pf_pathquerysuite1) および [PF_PathDataSuite](#pf_pathdatasuite) を参照してください。パス パラメーターが渡されたときに、最初にチェックアウトせずに、その値を決して使用しないでください。削除されたパスは利用できなくなりますが、さらなる更新は「遅れて」 (後で) 行われます。パスをチェックアウトしない限り、エフェクトにはこれらの変更が表示されません。

---

## パスデータの操作

[AEGP_MaskOutlineSuite3](../aegps/aegp-suites#aegp_maskoutlinesuite3) を使用してパスを操作することもできます。 [Cheating Effect Usage of AEGP Suites](../aegps/cheating-effect-usage-of-aegp-suites)を参照してください。パス パラメーターは、データの不透明な塊として扱われます。これらにアクセスして操作するには、get 関数と set 関数を使用する必要があります。レイヤー パラメータと同様に、それらにアクセスするエフェクトによってチェックアウト (およびチェックイン) する必要があります。

---

## 頂点

パスの頂点は単純な点よりも複雑です。すべてのメンバー変数は PF_FpLong (double) であり、レイヤーの座標空間内にあります。

---

## PF_PathVertex

|   メンバー |         説明 |
| ----------- | ------------------------- |
| `x` |頂点の位置。 |
| `y` |                             |
| `tan_in_x` |入ってくる接点。 |
| `tan_in_y` |                             |
| `tan_out_x` |出方向の接点。 |
| `tan_out_y` |                             |

---

## PF_PathDataSuite

このスイートは、パス (頂点のシーケンス) に関する情報を提供します。

| Function | Description |
| --- | --- |
| `PF_PathIsOpen` | Returns `TRUE` if the path is not closed (if the beginning and end vertex are not identical).<br /><br /><pre lang="cpp">PF_PathIsOpen(<br/>  PF_ProgPtr         effect_ref0,<br/>  PF_PathOutlinePtr  pathP,<br/>  PF_Boolean         \*openPB);</pre> |
| `PF_PathNumSegments` | Retrieves the number of segments in the path.<br />N segments means there are segments `[0.N-1];` segment J is defined by vertex `J` and `J+1`.<br /><br /><pre lang="cpp">PF_PathNumSegments(<br/>  PF_ProgPtr         effect_ref0,<br/>  PF_PathOutlinePtr  pathP,<br/>  A_long             \*num_segmentsPL);</pre> |
| `PF_PathVertexInfo` | Retrieves the `PF_PathVertex` for the specified path.<br /><br />The range of points is `[0.num_segments];` for closed paths, `vertex[0] == vertex[num_segments]`.<br /><br /><pre lang="cpp">PF_PathVertexInfo(<br/>  PF_ProgPtr         effect_ref0,<br/>  PF_PathOutlinePtr  pathP,<br/>  A_long             which_pointL,<br/>  PF_PathVertex      \*vertexP);</pre> |
| `PF_PathPrepareSegLength` | This fairly counter-intuitive function informs After Effects that you're going to ask for the length of a segment (using `PF_PathGetSegLength` below), and it'd better get ready.<br /><br />`frequencyL` indicates how many times you'd like us to sample the length; our internal effects use 100.<br /><br /><pre lang="cpp">PF_PathPrepareSegLength(<br/>  PF_ProgPtr         effect_ref0,<br/>  PF_PathOutlinePtr  pathP,<br/>  A_long             which_segL,<br/>  A_long             frequencyL,<br/>  PF_PathSegPrepPtr  \*lengthPrepPP);</pre> |
| `PF_PathGetSegLength` | Retrieves the length of the given segment.<br /><br /><pre lang="cpp">PF_PathGetSegLength(<br/>  PF_ProgPtr         effect_ref0,<br/>  PF_PathOutlinePtr  pathP,<br/>  A_long             which_segL,<br/>  PF_PathSegPrepPtr  \*lengthPrepP0,<br/>  PF_FpLong          \*lengthPF);</pre> |
| `PF_PathEvalSegLength` | Retrieves the location of a point lengthF along the given path segment.<br /><br /><pre lang="cpp">PF_PathEvalSegLength(<br/>  PF_ProgPtr         effect_ref0,<br/>  PF_PathOutlinePtr  pathP,<br/>  PF_PathSegPrepPtr  \*lengthPrepPP0,<br/>  A_long             which_segL,<br/>  PF_FpLong          lengthF,<br/>  PF_FpLong          \*x,<br/>  PF_FpLong          \*y);</pre> |
| `PF_PathEvalSegLengthDeriv1` | Retrieves the location, and the first derivative, of a point `lengthF` along the given path segment.<br /><br />If you're not sure why you'd ever need this, don't use it. Math is hard.<br /><br /><pre lang="cpp">PF_PathEvalSegLengthDeriv1(<br/>  PF_ProgPtr         effect_ref0,<br/>  PF_PathOutlinePtr  pathP,<br/>  PF_PathSegPrepPtr  \*lengthPrepPP0,<br/>  A_long             which_segL,<br/>  PF_FpLong          lengthF,<br/>  PF_FpLong          \*x,<br/>  PF_FpLong          \*y,<br/>  PF_FpLong          \*deriv1x,<br/>  PF_FpLong          \*deriv1y);</pre> |
| `PF_PathCleanupSegLength` | Call this when you're finished evaluating that segment length, so After Effects can properly clean up the `PF_PathSegPrepPtr`.<br /><br /><pre lang="cpp">PF_PathCleanupSegLength(<br/>  PF_ProgPtr         effect_ref0,<br/>  PF_PathOutlinePtr  pathP,<br/>  A_long             which_segL,<br/>  PF_PathSegPrepPtr  \*lengthPrepPP);</pre> |
| `PF_PathIsInverted` | Returns `TRUE` if the path is inverted.<br /><br /><pre lang="cpp">PF_PathIsInverted(<br/>  PF_ProgPtr  effect_ref,<br/>  PF_PathID   unique_id,<br/>  PF_Boolean  \*invertedB);</pre> |
| `PF_PathGetMaskMode` | Retrieves the mode for the given path.<br /><br /><pre lang="cpp">PF_PathGetMaskMode(<br/>  PF_ProgPtr   effect_ref,<br/>  PF_PathID    unique_id,<br/>  PF_MaskMode  \*modeP);</pre><br /><br />Mask mode is one of the following:<br /><br />- `PF_MaskMode_NONE`<br />- `PF_MaskMode_ADD`<br />- `PF_MaskMode_SUBTRACT`<br />- `PF_MaskMode_INTERSECT`<br />- `PF_MaskMode_LIGHTEN`<br />- `PF_MaskMode_DARKEN`<br />- `PF_MaskMode_DIFFERENCE`<br />- `PF_MaskMode_ACCUM` |
| `PF_PathGetName` | Retrieves the name of the path (up to `PF_MAX_PATH_NAME_LEN` long).<br /><br /><pre lang="cpp">PF_PathGetName(<br/>  PF_ProgPtr  effect_ref,<br/>  PF_PathID   unique_id,<br/>  A_char      \*nameZ);</pre> |

---

## PF_PathQuerySuite1

This suite is used to identify and access the paths associated with the effect's source layer.

| Function | Purpose |
| --- | --- |
| `PF_NumPaths` | Retrieves the number of paths associated with the effect's source layer.<br /><br /><pre lang="cpp">PF_NumPaths(<br/>  PF_ProgPtr  effect_ref,<br/>  A_long      \*num_pathsPL);</pre> |
| `PF_PathInfo` | Retrieves the PF_PathID for the specified path.<br /><br /><pre lang="cpp">PF_PathInfo(<br/>  PF_ProgPtr  effect_ref,<br/>  A_long      indexL,<br/>  PF_PathID   \*unique_idP);</pre> |
| `PF_CheckoutPath` | Acquires the PF_PathOutlinePtr for the path at the specified time.<br /><br /><pre lang="cpp">PF_CheckoutPath(<br/>  PF_ProgPtr         effect_ref,<br/>  PF_PathID          unique_id,<br/>  A_long             what_time,<br/>  A_long             time_step,<br/>  A_u_long           time_scale,<br/>  PF_PathOutlinePtr  \*pathPP);</pre> |
| `PF_CheckinPath` | Releases the path back to After Effects. Always do this, regardless of any error conditions encountered.<br /><br />Every checkout must be balanced by a checkin, or pain will ensue.<br /><br /><pre lang="cpp">PF_CheckinPath(<br/>  PF_ProgPtr         effect_ref,<br/>  PF_PathID          unique_id,<br/>  PF_Boolean         changedB,<br/>  PF_PathOutlinePtr  pathP);</pre> |
