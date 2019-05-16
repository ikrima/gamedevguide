UPARAM(ref)

UPARAM(hidden)

UPARAM(DisplayName="X (Roll)")

 

const bool bMulticastDelegateProp = Property-&gt;IsA(UMulticastDelegateProperty::StaticClass());

const bool bDelegateProp = (Property-&gt;IsA(UDelegateProperty::StaticClass()) || bMulticastDelegateProp);

const bool bShouldShowAsVar = (!Property-&gt;HasAnyPropertyFlags(CPF\_Parm) && Property-&gt;HasAllPropertyFlags(CPF\_BlueprintVisible)) && !bDelegateProp;

 

CPF\_DisableEditOnInstance

 

DetailBuilder.HideProperty( DetailBuilder.GetProperty( GET\_MEMBER\_NAME\_CHECKED(USceneComponent, bAbsoluteLocation) ) );                

 

SKeySelector
