# Multi-Viewport

- [https://greich.com/2019/03/02/imgui-multiple-viewports/](https://greich.com/2019/03/02/imgui-multiple-viewports/)

- [https://github.com/ocornut/imgui/issues/1542#issuecomment-595852032](https://github.com/ocornut/imgui/issues/1542#issuecomment-595852032)

- Viewports Added `ImGui::GetMainViewport()` as a way to get the bounds and work area of the host display. ([\#3789](https://github.com/ocornut/imgui/pull/3789), [\#1542](https://github.com/ocornut/imgui/issues/1542))
  
  - In `master` branch or without multi-viewports feature enabled:
    - `GetMainViewport()->Pos` is always `== (0,0)`
    - `GetMainViewport()->Size` is always `== io.DisplaySize`
  - In `docking` branch and with the multi-viewports feature enabled:
    - `GetMainViewport()` will return information from your host Platform Window.
    - In the future, we will support a "no main viewport" mode and this may return bounds of your main monitor.
  - For forward compatibility with multi-viewports/multi-monitors:
    - Code using (0,0) as a way to signify "upper-left of the host window" should use `GetMainViewport()->Pos`.
    - Code using `io.DisplaySize` as a way to signify "size of the host window" should use `GetMainViewport()->Size`.
  - We are also exposing a work area in `ImGuiViewport` (`WorkPos`, `WorkSize` vs `Pos`, `Size` for full area):
    - For a Platform Window, the work area is generally the full area minus space used by menu-bars.
    - For a Platform Monitor, the work area is generally the full area minus space used by task-bars.
  - All of this has been the case in 'docking' branch for a long time. What we've done is merely merging
    a small chunk of the multi-viewport logic into 'master' to standardize some concepts ahead of time.

## Enabling Multi-Viewports

- Steps to use multi-viewports in your application, when using a default backend from the examples/ folder:
  
  - Application: Enable feature with `io.ConfigFlags |= ImGuiConfigFlags_ViewportsEnable`.
  - Backend: The backend initialization will setup all necessary ImGuiPlatformIO's functions and update monitors info every frame.
  - Application: In your main loop, call ImGui::UpdatePlatformWindows(), ImGui::RenderPlatformWindowsDefault() after EndFrame() or Render().
  - Application: Fix absolute coordinates used in ImGui::SetWindowPos() or ImGui::SetNextWindowPos() calls.
- Steps to use multi-viewports in your application, when using a custom backend:
  
  - Important: THIS IS NOT EASY TO DO and comes with many subtleties not described here!
    - It's also an experimental feature, so some of the requirements may evolve.
    - Consider using default backends if you can. Either way, carefully follow and refer to examples/ backends for details.
  - Application: Enable feature with `io.ConfigFlags |= ImGuiConfigFlags_ViewportsEnable`.
  - Backend: Hook ImGuiPlatformIO's `Platform_*` and `Renderer_*` callbacks (see below).
    - Set `io.BackendFlags |= ImGuiBackendFlags_PlatformHasViewports` and `io.BackendFlags |= ImGuiBackendFlags_PlatformHasViewports`.
    - Update ImGuiPlatformIO's Monitors list every frame.
    - Update MousePos every frame, in absolute coordinates.
  - Application: In your main loop, call ImGui::UpdatePlatformWindows(), ImGui::RenderPlatformWindowsDefault() after EndFrame() or Render().
    - You may skip calling RenderPlatformWindowsDefault() if its API is not convenient for your needs. Read comments below.
  - Application: Fix absolute coordinates used in ImGui::SetWindowPos() or ImGui::SetNextWindowPos() calls.

### Details

- `ImGui::RenderPlatformWindowsDefault()`:
  
  - This function is a mostly a _helper_ for the common-most cases, and to facilitate using default backends. You can check its simple source code to understand what it does.
  - It basically iterates secondary viewports and call 4 functions that are setup in ImGuiPlatformIO, if available: `Platform_RenderWindow(), Renderer_RenderWindow(), Platform_SwapBuffers(), Renderer_SwapBuffers()`
    - Those functions pointers exists only for the benefit of `RenderPlatformWindowsDefault()`
  - If you have very specific rendering needs (e.g. flipping multiple swap-chain simultaneously, unusual sync/threading issues, etc.), you can ignore `RenderPlatformWindowsDefault()` and write customized code to perform your rendering
    - You can decide to setup the platform_io's `*RenderWindow` and `*SwapBuffers` pointers and call your functions through those pointers,
    - You cay decide to never setup those pointers and call your code directly.
    - They are a convenience, not an obligatory interface.
- IMPORTANT: When multi-viewports are enabled (with `io.ConfigFlags |= ImGuiConfigFlags_ViewportsEnable`), all coordinates/positions will be in your natural OS coordinates space. It means that:
  
  - Reference to hard-coded positions such as in SetNextWindowPos(ImVec2(0,0)) are _probably_ not what you want anymore.
    Use GetMainViewport()->Pos to offset hard-coded positions, e.g. SetNextWindowPos(GetMainViewport()->Pos).
  - Likewise io.MousePos and GetMousePos() will use OS coordinates.
    If you query mouse positions to interact with non-imgui coordinates you will need to offset them.
    e.g. subtract GetWindowViewport()->Pos.
- Render function: the ImDrawData structure now contains `DisplayPos` and `DisplaySize` fields.
  To support multi-viewport, you need to use those values when creating your orthographic projection matrix.
  Use `draw_data->DisplaySize` instead of `io.DisplaySize`, and `draw_data->DisplayPos` instead of (0,0) as the upper-left point.
  You need to subtract `draw_data->DisplayPos` from your scissor rectangles to convert them from global coordinates to frame-buffer coordinates.

- IO: Moved IME support functions from io.ImeSetInputScreenPosFn, io.ImeWindowHandle to the PlatformIO api.

- IO: Removed io.DisplayVisibleMin, io.DisplayVisibleMax settings (they were marked obsoleted, used to clip within the (0,0)..(DisplaySize) range).
