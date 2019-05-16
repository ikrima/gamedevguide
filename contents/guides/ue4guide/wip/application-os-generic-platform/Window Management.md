FSlateApplication::Get().GetInteractiveTopLevelWindows()

// If the main frame exists parent the window to it

​ TSharedPtr&lt; SWindow &gt; ParentWindow;

​ if( FModuleManager::Get().IsModuleLoaded( "MainFrame" ) )

​ {

​ IMainFrameModule& MainFrame = FModuleManager::GetModuleChecked&lt;IMainFrameModule&gt;( "MainFrame" );

​ ParentWindow = MainFrame.GetParentWindow();

​ }

Get Application Slate Renderer (D3D, OpenGL, etc):

- FSlateApplication::Get().GetRenderer()

**Is it possible to choose the default screen in a multi monitor configuration?**

_From &lt;<https://answers.unrealengine.com/questions/294650/is-it-possible-to-choose-the-default-screen-in-a-m.html>&gt;_

1.  // Move window to the corresponding monitor

2.  if (GEngine && GEngine-&gt;GameViewport) {

3.  int MonitorNumber = 1;

4.  FParse::Value(FCommandLine::Get(), L"monitor=", MonitorNumber);

5.  FDisplayMetrics Display;

6.  FDisplayMetrics::GetDisplayMetrics(Display);

7.

8)  int8 MonitorIndex = MonitorNumber - 1;

9)  int32 CurrentMonitorWidth = Display.MonitorInfo\[MonitorIndex\].NativeWidth;

10) float WidthPosition = (MonitorIndex)\*Display.PrimaryDisplayWidth - CurrentMonitorWidth;

11)

12. float HeightPosition = 0.0f;

13.

14) FVector2D WindowPosition = FVector2D(WidthPosition, 0.f);

15) GEngine-&gt;GameViewport-&gt;GetWindow()-&gt;MoveWindowTo(WindowPosition);

16) }

_From &lt;<https://answers.unrealengine.com/questions/294650/is-it-possible-to-choose-the-default-screen-in-a-m.html>&gt;_

Everything happens in **UGameEngine::CreateGameViewport()** which can be found in **Engine\\Source\\Runtime\\Engine\\Private\\GameEngine.cpp**. Now look at the following lines of code :

<table><tbody><tr class="odd"><td><p>01</p><p>02</p><p>03</p><p>04</p><p>05</p><p>06</p><p>07</p><p>08</p><p>09</p><p>10</p><p>11</p><p>12</p><p>13</p><p>14</p></td><td><p>// SAVEWINPOS tells us to load/save window positions to user settings (this is disabled by default)</p><p>int32 SaveWinPos;</p><p>if (FParse::Value(FCommandLine::Get(), TEXT("SAVEWINPOS="), SaveWinPos) &amp;&amp; SaveWinPos &gt; 0 )</p><p>{</p></td></tr></tbody></table>

You can see the **Window-&gt;MoveWindowTo()** function call which is exactly what we want. So after these lines I added the following :

<table><tbody><tr class="odd"><td><p>01</p><p>02</p><p>03</p><p>04</p><p>05</p><p>06</p><p>07</p><p>08</p><p>09</p><p>10</p><p>11</p><p>12</p><p>13</p><p>14</p><p>15</p><p>16</p><p>17</p><p>18</p><p>19</p><p>20</p><p>21</p><p>22</p><p>23</p><p>24</p><p>25</p><p>26</p><p>27</p><p>28</p><p>29</p><p>30</p><p>31</p><p>32</p><p>33</p><p>34</p><p>35</p><p>36</p><p>37</p><p>38</p><p>39</p></td><td><p>    FDisplayMetrics DisplayMetrics;</p><p>    FSlateApplication::Get().GetDisplayMetrics(DisplayMetrics);</p><p> </p><p>    int MonitorNumber = 0;</p><p>    FParse::Value(FCommandLine::Get(), L"monitor=", MonitorNumber);</p><p> </p><p>    //Reset to primary if the monitor index is invalid</p><p>    if( MonitorNumber &gt;= DisplayMetrics.MonitorInfo.Num() || MonitorNumber &lt; 0 )</p><p>    {</p><p>        FString Message = "_____ Incorrect monitor index, will use primary screen instead";</p><p>        UE_LOG(LogTemp, Warning, TEXT( "%s" ), *Message);</p><p>        MonitorNumber = 0;</p><p>    }</p><p> </p><p>    //If monitor index is 0, we default to primary screen</p><p>    if( MonitorNumber == 0 )</p><p>    {</p><p>        for( int i = 0; i &lt; DisplayMetrics.MonitorInfo.Num(); i++ )</p><p>        {</p><p>            FString MonitorInfo = "_____ Found monitor \"" + DisplayMetrics.MonitorInfo[i].Name + "\" (is primary : ";</p><p>            MonitorInfo += FString::FromInt( DisplayMetrics.MonitorInfo[i].bIsPrimary ) + FString(")");</p><p>            UE_LOG(LogTemp, Warning, TEXT( "%s" ), *MonitorInfo);</p><p> </p><p>            if( DisplayMetrics.MonitorInfo[i].bIsPrimary )</p><p>            {</p><p>                MonitorNumber = i + 1;</p><p>            }</p><p>        }</p><p>    }</p></td></tr></tbody></table>

_From &lt;<http://www.froyok.fr/blog/2018-01-ue4-specify-default-monitor-at-launch>&gt;_
