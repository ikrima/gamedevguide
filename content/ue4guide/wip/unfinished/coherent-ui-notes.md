---
sidebar: ue4guide
---
Coherent UI Notes:

Set focus to CoherentUI widget:

- FSlateApplication::Get().SetKeyboardFocus(Widget)

Set focus back to game: FSlateApplication::Get().SetFocusToGameViewport()

Show mouse cursor: FSlateApplication::Get().ResetToDefaultInputSettings()

CoherentUIGTHUD->ReadyForBindings.AddDynamic(this, &ACoUIGTTestFPSHUD::BindUI);

void ACoUIGTTestFPSHUD::BindUI(int32 frameid, const FString& path, bool isMain)
{
CoherentUIGTHUD->GetView()->BindCall("CallFromJavaScript",
Coherent::UI::MakeHandler(&CalledFromJSSampleDelegate,
&(FCalledFromJSSample::ExecuteIfBound)));
CoherentUIGTHUD->GetView()->BindCall("CalledFromJSString",
Coherent::UI::MakeHandler(this,
&ACoUIGTTestFPSHUD::CalledFromJSStringHandler));
CoherentUIGTHUD->GetView()->RegisterForEvent(
"CalledFromJSUStruct",
Coherent::UIGT::MakeHandler(this, &ACoUIGTTestFPSHUD::CalledFromJSUStructHandler));
}

[Reference](http://coherent-labs.com/Documentation/UnrealEngine4-GT/d2/df6/_coherent__g_t_for__unreal__engine_4_plugin.html#Input__C___)

engine.call

- Call a function from JS to C++ (can return value)

- Bind with View::BindCall

engine.trigger

- Bind with View::RegisterForEvent

- trigger event which can have multiple functions bound to it, both on JS side & C++ side.

Ex:

class Game

{

public:

void Quit()

{

}

} g_Game;

class GameViewListener : public Coherent::UI::ViewListener

{

public:

virtual void OnReadyForBindings()

{

m_View->RegisterForEvent("OnQuitClicked",

Coherent::UI::MakeHandler(&g_Game, &Game::Quit));

}

};

engine.on('OnQuitClicked', function () {

ShowMessage('Bye');

});

// using jQuery to simplify the sample

$('#QuitButton').click(function () {

// this will execute both Game::Quit in C++

// and ShowMessage('Bye') in JavaScript

engine.trigger('OnQuitClicked');

});

*From <http://coherent-labs.com/Documentation/cpp-gt/dc/dc7/_binding_cxx.html#CPP2JavaScript>*
