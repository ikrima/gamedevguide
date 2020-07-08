---
sortindex: 32
sidebar: ue4guide
---

## Purpose

Visual Log has been implemented as a helper in debugging gameplay issues by gathering information and presenting it in a visual manner. This approach proved to be very powerful while developing and shipping Bulletstorm. It’s remarkable how simply seeing logged data in a spatial context speeds up debugging.

## Misc:

```cpp
FDebugRenderSceneProxy: Debug Render primitive that extends FPrimitiveSceneProxy:

- Look at FVisualLoggerSceneProxy for simple extension

- UDebugDrawService

Serialize ue4 data to binary blob with memory compression:

void UEnvQueryDebugHelpers::DebugDataToBlobArray(EQSDebug::FQueryData& EQSLocalData, TArray<uint8>& BlobArray, bool bUseCompression)

{

if (!bUseCompression)

{

FMemoryWriter ArWriter(BlobArray);

ArWriter << EQSLocalData;

}

else

{

TArray<uint8> UncompressedBuffer;

FMemoryWriter ArWriter(UncompressedBuffer);

ArWriter << EQSLocalData;

const int32 UncompressedSize = UncompressedBuffer.Num();

const int32 HeaderSize = sizeof(int32);

BlobArray.Init(0, HeaderSize + FMath::TruncToInt(1.1f * UncompressedSize));

int32 CompressedSize = BlobArray.Num() - HeaderSize;

uint8* DestBuffer = BlobArray.GetData();

FMemory::Memcpy(DestBuffer, &UncompressedSize, HeaderSize);

DestBuffer += HeaderSize;

FCompression::CompressMemory((ECompressionFlags)(COMPRESS_ZLIB | COMPRESS_BiasMemory), (void*)DestBuffer, CompressedSize, (void*)UncompressedBuffer.GetData(), UncompressedSize);

BlobArray.SetNum(CompressedSize + HeaderSize, false);

}

}

void UEnvQueryDebugHelpers::BlobArrayToDebugData(const TArray<uint8>& BlobArray, EQSDebug::FQueryData& EQSLocalData, bool bUseCompression)

{

if (!bUseCompression)

{

FMemoryReader ArReader(BlobArray);

ArReader << EQSLocalData;

}

else

{

TArray<uint8> UncompressedBuffer;

int32 UncompressedSize = 0;

const int32 HeaderSize = sizeof(int32);

uint8* SrcBuffer = (uint8*)BlobArray.GetData();

FMemory::Memcpy(&UncompressedSize, SrcBuffer, HeaderSize);

SrcBuffer += HeaderSize;

const int32 CompressedSize = BlobArray.Num() - HeaderSize;

UncompressedBuffer.AddZeroed(UncompressedSize);

FCompression::UncompressMemory((ECompressionFlags)(COMPRESS_ZLIB), (void*)UncompressedBuffer.GetData(), UncompressedSize, SrcBuffer, CompressedSize);

FMemoryReader ArReader(UncompressedBuffer);

ArReader << EQSLocalData;

}

}

Register Visual Logger Drawing Extension:

#if WITH_EDITOR && ENABLE_VISUAL_LOG

FVisualLogger::Get().RegisterExtension(*EVisLogTags::TAG_EQS, &VisualLoggerExtension);

#endif

class FVisualLoggerExtension : public FVisualLogExtensionInterface

{}
```

## Logging

Visual Log gathers data in two ways:

- Actors request logging of data

- VisualLog asking Actors’ status at the time logging request is made

So, whenever an Actor wants to log something, Visual Log checks whether there was already anything logged for that actor within current frame. If there was, then data being logged is simply added to current log entry. If not then actor is first asked to supply a “snapshot” of its current state (by calling GrabDebugSnapshot)

Couple of macros has been supplied to make using visual log easier, and similar to using regular log. These are:

- UE_VLOG(Actor, CategoryName, Verbosity, Format, ...) – similar to UE_LOG, the only difference is the new first parameter that’s the actor that we want to log data for

- UE_CVLOG – similar to UE_CLOG with addition mentioned above

There are other structures that can be logged with Visual Log, other than plain strings. You can log paths, segments, points, all of them with an optional label. For now there’s only a macro for logging segments, others to come in future.

UE_VLOG_SEGMENT(Actor, SegmentStart, SegmentEnd, Color, DescriptionFormat, ...)

“Spatial” information logged with Visual Log will be presented along with any other data logged within that frame when viewing log.

#### Logging actor’s hierarchy

It can happen we want logs of one actor to be associated with logs of another, like for example we’d like to have Weapon’s logs to be added to Pawn’s log. It’s possible and can be done by using these two macros:

- REDIRECT_TO_VLOG(OtherActor) – makes logs of “this” actor to be added to OtherActor’s

- REDIRECT_ACTOR_TO_VLOG(SrcActor, OtherActor) – makes logs of SrcActor to be added to OtherActor’s

### Viewing Log

A tool has been created to enable users (not only programmers) to view gathered information. It’s a very basic implementation that will be developed further, but it’s already usable and supplies basic functionality. The name is LogVisualizer and here is roughly what it does:

![](assets/vislog.png)

- Recording start/stop button

- Toggles game’s pause

- Toggles Log Visualizer’s debug camera. This camera allows user to move around in game viewport and click actors. If there’s a log corresponding to clicked actor then it will be selected in Log Visualizer and its entries will start to be drawn.

- Toggles whether to draw a path composed of all logged locations of an actor

- Toggles whether to ignore logs that have only one entry

- List of all available logs with a textfield for filtering logs by name

- Currently viewed log is marked orange

- This is the “current time” line.

- Currently views log entry

- Time scale of current view

- Zoom slider

- Debug snapshot of log owner and all actors that have been redirected to this log

- Log lines stored in current log entry

- Totally temporary status bar

  To run Log Visualizer just type **VisLog** in console.

### Limitations and Future plans

There are a number of features that are missing to claim Visual Log a full featured tool (although it can already be a huge help!). Here’s a brief list:

- Currently one needs to manually start and stop log “recording” – ideally, in the future, Visual Log will be efficient enough so that it can be “on” all the time. It’s awesome when you can just walk over to an LD having an issue with the game and have already enough data ready to do decent debugging.

- Visual Log is meant to log only AActor instances (UObjects, like components, can be logged via owners) – if need be we can expand it to allow any kind of class.

- Due to the way Visual Log uses memory it’s not really feasible for consoles – we’d like LogVisualizer to be like UnrealConsole so that it can connect to a game session and start getting data from it.

- Saving and loading saved logs is not implemented yet and is one of the major missing features.

- Future feature: Drawing all actors’ locations at “current time” to give even move spatial context to current log entry’s drawing

- Future feature: handling drawing multiple logs at the same time

- Future feature: it would be most convenient if log lines stored in log entries would be a hypertext so that clicking an actor name would switch over to its log or show its location at “current time”. Once we get that in there’s a whole new spectrum of features we could add.

- Future feature: filtering log entries with string so that we can instantly see which entries contain requested text. There’s also a huge list of features I hadn’t come up with yet, so if you have any idea just let me know!

*Reference From <https://answers.unrealengine.com/questions/3675/enable-visual-log-grabdebugsnapsho.html>*
