---
sidebar: ue4guide
---
UPARAM(ref)

UPARAM(hidden)

UPARAM(DisplayName="X (Roll)")

const bool bMulticastDelegateProp = Property->IsA(UMulticastDelegateProperty::StaticClass());

const bool bDelegateProp = (Property->IsA(UDelegateProperty::StaticClass()) || bMulticastDelegateProp);

const bool bShouldShowAsVar = (!Property->HasAnyPropertyFlags(CPF_Parm) && Property->HasAllPropertyFlags(CPF_BlueprintVisible)) && !bDelegateProp;

CPF_DisableEditOnInstance

DetailBuilder.HideProperty( DetailBuilder.GetProperty( GET_MEMBER_NAME_CHECKED(USceneComponent, bAbsoluteLocation) ) );

SKeySelector
