---
sortIndex: 1
sidebar: ue4guide
---

# Overview:

#### Property Handles

- The customization framework is built on the IPropertyHandle type, which represents a particular UPROPERTY on your class, but can potentially be linked to the value of that property on multiple instances of your class (for example, if you are viewing properties of selected actors in a level and have more than one actor selected).

- Access by:

```cpp
TSharedRef< IPropertyHandle > Prop = DetailBuilder.GetProperty(GET_MEMBER_NAME_CHECKED(UMyClass, BaseString));
```

#### Categories:

- Properties are divided into categories as specified by the Category metadata. You are free to reorganize property categories within a customization, to hide existing categories and to create new ones. You access a category builder by calling:

```cpp
IDetailCategoryBuilder& Cat = DetailBuilder.EditCategory(TEXT("CatName"));
```

#### Basic Operations

- Note hiding is done using the DetailBuilder, not the CategoryBuilder

```cpp
DetailBuilder.HideProperty(Prop);
```

- Hide an entire category

```cpp
DetailBuilder.HideCategory(TEXT("CatName"));
```

- Add a property to a category (properties will be shown in the order you add them)

```cpp
Cat.AddProperty(Prop);
```

#### Dynamic State:

Using Slate attributes, it's easy to have property state such as visibility and enabled state determined dynamically. The AddProperty method returns a reference to an IDetailPropertyRow interface that provides this functionality. Unfortunately sometimes you're forced to write some rather ugly boilerplate...

```cpp
auto OnGetPropVisibility = [] { return (do_some_state_query_here) ? EVisibility::Visible : EVisibility::Collapsed; };

auto PropVisibilityAttr = TAttribute<EVisibility>::Create(TAttribute<EVisibility>::FGetter::CreateLambda(OnGetPropVisibility));

Cat.AddProperty(Prop).Visibility(PropVisibilityAttr);
```

#### Accessing the Customized Object(s):

Some simple customizations may not require direct access to the objects being customized, but often it's useful. Remember that the details panel may be displaying multiple objects at any one time.

```cpp
TArray< TWeakObjectPtr< UObject > > Objects;

DetailBuilder.GetObjectsBeingCustomized(Objects);
```

#### Custom Rows:

If you're writing a customization, you probably want to do more than just rearrange properties. Custom rows let you add arbitrary Slate widgets to the details panel. Here's an example based on the class definition given above.

```cpp
/*

Showing a warning message about invalid property values.

(Note that customizations can also be used to enforce validation on user-entered property values).

*/

auto OnGetWarningVisibility = [MyObject]

{

 return MyObject.IsValid() && MyObject->BaseString.IsEmpty() ? EVisibility::Visible : EVisibility::Collapsed;

};

auto WarningVisibilityAttr = TAttribute< EVisibility >::Create(TAttribute< EVisibility >::FGetter::CreateLambda(OnGetWarningVisibility));

Cat.AddCustomRow(LOCTEXT("MyWarningRowFilterString", "Search Filter Keywords"))

.Visibility(WarningVisibilityAttr)

.WholeRowContent()

 [
 SNew(STextBlock)

 .Text(LOCTEXT("MyWarningTest", "BaseString should not be empty!"))
 ];

/*

Displaying a button that triggers editor-time processing.

*/

auto OnRegenerate = [MyObject]

{

 if(MyObject.IsValid())

 {

 MyObject->GeneratedList.Empty();

 for(int32 i = 0; i < MyObject->Count; ++i)

 {

 MyObject->GeneratedList.Add(MyObject->BaseString + TEXT("\_") + (MyObject->Count + 1));

 }

 }



 return FReply::Handled();

};

Cat.AddCustomRow(LOCTEXT("MyButtonRowFilterString", "Search Filter Keywords"))

.WholeRowContent()

 [

 SNew(SButton)

 .Text(LOCTEXT("RegenerateBtnText", "Regenerate List"))

 .OnClicked_Lambda(OnRegenerate)

 ];
```

#### Refreshing:

For most cases, using dynamic updates as above is the easiest. Once in a while though, you may just want to force the details panel to refresh and call your CustomizeDetails method again from scratch. You'll generally want to do this from within a handler that you've added to one of your custom controls, or perhaps a property changed event.

DetailBuilder.ForceRefreshDetails();

