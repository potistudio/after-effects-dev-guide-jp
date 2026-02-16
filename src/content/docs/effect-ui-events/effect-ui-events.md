---
title: 'エフェクトUIとイベント'
---
エフェクトは、(1) エフェクト コントロール ウィンドウ (カスタム ECW UI)、および (2) コンポジション ウィンドウまたはレイヤー ウィンドウ (カスタム コンプ UI) の 2 つの領域でカスタム UI を提供できます。

カスタム UI を使用するエフェクトは、`PF_OutFlag_CUSTOM_UI` (`PF_Cmd_GLOBAL_SETUP` ([Global Selectors](../effect-basics/command-selectors#global-selectors) から) の間に [PF_OutFlags](../effect-basics/PF_OutData#pf_outflags) から) を設定し、PF_Cmd_EVENT セレクターを処理する必要があります。

カスタム ECW UI を使用すると、エフェクトでカスタマイズされたコントロールをパラメータに提供できます。これは、標準パラメータ タイプまたは [Arbitrary Data Parameters](../effect-details/arbitrary-data-parameters#arbitrary-data-parameters) のいずれかで使用できます。

カスタム UI を持つパラメータは、[adding the parameter](../effect-details/interaction-callback-functions#interaction-callbacks) のときに `PF_PUI_CONTROL` ([Parameter UI Flags](../effect-basics/PF_ParamDef#parameter-ui-flags) から) を設定する必要があります。

カスタム コンプ UI を使用すると、エフェクトでコンポジション ウィンドウまたはレイヤー ウィンドウでビデオを直接操作できます。

エフェクトが選択されると、ウィンドウはカスタム コントロールをビデオ上に直接オーバーレイし、それらのコントロールとのユーザー インタラクションを処理して、パラメータをより迅速かつ自然に調整できます。

エフェクトは、PF_REGISTER_UI を呼び出してイベントを受信できるように自身を登録する必要があります。

After Effects は、ユーザー インターフェイスの処理とパラメータ管理のためにイベントをエフェクトに送信し、エフェクトを中央のメッセージ キューに統合できます。

多くのイベントはユーザー入力に応じて送信されますが、After Effects は任意のデータパラメータを管理するエフェクトにもイベントを送信します。

イベントの種類は [PF_EventExtra->e_type](PF_EventExtra#pf_eventextra) で指定され、さまざまなイベントについては以下で説明します。

---

## イベント

| Event | Indicates |
| --- | --- |
| `PF_Event_NEW_CONTEXT` | The user created a new context (probably by opening a window) for events.<br /><br />The plug-in is allowed to store state information inside the context using the context handle.<br /><br />[PF_EventUnion](PF_EventUnion#pf_eventunion) contains valid context and type, but everything else should be ignored. |
| `PF_Event_ACTIVATE` | The user activated a new context (probably by bringing a window into the foreground). [PF_EventUnion](PF_EventUnion#pf_eventunion) is empty. |
| `PF_Event_DO_CLICK` | The user clicked within the effect's UI. [PF_EventUnion](PF_EventUnion#pf_eventunion) contains a `PF_DoClickEventInfo`.<br /><br />Handle the mouse click and respond, passing along drag info; see sample code), within a context.<br /><br />!!! note<br />As of 7.0, do *not* block until mouse-up; instead, rely on `PF_Event_DRAG`. |
| `PF_Event_DRAG` | Also a Click Event, [PF_EventUnion](PF_EventUnion#pf_eventunion) contains a `PF_DoClickEventInfo`.<br /><br />Request this by returning `send_drag == TRUE` from `PF_Event_DO_CLICK`.<br /><br />Do this so After Effects can see new data from the user's changes. |
| `PF_Event_DRAW` | Draw! [PF_EventUnion](PF_EventUnion#pf_eventunion) contains a `PF_DrawEventInfo`. |
| `PF_Event_DEACTIVATE` | The user has deactivated a context (probably by bringing another window into the foreground). `PF_EventUnion` is empty. |
| `PF_Event_CLOSE_CONTEXT` | A context has been closed by the user. `PF_EventUnion` will be empty. |
| `PF_Event_IDLE` | A context is open but nothing is happening. `PF_EventUnion` is empty. |
| `PF_Event_ADJUST_CURSOR` | The mouse is over the plug-in's UI. Set the cursor by changing the `PF_CursorType` in the `PF_AdjustCursorEventInfo`.<br /><br />Use OS-specific calls to implement a custom cursor; tell After Effects you've done so by setting `PF_CursorType` to `PF_Cursor_CUSTOM`.<br /><br />Use an After Effects cursor whenever possible to preserve interface continuity. |
| `PF_Event_KEYDOWN` | Keystroke. [PF_EventUnion](PF_EventUnion#pf_eventunion) contains a `PF_KeyDownEvent`. |
| `PF_Event_MOUSE_EXITED` | New in CS6. Notification that the mouse is no longer over a specific view (layer or comp only). |
