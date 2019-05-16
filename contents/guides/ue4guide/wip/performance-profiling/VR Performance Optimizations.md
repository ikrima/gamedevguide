Turn off framerate smoothing

Turnoff Generate Mesh Distance fields

Turn off tiled deferred b/c you generally shouldn't have lots of overlapping dynamic lights

HZB/Occlusion queries may hinder performance. Try them on/off

Precomputed Visibility

- Make sure precomputed visibility is setup properly. To do this, you need to place PrecomputedVisibilityVolumes around anywhere that the player can walk, and build lighting. You need to make sure the same P level is used when building lighting and when running the game (aka do not build the sublevel by itself). You can verify that it is working by entering stat initviews on device or in previewer and make sure the Statically occluded primitives is > 0. Use r.ShowPrecomputedVisibilityCells 1 to visualize the cells in the editor.
