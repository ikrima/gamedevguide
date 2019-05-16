If you want the insert/duplicate/delete buttons to appear, you should be using the AddChildProperty() API, rather than AddChildContent(). You can then control whether the insert/duplicate/delete buttons appear on a per-entry basis by using IDetailPropertyRow:: ShowPropertyButtons (this gets you the some of ability to prevent entry deletion that you desire).

FYI, you will need to pass the IPropertyHandle of the array entry through to AddChildProperty(), not the parent property that is passed into CustomizeStructChildren.

For notifications on array modification, you can override PostEditChangeChainProperty in your UObject-derived class. You can check the FName of the property being modified via the passed-in PropertyChangedEvent. R

_From &lt;<https://udn.unrealengine.com/questions/185116/view.html>&gt;_

There isn't a single widget that we use to display array properties, as we have to build the widget based on the type of data in the array. You can look at SPropertyValueWidget::ConstructPropertyEditorWidget in PropertyEditorHelper.cpp to see how we parse all of that and decide what sort of widgets to build to represent the property. This should all be handled automatically, so if you just want your array property to display, it should be as easy as adding the property to your customization.

If you're looking to build your own array editor, take a look at the FDetailArrayBuilder class in PropertyCustomizationHelper.h. There should be quite a few instances where we use this in the engine that you can look at for some examples of how to use it. Hope that helps.

_From &lt;<https://udn.unrealengine.com/questions/330277/view.html>&gt;_
