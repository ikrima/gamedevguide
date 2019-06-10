SceneCaptureComponent2D:

- On every tick, adds itself to an array of CaptureComponents to update (SceneCapturesToUpdate)

- Uworld::Tick() calls a static method USceneCaptureComponent2D::UpdateDeferredCaptures() at every tick

- UpdateDeferredCaptures()

WARN: CreateSceneRenderer sets SeparateTransluceny = 0
