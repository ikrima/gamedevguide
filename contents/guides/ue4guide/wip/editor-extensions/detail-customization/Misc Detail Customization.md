## **Refresh customization on hot reload:**

FPropertyEditorModule::NotifyCustomizationModuleChanged()

 

 

## **Getting default widget:**

IDetailPropertyRow::GetDefaultWidgets()

 

## **DetailRow:**

FNiagaraEmitterDetails::OnGenerateEventReceiverEntry(TSharedRef&lt;IPropertyHandle&gt; ElementProperty, int32 ElementIndex, IDetailChildrenBuilder& ChildrenBuilder)

{

TSharedPtr&lt;IPropertyHandle&gt; NameProperty = ElementProperty-&gt;GetChildHandle(GET\_MEMBER\_NAME\_CHECKED(FNiagaraEventReceiverProperties, Name));

 

        FName DisplayName;

        NameProperty-&gt;GetValue(DisplayName);

//         ChildrenBuilder.AddChildProperty(ElementProperty).DisplayName(FText::FromName(DisplayName));

 

IDetailGroup& Group = ChildrenBuilder.AddGroup(DisplayName, FText::FromName(DisplayName));

uint32 NumChildren = 0;

if (ElementProperty-&gt;GetNumChildren(NumChildren) == FPropertyAccess::Success)

{

for (uint32 i = 0; i &lt; NumChildren; ++i)

{

TSharedPtr&lt;IPropertyHandle&gt; Child = ElementProperty-&gt;GetChildHandle(i);

//Dont add the ID. We just grab it's name for the name region of this property.

if (Child.IsValid() && Child-&gt;GetProperty()-&gt;GetName() != GET\_MEMBER\_NAME\_CHECKED(FNiagaraEventReceiverProperties, Name).ToString())

{

TSharedPtr&lt;SWidget&gt; NameWidget;

TSharedPtr&lt;SWidget&gt; ValueWidget;

FDetailWidgetRow DefaultDetailRow;

 

IDetailPropertyRow& Row = Group.AddPropertyRow(Child.ToSharedRef());

Row.GetDefaultWidgets(NameWidget, ValueWidget, DefaultDetailRow);

Row.CustomWidget(true)

.NameContent()

\[

NameWidget.ToSharedRef()

\]

.ValueContent()

\[

ValueWidget.ToSharedRef()

\];

}

}

}

}
