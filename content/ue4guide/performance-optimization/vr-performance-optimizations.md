---
sortIndex: 9
sidebar: ue4guide
---

# Oculus Specific

<https://developer.oculus.com/documentation/pcsdk/latest/concepts/dg-performance>

[Oculus Connect 2: Integrating and Profiling VR in your Engine with the Oculus PC SDK](https://www.youtube.com/watch?v=NaQ8RJKe3cE)
`youtube: https://www.youtube.com/watch?v=NaQ8RJKe3cE`

# Understanding, Measuring, and Analyzing VR Graphics Performance

- Turn off framerate smoothing
- Turnoff Generate Mesh Distance fields
- Turn off tiled deferred b/c you generally shouldn't have lots of overlapping dynamic lights
- HZB/Occlusion queries may hinder performance. Try them on/off
- Precomputed Visibility
  - Make sure precomputed visibility is setup properly. To do this, you need to place PrecomputedVisibilityVolumes around anywhere that the player can walk, and build lighting. You need to make sure the same P level is used when building lighting and when running the game (aka do not build the sublevel by itself). You can verify that it is working by entering stat initviews on device or in previewer and make sure the Statically occluded primitives is > 0. Use r.ShowPrecomputedVisibilityCells 1 to visualize the cells in the editor.

*Reference From: Engel, Wolfgang. GPU Zen: Advanced Rendering Techniques (Page 265)*