*Reference From <http://kantandev.com/articles/details-panel-customization>*

#### Create a widget for a particular property on a uobject inside detail customization:

```cpp
 SNew(SProperty, DetailBuilder.GetProperty(GET_MEMBER_NAME_CHECKED(UInstanceToolEditorUISetting, SnapOffset)))
```

- To add it on a separate object, use CreateSingleProperty() from below

#### Listen on property changes and notifies/notifications:

- CreatePropertyChangeListener(): Generic mechanism to hook into object modifications

  ```cpp
  TSet<UObject*> FCoreUObjectDelegates::ObjectsModifiedThisFrame;

  FCoreUObjectDelegates::FOnObjectModified FCoreUObjectDelegates::OnObjectModified;

  FCoreUObjectDelegates::FOnPreObjectPropertyChanged FCoreUObjectDelegates::OnPreObjectPropertyChanged;

  FCoreUObjectDelegates::FOnObjectPropertyChanged FCoreUObjectDelegates::OnObjectPropertyChanged;
  ```

- Also look at Editor delegates that get called globally on property change modification: [Also FCoreUObjectDelegates in UObjectGlobals:](fixme_self_referential_link)

  ```cpp
  virtual TSharedPtr<class ISinglePropertyView> CreateSingleProperty( UObject* **InObject**, FName **InPropertyName**, const struct FSinglePropertyParams& InitParams );

  virtual TSharedRef<class IStructureDetailsView> CreateStructureDetailView(const struct FDetailsViewArgs> DetailsViewArgs, const FStructureDetailsViewArgs> **StructureDetailsViewArgs**, TSharedPtr<class FStructOnScope> **StructData**, const FText& **CustomName** = FText::GetEmpty());

  virtual UStructProperty* RegisterStructOnScopeProperty(TSharedRef<FStructOnScope> **StructOnScope**);
  ```

#### Customizing existing IDetailCustomization:

```cpp
IDetailCategoryBuilder& **Category** = **DetailBuilder**.EditCategory("TrackEvent");
                        **Category**.AddProperty("EventReceivers").ShouldAutoExpand(true);

virtual IDetailPropertyRow& AddProperty(FName **PropertyPath**, UClass* **ClassOutermost** = nullptr, FName **InstanceName** = NAME_None, EPropertyLocation::Type **Location** = EPropertyLocation::Default) = 0;

virtual IDetailPropertyRow* AddExternalObjects(const TArray<UObject*>> **Objects**, EPropertyLocation::Type **Location** = EPropertyLocation::Default) = 0;

virtual IDetailPropertyRow* AddExternalObjectProperty(const TArray<UObject*>> **Objects**, FName **PropertyName**, EPropertyLocation::Type **Location** = EPropertyLocation::Default) = 0;

virtual IDetailPropertyRow* AddExternalStructure(TSharedPtr<FStructOnScope> **StructData**, EPropertyLocation::Type **Location** = EPropertyLocation::Default) = 0;

virtual IDetailPropertyRow* AddExternalStructureProperty(TSharedPtr<FStructOnScope> **StructData**, FName **PropertyName**, EPropertyLocation::Type **Location** = EPropertyLocation::Default) = 0;

virtual TArray<TSharedPtr<IPropertyHandle>> AddAllExternalStructureProperties(TSharedRef<FStructOnScope> **StructData**, EPropertyLocation::Type **Location** = EPropertyLocation::Default) = 0;
```

#### Create DetailView for a structure:

```cpp
virtual TSharedRef<class IStructureDetailsView> CreateStructureDetailView(const struct FDetailsViewArgs> DetailsViewArgs, const FStructureDetailsViewArgs> **StructureDetailsViewArgs**, TSharedPtr<class FStructOnScope> **StructData**, const FText& **CustomName** = FText::GetEmpty());
```

#### Add Property On External Object

```cpp
IDetailCategoryBuilder::AddExternalProperty()
```

#### Useful customization for adding properties, external properties, structures:

```cpp
virtual UStructProperty* RegisterStructOnScopeProperty(TSharedRef<FStructOnScope> **StructOnScope**);
```

#### Create Default Property Widget from IPropertyHandle:

