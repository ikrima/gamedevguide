<https://www.youtube.com/watch?v=HY62PAsM7eg&feature=youtu.be>>

Make sure to performance profile under right conditions

- Never in Debug.

- Development is convenient

- Test gives near Shipping fps

- Make sure lighting is built (if it's not, uses a slower path)

Useful commands:

- Stat unit / unitgraph / detailed

  - Game is CPU on game thread (but includes vsync wait)

  - Draw is CPU on render thread

  - GPU is GPU time

  - Make sure Max tick rate settings are disabled (t.MaxFPS, SmoothFrameRate=false, r.DontLimitOnBattery)

- Stat raw to disable smoothing

- StartFPSChart / EndFPSChart: Creates CSV with stats

- CPU Profiling

  - Stat DumpFrame -ms=.1

  - Outputs log of function calls with timings on game thread

  - quick_scope_cycle_counter(MyOwnProfilerName)

  - Stat StartFile/StopFile : takes DumpFrame output and puts it into a file. Can do it remotely + browse it with Unreal Front End

- GPU

  - ProfileGPU or Ctrl+Shift+,
