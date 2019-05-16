<https://github.com/ue4plugins/LoadingScreen>

Loading Screen:

To show an animation between LoadMap and BeginPlay, you can bind a delegate to FCoreUObjectDelegates::PreLoadMap in your GameInstance class. [[This wiki page]](https://wiki.unrealengine.com/Loading_Screen) should contain all of the information you need to get that set up, and you'll be able to create an animated Slate widget since the loading screen runs on it's own thread.

If you need the loading screen to start earlier, you'll want to look into level streaming. Essentially, you'll create a "Loading Screen" level that should load quickly and contain whatever animation you want. That level will then stream in the actual level in the background, and then the loading level will be unloaded and you'll transition in to gameplay. I can provide some more information on how to set that up if you'd like.

_From &lt;<https://udn.unrealengine.com/questions/320252/how-to-show-the-loading-screen-earlier.html>&gt;_

<https://wiki.unrealengine.com/Loading_Screen>

[this wiki page]: https://wiki.unrealengine.com/Loading_Screen
