---
sortIndex: 8
---
```cpp
FSlateApplication::Get().GetInteractiveTopLevelWindows()

// If the main frame exists parent the window to it

 TSharedPtr< SWindow > ParentWindow;

 if( FModuleManager::Get().IsModuleLoaded( "MainFrame" ) )

 {

 IMainFrameModule& MainFrame = FModuleManager::GetModuleChecked<IMainFrameModule>( "MainFrame" );

 ParentWindow = MainFrame.GetParentWindow();

 }

Get Application Slate Renderer (D3D, OpenGL, etc):

- FSlateApplication::Get().GetRenderer()
```


#### Is it possible to choose the default screen in a multi monitor configuration?

*Reference From <https://answers.unrealengine.com/questions/294650/is-it-possible-to-choose-the-default-screen-in-a-m.html>*
```cpp
 // Move window to the corresponding monitor

 if (GEngine && GEngine->GameViewport) {

 int MonitorNumber = 1;

 FParse::Value(FCommandLine::Get(), L"monitor=", MonitorNumber);

 FDisplayMetrics Display;

 FDisplayMetrics::GetDisplayMetrics(Display);



 int8 MonitorIndex = MonitorNumber - 1;

int32 CurrentMonitorWidth = Display.MonitorInfo[MonitorIndex].NativeWidth;

 float WidthPosition = (MonitorIndex)*Display.PrimaryDisplayWidth - CurrentMonitorWidth;


 float HeightPosition = 0.0f;


FVector2D WindowPosition = FVector2D(WidthPosition, 0.f);

 GEngine->GameViewport->GetWindow()->MoveWindowTo(WindowPosition);

 }
```
*Reference From <https://answers.unrealengine.com/questions/294650/is-it-possible-to-choose-the-default-screen-in-a-m.html>*



Everything happens in **UGameEngine::CreateGameViewport()** which can be found in **Engine\\Source\\Runtime\\Engine\\Private\\GameEngine.cpp**. Now look at the following lines of code :
```cpp
// SAVEWINPOS tells us to load/save window positions to user settings (this is disabled by default)
int32 SaveWinPos;
if (FParse::Value(FCommandLine::Get(), TEXT("SAVEWINPOS="), SaveWinPos) && SaveWinPos > 0 )
{
```



You can see the **Window->MoveWindowTo()** function call which is exactly what we want. So after these lines I added the following :
```cpp
FDisplayMetrics DisplayMetrics;
    FSlateApplication::Get().GetDisplayMetrics(DisplayMetrics);
 
    int MonitorNumber = 0;
    FParse::Value(FCommandLine::Get(), L"monitor=", MonitorNumber);
 
    //Reset to primary if the monitor index is invalid
    if( MonitorNumber >= DisplayMetrics.MonitorInfo.Num() || MonitorNumber < 0 )
    {
        FString Message = "_____ Incorrect monitor index, will use primary screen instead";
        UE_LOG(LogTemp, Warning, TEXT( "%s" ), *Message);
        MonitorNumber = 0;
    }
 
    //If monitor index is 0, we default to primary screen
    if( MonitorNumber == 0 )
    {
        for( int i = 0; i < DisplayMetrics.MonitorInfo.Num(); i++ ) 
        { 
            FString MonitorInfo = "_____ Found monitor \"" + DisplayMetrics.MonitorInfo[i].Name + "\" (is primary : ";
            MonitorInfo += FString::FromInt( DisplayMetrics.MonitorInfo[i].bIsPrimary ) + FString(")"); 
            UE_LOG(LogTemp, Warning, TEXT( "%s" ), *MonitorInfo); 
 
            if( DisplayMetrics.MonitorInfo[i].bIsPrimary ) 
            { 
                MonitorNumber = i + 1; 
            } 
        } 
    } 
```


*Reference From <http://www.froyok.fr/blog/2018-01-ue4-specify-default-monitor-at-launch>*

