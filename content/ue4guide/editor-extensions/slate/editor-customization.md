---
sortIndex: 2
sidebar: ue4guide
---

# Tutorials & Reference

- In-Depth Overview and tutorial: <https://lxjk.github.io/2019/10/01/How-to-Make-Tools-in-U-E.html>
  - Github Repo: <https://github.com/lxjk/ToolExample>
- Creating An Editor Module: <https://wiki.unrealengine.com/Creating_an_Editor_Module>
- Customize Detail Pane: <https://wiki.unrealengine.com/Customizing_detail_panels>
- Component Visualizer: <https://wiki.unrealengine.com/Component_Visualizers>
- Custom Asset Picker: <https://kasundevblog.wordpress.com/2015/10/07/creating-assets-with-support-of-a-custom-class-picker-unreal-engine-4>

# Helpful Tips

- `testprops` will bring up UPropertyEditorTestObject that contains all base properties and the corresponding slate widgets
- More slate samples: SWidgetGallery.h & AppFramework/STestSuite/SWizard/STableViewTesting/SLayoutExample
- PropertyModule is responsible for DetailPanel. In `StartupModule()`, you register for extension to configure it
- DetailCustomization is the property sheet customization
- Editor has Extender / extensibility hooks to plug into to expand functionality. To expose these points in the UI:
  - Editor Preferences -> General -> Miscellaneous
  - Check Developer Tools | Display UI Extension Points
- Extender's have functions to add populate the extender (e.g. create a toolbar button)
  - You pass in MenuCreation functions as parameters b/c they get called on-demand lazily when the menu is being created
- Menu/UI creation proceeds as normal Slate UI.
  - Look at Sequencer.cpp for samples
  - Look at Paper2D as samples as well (everything related to it is a plugin & not core to the engine)

# Code References

- For a great reference point, start at: `Source/Editor/DetailCustomizations/Private/DetailCustomizations.cpp`
- For customizing a category:`Source/Editor/DetailCustomizations/Private/StaticMeshComponentDetails.h`
- To customize structs, use: derive from IPropertyTypeCustomization: `/Editor/DetailCustomizations/Private/SlateColorCustomization.h for reference`
- For component visualizers: `Source/Editor/ComponentVisualizers/`
