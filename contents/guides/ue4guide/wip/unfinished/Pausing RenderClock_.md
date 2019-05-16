Pausing RenderClock:

GPauseRenderingRealtimeClock controlled in UGameEngine.Tick.

-   Can be paused using SetGamePaused

-   Uses fixeddelta time correctly

-   But always ticks even when Gworld-&gt;IsPaused() == true

-   Ticking occurs based on GPauseRenderingRealtimeClock

-   Only way it's ever turned off in Engine is through console cmd: PAUSERENDERCLOCK

    -   HandlePauseRenderClockCommand( Cmd, Ar );

    -   Sets GPauseRenderingRealtimeClock = !GPauseRenderingRealtimeClock;

 

Render Thread pausing

-   Can be paused with helper class FSuspendRenderingThread (called from Game Thread)

    -   Flushes Render Commands

    -   Can call StopRenderingThread()/StartRenderingThread()

        -   These functions atomically alter GIsRenderingThreadSuspended

        -   Also can alter GRunRenderingThreadHeartbeat which happens on start/stopping the thread. If FSuspendRenderingThread is called to suspend by recreating the render thread, it will destroy the render thread & recreate it so it will set GRunRenderingThreadHeartbeat = false through StopRenderingThread

        -   GIsRenderingThreadSuspended is used by FRenderingThreadTickHeartbeat (a separate GameThread to manage heartbeat ticks)

            -   Heartbeat tick @ GRenderingThreadMaxIdleTickFrequency from GameThread

            -   It ticks FTickableObjectRenderThread objects by enqueing TickingRenderingTickables() on the rendering thread (when GIsRenderingThreadSuspended == false)

            -   This thread runs on it's own heartbeat which is disjoint from the GT or the other RT resources

            -   It's Tick DeltaSeconds is in system real time, not game time or fixed time