```cpp
**TSharedPtr<IPropertyHandle> OverrideLightmapRes = LightingCategory.GetProperty( "bOverrideLightmapRes" );**

**SNew( SProperty )**

**InPropertyHandle**->CreatePropertyNameWidget( **DisplayName** )

**InPropertyHandle**->CreatePropertyValueWidget()

FPropertyEditorModule::CreateSingleProperty( UObject* **InObject**, FName **InPropertyName**, const struct FSinglePropertyParams& InitParams );

TSharedPtr<IPropertyHandle> **manipPropHandle** = **DetailBuilder**.GetProperty(**ManipPropName**);  
**manipPropHandle**->CreatePropertyValueWidget()
```

### Register Custom Class Customization:

```cpp
**PropertyModule**.RegisterCustomClassLayout(**ClassName**, **DetailLayoutDelegate**);
```

### Register Custom Property/Struct Customization:

```cpp
virtual void RegisterCustomPropertyTypeLayout( FName **PropertyTypeName**, FOnGetPropertyTypeCustomizationInstance PropertyTypeLayoutDelegate, TSharedPtr<IPropertyTypeIdentifier> **Identifier** = nullptr, TSharedPtr<IDetailsView> **ForSpecificInstance** = nullptr );
```

### Register Custom Property/Struct Customization for only this instance:

```cpp
virtual void RegisterInstancedCustomPropertyLayout( UStruct* **Class**, FOnGetDetailCustomizationInstance **DetailLayoutDelegate** ) = 0;
```

### Create Custom Detail View:

```cpp
virtual TSharedRef<class IDetailsView> CreateDetailView( const struct FDetailsViewArgs> DetailsViewArgs );

virtual TSharedRef<SWindow> CreateFloatingDetailsView( const TArray< UObject* >> **InObjects**, bool **bIsLockable** );
```

### Override Property Visibility For DetailView:

```cpp
objReflWidget->SetIsPropertyVisibleDelegate(FIsPropertyVisible::CreateLambda(\[**bHaveTemplate**\](const FPropertyAndParent& **PropertyAndParent**) { return true; }));
```

### Create Dynamic Property/Struct detail view customization:

```cpp
/** Specific details customization for the event track */
class FEventTrackCustomization : public IDetailCustomization
{
public:
  virtual void CustomizeDetails(IDetailLayoutBuilder& DetailBuilder) override
  {
    DetailBuilder.HideCategory("Track");
    DetailBuilder.HideCategory("General");

    IDetailCategoryBuilder& Category = DetailBuilder.EditCategory("TrackEvent");
    Category.AddProperty("EventReceivers").ShouldAutoExpand(true);
  }
};

auto PopulateSubMenu = [this, EventTrack](FMenuBuilder& SubMenuBuilder)
{
  FPropertyEditorModule& PropertyEditor = FModuleManager::Get().LoadModuleChecked<FPropertyEditorModule>("PropertyEditor");

  // Create a details view for the track
  FDetailsViewArgs DetailsViewArgs(false,false,false,FDetailsViewArgs::HideNameArea,true);
  DetailsViewArgs.DefaultsOnlyVisibility = EEditDefaultsOnlyNodeVisibility::Automatic;
  DetailsViewArgs.bShowOptions = false;
  DetailsViewArgs.ColumnWidth = 0.55f;

  TSharedRef<IDetailsView> DetailsView = PropertyEditor.CreateDetailView(DetailsViewArgs);

  // Register the custom type layout for the class
  FOnGetDetailCustomizationInstance CreateInstance = FOnGetDetailCustomizationInstance::CreateLambda(&MakeShared<FEventTrackCustomization>);
  DetailsView->RegisterInstancedCustomPropertyLayout(UMovieSceneEventTrack::StaticClass(), CreateInstance);

  GetSequencer()->OnInitializeDetailsPanel().Broadcast(DetailsView, GetSequencer().ToSharedRef());

  // Assign the object
  DetailsView->SetObject(EventTrack, true);

  // Add it to the menu
  TSharedRef< SWidget > DetailsViewWidget =
    SNew(SBox)
    .MaxDesiredHeight(400.0f)
    .WidthOverride(450.0f)
  [
    DetailsView
  ];

  SubMenuBuilder.AddWidget(DetailsViewWidget, FText(), true, false);
};
```

[also fcoreuobjectdelegates in uobjectglobals:]&#x3A; [fixme_self_referential_link]
