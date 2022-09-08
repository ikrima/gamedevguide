---
sortIndex: 4
sidebar: ue4guide
---

## Refresh customization on hot reload:

```cpp
FPropertyEditorModule::NotifyCustomizationModuleChanged()
```

## Getting default widget:

```cpp
IDetailPropertyRow::GetDefaultWidgets()
```

## Custom Array Properties

- Simple example

  ```cpp
  IDetailCategoryBuilder& NodeCategory = DetailBuilder.EditCategory("Node");
  TSharedRef<FDetailArrayBuilder> NodeArrayBuilder = MakeShareable(new FDetailArrayBuilder(NodesPropertyHandle.ToSharedRef()));
  NodeArrayBuilder->OnGenerateArrayElementWidget(FOnGenerateArrayElementWidget::CreateSP(this, &FRigDetails::GenerateNodeArrayElementWidget, &DetailBuilder));

  NodeCategory.AddCustomBuilder( NodeArrayBuilder, false );
  ```

- Complex example is `FNiagaraDetailSourcedArrayBuilder`

## Working with IPropertyHandle & DetailChildrenBuilder

- Getting a child IPropertyHandle

  ```cpp
  TSharedPtr<IPropertyHandle> VariantTypePropHndle = StructPropertyHandle->GetChildHandle(GET_MEMBER_NAME_CHECKED(TInSumType, VariantType));
  ```

- Adding said property

  ```cpp
  ChildBuilder.AddProperty(VariantTypePropHndle.ToSharedRef());
  ```

- Adding property with SProperty Widget

  ```cpp
  SNew( SProperty, DetailBuilder.GetProperty(GET_MEMBER_NAME_CHECKED(ABBStadiumRig, bDbgShowRootVis)))
  ```

- Getting Detail View from `IDetailChildrenBuilder`

  ```cpp
  TSharedRef<const SWidget> DetailsView = ChildBuilder.GetParentCategory().GetParentLayout().GetDetailsView()->AsShared();
  ```


## DetailRow

```cpp
FNiagaraEmitterDetails::OnGenerateEventReceiverEntry(TSharedRef<IPropertyHandle> ElementProperty, int32 ElementIndex, IDetailChildrenBuilder& ChildrenBuilder)
{
  TSharedPtr<IPropertyHandle> NameProperty = ElementProperty->GetChildHandle(GET_MEMBER_NAME_CHECKED(FNiagaraEventReceiverProperties, Name));
  FName DisplayName;
  NameProperty->GetValue(DisplayName);
  //         ChildrenBuilder.AddChildProperty(ElementProperty).DisplayName(FText::FromName(DisplayName));
  IDetailGroup& Group = ChildrenBuilder.AddGroup(DisplayName, FText::FromName(DisplayName));
  uint32 NumChildren = 0;
  if (ElementProperty->GetNumChildren(NumChildren) == FPropertyAccess::Success)
  {
    for (uint32 i = 0; i < NumChildren; ++i)
    {
      TSharedPtr<IPropertyHandle> Child = ElementProperty->GetChildHandle(i);
      //Dont add the ID. We just grab it's name for the name region of this property.
      if (Child.IsValid() && Child->GetProperty()->GetName() != GET_MEMBER_NAME_CHECKED(FNiagaraEventReceiverProperties, Name).ToString())
      {
        TSharedPtr<SWidget> NameWidget;
        TSharedPtr<SWidget> ValueWidget;
        FDetailWidgetRow DefaultDetailRow;
        IDetailPropertyRow& Row = Group.AddPropertyRow(Child.ToSharedRef());
        Row.GetDefaultWidgets(NameWidget, ValueWidget, DefaultDetailRow);
        Row.CustomWidget(true)
          .NameContent()
          [
            NameWidget.ToSharedRef()
          ]
          .ValueContent()
          [
            ValueWidget.ToSharedRef()
          ];
      }
    }
  }
}
```
