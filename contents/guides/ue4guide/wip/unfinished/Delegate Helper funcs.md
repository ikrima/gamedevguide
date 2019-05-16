Delegate Helper funcs

 

DECLARE\_DELEGAETE(OnModifiedDelegate)

OnModifiedDelegate myDelegate;

 

myDelegate.BindLambda

myDelegate.BindRaw

myDelegate.BindSP

myDelegate.BindUObject

 

 

myDelegate = OnModifiedDelegate::CreateLambda(\[\]() {…})

myDelegate = OnModifiedDelegate::CreateRaw

myDelegate = OnModifiedDelegate::CreateSP

myDelegate = OnModifiedDelegate::CreateUObject

 

 

SLATE ATTRIBUTES:

Something defined as a

​	SLATE\_ATTRIBUTE( FMargin, ContentPadding )

 

Can be bound with:

​	.ContentPadding\_Lambda(\[\](){…})

 

Also any of these:

AttrName\_Lambda

AttrName\_Raw

AttrName\_Static

AttrName\_UObject

AttrName(TSharedRef&lt;obj&gt;)

 

Same with SLATE\_EVENTS:

​	SLATE\_EVENT( FOnClicked, OnValueCommitted )

Can be bound with:

​	.OnClicked\_Lambda(**execFuncWithBool**)

 

Can also be set with a delegate:

​	.OnClicked( FOnClicked::CreateLambda(..))