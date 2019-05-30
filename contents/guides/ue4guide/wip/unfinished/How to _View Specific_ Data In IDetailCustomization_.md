# **How to "View Specific" Data In IDetailCustomization?**

*From <https://udn.unrealengine.com/questions/417836/how-to-view-specific-data-in-idetailcustomization.html>*

If I'm understanding correctly, you want to select an item from the list on the left and have the widget on the right refresh to display it's properties? In that case, when you create your custom widget, you can use the .expose argument to save off a pointer. You'll then be able to access your custom widget and update it as needed without having to refresh the full details panel. You can take a look at SlateBrushCustomization for an example of how that's done.

\+SOverlay::Slot()

.Padding( FMargin( ImagePadding ) )

.Expose( OverlaySlot )

\[

SNew( SImage )

.Image( InArgs.\_SlateBrush )

]

*From <https://udn.unrealengine.com/questions/417836/how-to-view-specific-data-in-idetailcustomization.html>*
