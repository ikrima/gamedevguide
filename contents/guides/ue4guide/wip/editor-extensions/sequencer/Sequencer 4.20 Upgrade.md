## **Sequencer Upgrade**

MovieScene.LegacyConversionFrameRate (Default: 60000fps)

 

*From &lt;<https://udn.unrealengine.com/storage/temp/323036-sequencer-420-technical-upgrade-notes.pdf>&gt;*

 

LevelSequence.DefaultTickResolution (Default: 24000fps)

 

*From &lt;<https://udn.unrealengine.com/storage/temp/323036-sequencer-420-technical-upgrade-notes.pdf>&gt;*

 

LevelSequence.DefaultDisplayRate (Default: 30fps

 

*From &lt;<https://udn.unrealengine.com/storage/temp/323036-sequencer-420-technical-upgrade-notes.pdf>&gt;*

 

## **Time Management**



-   **FFrameNumber** (32 bits): int32 frame/tick number

-   **FFrameTime** (64 bits): FFrameNumber + float. Primarily used during evaluation.

-   **FFrameRate** (64 bits): fractional frame rate stored as int numerator & denominator

-   **FQualifiedFrameTime** (128 bits): A composition of FFrameTime and FFrameRate

-   **FTimecode** (20 bytes) : A timecode representation

 

**MovieScene Data**: UMovieScene now contains a tick resolution and display rate, and bolsters the previous ‘Force Fixed Frame Interval’ evaluation with an evaluation type enum.

-   **UMovieScene::GetEvaluationType()** - retrieves an enumeration specifying how to

> evaluate this sequence:

-   WithSubFrames (default): Evaluate using sub-frame interpolation

-   FrameLocked: Lock to the DisplayRate of the sequence, only evaluate

> round frame numbers, no subframes, set t.maxfps during evaluation.

-   UMovieScene::GetTickResolution() - retrieves the tick resolution that all FFrameNumbers

-   UMovieScene::GetDisplayRate() - playback rate (EvalType==FrameLocked =&gt; this is what t.maxfps is set to)





**FMovieSceneChannelProxy** affords editor and runtime code a common language for interacting with and manipulating keyframes. To this end, **IKeyframeSection&lt;&gt;** has been completely removed and is no longer necessary.

 

### **FMovieSceneChannel**

Provides an interface through which all common channel data can be interacted with. All

channels added to the channel proxy must implement this type.

### **ISequencerChannelInterface**

An interface to all overloads relating to UI interaction and manipulation required by sequencer

for a given channel. Must be registered through the ISequencerModule class for each channel

type (normally in your editor module’s StartupModule method).

### **TMovieSceneChannelTraits**

Specifies compile-time traits for channel types such as extended editor data, and whether the

channel supports default values. Many sequencer UI utilities use the function overloads

specified in MovieSceneChannelTraits.h to interact with each concrete channel type. If the

default templated overloads are incompatible with your channel type, you should overload the

necessary functions for the specific channel.

### **MovieScene::DiscreteInclusiveLower, DiscreteExclusiveUpper and DiscreteSize** to

consistently deal with the various boundary conditions

 

 



 

 

 

bSupportsInfiniteRange

 

*From &lt;<https://udn.unrealengine.com/storage/temp/323036-sequencer-420-technical-upgrade-notes.pdf>&gt;*

 

FMovieSceneChannelProxy

Stored on UMovieSceneSection: derived types should populate this structure with all of its

channels as shown in Appendix A.

-   Channels are stored by their base FMovieSceneChannel\* in buckets by derived type. With this in mind, any reallocation of channels should be immediately followed by a re-creation of the channel proxy; doing so will invalidate any pointers and handles to the channels stored in the old proxy.

 

-   All interaction with channels is through either the FMovieSceneChannel interface directly, or ISequencerChannelInterface, depending on context. The latter is registered per-type through the sequencer module **ISequencerModule::RegisterChannelEditor**

-   A templated helper is provided through **TSequencerChannelInterface** which allows single-concept overloading for any given channel type, resolved through ADL. This allows customization of specific behavior without having to re-implement the entire interface if the defaults are suitable for most channels.

-   It also means that core sequencer code can automatically populate UI for channel data without having to manually define **ISequencerSection** interfaces and manually defining the channel layout in the editor as well as in the runtime.

-   Default implementation functions for **ISequencerChannelInterface** are defined in the Sequencer namespace, but overloads should be added either to your channel’s namespace, or the global namespace if it’s not in one

-   It is recommended that custom channels follow the pattern of storing times and values in parallel arrays, and provide a **TMovieSceneChannelData&lt;T&gt; GetData()** method for interacting with the keys.

-   The majority of FMovieSceneChannel’s interface directly maps to functions callable on **TMovieSceneChannelData**

-   In order for an **ISequencerChannelInterface** to be registered for custom channel types, you need to call **ISequencerModule::RegisterChannelInterface&lt;ChannelType&gt;();**

 

Sample

class UMySection : public UMovieSceneSection

{

UMySection(const FObjectInitializer& ObjInit)

: Super(ObjInit)

{

FMovieSceneChannelProxyData Channels;

\#if WITH\_EDITOR

// In editor proxies mandate extra information pertaining to the channels, including

how to retrieve a channel's external value from a bound object in some cases

// Add the first float channel

Channels.Add(

FloatChannel1,

FMovieSceneChannelMetaData("Float1", LOCTEXT("Float1Text", "Float 1")),

TMovieSceneExternalValue&lt;float&gt;()

);

// Add the second float channel

Channels.Add(

FloatChannel2,

FMovieSceneChannelMetaData("Float2", LOCTEXT("Float2Text", "Float 2")),

TMovieSceneExternalValue&lt;float&gt;()

);

// Add the last float channel

Channels.Add(

FloatChannel3,

FMovieSceneChannelMetaData("Float3", LOCTEXT("Float3Text", "Float 3")),

TMovieSceneExternalValue&lt;float&gt;()

);

// Add the bool channel

Channels.Add(

BoolChannel,

FMovieSceneChannelMetaData("Bool", LOCTEXT("BoolText", "Bool")),

TMovieSceneExternalValue&lt;bool&gt;()

);

\#else

// Non editor builds just add the channels directly

Channels.Add(FloatChannel1);

Channels.Add(FloatChannel2);

Channels.Add(FloatChannel3);

Channels.Add(BoolChannel);

\#endif

ChannelProxy = MakeShared&lt;FMovieSceneChannelProxy&gt;(MoveTemp(Channels));

}

private:

FMovieSceneFloatChannel FloatChannel1;

FMovieSceneFloatChannel FloatChannel2;

FMovieSceneFloatChannel FloatChannel3;

FMovieSceneBoolChannel BoolChannel;

};

 

*From &lt;<https://udn.unrealengine.com/storage/temp/323036-sequencer-420-technical-upgrade-notes.pdf>&gt;*
