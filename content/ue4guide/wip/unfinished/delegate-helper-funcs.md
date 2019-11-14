---
sidebar: ue4guide
---
Delegate Helper funcs

DECLARE_DELEGAETE(OnModifiedDelegate)

OnModifiedDelegate myDelegate;

myDelegate.BindLambda

myDelegate.BindRaw

myDelegate.BindSP

myDelegate.BindUObject

myDelegate = OnModifiedDelegate::CreateLambda(\[]() {…})

myDelegate = OnModifiedDelegate::CreateRaw

myDelegate = OnModifiedDelegate::CreateSP

myDelegate = OnModifiedDelegate::CreateUObject

SLATE ATTRIBUTES:

Something defined as a

​ SLATE_ATTRIBUTE( FMargin, ContentPadding )

Can be bound with:

​ .ContentPadding_Lambda(\[](){…})

Also any of these:

AttrName_Lambda

AttrName_Raw

AttrName_Static

AttrName_UObject

AttrName(TSharedRef&lt;obj>)

Same with SLATE_EVENTS:

​ SLATE_EVENT( FOnClicked, OnValueCommitted )

Can be bound with:

​ .OnClicked_Lambda(**execFuncWithBool**)

Can also be set with a delegate:

​ .OnClicked( FOnClicked::CreateLambda(..))
