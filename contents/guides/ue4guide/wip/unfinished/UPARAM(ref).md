UPARAM(ref)

UPARAM(hidden)

UPARAM(DisplayName="X (Roll)")

const bool bMulticastDelegateProp = Property-&gt;IsA(UMulticastDelegateProperty::StaticClass());

const bool bDelegateProp = (Property-&gt;IsA(UDelegateProperty::StaticClass()) || bMulticastDelegateProp);

const bool bShouldShowAsVar = (!Property-&gt;HasAnyPropertyFlags(CPF_Parm) && Property-&gt;HasAllPropertyFlags(CPF_BlueprintVisible)) && !bDelegateProp;

CPF_DisableEditOnInstance

DetailBuilder.HideProperty( DetailBuilder.GetProperty( GET_MEMBER_NAME_CHECKED(USceneComponent, bAbsoluteLocation) ) );

SKeySelector
